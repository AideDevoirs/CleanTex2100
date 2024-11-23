import React from 'react';

import config from '../config/index.json';
import Divider from './Divider';

const Product = () => {
  const { product } = config;
  const [firstItem, secondItem] = product.items;

  return (
    <section className={`bg-background py-8`} id="product">
      <div className={`container max-w-7xl mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {product.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <Divider />
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
            >
              {firstItem?.title}
            </h3>
            <p className={`text-gray-600`}>
              <br />
              <br />✨{' '}
              <strong>
                Dieptereiniging: Geef uw ruimtes een frisse start!
              </strong>{' '}
              ✨ <br />
              <br />
              Onze dieptereinigingsservice brengt uw oppervlakken weer tot leven
              door zelfs het meest hardnekkige vuil te verwijderen! Hier is wat
              wij bieden : <br />
              <br />
              <br />• 🛋️ <strong>Banken en fauteuils</strong>: Verwijder
              vlekken, stof en allergenen voor een frisse en comfortabele
              zitervaring. <br />
              <br />• 🚗 <strong>Autointerieurs</strong>: Complete reiniging van
              stoelen, tapijten en dashboard voor een vlekkeloze rijervaring.{' '}
              <br />
              <br />• 🧽 <strong>Tapijten en vloerkleden</strong>: Herstel de
              kleuren en verwijder geuren met geavanceerde technieken. <br />
              <br />• 🛏️ <strong>Matrassen</strong>: Zeg vaarwel tegen
              huisstofmijt en vlekken voor een gezondere nachtrust. <br />
              <br />• 🪑 <strong>Stoelen en textiel</strong>: Zachte maar
              grondige reiniging om uw stoffen te beschermen. <br />
              <br />
              <br />
              <strong>
                Met onze expertise krijgen uw eigendommen hun oorspronkelijke
                glans terug. Neem contact met ons op en ervaar het verschil!
              </strong>{' '}
              🌿✨
            </p>
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <img
              className="h-6/6"
              src={firstItem?.img}
              alt={firstItem?.title}
            />
          </div>
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              className="h-6/6"
              src={secondItem?.img}
              alt={secondItem?.title}
            />
          </div>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <div className={`align-middle`}>
              <h3
                className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
              >
                {secondItem?.title}
              </h3>
              <p className={`text-gray-600 mb-8`}>{secondItem?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
