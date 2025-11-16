import RankingBoard, { RankingItem } from "@/components/common/RankingBoard";

// Demo data
const MOCK_DATA: RankingItem[] = [
    { product: 'XIAOMI MAX 24', quantity: 1424042, price: 7090099 },
    { product: 'XIAOMI MAX 24', quantity: 1424042, price: 7090099 },
    { product: 'XIAOMI MAX 24', quantity: 1424042, price: 7090099 },
    { product: 'XIAOMI MAX 24', quantity: 1424042, price: 7090099 },
    { product: 'XIAOMI MAX 24', quantity: 1424042, price: 7090099 },
];

const TopBestSellingProductSection = () => {
    return (
        <section className="relative container mx-auto">
            <div
                className="bg-linear-to-r from-neutral-accent via-primary/10 to-neutral-accent text-center">
                <span className="xl:text-2xl text-lg leading-12 italic font-extrabold uppercase text-primary">TOP BEST-SELLING PRODUCTS</span>
            </div>
            <RankingBoard data={MOCK_DATA} />
        </section>
    )
}

export default TopBestSellingProductSection