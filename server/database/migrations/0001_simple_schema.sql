DROP TABLE "module";--> statement-breakpoint
DROP TABLE "post_tag_map";--> statement-breakpoint
DROP TABLE "tag";--> statement-breakpoint
ALTER TABLE "post" RENAME TO "page";--> statement-breakpoint
ALTER TABLE "page" RENAME COLUMN "status" TO "draft";--> statement-breakpoint
ALTER TABLE "page" DROP CONSTRAINT "post_slug_unique";--> statement-breakpoint
ALTER TABLE "page" DROP CONSTRAINT "post_module_id_module_id_fk";
--> statement-breakpoint
ALTER TABLE "page" ALTER COLUMN "draft" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "page" ALTER COLUMN "draft" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "image" varchar(255);--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "seo_title" varchar(255);--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "seo_description" text;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "seo_image" text;--> statement-breakpoint
ALTER TABLE "page" DROP COLUMN IF EXISTS "module_id";--> statement-breakpoint
ALTER TABLE "page" ADD CONSTRAINT "page_slug_unique" UNIQUE("slug");