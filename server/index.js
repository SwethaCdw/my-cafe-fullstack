const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const menu = [
  { id: 1, name: 'Cappuccino', category: 'Coffee', price: 160, description: 'Espresso with steamed milk and a soft foam finish.', emoji: '☕' },
  { id: 2, name: 'Iced Latte', category: 'Coffee', price: 180, description: 'Chilled espresso, milk and ice.', emoji: '🧋' },
  { id: 3, name: 'Blueberry Muffin', category: 'Bakery', price: 120, description: 'A soft muffin baked with blueberries.', emoji: '🧁' },
  { id: 4, name: 'Grilled Veg Sandwich', category: 'Food', price: 220, description: 'Toasted bread, vegetables and a herby spread.', emoji: '🥪' }
];

let nextOrderId = 1001;
const orders = [];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'my-cafe-api' });
});

app.get('/api/menu', (_req, res) => {
  res.json({ items: menu });
});

app.get('/api/orders', (_req, res) => {
  res.json({ orders });
});

app.post('/api/orders', (req, res) => {
  const { itemId, quantity = 1, customerName = 'Guest' } = req.body || {};
  const item = menu.find((entry) => entry.id === Number(itemId));
  const qty = Number(quantity);

  if (!item) {
    return res.status(400).json({ message: 'Please choose a valid menu item.' });
  }
  if (!Number.isInteger(qty) || qty < 1 || qty > 10) {
    return res.status(400).json({ message: 'Quantity must be a whole number from 1 to 10.' });
  }

  const order = {
    id: nextOrderId++,
    customerName: String(customerName).trim().slice(0, 60) || 'Guest',
    item: item.name,
    quantity: qty,
    total: item.price * qty,
    status: 'Received',
    createdAt: new Date().toISOString()
  };
  orders.unshift(order);
  console.log(`Order #${order.id}: ${order.quantity} x ${order.item} — ₹${order.total}`);
  res.status(201).json({ message: 'Order received!', order });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`My Café API listening on port ${PORT}`);
});
