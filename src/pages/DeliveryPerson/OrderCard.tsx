import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Button } from "flowbite-react";

export default function orderCard({
    title,
    subtitle,
    cardImage,
    text
}: {
    title: string,
    subtitle: string,
    cardImage: string,
    text: string
}) {
    return (
        <Card className="max-w-[400px] border rounded-xl border-warning py-3">
            <CardHeader className="flex gap-3">
                <Image
                    alt="waiter"
                    height={100}
                    radius="sm"
                    src={cardImage}
                    width={100}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />

                <div className="flex flex-col">
                    <p className="text-xl font-medium">{title}</p>
                    <p className="text-slate-300 text-small text-default-500">Destination: {subtitle}</p>
                    <p className="text-slate-300 text-small text-default-500">{text}</p>
                </div>
            </CardHeader>
            
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
