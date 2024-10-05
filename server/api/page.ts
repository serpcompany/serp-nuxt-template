import type { Page } from '~/utils/page';
import { z } from 'zod';
import { getValidatedQuery, createError } from 'h3';
import { eq, and } from 'drizzle-orm';
import { page } from '../database/schema';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const querySchema = z.object({
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

export default defineCachedEventHandler(
  async (event): Promise<Page> => {
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

    const result = await db
      .select({
        page: {
          id: page.id,
          slug: page.slug,
          title: page.title,
          description: page.description,
          image: page.image,
          content: page.content,
          createdAt: page.createdAt,
          updatedAt: page.updatedAt,
          seoTitle: page.seoTitle,
          seoDescription: page.seoDescription,
          seoImage: page.seoImage,
        },
      })
      .from(page)
      .where(and(eq(page.slug, query.data.slug), eq(page.draft, false)))
      .limit(1);

    const foundPage = result[0]?.page;

    if (!foundPage) {
      throw createError({
        statusCode: 404,
        message: 'Page not found',
      });
    }

    const renderedHtml = md.render(foundPage.content);
    const sanitizedHtml = sanitizeHtml(renderedHtml, sanitizeOptions);

    return {
      ...foundPage,
      content: sanitizedHtml,
    };
  },
  { maxAge: Number(process.env.CACHE_TTL || 3600) },
);
