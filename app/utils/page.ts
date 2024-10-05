import { z } from 'zod';

const pagePreviewSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  image: z.string().nullish(),
  seoTitle: z.string().nullish(),
  seoDescription: z.string().nullish(),
  seoImage: z.string().nullish(),
});

export type PagePreview = z.infer<typeof pagePreviewSchema>;

export interface Page extends PagePreview {
  content: string;
}

export function isPagePreview(obj: unknown): obj is PagePreview {
  const { data } = pagePreviewSchema.safeParse(obj);
  return Boolean(data);
}

export function toPagePreview(obj: unknown): PagePreview {
  return pagePreviewSchema.parse(obj);
}
