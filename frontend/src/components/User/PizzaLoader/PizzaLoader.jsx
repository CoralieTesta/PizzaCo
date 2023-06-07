import React, { useState, useEffect } from 'react';
import { GiFullPizza } from 'react-icons/gi';
import './PizzaLoader.css';

const PizzaLoader = () => {
  /*const [isSpinning, setIsSpinning] = useState(true);
  useEffect(() => {
    setIsSpinning(true);
    const timer = setTimeout(() => {
      setIsSpinning(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);*/

  return (
    <div className="pizza-spinner">
      <GiFullPizza
        className={`pizza-icon spin`}
        size={100}
      />
    </div>
  );
};

export default PizzaLoader;
