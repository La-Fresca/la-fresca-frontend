import React from 'react';
import { Container } from '../../components/User/Container';
import HeroImg from '../../images/Landing/Hero.png';
import ContactUs from '../../images/Landing/contact.png';
import chefImg from '@/images/Landing/chef.png';
import Gallery from '@/components/Landing/Gallery';
import Menus from '@/components/Landing/Menus';
import { ReadMore } from '@/components/User/NavbarHome/readMore';

const HomePage: React.FC = () => {
  return (
    <>
  <Container className="flex flex-wrap bg-transparent p-5 md:p-10">
    <div className="flex items-center w-full lg:w-1/2 mb-5 lg:mb-0">
      <div className="max-w-full lg:max-w-2xl mx-5 lg:mx-15 my-10 lg:my-25">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-snug tracking-tight text-gray-800 text-yellow-500 py-4">
          Seamless Café Operations
        </h1>
        <p className="text-lg md:text-xl lg:text-xl xl:text-2xl leading-normal text-gray-500 text-white py-5 mb-2">
          Optimize your café operations with our comprehensive management
          system, designed to enhance efficiency and elevate customer
          satisfaction.
        </p>

        <div className="flex flex-col sm:flex-row sm:space-x-4 items-start sm:items-center space-y-3 sm:space-y-0">
          <a
            href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
            target="_blank"
            rel="noopener"
            className="px-5 py-2.5 text-lg font-medium text-center text-white bg-yellow-500 rounded-md"
          >
            Explore menu
          </a>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center w-full lg:w-1/2">
      <img src={HeroImg} alt="Hero Image" width={325} height={325} className="w-full max-w-xs sm:max-w-md lg:max-w-lg" />
    </div>
  </Container>

  <Container className="flex flex-wrap bg-transparent p-5 md:p-10">
    <div className="flex items-center w-full lg:w-1/2 mb-5 lg:mb-0">
      <div className="max-w-full lg:max-w-2xl mx-5 lg:mx-15 my-10 lg:my-25">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-snug tracking-tight text-gray-800 text-yellow-500 py-4">
          About Us
        </h1>
        <div className="text-lg md:text-xl w-full">
          <ReadMore
            id="read-more-text"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, 
                              illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? 
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, 
                              illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                              Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? 
                              tetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis"
          />
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center w-full lg:w-1/2">
      <img src={chefImg} alt="Hero Image" width={325} height={325} className="w-full max-w-xs sm:max-w-md lg:max-w-lg" />
    </div>
  </Container>

  <Container>
    <Menus />
  </Container>

  <Container>
    <Gallery />
  </Container>

  <Container className="flex flex-wrap bg-transparent p-5 md:p-10">
    <div className="flex items-center justify-center w-full lg:w-1/2 mb-5 lg:mb-0">
      <img src={ContactUs} alt="contact us" width={450} height={450} className="w-full max-w-xs sm:max-w-md lg:max-w-lg" />
    </div>

    <div className="flex items-center w-full lg:w-1/2">
      <div className="max-w-full lg:max-w-2xl mx-5 lg:mx-15 my-10 lg:my-25">
        <h3 className="text-lg md:text-xl xl:text-2xl font-bold tracking-tight text-yellow-500 py-4">
          Working Hours
        </h3>
        <p className="text-lg md:text-xl lg:text-xl xl:text-2xl leading-normal text-gray-500 text-white py-5 mb-2">
          Optimize your café operations with our comprehensive management
          system,
        </p>

        <h3 className="text-lg md:text-xl xl:text-2xl font-bold tracking-tight text-yellow-500 py-4">
          Locations
        </h3>
        <p className="text-lg md:text-xl lg:text-xl xl:text-2xl leading-normal text-gray-500 text-white py-5 mb-2">
          123, ABC Road, XYZ City, Country 256, DEF Road, UVW City, Country
          789, GHI Road, RST City, Country
        </p>

        <h3 className="text-lg md:text-xl xl:text-2xl font-bold tracking-tight text-yellow-500 py-4">
          Contact Us
        </h3>
        <p className="text-lg md:text-xl lg:text-xl xl:text-2xl leading-normal text-gray-500 text-white py-5 mb-2">
          011-1234567 | 011-1234567 | 011-1234567
        </p>
      </div>
    </div>
  </Container>
</>

  );
};
export default HomePage;
