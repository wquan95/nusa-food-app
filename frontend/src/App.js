import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(res => setMenu(res.data))
      .catch(() => alert('Start backend first!'));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, { ...item, qty: 1 }]);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', maxWidth: 1200, margin: 'auto' }}>
      <h1 style={{ color: '#FF6B35', textAlign: 'center' }}>NUSA Food</h1>
      
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {menu.map(item => (
          <div key={item._id} style={{ border: '1px solid #eee', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <img src={item.image || 'https://via.placeholder.com/300'} alt={item.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
            <div style={{ padding: 16 }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem' }}>{item.name}</h3>
              <p style={{ margin: 0, color: '#FF6B35', fontWeight: 'bold', fontSize: '1.1rem' }}>RM {item.price.toFixed(2)}</p>
              <button 
                onClick={() => addToCart(item)}
                style={{ 
                  marginTop: 12, 
                  background: '#FF6B35', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: 12, 
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: 'bold'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#FF6B35', color: 'white', padding: '16px 24px', borderRadius: 16, boxShadow: '0 8px 24px rgba(255,107,53,0.3)' }}>
          <strong>{cart.length} item(s) in cart</strong>
        </div>
      )}
    </div>
  );
}

export default App;