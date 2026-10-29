import { useEffect, useState } from 'react';

const money = (amount) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
}).format(amount);

export default function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load the menu.');
        return response.json();
      })
      .then((data) => {
        setItems(data.items);
        if (data.items.length) setSelectedItem(String(data.items[0].id));
      })
      .catch(() => setError('Could not connect to the café API. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: selectedItem,
          quantity: Number(quantity),
          customerName: customerName || 'Guest'
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Order could not be submitted.');
      setMessage(`Order #${data.order.id} received — ${data.order.quantity} × ${data.order.item}. Total: ${money(data.order.total)}.`);
      setQuantity(1);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#home"><span className="brand-mark">m</span> my café</a>
        <div className="nav-links"><a href="#menu">Menu</a><a href="#order">Order online</a></div>
        <span className="open-pill"><span /> Open today</span>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">YOUR NEIGHBOURHOOD COFFEE SPOT</p>
          <h1>Good things<br /> <em>brew here.</em></h1>
          <p className="hero-text">Slow mornings, lovely coffee, and little bites that make your day better. Made fresh, served with heart.</p>
          <a className="primary-link" href="#menu">Explore the menu <span>↗</span></a>
          <div className="hero-note"><span className="stars">★★★★★</span><span>Made with love, every day</span></div>
        </div>
        <div className="hero-art" aria-label="Illustration of coffee and pastry">
          <div className="sun-disc" />
          <div className="coffee-beans bean-one">✦</div>
          <div className="coffee-cup"><div className="coffee-top"><span>m</span></div><div className="cup-body" /><div className="cup-handle" /></div>
          <div className="pastry">🥐</div>
          <div className="art-caption">FRESHLY BREWED<br /><b>HAPPINESS</b></div>
        </div>
      </section>

      <section className="promise">
        <div><span>✳</span><p><b>Thoughtfully sourced</b><small>Good beans, better choices</small></p></div>
        <div><span>☕</span><p><b>Made fresh daily</b><small>Little batches, lots of love</small></p></div>
        <div><span>♡</span><p><b>A cosy little corner</b><small>Your seat is waiting</small></p></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading"><div><p className="eyebrow">A FEW HOUSE FAVOURITES</p><h2>Made for your <em>moment.</em></h2></div><span className="menu-stamp">FRESH<br />DAILY</span></div>
        {loading ? <p className="status">Brewing up the menu…</p> : error && items.length === 0 ? <p className="status error">{error}</p> : (
          <div className="menu-grid">
            {items.map((item) => (
              <article className="menu-card" key={item.id}>
                <div className={`menu-emoji tone-${item.id}`}>{item.emoji}</div>
                <div className="menu-card-body"><span className="category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><div className="price-row"><b>{money(item.price)}</b><button className="add-button" onClick={() => { setSelectedItem(String(item.id)); document.querySelector('#order')?.scrollIntoView({ behavior: 'smooth' }); }}>＋</button></div></div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="order-section" id="order">
        <div className="order-copy"><p className="eyebrow">A LITTLE SOMETHING FOR YOU</p><h2>Your next favourite<br /><em>is one order away.</em></h2><p>Choose a treat, send your order, and let us take care of the rest. This is a demo order — no payment is taken.</p></div>
        <form className="order-form" onSubmit={handleSubmit}>
          <h3>Place a demo order</h3>
          <label>Your name <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Alex" maxLength="60" /></label>
          <label>Choose your treat <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} required>{items.map((item) => <option value={item.id} key={item.id}>{item.name} — {money(item.price)}</option>)}</select></label>
          <label>Quantity <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>{[1, 2, 3, 4, 5].map((n) => <option value={n} key={n}>{n}</option>)}</select></label>
          <button className="submit-button" type="submit" disabled={!items.length || loading}>Send my order <span>→</span></button>
          {message && <p className="feedback success" role="status">{message}</p>}
          {error && <p className="feedback error" role="alert">{error}</p>}
        </form>
      </section>

      <footer><a className="brand" href="#home"><span className="brand-mark">m</span> my café</a><span>Good coffee. Good company. Good day.</span><small>Full-stack demo · React + Node.js</small></footer>
    </main>
  );
}
