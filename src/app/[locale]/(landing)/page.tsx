'use client';
import HeroSection from "./components/HeroSection";
import TopBestSellingProductSection from "./components/TopBestSellingProductSection";
import SlideShowProductSection from "./components/SlideShowProductSection";

export default function Home() {
  return (
    <section className='relative flex flex-col xl:gap-20 gap-10'>
      <HeroSection />
      <TopBestSellingProductSection />
      <SlideShowProductSection />
    </section>
  )
}
