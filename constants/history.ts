export interface HistoryTicket {
  id: string;
  businessName: string;
  businessCategory: string;
  completedDate: Date;
  queuePosition: number;
  waitTime: number;
  status: "Completed" | "Cancelled" | "No-Show";
  totalAmount: number;
  services: {
    id: string;
    name: string;
    price: number;
    duration: number;
  }[];
  businessInfo: {
    phone: string;
    address: string;
  };
}

export const mockHistoryTickets: HistoryTicket[] = [
  {
    id: "1",
    businessName: "Glow & Glam Salon",
    businessCategory: "Beauty & Wellness",
    completedDate: new Date("2025-08-19T01:04:00"),
    queuePosition: 3,
    waitTime: 25,
    status: "Completed",
    totalAmount: 1150,
    services: [
      { id: "1", name: "Haircut & Styling", price: 350, duration: 45 },
      { id: "2", name: "Deep Cleansing Facial", price: 800, duration: 60 },
    ],
    businessInfo: {
      phone: "+91 98765 43210",
      address: "Shop 15, Phoenix Mall, Viman Nagar, Pune",
    },
  },
  {
    id: "2",
    businessName: "Spice Garden Restaurant",
    businessCategory: "Restaurant",
    completedDate: new Date("2025-08-23T00:00:00"),
    queuePosition: 5,
    waitTime: 30,
    status: "Completed",
    totalAmount: 0, // Free
    services: [{ id: "1", name: "Table Reservation", price: 0, duration: 0 }],
    businessInfo: {
      phone: "+91 98765 43211",
      address: "FC Road, Shivajinagar, Pune",
    },
  },
  {
    id: "3",
    businessName: "PowerFit Gym & Fitness",
    businessCategory: "Health & Fitness",
    completedDate: new Date("2025-08-21T00:00:00"),
    queuePosition: 2,
    waitTime: 15,
    status: "Completed",
    totalAmount: 200,
    services: [
      { id: "1", name: "Personal Training Session", price: 200, duration: 60 },
    ],
    businessInfo: {
      phone: "+91 98765 43212",
      address: "Koregaon Park, Pune",
    },
  },
];
