import { useState, useEffect } from 'react';
import type { Item, GoogleSheetResponse } from './types';
import './App.css';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/1mqxh4Ru5TfkSuIhyvfIivWopRpOFo4go_zwE7pE0Y_o/gviz/tq?tqx=out:json'
      );
      const text = await response.text();
      // console.log('Raw response:', text);

      const jsonData: GoogleSheetResponse = JSON.parse(text.substring(47).slice(0, -2));
      // console.log('Parsed JSON:', jsonData);
      
      const rows = jsonData.table.rows;
      const transformedData: Item[] = rows.slice(0).map(row => {
        const item = {
          name: String(row.c[0]?.v || ''),
          category: String(row.c[1]?.v || ''),
          photo: String(row.c[2]?.v || ''),
          description: String(row.c[3]?.v || ''),
          price: Number(row.c[4]?.v || 0)
        };
        // console.log('Transformed item:', item);
        return item;
      });

      setItems(transformedData);
      
      const uniqueCategories = [...new Set(transformedData.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="container">
      <h1>Item Showcase</h1>
      
      <div className="filters">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="items-grid">
        {filteredItems.map((item, index) => (
          <div 
            key={index} 
            className="item-card"
            onClick={() => setSelectedItem(item)}
          >
            <div className="item-image">
              <img src={item.photo} alt={item.name} />
            </div>
            <div className="item-content">
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="description">{truncateText(item.description)}</p>
              <p className="price">{item.price.toFixed(2)} грн</p>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-button"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>
            <div className="modal-image">
              <img src={selectedItem.photo} alt={selectedItem.name} />
            </div>
            <div className="modal-details">
              <h2>{selectedItem.name}</h2>
              <p className="category">{selectedItem.category}</p>
              <p className="description">{selectedItem.description}</p>
              <p className="price">{selectedItem.price.toFixed(2)} грн</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
