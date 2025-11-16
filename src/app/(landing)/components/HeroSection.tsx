'use client';
import HeroDialog from '@/components/dialogs/HeroDialog';
import { useDisclosure } from '@/hooks';
import { IMAGES } from '@/lib/constants';
import Image from 'next/image'

const HeroSection = () => {
    const [opened, { open }] = useDisclosure()


    return (
        <div className="relative w-full xl:aspect-1600/642 aspect-390/339">
            <div className='absolute inset-0 top-11  flex flex-col items-center z-20'>
                <span className='xl:text-5xl font-bold bg-linear-to-r from-white via-[#FFD3E3] to-[#FFEA9F] bg-clip-text text-transparent'>XIAOMI TV max Series</span>
                <HeroDialog>
                    <span className='xl:text-[32px] cursor-pointer hover:text-secondary-300 hover:scale-95 transition-all duration-300'>View to the max</span>
                </HeroDialog>

            </div>
            <picture className='z-10'>
                <source
                    media="(min-width: 1280px)"
                    srcSet={IMAGES.HERO}
                />
                <source
                    media="(max-width: 1279px)"
                    srcSet={IMAGES.HERO_MB}
                />
                <Image
                    alt='hero banner'
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 1280px) 390px, 1600px"
                    src="/images/hero.png"
                    className="object-cover"
                />
            </picture>
        </div>
    )
}

export default HeroSection