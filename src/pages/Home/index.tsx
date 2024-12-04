import React, { useState } from 'react';
import { Container } from '../../components/User/Container';
import HeroImg from '../../images/Landing/Hero.png';
import ContactUs from '../../images/Landing/contact.png';
import chefImg from '@/images/Landing/chef.png';
import Gallery from '@/components/Landing/Gallery';
import Menus from '@/components/Landing/Menus';
import { ReadMore } from '@/components/User/NavbarHome/readMore';
import { Link } from 'react-router-dom';
import Logo from '@/images/logo/la-fresca.png';

const HomePage: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(true); // Local state for light/dark mode

  const toggleMode = () => {
    setIsLightMode((prevMode) => !prevMode); // Toggle the mode
  };

  return (
    <>
      {/* <button
        onClick={toggleMode}
        className="fixed top-5 right-5 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle {isLightMode ? 'Dark' : 'Light'} Mode
      </button> */}

      <Container className={`flex flex-wrap p-5 md:p-10`}>
        <div className="flex items-center w-full lg:w-1/2 mb-5 lg:mb-0">
          <div className="max-w-full lg:max-w-2xl mx-5 lg:mx-15 my-10 lg:my-25">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-snug tracking-tight text-gray-800 text-yellow-500 py-4">
            Savor the moment, share the experience
            </h1>
            <p className="text-lg md:text-xl lg:text-xl xl:text-2xl leading-normal text-gray-600 py-5 mb-2">
            La Fresca is inspired by the joy of bringing people together over exceptional coffee. With a passion for quality, paired with a welcoming vibe, we’re here to make each cup and each moment memorable.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 items-start sm:items-center space-y-3 sm:space-y-0">
              <a
                href="/menuItems"
                rel="noopener"
                className="px-5 py-2.5 text-lg font-medium text-center text-white bg-yellow-500 rounded-md"
              >
                Explore menu
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <img
            src={HeroImg}
            alt="Hero Image"
            width={325}
            height={325}
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg"
          />
        </div>
      </Container>

      <Container className={`flex flex-wrap  p-5 md:p-10`}>
        <div className="flex items-center w-full lg:w-1/2 mb-5 lg:mb-0">
          <div className="max-w-full lg:max-w-2xl mx-5 lg:mx-15 my-10 lg:my-25">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-snug tracking-tight text-gray-800 text-yellow-500 py-4">
              About Us
            </h1>
            <div className="text-lg md:text-xl w-full">
              <ReadMore
                id="read-more-text"
                text="At La Fresca, we’re more than just a cafe; we’re a place where great coffee meets warm hospitality. 
                Our journey began with a commitment to quality and customer satisfaction, and it’s that dedication that 
                has quickly made us a favorite among coffee lovers. As we continue to grow, our focus remains on delivering 
                a consistent, high-quality experience across all our locations. Blending traditional charm with a modern approach 
                to cafe culture, La Fresca is where passion for good coffee and great service come together."
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <img
            src={chefImg}
            alt="Chef Image"
            width={325}
            height={325}
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg"
          />
        </div>
      </Container>

      <Container>
        <Menus />
      </Container>

      <Container>
        <Gallery />
      </Container>

      <Container>
      <div className="grid bg-black w-full h-[350px] absolute left-0">
  <div className="flex text-gray-300 h-full">
    {/* Branding Section (Left) */}
    <div className="w-1/3 flex flex-col justify-center items-center bg-black">
      <img
        src={Logo}
        alt="La Fresca Logo"
        className="w-28 h-28"
      />
      <div className="text-5xl font-bold mt-4 uppercase text-white">La Fresca</div>
      <div className="mt-2 text-base italic text-gray-400">
      Where Every Sip is a Fresh Start 
      </div>
      <p className=''>©2024  <span className='text-yellow-500'>2024 Lafresca cafe</span> </p>
    </div>

    {/* Info Section with Footer Image */}
    <div className="w-2/3 relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('@images/footer/footer.jpg')] bg-no-repeat bg-cover bg-center"
        aria-hidden="true"
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* Content Over the Image */}
      <div className="relative p-10 grid grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-black/50 p-6 rounded-md">
          <div className="text-4xl font-bold uppercase tracking-wide text-white">
            Contact Us
          </div>
          <div className="mt-4 text-lg text-white">Phone: +94 112 345 678</div>
          <div className="text-lg">
            <Link to="mailto:thecafe.lafresca@gmail.com" className="text-yellow-400 underline">
            thecafe.lafresca@gmail.com
            </Link>
          </div>
          <div className="mt-4 text-lg text-gray-300">
            <p className='text-white'>Address:</p>
            <p>No. 25, Coffee Lane, Colombo 7</p>
          </div>
        </div>

        {/* Café Info */}
        <div className="bg-black/50 p-6 rounded-md">
          <div className="text-4xl font-bold uppercase tracking-wide text-white">
            Café Info
          </div>
          <div className="mt-4 text-lg text-gray-300">
            <p>Opening Hours:</p>
            <p>Mon - Fri: 7:00 AM - 10:00 PM</p>
            <p>Sat - Sun: 8:00 AM - 11:00 PM</p>
          </div>
          <div className="mt-4">
            <Link to="/menuItems" className="text-yellow-400 underline text-lg">
              View Our Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>







        {/* <div className="flex items-center justify-center w-full lg:w-1/2 mb-5 lg:mb-0">
      <img src={ContactUs} alt="contact us" width={450} height={450} className="w-full max-w-xs sm:max-w-md lg:max-w-lg" />
    </div>

        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-full lg:max-w-2xl mx-5 lg:mx-15 my-10 lg:my-25">
            <h3 className="text-lg md:text-xl xl:text-2xl font-bold tracking-tight text-gray-800 py-4">
              Working Hours
            </h3>
            <p className="text-lg md:text-xl lg:text-xl xl:text-2xl leading-normal text-gray-600 py-5 mb-2">
              Optimize your café operations with our comprehensive management
              system,
            </p>

            <h3 className="text-lg md:text-xl xl:text-2xl font-bold tracking-tight text-gray-800 py-4">
              Locations
            </h3>
            <p className="text-lg md:text-xl lg:text-xl xl:text-2xl leading-normal text-gray-600 py-5 mb-2">
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
    </div> */}
      </Container>
    </>
  );
};

export default HomePage;
