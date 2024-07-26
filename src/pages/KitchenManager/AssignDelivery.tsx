import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import WaiterCard from "./WaiterCard";

var waiters = [
    {
        deliveryId: 1,
        deliveryName: "Delivery 1",
        deliveryImage: "https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        deliveryStatus: "Not Available"
    },
    {
        deliveryId: 2,
        deliveryName: "Delivery 2",
        deliveryImage: "https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        deliveryStatus: "Available"
    },
    {
        deliveryId: 3,
        deliveryName: "Delivery 3",
        deliveryImage: "https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        deliveryStatus: "Available"
    },
    {
        deliveryId: 4,
        deliveryName: "Delivery 4",
        deliveryImage: "https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        deliveryStatus: "Available"
    },
    {
        deliveryId: 5,
        deliveryName: "Delivery 5",
        deliveryImage: "https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        deliveryStatus: "Absent"
    },
]

export default function AssignDelivery() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Sort the waiters based on their status
    const sortedWaiters = waiters.sort((a, b) => {
        const statusOrder: { [key: string]: number } = { "Available": 1, "Not Available": 2, "Absent": 3 };
        return statusOrder[a.deliveryStatus] - statusOrder[b.deliveryStatus];
    });

    return (
        <>
            <Button onPress={onOpen} color="secondary">Open Modal</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#000000]/50 backdrop-opacity-40",
                    base: "border-[#000000] h-full w-full bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 text-[#FFFFFF]",
                    header: "border-b-[1px] border-[#FDAD13]",
                    footer: "border-t-[1px] border-[#FDAD13]",
                    closeButton: "hover:bg-white/5 active:bg-white/10 text-3xl pt-3 pr-3",
                }}
                style={{ width: 'auto', maxWidth: '80%', height:'auto', maxHeight:'70%', margin: '0 auto' }}
            >
                <ModalContent className="pb-6">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-3xl ">Assign a Delivery Person</ModalHeader>
                            <ModalBody className="overflow-auto">
                                <div className="flex justify-center">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {waiters.map((waiter) => (
                                            <WaiterCard
                                                waiterId={waiter.deliveryId}
                                                waiterName={waiter.deliveryName}
                                                waiterImage={waiter.deliveryImage}
                                                waiterStatus={waiter.deliveryStatus}
                                            />
                                        ))}
                                        {/* <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard /> */}
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
