import { z } from 'zod';
import { defineEventHandler, getValidatedQuery, createError } from 'h3';
import { eq, and } from 'drizzle-orm';
import cache from '~/middleware/cache';
import { module, post } from '~/server/database/schema';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const querySchema = z.object({
  module: z.string(),
  slug: z.string(),
});

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

const sanitizeOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'div'],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'height', 'width'],
    div: ['class'],
    a: ['href', 'target'],
  },
  allowedClasses: {
    div: ['image'],
  },
};

export default defineEventHandler(async (event) => {
  return cache(event, async () => {
    const query = await getValidatedQuery(event, (body) =>
      querySchema.safeParse(body),
    );

    if (!query.success) {
      // eslint-disable-next-line no-console -- log output to console
      console.error(query.error.message);
      throw createError({
        statusCode: 400,
        message: 'Malformed request',
      });
    }

    const { module: moduleSlug, slug: postSlug } = query.data;

    const result = await db
      .select({
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
        module: {
          id: module.id,
          name: module.name,
          slug: module.slug,
        },
      })
      .from(post)
      .innerJoin(module, eq(post.moduleId, module.id))
      .where(
        and(
          eq(module.slug, moduleSlug),
          eq(post.slug, postSlug),
          eq(post.status, 'published'),
        ),
      )
      .limit(1);

    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Post not found',
      });
    }

    const { post: foundPost, module: foundModule } = result[0];

    const renderedHtml = md.render(foundPost.content);
    const sanitizedHtml = sanitizeHtml(renderedHtml, sanitizeOptions);

    return {
      id: foundPost.id,
      title: foundPost.title,
      slug: foundPost.slug,
      content: sanitizedHtml,
      createdAt: foundPost.createdAt,
      updatedAt: foundPost.updatedAt,
      module: {
        id: foundModule.id,
        name: foundModule.name,
        slug: foundModule.slug,
      },
    };
  });
});
