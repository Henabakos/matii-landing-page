
import Image from "next/image";
import type { PillarData } from "@/data/pillars-data";

const illustrations = {
  enterprise: {
    title: "Connected business systems",
    src: "/illustrations/services/amico.svg",
    alt: "Illustration of connected enterprise business systems",
  },
  bpo: {
    title: "A coordinated service workflow",
    src: "/illustrations/services/pana.svg",
    alt: "Illustration of a coordinated business process outsourcing workflow",
  },
  ai: {
    title: "One connected data & AI platform",
    src: "/illustrations/services/ai.svg",
    alt: "Illustration of an integrated data and AI platform",
  },
  cloud: {
    title: "Infrastructure with continuity",
    src: "/illustrations/services/bro.svg",
    alt: "Illustration of cloud infrastructure and recovery systems",
  },
} satisfies Record<
  PillarData["id"],
  {
    title: string;
    src: string;
    alt: string;
  }
>;

/**
 * Static conceptual illustrations.
 * Not live dashboards or performance claims.
 */
export default function ServiceIllustration({
  service,
}: {
  service: PillarData["id"];
}) {
  const illustration = illustrations[service];

  return (
    <figure className="service-illustration min-w-0  bg-background p-4 sm:p-6">
     
      <div className="relative w-full overflow-hidden">
        <Image
          src={illustration.src}
          alt={illustration.alt}
          width={800}
          height={600}
          className="h-auto w-full object-contain dark:hidden"
          sizes="(max-width: 640px) 100vw, 800px"
        />
        <Image
          src={illustration.src.replace(".svg", "-dark.svg")}
          alt={illustration.alt}
          width={800}
          height={600}
          className="hidden h-auto w-full object-contain dark:block"
          sizes="(max-width: 640px) 100vw, 800px"
        />
      </div>
    </figure>
  );
}
