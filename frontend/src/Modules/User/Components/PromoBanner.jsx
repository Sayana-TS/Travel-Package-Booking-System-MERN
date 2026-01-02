import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PromoBanner = ({ promo }) => {
  if (!promo) return null;

  const {
    title,
    subtitle,
    description,
    discountText,
    imageUrl,
    expiresIn: initialExpiresIn,
    ctaText = "Book Now",
  } = promo;

  const [timeLeft, setTimeLeft] = useState(initialExpiresIn);

  useEffect(() => {
    // Since there are no seconds, we update every 1 minute (60000ms)
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let newTime = prevTime.map(item => ({ ...item }));
        
        const minIdx = newTime.findIndex(i => i.label.toLowerCase().includes('min'));
        const hourIdx = newTime.findIndex(i => i.label.toLowerCase().includes('hour'));
        const dayIdx = newTime.findIndex(i => i.label.toLowerCase().includes('day'));

        // Cascading logic for Minute -> Hour -> Day
        if (minIdx !== -1 && newTime[minIdx].value > 0) {
          newTime[minIdx].value -= 1;
        } else if (hourIdx !== -1 && newTime[hourIdx].value > 0) {
          newTime[hourIdx].value -= 1;
          if (minIdx !== -1) newTime[minIdx].value = 59;
        } else if (dayIdx !== -1 && newTime[dayIdx].value > 0) {
          newTime[dayIdx].value -= 1;
          if (hourIdx !== -1) newTime[hourIdx].value = 23;
          if (minIdx !== -1) newTime[minIdx].value = 59;
        }

        return newTime;
      });
    }, 60000); // 60 seconds interval

    return () => clearInterval(timer);
  }, []);

  const navigate = useNavigate()

  return (
    <section className="py-12">
      <div className="bg-card-dark rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center">
        
        <div className="md:w-1/2">
          <img
            alt={title}
            className="w-full h-64 md:h-full object-cover"
            src={imageUrl}
          />
        </div>

        <div className="p-8 md:p-12 md:w-1/2">
          <p className="text-sm font-bold text-primary mb-2">
            {discountText}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {title}
          </h2>

          <p className="text-subtext-dark mb-6">
            {description}
          </p>

          {timeLeft && (
            <div className="flex items-center gap-4 mb-6">
              <p className="text-lg font-semibold text-white">
                Offer ends in:
              </p>

              <div className="flex gap-2 text-center">
                {timeLeft.map((item) => (
                  <div
                    key={item.label}
                    className="bg-primary/20 text-primary p-2 rounded-lg min-w-[60px]"
                  >
                    <span className="text-xl font-bold">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-xs block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={()=>navigate('/packageDetail')}
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;