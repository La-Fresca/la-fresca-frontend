import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import WaiterCard from "./WaiterCard";

export default function AssignWaiter() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#000000] bg-[#000000] dark:bg-[#000000] text-[#FFFFFF]",
                    header: "border-b-[1px] border-[#FDAD13]",
                    footer: "border-t-[1px] border-[#FDAD13]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                style={{ width: 'auto', maxWidth: '80%', height:'auto', maxHeight:'70%', margin: '0 auto' }}
            >
                <ModalContent className="pb-6">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-3xl">Assign a Waiter</ModalHeader>
                            <ModalBody className="overflow-auto">
                                <div className="flex justify-center">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
                                        <WaiterCard />
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
