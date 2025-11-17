'use client';

import { motion, useMotionValueEvent, useScroll, type Easing } from 'motion/react';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDisclosure } from '@/hooks';
import { useIsMd } from '@/hooks/useMediaQuery';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';
import NavMenu from './NavMenu';
import { Icons } from '@/assets/icons';
import { Button } from '../ui/button';
import MenuDrawer from '../dialogs/MenuDrawer';
import LanguageSelector from '../common/LanguageSelector';
import { useTranslations } from 'next-intl';

const customEase: Easing = [0.76, 0, 0.24, 1];

const Header = () => {
  const isMd = useIsMd();
  const [visibleHeader, setVisibleHeader] = useState(true);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [visibleMenu, { close: closeMenu, toggle: toggleMenu }] = useDisclosure(false);
  const { scrollY } = useScroll();
  const lastScroll = useRef(scrollY.get());
  const t = useTranslations()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScroll.current;

    if (Math.abs(latest - prev) < 10) return;

    setIsScrollDown(latest > 100);

    if (isMd) {
      const scrollingDown = latest > prev;

      // Hide
      if (scrollingDown && latest > 100 && visibleHeader) {
        setVisibleHeader(false);
        if (visibleMenu) closeMenu();
      }

      // Show
      if (!scrollingDown && !visibleHeader) {
        setVisibleHeader(true);
      }
    } else {
      // Mobile: header always display
      if (!visibleHeader) setVisibleHeader(true);
    }

    lastScroll.current = latest;
  });

  useLayoutEffect(() => {
    document.body.style.overflow = visibleMenu ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [visibleMenu]);

  return (
    <motion.header
      animate={visibleHeader ? "visible" : "hidden"}
      initial="visible"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-140%" }
      }}
      transition={{ duration: 0.5, ease: customEase }}
      className={cn("fixed z-50 w-full", {
        "top-0": !isScrollDown,
        "xl:top-2 top-0": isScrollDown
      })}
      style={{ willChange: "transform" }}
    >
      <div
        className={cn(
          "relative mx-auto container flex items-center justify-between xl:h-20 h-16 w-full xl:rounded-full shadow-md transition-colors duration-300",
          {
            "bg-background": isScrollDown || visibleMenu,
            "shadow-none!": visibleMenu
          }
        )}
      >
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            {!isMd && <MenuDrawer opened={visibleMenu} toggle={toggleMenu} />}

            <Link href={ROUTES.HOME} onClick={() => visibleMenu && closeMenu()}>
              <Icons.logo className="xl:block hidden" />
              <Icons.logoMb className="xl:hidden block" />
            </Link>
          </div>

          <div className="relative hidden h-full flex-1 items-center justify-center gap-8 lg:flex">
            <NavMenu visibleHeader={visibleHeader} />
          </div>
        </div>

        <div className="flex items-center xl:gap-4 gap-2">
          <Button className="xl:min-w-[146px] min-w-[113px]">{t('sign_up')}</Button>
          <Button variant="outline" className="xl:min-w-[146px] min-w-[113px]">{t('login')}</Button>
          <LanguageSelector />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
