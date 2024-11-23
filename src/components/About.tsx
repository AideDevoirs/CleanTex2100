import React from 'react';

import config from '../config/index.json';

const About = () => {
  const { company, about } = config;
  const { logo, name: companyName } = company;
  const { socialMedia, sections } = about;

  return (
    <div
      id="about"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12"
    >
      <div className="flex flex-col items-center justify-center">
        <div>
          <img src={logo} alt={companyName} className="w-16 h-16" />
        </div>
        
        <div className="flex items-center gap-x-8 mt-6 h-8">
          
          <a
            aria-label="instagram"
            href={socialMedia.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <img 
              src="/assets/images/conception-du-logo-medias-sociaux_23-2151299465.avif" 
              alt="Instagram logo" 
              className="w-16 h-16 hover:scale-110 transition-transform duration-300"
            />

          </a>
          
        </div>
        <div className="flex items-center mt-6">
          Instagram
        </div>
      </div>
    </div>
  );
};
export default About;
