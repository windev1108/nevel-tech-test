import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
// export default getRequestConfig(async ({requestLocale}) => {
//   const requested = await requestLocale;
//   const locale = hasLocale(routing.locales, requested)
//     ? requested
//     : routing.defaultLocale;
//     const messages = (await import(`../../locales/${locale}/home.json`)).default;

//   return {
//     locale,
//     messages
//   };
// });

export default getRequestConfig(async () => {
    const locale = routing.defaultLocale // force default locale
    const messages = (await import(`../../locales/${locale}/home.json`)).default;
  return {
    locale,
    messages
  };
});
