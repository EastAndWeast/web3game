import { HomeClient } from '@/components/routes/HomeClient';

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default function Home() {
  return <HomeClient />;
}
