'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
    const t = useTranslations('Home');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            // Replace the locale in the pathname
            // Assuming pathname format is /[locale]/...
            const segments = pathname.split('/');
            segments[1] = nextLocale;
            const newPath = segments.join('/');
            router.replace(newPath);
        });
    };

    return (
        <div className="relative group z-50">
            <select
                defaultValue={locale}
                onChange={onSelectChange}
                disabled={isPending}
                className="appearance-none bg-[#050510]/80 border border-[#00F0FF]/30 text-[#00F0FF] rounded-lg px-3 py-1 text-sm font-mono cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
            >
                <option value="en">EN</option>
                <option value="zh">中文</option>
            </select>
        </div>
    );
}
