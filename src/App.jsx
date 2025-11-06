import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import RoomList from "./components/RoomList";
import ChatView from "./components/ChatView";
import ProfileFeed from "./components/ProfileFeed";
import { Home, User } from "lucide-react";

const ROOMS_KEY = "sor_rooms_v1";

export default function App() {
  const [tab, setTab] = useState("rooms");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem(ROOMS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return [
      {
        id: "r1",
        name: "Chill Lounge",
        topic: "Music, vibes, and friendly talk",
        cover:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
        members: ["maya", "leo", "ari"],
        live: true,
      },
      {
        id: "r2",
        name: "Study Circle",
        topic: "Quiet cowork & accountability",
        cover:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=600&auto=format&fit=crop",
        members: ["noah"],
        live: false,
      },
      {
        id: "r3",
        name: "Tech Talk",
        topic: "Daily dev standup & Q&A",
        cover:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
        members: ["zara", "kai", "emi", "jo"],
        live: false,
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
    } catch {}
  }, [rooms]);

  function createRoom() {
    const name = prompt("Room name");
    if (!name) return;
    const topic = prompt("Topic (optional)") || "Casual voice chat";
    setRooms((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        topic,
        cover:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
        members: [],
        live: false,
      },
      ...prev,
    ]);
  }

  function joinRoom(room) {
    setSelectedRoom(room);
  }

  const content = useMemo(() => {
    if (selectedRoom) {
      return (
        <ChatView
          room={selectedRoom}
          onBack={() => setSelectedRoom(null)}
        />
      );
    }
    if (tab === "rooms") {
      return <RoomList rooms={rooms} onJoin={joinRoom} />;
    }
    return <ProfileFeed />;
  }, [selectedRoom, tab, rooms]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="h-screen max-w-md mx-auto flex flex-col">
        <Header onNewRoom={createRoom} />
        <main className="flex-1 overflow-hidden">{content}</main>

        {!selectedRoom && (
          <nav className="sticky bottom-0 z-20 border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
            <div className="max-w-md mx-auto px-6 py-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => setTab("rooms")}
                className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm ${
                  tab === "rooms"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-neutral-100 dark:bg-neutral-800"
                }`}
              >
                <Home className="h-4 w-4" /> Rooms
              </button>
              <button
                onClick={() => setTab("feed")}
                className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm ${
                  tab === "feed"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-neutral-100 dark:bg-neutral-800"
                }`}
              >
                <User className="h-4 w-4" /> Feed
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
