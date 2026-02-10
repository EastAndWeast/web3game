import { LevelClient } from '@/components/routes/LevelClient';
import { initialLevels } from '@/constants/mapData';

export function generateStaticParams() {
    const locales = ['en', 'zh'];
    const levels = initialLevels.map(level => level.id);

    // Generate all combinations of locale and level id
    return locales.flatMap(locale =>
        levels.map(id => ({ locale, id }))
    );
}

export default async function LevelPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <LevelClient id={id} />;
}
