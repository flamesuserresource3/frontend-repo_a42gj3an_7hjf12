import { Mic, Users } from "lucide-react";

export default function RoomCard({ room, onJoin }) {
  return (
    <button
      onClick={() => onJoin(room)}
      className="w-full text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 flex items-center gap-3 active:scale-[0.99] transition"
    >
      <div className="relative">
        <img
          src={room.cover || `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop`}
          alt="cover"
          className="h-14 w-14 rounded-xl object-cover"
        />
        {room.live && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-neutral-900" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <Mic className={`h-4 w-4 ${room.live ? 'text-green-600' : 'text-neutral-400'}`} />
          <p className="font-medium truncate">{room.name}</p>
        </div>
        <p className="text-xs text-neutral-500 truncate">{room.topic || 'Casual voice chat'}</p>
        <div className="flex items-center gap-1 mt-2 text-xs text-neutral-500">
          <Users className="h-3.5 w-3.5" />
          <span>{room.members?.length || 0} joined</span>
        </div>
      </div>
    </button>
  );
}
