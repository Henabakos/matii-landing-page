import Services from "@/components/sections/Services";
import SolutionsWeBuilt from "@/components/sections/SolutionsWeBuilt";
import PageHeader from "@/components/common/PageHeader";

export default function ServicesPage() {
  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-345 mx-auto space-y-16">
        <PageHeader
          tag="CAPABILITIES & SYSTEMS"
          title={
            <>
              Turning Automation
              <br />
              Into Real Growth.
            </>
          }
          description="We help ambitious companies turn automation into practical systems that scale operations, improve execution, and drive measurable growth."
        />
        <Services />
        <SolutionsWeBuilt />
      </div>
    </div>
  );
}
