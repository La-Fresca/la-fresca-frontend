import React from 'react';
import { Container } from "../../components/User/Container";
import { ReadMore } from '../../components/User/ReadMoreBtn';
import  HeroImg  from "../../images/Landing/Hero.png"
import  ChefImg from "../../images/Landing/chef.png"
import  ContactUs from "../../images/Landing/contact.png"
import BackgroundImage from '../../images/Landing/background.png';
import AboutUsImage from '../../images/Landing/aboutuss.jpg';

const HomePage: React.FC = () => {
    return (
        <>
              <Container>
                <div 
                  className="flex flex-wrap bg-black p-10"
                  style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                                            
                <div className="flex items-center lg:w-1/2">
                  <div className="max-w-2xl mx-15 my-25">
                    <h1 className="text-2xl py-4 font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight text-yellow-500">
                    Seamless Café Operations
                    </h1>
                    <p className="mb-2 py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl text-white">
                    Optimize your café operations with our comprehensive management system, 
                    designed to enhance efficiency and elevate customer satisfaction.
                    </p>
        
                    <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                      <a
                        href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                        target="_blank"
                        rel="noopener"
                        className="px-5 py-2.5 text-lg font-medium text-center text-white bg-yellow-500 rounded-md ">
                        Explore menu
                      </a>
                      
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:w-1/2">
                  <img
                    src={HeroImg}
                    alt="Hero Image"
                    width={425}
                    height={425}
                 />

                </div>
              </div>
              </Container>

              <Container className="flex flex-wrap p-2 bg-black">
                  

                <div className="flex items-center lg:w-230 bg-black pl-10 ml-2">
                  <div className="max-w-2xl mx-15 my-15">
                    <h1 className="text-2xl py-4 font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight text-white">
                    About Us
                    </h1>
                    <div className="w-150">
                      <ReadMore 
                      id="read-more-text" 
                      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, 
                            illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, 
                            illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis
                            illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, 
                            illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, 
                            illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis
                            illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis. Temporibus odit, pariatur corporis ipsa odio officia tenetur? 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae perspiciatis eligendi, similique quisquam esse aliquam possimus, illum quaerat eaque illo dolor officiis" 
                            
                            />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:w-auto ">
                  <img
                    src={AboutUsImage}
                    alt="Aboutus Image"
                    width={600}
                    height={500}
                 />

                </div>

              </Container>


              <Container>
              
              <div 
                  className="flex flex-wrap bg-black p-10"
                  style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
               
                <div className="flex items-center justify-center lg:w-1/2">
                  <img
                    src={ChefImg}
                    alt="Chef Image"
                    width={500}
                    height={500}
                 />

                </div>

                <div className="flex items-center lg:w-1/2">
                  <div className="max-w-2xl mx-15 my-25">
                    <h1 className="text-2xl py-4 font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight text-yellow-500">
                    What We Believe In 
                    </h1>
                    <p className="mb-2 py-10 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl text-white">
                    Optimize your café operations with our comprehensive management system, 
                    designed to enhance efficiency and elevate customer satisfaction.
                    Optimize your café operations with our comprehensive management system, 
                    designed to enhance efficiency and elevate customer satisfaction.
                    </p>
        
                    <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                      <a
                        href=""
                        target="_blank"
                        rel="noopener"
                        className="px-5 py-2.5 text-lg font-medium text-center text-white bg-yellow-500 rounded-md hover:visited:bg-yellow-300 ">
                        Explore menu
                      </a>
                      
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            

              <Container className="flex flex-wrap bg-black p-10">
                
                <div className="flex items-center justify-center lg:w-1/2">
                  <img
                    src={ContactUs}
                    alt="contact us"
                    width={650}
                    height={650}
                 />

                </div>

                <div className="flex items-center lg:w-1/2">
                  <div className="max-w-2xl mx-15 my-25">
                    <h3 className="text font-bold leading-snug tracking-tight xl:text-2xl text-yellow-500 ">
                        Working Hours 
                    </h3>
                    <p className="mb-2 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl text-white py-5">
                    Optimize your café operations with our comprehensive management system, 

                    </p>

                    <h3 className="text font-bold leading-snug tracking-tight xl:text-2xl text-yellow-500 ">
                        Locations 
                    </h3>
                    <p className="mb-2 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl text-white py-5">
                    123, ABC Road, XYZ City, Country
                    256, DEF Road, UVW City, Country
                    789, GHI Road, RST City, Country
                    </p>

                    <h3 className="text font-bold leading-snug tracking-tight xl:text-2xl text-yellow-500 ">
                        Contact Us 
                    </h3>
                    <p className="mb-2 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl text-white py-5">
                    011-1234567 | 011-1234567 | 011-1234567
                    </p>
        
                   
                  </div>
                </div>
              </Container>
    </>


              

              
    );
}
export default HomePage;