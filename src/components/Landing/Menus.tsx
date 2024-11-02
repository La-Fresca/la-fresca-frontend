"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../../components/Landing/images-slider";
import { TitleBox } from "./TitleBox";

const Menus = () => {
    return (
        <div className="dark:bg-black bg-white h-screen relative flex items-center justify-center">
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

            {/* Centered TitleBox for "find our Menus" */}
            <TitleBox
                title="find our Menus"
                subtitle="la Fresca cafe"
                button="EXPLORE Now"
                ClassName="absolute w-[95%] md:w-[50%] h-auto p-4 md:p-8 bg-yellow-500 text-center"
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
