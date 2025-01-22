import Channels from "@/components/channels/channels";
import Head from "next/head";

function ChannelsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Head>
        <title>RNXT—Chat</title>
      </Head>
      <div className="px-6 flex-grow pb-6">
        <Channels />
      </div>
    </div>
  );
}

export default ChannelsPage;
