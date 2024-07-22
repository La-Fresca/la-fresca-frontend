import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Button } from "flowbite-react";

export default function WaiterCard({
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
                    <p className="text-2xl font-medium">{waiterName}</p>
                    <p className="text-slate-300 text-small text-default-500">{waiterStatus}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                {waiterStatus === "Available" ? (
                    <Button
                        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg px-10 !text-4xl">
                        Assign
                    </Button>
                ) : waiterStatus === "Absent" ? (
                    <Button
                        className="bg-gray text-white shadow-lg rounded-lg px-10 !text-4xl"
                        disabled>
                        Absent
                    </Button>
                ) : (
                    <Button
                        className="bg-gray text-white shadow-lg rounded-lg px-10 !text-4xl">
                        Not Available
                    </Button>
                )}
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
