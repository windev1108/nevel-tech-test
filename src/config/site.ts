import { env } from "./env";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  appUrl: env.NEXT_PUBLIC_APP_URL,
  name: 'Xiaomi App',
  metaTitle: 'Xiaomi app meta title',
  description:
    'Xiaomi app description',
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
};
