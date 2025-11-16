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
import LanguageSelector from '../common/LanguageSelector';

const customEase: Easing = [0.76, 0, 0.24, 1];

const Header = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const isMd = useIsMd();
  const [visibleMenu, { close: closeMenu, toggle: toggleMenu }] = useDisclosure(false);
  const [visibleHeader, setVisibleHeader] = useState(true);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(scrollY.get()); // Initialize with current scroll value
  const isAnimating = useRef(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = lastScrollY.current;

    // Ignore small scroll changes
    if (Math.abs(latest - previous) < 10) return; // Increase threshold

    // Update scroll direction indicator
    setIsScrollDown(latest > 100);

    if (isMd) {
      const scrollingDown = latest > previous;
      const scrollingUp = latest < previous;

      // Only animate when state actually needs to change
      if (scrollingDown && latest > 100 && visibleHeader && !isAnimating.current) {
        isAnimating.current = true;
        setVisibleHeader(false);
        if (visibleMenu) closeMenu();

        setTimeout(() => {
          isAnimating.current = false;
        }, 700); // Slightly longer than animation duration
      }
      else if (scrollingUp && !visibleHeader && !isAnimating.current) {
        isAnimating.current = true;
        setVisibleHeader(true);

        setTimeout(() => {
          isAnimating.current = false;
        }, 700);
      }
    } else {
      // Mobile - always show header
      if (!visibleHeader) {
        setVisibleHeader(true);
      }
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
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' }
      }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className={cn('fixed z-50 w-full', {
        'top-0': !isScrollDown,
        'xl:top-2 top-0': isScrollDown,
      })}
      style={{ willChange: 'transform' }} // Optimize performance
    >
      <div
        className={cn(
          'relative mx-auto container flex items-center justify-between xl:h-20 h-16 w-full xl:rounded-full shadow-md transition-colors duration-300',
          {
            'bg-background': isScrollDown || visibleMenu,
            'shadow-none!': visibleMenu,
          }
        )}
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
          <div
            className={cn('relative hidden h-full flex-1 items-center justify-center gap-8 lg:flex')}
          >
            <NavMenu visibleHeader={visibleHeader} />
          </div>
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
          <LanguageSelector />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;