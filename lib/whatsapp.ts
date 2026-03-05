import { CartItem } from "./store/cartStore";

export function buildWhatsAppLink(
  phone: string,
  message: string
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildProductOrderMessage(
  productName: string,
  weight: string,
  brandName: string = "Gurukrupa Gruh Udyog"
): string {
  return `Hi! I'd like to order *${productName} ${weight}* from ${brandName}. Please confirm availability and price.`;
}

export function buildComboOrderMessage(
  comboName: string,
  brandName: string = "Gurukrupa Gruh Udyog"
): string {
  return `Hi! I am interested in the *${comboName}* pack from ${brandName}. Please share details and confirm delivery.`;
}

export function buildCartOrderMessage(
  items: CartItem[],
  totalPrice: number,
  brandName: string = "Gurukrupa Gruh Udyog"
): string {
  if (items.length === 0) return buildWhatsAppLink(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '911234567890', "Hi! I want to order some spices.");

  const intro = `Hi ${brandName}! I would like to place an order for the following items:\n\n`;
  
  const orderItems = items.map((item, index) => {
    return `${index + 1}. *${item.name}* (${item.weight})\n   Qty: ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}`;
  }).join('\n\n');

  const footer = `\n\n*Cart Total:* ₹${totalPrice}\n\nPlease confirm my order and share payment details.`;

  return intro + orderItems + footer;
}
