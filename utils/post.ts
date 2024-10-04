import type { ParsedContent } from '@nuxt/content';
import { z } from 'zod';

const postPreviewSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type PostPreview = z.infer<typeof postPreviewSchema>;

export interface Post extends PostPreview {
  content: string;
}

export interface Module {
  id: number;
  name: string;
  slug: string;
}

let contentId = -1;

export function getPostPreviewFromContent(content: ParsedContent): PostPreview {
  return postPreviewSchema.parse({
    id: contentId--,
    title: content.title,
    slug: content.slug,
    excerpt: content.description,
    createdAt: content.created_at,
    updatedAt: content.updated_at || content.created_at,
  });
}
