import RoomCard from "./RoomCard";

export default function RoomList({ rooms, onJoin }) {
  const live = rooms.filter(r => r.live);
  const recent = rooms.filter(r => !r.live);

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4">
      {live.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-wide text-green-600 font-semibold mb-2">Live now</h3>
          <div className="space-y-3">
            {live.map(r => (
              <RoomCard key={r.id} room={r} onJoin={onJoin} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs uppercase tracking-wide text-neutral-500 font-semibold mb-2">All rooms</h3>
        <div className="space-y-3">
          {recent.map(r => (
            <RoomCard key={r.id} room={r} onJoin={onJoin} />
          ))}
        </div>
      </div>
    </div>
  );
}
