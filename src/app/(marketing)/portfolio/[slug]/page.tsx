type PortfolioDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">Marketing</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">Portfolio: {slug}</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        This dynamic page renders the slug content for Portfolio.
      </p>
    </section>
  );
}
