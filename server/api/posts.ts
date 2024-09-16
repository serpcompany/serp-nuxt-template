// server/api/posts.ts
import type { ModuleResponse } from '.';
import { z } from 'zod';
import { defineEventHandler, getValidatedQuery } from 'h3';
import { eq, desc, and } from 'drizzle-orm';
import cache from '~/middleware/cache';
import { module, post } from '~/server/database/schema';

// Get the post limit and module from query parameters
const querySchema = z.object({
  module: z.string(),
  limit: z.number().int().positive().optional(),
});

export default defineEventHandler(async (event): Promise<ModuleResponse> => {
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

    // Fetch posts for each module
    const postsPerModule = await Promise.all(
      modules.map(async (module) => {
        const posts = await db
          .select({
            id: post.id,
            title: post.title,
            slug: post.slug,
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
  });
});
