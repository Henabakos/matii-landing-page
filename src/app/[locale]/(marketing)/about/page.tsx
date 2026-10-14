import PageStructuredData from "@/components/common/PageStructuredData";
import { staticPageMetadata, type LocalePageProps } from "@/lib/seo-pages";
import AboutPage from "@/components/pages/AboutPage";


export default async function Page({ params }: LocalePageProps) {
  return <><PageStructuredData path="/about" locale={(await params).locale} /><AboutPage /></>;
}

export function generateMetadata(props: LocalePageProps) {
  return staticPageMetadata("/about", props);
}
