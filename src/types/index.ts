export type TicketType = {
  id: string;
  name: string;
  price: number;
  available: number;
};

export type EventItem = {
  id: string;
  title: string;
  category: "Concerts" | "Theater" | "Sports";
  city: string;
  venue: string;
  date: string;
  time: string;
  image: string;
  description: string;
  performers: string[];
  ticketTypes: TicketType[];
};

export type CartItem = {
  eventId: string;
  eventTitle: string;
  ticketTypeId: string;
  ticketTypeName: string;
  unitPrice: number;
  quantity: number;
};

