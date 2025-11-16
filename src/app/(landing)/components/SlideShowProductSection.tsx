import React from 'react';
import CarouselWithControls from '@/components/common/CarouselWithControls';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface ProductImage {
    id: number;
    src: string;
    alt: string;
}

const SlideShowProductSections: React.FC = () => {
    const isMb = useIsMobile()
    const topProducts: ProductImage[] = [
        { id: 1, src: '/images/top-products/1.png', alt: 'Product 1' },
        { id: 2, src: '/images/top-products/2.png', alt: 'Product 2' },
        { id: 3, src: '/images/top-products/3.png', alt: 'Product 3' },
        { id: 4, src: '/images/top-products/4.png', alt: 'Product 4' },
        { id: 5, src: '/images/top-products/5.png', alt: 'Product 5' },
        { id: 6, src: '/images/top-products/6.png', alt: 'Product 6' },
        { id: 7, src: '/images/black-friday.png', alt: 'Product 7' },
        { id: 8, src: '/images/new-products.png', alt: 'Product 8' },
        { id: 9, src: '/images/sales.png', alt: 'Product 9' },
    ];

    const blackFridayImages: ProductImage[] = [
        { id: 1, src: '/images/black-friday.png', alt: 'Black Friday 1' },
        { id: 2, src: '/images/black-friday.png', alt: 'Black Friday 2' },
        { id: 3, src: '/images/black-friday.png', alt: 'Black Friday 3' },
    ];

    return (
        <section className="container mx-auto relative w-full">
            {/* Top Products Section */}
            <CarouselWithControls
                itemsToShow={isMb ? 3 : 6}
                gap={isMb ? 8 : 16}
                title="Top Products"
                items={topProducts}
                titleClassName="xl:text-2xl text-lg italic"
                className="xl:mb-20 mb-10"
                renderItem={(product) => (
                    <div
                        key={product.id}
                        className='overflow-hidden rounded-lg xl:h-[245px] h-[140px] w-full cursor-pointer'
                    >
                        <img

                            src={product.src}
                            alt={product.alt}
                            className="relative h-full w-full object-fill hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
            />
            {/* Bottom Three Sections */}
            <div className="grid grid-cols-4 xl:gap-6 gap-4">
                {/* Black Friday */}
                <CarouselWithControls
                    itemsToShow={1}
                    title="Black Friday"
                    items={blackFridayImages}
                    titleClassName="xl:text-2xl text-lg italic"
                    className="lg:col-span-2 col-span-4 xl:mb-0 mb-6"
                    renderItem={(image) => (
                        <div key={image.id} className="relative xl:h-60 h-[171px] rounded-lg overflow-hidden cursor-pointer">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full xl:object-fill object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    )}
                />

                {/* New Products */}
                <div className="relative lg:col-span-1 col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="xl:text-2xl text-lg italic font-bold text-primary uppercase">
                            New Products
                        </h2>
                    </div>
                    <div className="relative xl:h-60  h-[165px] xl:aspect-auto aspect-square  rounded-lg overflow-hidden cursor-pointer">
                        <img
                            src="/images/new-products.png"
                            alt="New Products"
                            className="w-full h-full object-fill hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Sales */}
                <div className="relative lg:col-span-1 col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="xl:text-2xl text-lg italic font-bold text-primary uppercase">
                            Sales
                        </h2>
                    </div>
                    <div className="relative xl:h-60 h-[165px] xl:aspect-auto aspect-square rounded-lg overflow-hidden cursor-pointer">
                        <img
                            src="/images/sales.png"
                            alt="Sales"
                            className="w-full h-full object-fill hover:scale-105 transition-transform duration-300 "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SlideShowProductSections;