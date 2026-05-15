/** Demo redeemable codes → wallet credit (INR). Replace with API in production. */
export const COUPON_CREDITS_INR: Record<string, number> = {
  WELCOME500: 500,
  FIRST1000: 1000,
  MEHNDI250: 250,
  BRIDAL750: 750,
};

export function normalizeCouponCode(raw: string) {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}
