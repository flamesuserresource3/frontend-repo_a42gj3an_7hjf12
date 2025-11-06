import { Mic, Plus, Search } from "lucide-react";

export default function Header({ onNewRoom }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">S</div>
          <div className="leading-tight">
            <h1 className="text-lg font-semibold">Sor</h1>
            <p className="text-[11px] text-neutral-500 -mt-0.5">Voice rooms & chats</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onNewRoom}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black active:opacity-90"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">New</span>
          </button>
        </div>
      </div>
      <div className="max-w-md mx-auto px-4 pb-2">
        <div className="flex items-center gap-2 text-[12px] text-neutral-600 dark:text-neutral-400">
          <Mic className="h-3.5 w-3.5" />
          <span>Tap a room to join — live rooms show a green dot</span>
        </div>
      </div>
    </header>
  );
}
