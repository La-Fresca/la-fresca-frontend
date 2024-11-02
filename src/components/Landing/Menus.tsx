"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../../components/Landing/images-slider";
import { TitleBox } from "./TitleBox";

const Menus = () => {
    return (
        <div className="dark:bg-black bg-white h-screen relative flex flex-col justify-center items-center">
            <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    filter: "brightness(50%)",
                }}
                alt="Background"
            />

            {/* TitleBox for "find our Menus" centered on small screens with 95% width */}
            <TitleBox
                title="find our Menus"
                subtitle="la Fresca cafe"
                button="EXPLORE Now"
                ClassName="absolute md:right-20 md:top-20 w-[95%] md:w-[50%] h-[40%] md:h-[50%] bg-yellow-500 p-4 md:p-8 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:translate-y-0 md:translate-x-0"
                URLLink="/gallery"
            />

            {/* Second TitleBox hidden on small screens */}
            <TitleBox
                title=""
                subtitle=""
                button=""
                ClassName="hidden md:block absolute left-4 top-60 md:left-10 w-[80%] md:w-[50%] h-[40%] md:h-[55%] bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
                URLLink="/fooditems"
            />
        </div>
    );
};

export default Menus;
