'use client';

import { Icon, Icons } from '@/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';


interface INavItem {
  title: string
  items: { label?: string, href?: string, img?: string }[]
}

const NAV_FOOTER: INavItem[] = [
  {
    title: 'About us',
    items: [
      {
        label: 'Company Details',
        href: '/'
      },
      {
        label: 'Terms & Conditions',
        href: '/'
      },
      {
        label: 'Privacy Policy',
        href: '/'
      },
      {
        label: 'Affiliate',
        href: '/'
      }
    ]
  },
  {
    title: 'Help',
    items: [
      {
        label: 'F.A.Q (Frequently Asked Questions)',
        href: '/'
      },
      {
        label: 'AML/KYC Policy',
        href: '/'
      },
      {
        label: 'Refund Policy',
        href: '/'
      },
      {
        label: 'Dispute Resolution',
        href: '/'
      }
    ]
  },
  {
    title: 'Our Products',
    items: [
      {
        label: 'Product',
        href: '/'
      },
      {
        label: 'Contact',
        href: '/'
      },
      {
        label: 'Price',
        href: '/'
      },
      {
        label: 'Sales',
        href: '/'
      }
    ]
  },
  {
    title: 'Contact Us',
    items: [
      {
        label: 'support@xiaomi.email',
      },
      {
        label: 'affiliate@xiaomi.com',
      },
      {
        img: '/images/install-app.png',
      },

    ]
  }
]

const BRAND_LOGOS: Icon[] = [
  Icons.visa,
  Icons.mastercard,
  Icons.astropay,
  Icons.interactLogo,
  Icons.jetonbankLogo
]

const Footer = () => {

  return (
    <footer className='border-t border-secondary-600'>
      <div className='relative container mx-auto py-10 flex flex-col xl:gap-10 gap-5'>
        <div className="grid xl:grid-cols-4 grid-cols-2 xl:gap-10 gap-6">
          {NAV_FOOTER.map((item) => (
            <div key={item.title} className='flex flex-col gap-3'>
              <h1 className='italic font-extrabold uppercase xl:text-base text-sm'>{item.title}</h1>
              <div className="flex flex-col gap-2">
                {item.items.map((x) => (
                  <Fragment key={x.label || x.img}>
                    {x.img ?
                      <Link href={x.href ?? '/'}>
                        <Image alt={'img'} width={151.4} height={44} src={x.img} className='object-cover mt-6' />
                      </Link>

                      :
                      <Link href={x.href ?? '/'}>
                        <span className='xl:text-sm text-xs text-neutral-200 hover:underline'>{x.label}</span>
                      </Link>
                    }
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5 flex-wrap xl:justify-start justify-center ">
          <div className="flex items-center gap-5">
            <Icons.eighteenPlus />
            <Icons.ssl />
          </div>
          <span className='xl:text-sm text-xs text-neutral-200 xl:text-start text-center'>For designated models of Xiaomi smartphone, you can enjoy the warranty services for your device at designated Xiaomi.</span>
        </div>

        <span className='xl:text-sm text-xs text-neutral-200 xl:text-start text-center'>Customers should provide a valid purchase proof and warranty card. After inspected by the Xiaomi authorizedservice center and confirmed that the smartphone meets the warranty conditions, you can enjoy the in-warranty service for free².Warranty determination rules are subjected to the local service center.</span>

        <div className='py-4 rounded-xl text-center bg-secondary-800 xl:text-sm text-xs'>
          © Copyright 2025. All Rights Reserved
        </div>

        <div className="flex items-center justify-center xl:gap-6 gap-4 flex-wrap">
          {BRAND_LOGOS.map((Icon, index) => (
            <Icon key={index} className='hover:scale-110 transition-all duration-300' />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
