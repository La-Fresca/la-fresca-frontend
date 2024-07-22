import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Button } from "flowbite-react";

export default function WaiterCard() {
    return (
        <Card className="max-w-[400px] border rounded-xl border-warning py-3">
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={100}
                    radius="sm"
                    src="https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={100}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />

                <div className="flex flex-col">
                    <p className="text-2xl font-medium">Waiter Name</p>
                    <p className="text-slate-300 text-small text-default-500">Available</p>
                </div>

            </CardHeader>
            <Divider />
            <CardBody>
                <Button
                    className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg py-1 px-10 !text-4xl" >
                    Assign
                </Button>

                {/* <Button className="bg-[#FDAD13] shadow-lg shadow-indigo-500/20">Assign</Button> */}
                {/* <p>Make beautiful websites regardless of your design experience.</p> */}
            </CardBody>
            <Divider />
            {/* <CardFooter>
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
