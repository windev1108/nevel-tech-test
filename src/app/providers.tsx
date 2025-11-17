import MainLayout from '@/components/Layout/MainLayout'
import Preloader from '@/components/motion/preload'
import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl';

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <NextIntlClientProvider>
            <Preloader>
                <MainLayout>
                    {children}
                </MainLayout>
            </Preloader>
        </NextIntlClientProvider>
    )
}

export default Providers