import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Divider, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { OrderCard } from '@/components/User/OrderHistory/OrderCard';
import OrderCardSmall from './OrderCardSmall';
import IntegerOnlyDemo from './IntegerOnlyOTP';
import { useNavigate } from 'react-router-dom';
import { useOrders } from "@/api/useOrders";
import { Order } from "@/types/order";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const orderItems = [
    {
        id: 1,
        name: "Penne with Vodka Sauce and Mini Meatballs",
        features: ["Penne", "Vodka Sauce", "Mini Meatballs"],
        price: 1000,
        quantity: 1,
    },
    {
        id: 2,
        name: "Penne with Vodka Sauce and Mini Meatballs",
        features: ["Penne", "Vodka Sauce", "Mini Meatballs"],
        price: 1000,
        quantity: 1,
    }
];

const orderItemsRow = orderItems.map((item) => {
    return (
        <div key={item.id}>
            <div className="flex flex-row justify-between">
                <p className='text-lg font-semibold'>{item.name}</p>
                <p>{item.price}</p>
            </div>
            <div className="flex flex-row justify-between">
                <p>{item.features.join(' | ')}</p>
                <p>Qty: {item.quantity}</p>
            </div>
        </div>
    );
});

export const OnDelivery: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [modalPlacement, setModalPlacement] = useState("bottom-center");
    const [otp, setOTP] = useState("");
    const [orderDetails, setOrder] = useState({} as Order);
    const {getonDeliveryOrdersByDeliveryPersonId} = useOrders();
    const userId = (useAuthUser() as { userId: string }).userId;

    const handleDeliverOrder = () => {
        setIsPopupOpen(true);
        isOpen && onOpenChange();
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        !isOpen && onOpenChange();
    };

    const OTPConfirm = () => {
        setIsPopupOpen(false);
    };

    const handleOTPChange = (otp: string) => {
        console.log("Entered OTP:", otp);
        if (otp.length === 4) {
            // OTPCheck(otp);
            setOTP(otp);
        }
    };

    const fetchStocks = async () => {
        try {
            const data = await getonDeliveryOrdersByDeliveryPersonId(userId);
            setOrder(data);
            console.log(data);
        } catch (error: any) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    const navigate = useNavigate();

    const OTPCheck = () => {
        // const otp = "1234";
        console.log("OTP:", otp);
        if(otp === "1234" || otp === "1030" || otp === "2343" || otp === "4873") {
            console.log("OTP Confirmed");
            navigate('../');
            // navigate('./');
        }
        else {
            console.log("OTP not Confirmed");
            // navigate('./');
        }
    };



    return (
        <div className="relative h-screen">
            <div className="absolute top-0 left-0 w-full h-full">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.611907249691!2d79.8611529!3d6.9022055!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25963120b1509%3A0x2db2c18a68712863!2sUniversity%20of%20Colombo%20School%20of%20Computing%20(UCSC)!5e0!3m2!1sen!2slk!4v1721847025255!5m2!1sen!2slk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-full flex justify-center items-end">
                <div className="w-[90%] pt-2 bottom-0 bg-black text-white bg-opacity-100 rounded-lg shadow-lg mb-30" onClick={onOpen}>
                    <OrderCardSmall />
                </div>
            </div>
            <div>
                <Modal
                    isOpen={isOpen}
                    placement="bottom-center"
                    onOpenChange={onOpenChange}
                    className='bg-black border border-black rounded-lg text-white'
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <p className="text-center text-lg justify-self-start font-bold mt-5">Order Id: 839932</p>
                                <ModalHeader className="flex flex-col gap-0 text-2xl">Ravindu Haasnakke</ModalHeader>
                                {/* <div className="flex flex-row justify-start items-center ml-5">
                                    <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <p>4.9</p>
                                </div> */}
                                <ModalBody className="overflow-y-auto max-h-96 pt-1">
                                    <div className='flex flex-row justify-between'>
                                        <p>Order Time</p>
                                        <p>12.00 PM </p>
                                    </div>
                                    <div className='flex flex-row justify-between'>
                                        <p>Order Pickup time</p>
                                        <p>12.20 PM</p>
                                    </div>
                                    <Divider className="my-4 bg-white h-0.5" />

                                    <p>Order Items</p>
                                    <div className="flex flex-col gap-2">
                                        {orderItemsRow}
                                    </div>

                                    <Divider className="my-4 bg-white h-0.5" />

                                    <p>Order Summary</p>
                                    <div className="flex flex-row justify-between">
                                        <p className='text-lg font-semibold'>Total Amount</p>
                                        <p>$5554</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className='text-lg font-semibold'>Discount</p>
                                        <p>(20%) - $1109.40</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className='text-lg font-semibold'>Delivery</p>
                                        <p>$0.00</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p className='text-lg font-semibold'>Tax</p>
                                        <p>+$221.88</p>
                                    </div>
                                    <Divider className="my-4 bg-black opacity-50 h-0.5" />
                                    <div className="flex flex-row justify-between">
                                        <p className='text-xl font-bold'>Total</p>
                                        <p className='text-xl font-bold'>+$0.0</p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={handleDeliverOrder} className='text-white'>
                                        Deliver Order
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                <Modal
                    isOpen={isPopupOpen}
                    onOpenChange={setIsPopupOpen}
                    className='bg-black border border-black rounded-lg text-white'
                >
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-0 text-2xl">Enter the Customer's code </ModalHeader>
                        <IntegerOnlyDemo onOTPChange={handleOTPChange} />
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={closePopup}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={OTPCheck} className='text-white'>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
