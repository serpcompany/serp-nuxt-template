import type { PagePreview } from '~/utils/page';
import { z } from 'zod';
import { getValidatedQuery } from 'h3';
import { eq, desc, and } from 'drizzle-orm';
import { page } from '~/server/database/schema';

// Get the post limit and module from query parameters
const querySchema = z.object({
  limit: z.coerce.number().int().positive().optional(),
});

export default defineCachedEventHandler(
  async (event): Promise<PagePreview[]> => {
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

    const pages = await db
      .select({
        id: page.id,
        slug: page.slug,
        title: page.title,
        description: page.description,
        image: page.image,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
      })
      .from(page)
      .where(and(eq(page.draft, false)))
      .orderBy(desc(page.createdAt))
      .limit(limit);

    return pages;
  },
  { maxAge: Number(process.env.CACHE_TTL || 3600) },
);
