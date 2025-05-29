export function calculateDiscountedPrice(item) {
  if (!item || !item.price || !item.discountPercentage) return '0.00';
  return (item.price - (item.price * item.discountPercentage) / 100).toFixed(2);
}
