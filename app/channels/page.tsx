import Channels from "@/components/channels/channels";

function ChannelsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="px-6 pb-4 space-y-2">
        <h1 className="text-sm font-semibold text-neutral-100">Channels</h1>
      </header>
      <div className="px-6 flex-grow pb-6">
        <Channels />
      </div>
    </div>
  );
}

export default ChannelsPage;
