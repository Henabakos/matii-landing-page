import ContentEmptyState from "@/components/common/ContentEmptyState";
import { getPublishedPillar } from "@/lib/services/pillar.service";
import ServicesTag from "./services/ServicesTag";
import ServiceCard from "./services/ServiceCard";
import { getLocale } from "next-intl/server";

export async function Services() {
  const locale = await getLocale();
  const published = await Promise.all((["enterprise", "bpo", "ai", "cloud"] as const).map(async (id, index) => {
    const content = await getPublishedPillar(id, locale);
    return content ? [{ ...content.listing, index: String(index + 1).padStart(2, "0"), href: "/services/" + id }] : [];
  }));
  const services = published.flat();
  if (!services.length) return <ContentEmptyState kind="services" />;
  return (
    <section aria-label="Our services" className="service-listing w-full py-12 md:py-16">
      <div className="mb-10 flex flex-col items-center text-center md:mb-12">
        <ServicesTag />
        <h2 className="mt-6 text-balance font-urbanist text-3xl font-medium uppercase leading-[1.2] tracking-tight sm:text-4xl md:text-5xl">Ideas don&apos;t stay still.</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map(service => <ServiceCard key={service.index} {...service} />)}
      </div>
    </section>
  );
}

export default Services;
