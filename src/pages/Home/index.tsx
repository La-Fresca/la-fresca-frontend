import React, { useState } from 'react';
import { Container } from '../../components/User/Container';
import HeroImg from '../../images/Landing/Hero.png';
import ContactUs from '../../images/Landing/contact.png';
import chefImg from '@/images/Landing/chef.png';
import Gallery from '@/components/Landing/Gallery';
import Menus from '@/components/Landing/Menus';
import { ReadMore } from '@/components/User/NavbarHome/readMore';
import { Link } from 'react-router-dom';
import FB from '@images/footer/FB.svg';
import IG from '@images/footer/IG.svg';
import X from '@images/footer/X.svg';

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
              Seamless Café Operations
            </h1>
            <p className="text-lg md:text-xl lg:text-xl xl:text-2xl leading-normal text-gray-600 py-5 mb-2">
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
        <div className="grid bg-[black] w-[100vw] h-[350px] absolute left-0">
          <div className="flex text-[#e3e3e3]">
            <div className="w-[30vw] grid justify-center m-auto bg-[black] leading-loose">
              <div className="text-5xl font-black">GET IN TOUCH</div>
              <div className="mt-4">Phone: 0123456789</div>
              <div>
                or <Link to="">send us an email</Link>
              </div>
              <div className="flex mt-4">
                <div className="rounded-full h-[35px] w-[35px] bg-foodbg flex justify-center items-center mx-1">
                  <img className="w-[20px] h-[20px]" src={FB} alt="" />
                </div>
                <div className="rounded-full h-[35px] w-[35px] bg-foodbg flex justify-center items-center mx-1">
                  <img className="w-[20px] h-[20px]" src={IG} alt="" />
                </div>
                <div className="rounded-full h-[35px] w-[35px] bg-foodbg flex justify-center items-center mx-1">
                  <img className="w-[20px] h-[20px]" src={X} alt="" />
                </div>
              </div>
            </div>
            <div className="w-[70vw] bg-[url('@images/footer/footer.jpg')] bg-no-repeat bg-cover bg-center">
              <div className="bg-gradient-to-r from-[black] to-[#00000084] w-[100%] h-[100%] pt-[85px] pl-[200px]">
                <div className="text-5xl font-black">WE'RE HIRING!</div>
                <div className="mt-4">
                  Want a job?{' '}
                  <Link to="mailto:" className="italic underline text-warning">
                    Email your CV
                  </Link>
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
