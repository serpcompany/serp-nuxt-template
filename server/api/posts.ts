// server/api/posts.ts
import { defineEventHandler, getQuery } from 'h3';
import { eq, desc, and } from 'drizzle-orm';
import cache from '~/middleware/cache';
import { module, post } from '~/server/database/schema';

export default defineEventHandler(async (event) => {
    return cache(event, async () => {
        // Get the limit and module from query parameters
        const query = getQuery(event);
        const limit = query.limit ? parseInt(query.limit as string, 10) : 50;
        const moduleSlug = query.module as string | undefined;

        // Ensure limit is a positive number
        const safeLimit = Math.max(1, limit);

        // Fetch modules based on the query
        let modules;
        if (moduleSlug) {
            modules = await db.select().from(module).where(eq(module.slug, moduleSlug));
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
                    .where(and(eq(post.moduleId, module.id), eq(post.status, 'published')))
                    .orderBy(desc(post.createdAt))
                    .limit(safeLimit);

                return {
                    id: module.id,
                    name: module.name,
                    slug: module.slug,
                    posts,
                };
            })
        );

        return postsPerModule;
    });
});