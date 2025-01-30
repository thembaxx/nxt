import { Feature } from "@/components/acme/feature";
import { Footer } from "@/components/acme/footer";
import SearchInput from "@/components/acme/search-input";
import { TestimonialsSectionDemo } from "@/components/acme/testimonials";
import { Separator } from "@/components/ui/separator";

function Acme() {
  return (
    <div className="py-4 space-y-6 overflow-y-auto h-full">
      <div className="flex px-8 flex-col items-center gap-4 sm:gap-8">
        <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
          Trusted by developers worldwide
        </h2>
        <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
          Join thousands of developers who are already building the future with
          our AI platform
        </p>
      </div>
      <div className="px-4">
        <SearchInput />
      </div>
      <div>
        <TestimonialsSectionDemo />
      </div>
      <div className="w-full px-6">
        <Feature />
      </div>
      <Separator />
      <footer className="px-4">
        <Footer />
      </footer>
    </div>
  );
}

export default Acme;
