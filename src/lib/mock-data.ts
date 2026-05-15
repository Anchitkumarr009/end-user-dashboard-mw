import type {
  Artist,
  Booking,
  ChatThread,
  FavouriteImage,
  MoodBoardItem,
  Review,
  TrialSession,
  WalletOffer,
  WalletTransaction,
} from "./types";

export const artists: Artist[] = [
  {
    id: "a1",
    name: "Priya Sharma",
    specialty: "Bridal mehndi & full hand",
    city: "Mumbai",
    rating: 4.9,
    reviewCount: 214,
    priceFrom: 12000,
    yearsExperience: 8,
    responseTime: "Under 2h",
    avatarColor: "from-amber-100 to-amber-50",
  },
  {
    id: "a2",
    name: "Sana Mirza",
    specialty: "Arabic & Indo-Arabic",
    city: "Hyderabad",
    rating: 4.8,
    reviewCount: 132,
    priceFrom: 9000,
    yearsExperience: 6,
    responseTime: "Same day",
    avatarColor: "from-amber-100 to-amber-50",
  },
  {
    id: "a3",
    name: "Zara Sheikh",
    specialty: "Contemporary minimal",
    city: "Bengaluru",
    rating: 5,
    reviewCount: 89,
    priceFrom: 15000,
    yearsExperience: 5,
    responseTime: "Under 4h",
    avatarColor: "from-amber-100 to-amber-50",
  },
  {
    id: "a4",
    name: "Ananya Iyer",
    specialty: "Traditional bridal",
    city: "Chennai",
    rating: 4.7,
    reviewCount: 301,
    priceFrom: 11000,
    yearsExperience: 10,
    responseTime: "Under 1h",
    avatarColor: "from-amber-100 to-amber-50",
  },
];

export const bookings: Booking[] = [
  {
    id: "b1",
    artistId: "a1",
    serviceName: "Full bridal mehndi",
    eventType: "Wedding",
    priceInr: 18000,
    date: "2026-04-15T09:00:00",
    status: "completed",
    statusHistory: [
      { status: "enquiry_sent", at: "2026-03-01T09:12:00" },
      { status: "contacted", at: "2026-03-01T14:30:00" },
      { status: "booking_confirmed", at: "2026-03-02T11:00:00" },
      { status: "service_in_progress", at: "2026-04-15T09:05:00" },
      { status: "completed", at: "2026-04-15T14:00:00" },
    ],
  },
  {
    id: "b2",
    artistId: "a2",
    serviceName: "Engagement ceremony",
    eventType: "Engagement",
    priceInr: 14000,
    date: "2026-05-20T16:00:00",
    status: "booking_confirmed",
    statusHistory: [
      { status: "enquiry_sent", at: "2026-04-20T08:00:00" },
      { status: "contacted", at: "2026-04-21T10:15:00" },
      { status: "booking_confirmed", at: "2026-04-22T19:40:00" },
    ],
  },
  {
    id: "b3",
    artistId: "a3",
    serviceName: "Luxury bridal package",
    eventType: "Wedding",
    priceInr: 35000,
    date: "2026-06-15T10:00:00",
    status: "enquiry_sent",
    statusHistory: [{ status: "enquiry_sent", at: "2026-05-10T12:00:00" }],
  },
  {
    id: "b4",
    artistId: "a4",
    serviceName: "Trial session + consultation",
    eventType: "Trial",
    priceInr: 2500,
    date: "2026-05-18T10:00:00",
    status: "service_in_progress",
    statusHistory: [
      { status: "enquiry_sent", at: "2026-05-01T09:12:00" },
      { status: "contacted", at: "2026-05-01T14:30:00" },
      { status: "booking_confirmed", at: "2026-05-02T11:00:00" },
      { status: "service_in_progress", at: "2026-05-14T09:58:00" },
    ],
  },
];

export const shortlistIds = ["a1", "a2", "a3"];

export const enquiredArtistIds = ["a1", "a2", "a4"];

export const moodBoard: MoodBoardItem[] = [
  {
    id: "m1",
    title: "Jaali & florals — bridal back",
    occasion: "Wedding",
    imageUrl:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    sharedWithArtistId: "a1",
  },
  {
    id: "m2",
    title: "Minimal engagement strokes",
    occasion: "Engagement",
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  },
];

export const trials: TrialSession[] = [
  {
    id: "t1",
    artistName: "Priya Sharma",
    service: "Bridal mehndi trial",
    scheduledAt: "2026-05-16T11:00:00",
    status: "scheduled",
  },
  {
    id: "t2",
    artistName: "Ananya Iyer",
    service: "Foot design preview",
    scheduledAt: "2026-04-12T15:30:00",
    status: "completed",
  },
];

export const chats: ChatThread[] = [
  {
    id: "c1",
    artistName: "Priya Sharma",
    lastMessage: "I’ve shared the mood board — let me know what you think!",
    updatedAt: "2026-05-14T08:12:00",
    unread: 1,
  },
  {
    id: "c2",
    artistName: "Sana Mirza",
    lastMessage: "Sounds good, I’ll bring the organic cones.",
    updatedAt: "2026-05-10T19:22:00",
    unread: 0,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    artistName: "Priya Sharma",
    rating: 5,
    excerpt: "Flawless symmetry and she stayed calm through the whole morning rush.",
    createdAt: "2026-04-29T10:00:00",
  },
];

export const favouriteImages: FavouriteImage[] = [
  {
    id: "f1",
    caption: "Arabic flow reference",
    imageUrl:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80",
  },
  {
    id: "f2",
    caption: "Bridal density inspo",
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
  },
  {
    id: "f3",
    caption: "Minimal engagement",
    imageUrl:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80",
  },
];

/** Base wallet balance before any coupons redeemed in-browser (demo). */
export const walletBalanceInr = 2450;

export const walletExpenseSummary = {
  /** Money out via wallet for bookings, this calendar month */
  thisMonthInr: 18200,
  /** All-time spend through wallet */
  lifetimeSpendInr: 64700,
  /** Cashback & promos credited to wallet */
  creditsEarnedInr: 1200,
};

export const walletTransactions: WalletTransaction[] = [
  {
    id: "wt1",
    type: "debit",
    category: "booking",
    title: "Booking payment",
    subtitle: "Priya Sharma · Wedding",
    amountInr: 18000,
    createdAt: "2026-04-15T10:30:00",
  },
  {
    id: "wt2",
    type: "credit",
    category: "cashback",
    title: "Cashback",
    subtitle: "MehndiWalaa rewards",
    amountInr: 350,
    createdAt: "2026-04-16T08:00:00",
  },
  {
    id: "wt3",
    type: "debit",
    category: "booking",
    title: "Advance for engagement",
    subtitle: "Sana Mirza · Engagement",
    amountInr: 7000,
    createdAt: "2026-04-22T14:12:00",
  },
  {
    id: "wt4",
    type: "credit",
    category: "refund",
    title: "Refund",
    subtitle: "Trial slot cancelled",
    amountInr: 2500,
    createdAt: "2026-04-28T11:05:00",
  },
  {
    id: "wt5",
    type: "credit",
    category: "top_up",
    title: "Wallet top-up",
    subtitle: "UPI · ****0421",
    amountInr: 5000,
    createdAt: "2026-05-02T19:40:00",
  },
  {
    id: "wt6",
    type: "debit",
    category: "booking",
    title: "Booking hold",
    subtitle: "Zara Sheikh · enquiry deposit",
    amountInr: 2000,
    createdAt: "2026-05-10T09:00:00",
  },
];

export const walletOffers: WalletOffer[] = [
  {
    id: "o1",
    title: "Bridal season cashback",
    description: "Earn 5% back to your wallet on completed bookings above ₹25,000.",
    highlight: "gold",
    expiresAt: "2026-06-30",
  },
  {
    id: "o2",
    title: "First booking perk",
    description: "Use code FIRST1000 on first wallet top-up of ₹5,000 or more.",
    code: "FIRST1000",
    highlight: "green",
    expiresAt: "2026-12-31",
  },
  {
    id: "o3",
    title: "Refer an artist",
    description: "₹250 wallet credit when your referral completes their first booking.",
    highlight: "gold",
  },
];

export function artistById(id: string) {
  return artists.find((a) => a.id === id);
}

export function initialFromName(name: string) {
  return name.trim()[0]?.toUpperCase() ?? "?";
}
