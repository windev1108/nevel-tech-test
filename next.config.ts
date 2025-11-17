import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const webpack = (config: any) => {
  const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));
  config.module.rules.push(
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/, 
    },
    {
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, 
      use: ['@svgr/webpack'],
    }
  );
  fileLoaderRule.exclude = /\.svg$/i;
  return config;
};

const nextConfig: NextConfig = {
  reactStrictMode: false,
    turbopack: {
      // For development
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    images: {},
    webpack,
};

export default withNextIntl(nextConfig);
