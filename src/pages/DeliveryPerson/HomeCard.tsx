import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function HomeCard({className, title, stat}: {className?: string, title?: string, stat?: string}) {
  return (
    <Card
      className="py-4 text-white flex flex-row items-center justify-start gap-5 px-5 border-2 border-primary rounded-xl"
      
    >
        {/* <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui.org/images/hero-card-complete.jpeg"
            width={100}
        /> */}
        <div className="flex flex-col justify-center">

        {/* <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"> */}
            <p className="text-2xl font-medium">{title}</p>
            {/* <small className="text-default-500">{stat}</small> */}
            <h4 className="font-bold text-xl">{stat}</h4>
            </div>
      {/* <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody> */}
    </Card>
  );
}
