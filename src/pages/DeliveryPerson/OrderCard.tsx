import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Button } from "flowbite-react";

export default function orderCard({
    waiterId,
    waiterName,
    waiterImage,
    waiterStatus
}: {
    waiterId: number,
    waiterName: string,
    waiterImage: string,
    waiterStatus: string
}) {
    return (
        <Card className="max-w-[400px] border rounded-xl border-warning py-3">
            <CardHeader className="flex gap-3">
                <Image
                    alt="waiter"
                    height={100}
                    radius="sm"
                    src={waiterImage}
                    width={100}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />

                <div className="flex flex-col">
                    <p className="text-xl font-medium">#2030332</p>
                    <p className="text-slate-300 text-small text-default-500">Destination: Nugegoda</p>
                    <p className="text-slate-300 text-small text-default-500">Completed at 1.30 PM</p>
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
