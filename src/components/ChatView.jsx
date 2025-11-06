import { Mic, Image as ImageIcon, Send, Phone, PhoneOff, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatView({ room, onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, author: "Maya", text: "Welcome to the room!", ts: Date.now() - 10000 },
    { id: 2, author: "You", text: "Hey everyone 👋", ts: Date.now() - 5000 },
  ]);
  const [input, setInput] = useState("");
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: crypto.randomUUID(), author: "You", text, ts: Date.now() }]);
    setInput("");
  }

  function deleteMessage(id) {
    setMessages(prev => prev.filter(m => m.id !== id));
  }

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">←</button>
          <div className="flex items-center gap-3">
            <img src={room.cover} alt="cover" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <p className="font-semibold leading-tight">{room.name}</p>
              <p className="text-xs text-neutral-500 -mt-0.5">{room.topic}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {!inCall ? (
              <button onClick={() => setInCall(true)} className="px-3 py-2 rounded-xl bg-green-600 text-white inline-flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                <span className="text-sm">Start</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => setMuted(m => !m)} className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button onClick={() => setInCall(false)} className="px-3 py-2 rounded-xl bg-red-600 text-white">
                  <PhoneOff className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-4 space-y-3">
          {messages.map(m => (
            <div key={m.id} className="group">
              <div className="inline-flex max-w-[85%] rounded-2xl px-3 py-2 bg-neutral-100 dark:bg-neutral-800">
                <div>
                  <p className="text-[11px] text-neutral-500 mb-0.5">{m.author}</p>
                  <p className="text-sm whitespace-pre-wrap break-words">{m.text}</p>
                </div>
              </div>
              <button onClick={() => deleteMessage(m.id)} className="opacity-0 group-hover:opacity-100 ml-2 text-xs text-red-500">Delete</button>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-2">
          <button className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <Mic className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <ImageIcon className="h-5 w-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message"
            className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl px-3 py-2 text-sm outline-none"
          />
          <button onClick={sendMessage} className="p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
