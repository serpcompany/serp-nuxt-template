import { pgTable, serial, varchar, text, timestamp, integer, primaryKey } from 'drizzle-orm/pg-core';

export const module = pgTable('module', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
});

export const post = pgTable('post', {
    id: serial('id').primaryKey(),
    moduleId: integer('module_id').notNull().references(() => module.id),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
});

export const tag = pgTable('tag', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
});

export const postTagMap = pgTable('post_tag_map', {
    postId: integer('post_id').notNull().references(() => post.id),
    tagId: integer('tag_id').notNull().references(() => tag.id),
}, (table) => ({
    pk: primaryKey(table.postId, table.tagId),
}));
