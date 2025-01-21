import Channels from "@/components/channels/channels";

function ChannelsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="px-6 py-4 space-y-2">
        <h1 className="text-xl font-semibold text-neutral-100">Channels</h1>
        <p className="text-sm text-neutral-400 text-pretty">
          The definitive realtime experience platform.
        </p>
      </header>
      <div className="px-6 flex-grow pb-6">
        <Channels />
      </div>
    </div>
  );
}

export default ChannelsPage;
