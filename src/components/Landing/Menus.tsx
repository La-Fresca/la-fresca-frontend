"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../../components/Landing/images-slider";
import { TitleBox } from "./TitleBox";

const Menus = () => {

    return (
        <div className="dark:bg-black bg-white h-screen relative">
<img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  style={{ width: "100vw", height: "100vh", objectFit: "cover", position: "absolute", top: 0, left: 0, filter: "brightness(50%)" }}
/>

            <TitleBox title={"find our Menus"} subtitle={"la Fresca cafe"} button={"eXPLORE Now"} ClassName={"absolute right-0 top-20 right-20 w-[50%] h-[50%] bg-yellow-500 "} URLLink="/gallery" />
            <TitleBox
                title={""}
                subtitle={""}
                button={""}
                ClassName={"absolute left-0 top-70 left-10 w-[50%] h-[55%] bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"}
                URLLink="/fooditems"
            />

        </div>
    );
}

export default Menus;
