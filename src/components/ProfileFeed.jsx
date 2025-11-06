import { Heart, MessageSquare, Plus } from "lucide-react";
import { useState } from "react";

const mockPosts = [
  {
    id: "p1",
    author: { name: "Ayla", avatar: "https://i.pravatar.cc/100?img=5" },
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    text: "Sunset walks and city talks.",
    likes: 14,
  },
  {
    id: "p2",
    author: { name: "Noah", avatar: "https://i.pravatar.cc/100?img=12" },
    image: "https://images.unsplash.com/photo-1637169252048-fce0129d55ee?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxOb2FofGVufDB8MHx8fDE3NjI0MTcyNDd8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
    text: "Coffee before code.",
    likes: 23,
  },
];

export default function ProfileFeed() {
  const [posts, setPosts] = useState(mockPosts);

  function addPost() {
    const text = prompt("Share something");
    if (!text) return;
    setPosts((p) => [
      {
        id: crypto.randomUUID(),
        author: { name: "You", avatar: "https://i.pravatar.cc/100?u=you" },
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
        text,
        likes: 0,
      },
      ...p,
    ]);
  }

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Community</h3>
        <button onClick={addPost} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black">
          <Plus className="h-4 w-4" />
          <span className="text-sm">Post</span>
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <article key={p.id} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="flex items-center gap-3 px-3 py-2">
              <img src={p.author.avatar} alt="avatar" className="h-8 w-8 rounded-full" />
              <div>
                <p className="text-sm font-medium leading-tight">{p.author.name}</p>
                <p className="text-[11px] text-neutral-500 -mt-0.5">Just now</p>
              </div>
            </div>
            <img src={p.image} alt="post" className="w-full h-52 object-cover" />
            <div className="px-3 py-2">
              <p className="text-sm mb-2">{p.text}</p>
              <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
                <button className="inline-flex items-center gap-1">
                  <Heart className="h-4 w-4" /> {p.likes}
                </button>
                <button className="inline-flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" /> Comment
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
