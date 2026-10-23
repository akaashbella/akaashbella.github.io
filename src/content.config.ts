import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(), summary: z.string(), category: z.string(), period: z.string(),
    status: z.string(), role: z.string(), technologies: z.array(z.string()),
    repository: z.url().optional(), live: z.url().optional(),
    priority: z.number(), figure: z.enum(['research', 'search', 'agbiz', 'mauka', 'spotify', 'fittrack']),
    verified: z.string(), sources: z.array(z.object({ label: z.string(), url: z.url() })),
  }),
});
export const collections = { projects };
