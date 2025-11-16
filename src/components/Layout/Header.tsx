// components/layout/Header.tsx
'use client';

import { motion, useMotionValueEvent, useScroll, type Easing } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDisclosure } from '@/hooks';
import { useIsMd } from '@/hooks/useMediaQuery';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';
import NavMenu from './NavMenu';
import { Icons } from '@/assets/icons';
import { Button } from '../ui/button';
import MenuDrawer from '../dialogs/MenuDrawer';

const customEase: Easing = [0.76, 0, 0.24, 1];

const Header = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const isMd = useIsMd();
  const [visibleMenu, { close: closeMenu, toggle: toggleMenu }] = useDisclosure(false);
  const [visibleHeader, { close: closeHeader, open: openHeader }] = useDisclosure(true);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(scrollY.get());

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;

    if (Math.abs(latest - previous) < 5) return;

    setIsScrollDown(latest > 100);

    if (isMd) {
      if (latest > previous && visibleHeader) {
        closeHeader();
        if (visibleMenu) closeMenu();
      } else if (latest < previous && !visibleHeader) {
        openHeader();
      }
    } else {
      if (!visibleHeader) openHeader();
    }

    lastScrollY.current = latest;
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (visibleMenu) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, [visibleMenu]);

  return (
    <motion.header
      animate={visibleHeader ? 'visible' : 'hidden'}
      initial='visible'
      variants={{ visible: { y: 0 }, hidden: { y: '-140%' } }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className={cn('fixed top-0 z-50 w-full transition-all duration-500', {
        'top-0': !isScrollDown,
        'xl:top-2 top-0': isScrollDown,
      })}
    >
      <motion.div
        layout
        className={cn(
          'relative mx-auto container flex items-center justify-between xl:h-20 h-16 w-full xl:rounded-full shadow-md',
          {
            'bg-background': isScrollDown || visibleMenu,
            'shadow-none!': visibleMenu,
          }
        )}
        transition={{ duration: 0.6, ease: customEase }}
      >
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            {/* Mobile nav */}
            {!isMd &&
              <MenuDrawer opened={visibleMenu} toggle={toggleMenu} />
            }

            {/* Logo */}
            <Link href={ROUTES.HOME} onClick={() => visibleMenu && closeMenu()}>
              <Icons.logo className='xl:block hidden' />
              <Icons.logoMb className='xl:hidden block' />
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <motion.div
            layout
            initial={false}
            transition={{ duration: 0.6, ease: customEase }}
            className={cn('relative hidden h-full flex-1 items-center justify-center gap-8 lg:flex')}
          >
            <NavMenu visibleHeader={visibleHeader} />
          </motion.div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center xl:gap-4 gap-2">
          <Button className='xl:min-w-[146px] min-w-[113px]'>
            SIGN UP
          </Button>
          <Button variant="outline" className='xl:min-w-[146px] min-w-[113px]'>
            LOG IN
          </Button>

          {/* Language Selector */}
          <button className="xl:block hidden text-white text-sm font-medium ml-2 hover:text-primary-300 transition-colors">
            ENG ▼
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;