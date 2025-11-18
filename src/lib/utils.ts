import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOrigin = (pathname: string) => {
const locale = pathname.split('/')[1]; 
const cleanPath = pathname.replace(`/${locale}`, '') || '/';
return cleanPath
}