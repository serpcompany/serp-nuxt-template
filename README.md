# README

This is our Nuxt boilerplate project for websites.

**Technologies:**

- Nuxt + NuxtUI
- Nuxt Content
- Postgres + Drizzle ORM
- Zod
- Redis
- Docker

## Database

This project uses a self-hosted postgres database on SERP server.

You can interact with the database in a GUI using [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview#:~:text=Launch%20Drizzle%20Studio).

```zsh
pnpm drizzle-kit studio
```

## Markdown Content Pages

Markdown files in `content/_pages` can be used to create pages at arbitrary
urls. They use the [default Nuxt Content
frontmatter](https://content.nuxt.com/composables/use-content-head#parameters),
in addition to the following fields:

- `slug`\* - the absolute path of the page; it should omit leading and trailing
  slashes
- `created_at`\* - used for sorting pages on the home page, required
- `updated_at` - not currently used anywhere, defaults to `created_at`
- `breadcrumbs` - overrides passed directly to [Nuxt SEO's
  `useBreadcrumbItems()`](https://nuxtseo.com/nuxt-seo/api/breadcrumbs)

## Legal Pages

Markdown files in `content/legal` are used to generate the legal pages, as well
as the footer links to them. They can also take default Nuxt Content
frontmatter in addition to the following optional fields:

- `slug` - the absolute path of the page; otherwise the file path is used
- `last_updated` - a date string

They can also use any variables from the site config (defined in
`nuxt.config.ts`) as well as `emailMasked` strings that correspond to the email
fields provided. They can also reference the hostname of `site.url` at
`site.hostname`.
