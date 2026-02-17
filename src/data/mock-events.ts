import { EventItem } from "@/types";

export const mockEvents: EventItem[] = [
  {
    id: "sunset-beats-2026",
    title: "Sunset Beats Festival 2026",
    category: "Concerts",
    city: "Manila",
    venue: "Bayfront Arena",
    date: "2026-05-18",
    time: "7:30 PM",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200&auto=format&fit=crop",
    description: "A one-night music festival featuring top local and international DJs.",
    performers: ["DJ Mara", "The Neon Club", "Kinetic Pulse"],
    ticketTypes: [
      { id: "gen", name: "General", price: 1499, available: 240 },
      { id: "vip", name: "VIP", price: 3499, available: 60 },
      { id: "early", name: "Early Bird", price: 999, available: 0 },
    ],
  },
  {
    id: "city-rivals-final",
    title: "City Rivals Championship Final",
    category: "Sports",
    city: "Quezon City",
    venue: "Metro Dome",
    date: "2026-06-02",
    time: "5:00 PM",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
    description: "The season finale between two long-time rivals. High-intensity action guaranteed.",
    performers: ["North Hawks", "East Titans"],
    ticketTypes: [
      { id: "gen", name: "General", price: 799, available: 340 },
      { id: "vip", name: "VIP", price: 1999, available: 80 },
      { id: "early", name: "Early Bird", price: 599, available: 120 },
    ],
  },
  {
    id: "midnight-stage-play",
    title: "Midnight Letters: A Stage Play",
    category: "Theater",
    city: "Cebu",
    venue: "Grand Arts Hall",
    date: "2026-04-27",
    time: "8:00 PM",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200&auto=format&fit=crop",
    description: "A modern drama about love, memory, and second chances.",
    performers: ["Luna Ensemble"],
    ticketTypes: [
      { id: "gen", name: "General", price: 899, available: 200 },
      { id: "vip", name: "VIP", price: 1799, available: 35 },
      { id: "early", name: "Early Bird", price: 699, available: 40 },
    ],
  },
];

