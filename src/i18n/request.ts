import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import { hasLocale } from 'next-intl';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
    const messages = (await import(`../../locales/${locale}/home.json`)).default;

  return {
    locale,
    messages
  };
});

