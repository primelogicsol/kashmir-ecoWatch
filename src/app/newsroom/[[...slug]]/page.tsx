import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function NewsroomRootAliasPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const suffix =
    Array.isArray(slug) && slug.length > 0
      ? `/${slug.map(encodeURIComponent).join('/')}`
      : '';
  redirect(`/himalayan-dispatch/newsroom${suffix}`);
}
