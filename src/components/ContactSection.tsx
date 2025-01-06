import { useState } from 'react';

interface ContactInfo {
  phone: string;
  instagram: string;
  telegram: string;
  description: string[];
}

const contactInfo: ContactInfo = {
  phone: "+380 XX XXX XX XX",
  instagram: "@your_instagram",
  telegram: "@your_telegram",
  description: [
    "<strong>Щоб замовити товар:</strong>",
    "1. Напишіть нам в Telegram або Instagram",
    "2. Вкажіть назву або скріншот товару",
    "3. Очікуйте на відповідь менеджера"
  ]
};

const ContactSection = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <div className="contact-section">
      <button 
        className="order-button" 
        onClick={toggleInfo}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        Як замовити
      </button>
      
      {isInfoVisible && (
        <div className="contact-info-modal">
          <div className="contact-info">
            <div className="description">
              {contactInfo.description.map((line, index) => (
                <p key={index} className="description-line" dangerouslySetInnerHTML={{ __html: line }}></p>
              ))}
            </div>
            <div className="contact-details">
              <h3>Наші контакти:</h3>
              <p>📞 {contactInfo.phone}</p>
              <p>📱 Instagram: <a href={`https://instagram.com/${contactInfo.instagram}`} target="_blank" rel="noopener noreferrer">{contactInfo.instagram}</a></p>
              <p>💬 Telegram: <a href={`https://t.me/${contactInfo.telegram.substring(1)}`} target="_blank" rel="noopener noreferrer">{contactInfo.telegram}</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSection; 