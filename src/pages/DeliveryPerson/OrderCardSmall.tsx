import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function OrderCardSmall() {
  return (
    <Card className="max-w-full">
        <div className="flex flex-row justify-center">
            <ChevronUpIcon className="h-4 w-6"/>
            {/* <p className='text-lg font-semibold'>^</p> */}
            {/* <p>1000</p> */}
        </div>
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={60}
          radius="sm"
          src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/12/3/FNM070116_Penne-with-Vodka-Sauce-and-Mini-Meatballs-recipe_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1465939620872.jpeg"
          width={60}
          className="object-cover"
        />
        <div className="flex flex-col">
          <p className="text-md font-extrabold">Order # 010102</p>
          <p className="text-small text-default-600 font-semibold">Thimbirigasyaya</p>
        </div>
      </CardHeader>
      {/* <Divider/>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter> */}
    </Card>
  );
}
