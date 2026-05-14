export type BookingStatus =
  | "enquiry_sent"
  | "contacted"
  | "booking_confirmed"
  | "service_in_progress"
  | "completed"
  | "cancelled";

export const BOOKING_FLOW: {
  id: BookingStatus;
  label: string;
}[] = [
  { id: "enquiry_sent", label: "Enquiry Sent" },
  { id: "contacted", label: "Contacted" },
  { id: "booking_confirmed", label: "Booking Confirmed" },
  { id: "service_in_progress", label: "Service In Progress" },
  { id: "completed", label: "Completed" },
];

export type Artist = {
  id: string;
  name: string;
  specialty: string;
  city: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  yearsExperience: number;
  responseTime: string;
  avatarColor: string;
};

export type Booking = {
  id: string;
  artistId: string;
  serviceName: string;
  /** e.g. Wedding, Engagement — shown on dashboard rows */
  eventType: string;
  /** Quoted or final price for dashboard display */
  priceInr: number;
  date: string;
  status: BookingStatus;
  statusHistory: { status: BookingStatus; at: string }[];
};

export type MoodBoardItem = {
  id: string;
  title: string;
  occasion: string;
  imageUrl: string;
  sharedWithArtistId?: string;
};

export type ChatThread = {
  id: string;
  artistName: string;
  lastMessage: string;
  updatedAt: string;
  unread: number;
};

export type TrialSession = {
  id: string;
  artistName: string;
  service: string;
  scheduledAt: string;
  status: "scheduled" | "completed" | "missed";
};

export type Review = {
  id: string;
  artistName: string;
  rating: number;
  excerpt: string;
  createdAt: string;
};

export type FavouriteImage = {
  id: string;
  caption: string;
  imageUrl: string;
};
