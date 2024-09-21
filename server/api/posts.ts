// server/api/posts.ts
import type { PostPreview, Module } from '~/utils/post';
import { z } from 'zod';
import { getValidatedQuery } from 'h3';
import { eq, desc, and } from 'drizzle-orm';
import { module, post } from '~/server/database/schema';

export type Response = (Module & {
  posts: PostPreview[];
})[];

// Get the post limit and module from query parameters
const querySchema = z.object({
  module: z.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export default defineCachedEventHandler(
  async (event): Promise<Response> => {
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

    const limit = query.data.limit || 50;
    const moduleSlug = query.data.module;

    // Fetch modules based on the query
    let modules;
    if (moduleSlug) {
      modules = await db
        .select()
        .from(module)
        .where(eq(module.slug, moduleSlug));
    } else {
      modules = await db.select().from(module);
    }

    if (!modules.length) {
      throw createError({
        statusCode: 404,
        message: 'Module not found',
      });
    }

    // Fetch posts for each module
    const postsPerModule = await Promise.all(
      modules.map(async (module) => {
        const posts = await db
          .select({
            id: post.id,
            title: post.title,
            slug: post.slug,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          })
          .from(post)
          .where(
            and(eq(post.moduleId, module.id), eq(post.status, 'published')),
          )
          .orderBy(desc(post.createdAt))
          .limit(limit);

        return {
          id: module.id,
          name: module.name,
          slug: module.slug,
          posts,
        };
      }),
    );

    return postsPerModule;
  },
  { maxAge: Number(process.env.CACHE_TTL || 3600) },
);
