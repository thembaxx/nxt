import Channels from "@/components/channels/channels";
import UseLayoutEffectParent from "@/components/channels/test";
import Head from "next/head";

function ChannelsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Head>
        <title>RNXT—Chat</title>
      </Head>
      <div className="px-6 grow pb-6 flex justify-center">
        <div className="md:max-w-lg w-full">
          <UseLayoutEffectParent>
            <Channels />
          </UseLayoutEffectParent>
        </div>
      </div>
    </div>
  );
}

export default ChannelsPage;
