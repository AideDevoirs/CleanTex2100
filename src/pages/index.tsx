import React, { useState } from 'react';

import About from '../components/About';
import Analytics from '../components/Analytics';
import Canvas from '../components/Canvas';
import Features from '../components/Features';
import Header from '../components/Header';
import MainHero from '../components/MainHero';
import MainHeroImage from '../components/MainHeroImage';
import CleaningForm from '../components/Pricing';
import Product from '../components/Product';
import ReviewForm from '../components/ReviewForm';
import ReviewsList from '../components/ReviewsList';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleReviewSubmit = () => {
    setRefresh((r) => !r); // Force le refresh de ReviewsList
  };

  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header />
            <MainHero />
          </div>
        </div>
        <MainHeroImage />
      </div>
      <Canvas />
      <div>
        <Product />
        <Canvas />
      </div>
      <div>
        <Features />
        <Canvas />
      </div>
      <div>
        <CleaningForm />
      </div>
      <div
        id="reviews"
        className="w-full sm:w-[500px] md:w-[652px] mx-auto bg-white rounded-lg shadow-lg p-6 mb-10"
      >
        <ReviewForm onSubmit={handleReviewSubmit} />
        <ReviewsList refresh={refresh} />
      </div>
      <div>
        <Canvas />
        <About />
      </div>
      <Analytics />
    </div>
  );
};

export default App;
