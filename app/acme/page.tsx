import SearchInput from "@/components/acme/search-input";
import Image from "next/image";

function Acme() {
  return (
    <div className="px-6 py-4 space-y-6">
      <h1 className="font-bold text-neutral-300 text-xl text-pretty">
        Build your dream
      </h1>
      <SearchInput />
      <div className="relative rounded-2xl overflow-hidden aspect-video">
        <Image
          src="https://plus.unsplash.com/premium_photo-1663050708458-e660c156fb64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFib3VyJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D"
          alt=""
          height={192}
          width={192}
          className="w-full"
          style={{ objectFit: "fill" }}
        />
      </div>
    </div>
  );
}

export default Acme;
