import React from "react";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { Button } from "flowbite-react";

interface OrderCardProps {
    title: string;
    subtitle: string;
    cardImage: string;
    text: string;
    buttonTitle?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ title, subtitle, cardImage, text, buttonTitle }) => {
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
            
            <Divider />
            <CardBody>
                {buttonTitle && (
                    <Button
                        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg px-10 !text-4xl">
                        {buttonTitle}
                    </Button>
                )}
            </CardBody>
        </Card>
    );
};

export default OrderCard;
