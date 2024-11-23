import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { SelectorIcon } from './SelectorIcon';
// import WaiterCard from "./WaiterCard";

export const branches = [
    { label: 'Colombo', value: 'colombo', description: 'Main branch located in the capital city' },
    { label: 'Kandy', value: 'kandy', description: 'Located in the hill capital of Sri Lanka' },
    { label: 'Galle', value: 'galle', description: 'Southern coastal branch with a historic touch' },
    { label: 'Jaffna', value: 'jaffna', description: 'Northern branch in the Tamil cultural hub' },
    { label: 'Kurunegala', value: 'kurunegala', description: 'Branch in the northwestern province' },
    { label: 'Anuradhapura', value: 'anuradhapura', description: 'Branch in the ancient capital city' },
    { label: 'Trincomalee', value: 'trincomalee', description: 'Eastern branch with scenic beaches' },
    { label: 'Ratnapura', value: 'ratnapura', description: 'Branch in the gem mining region' },
    { label: 'Nuwara Eliya', value: 'nuwara-eliya', description: 'Central branch in the hill country' },
    { label: 'Batticaloa', value: 'batticaloa', description: 'Branch in the eastern coastal city' },
    { label: 'Matara', value: 'matara', description: 'Southern branch near the coastal belt' },
    { label: 'Polonnaruwa', value: 'polonnaruwa', description: 'Branch in the ancient royal city' },
    { label: 'Hambantota', value: 'hambantota', description: 'Branch in the southern development hub' },
  ];
  

export default function AssignWaiter() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Fixed `useDisclosure` destructuring.
  
  const handleSelectionChange = (selected: any) => {
    console.log('Selected branch:', selected);
  };

  return (
    <>
      <Button onPress={onOpen} color="secondary">
        Open Modal
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={(isOpen) => (isOpen ? onOpen() : onClose())}
        radius="lg"
        classNames={{
          // Set modal background to black and text to white
          base: 'bg-black text-white border-[#FFFFFF] h-[80%] w-full rounded-xl',
          header: 'border-b-[1px] border-[#FDAD13]',
          footer: 'border-t-[1px] border-white',
          closeButton: 'hover:bg-white/10 active:bg-white/20 text-white text-3xl pt-3 pr-3',
        }}
      >
        <ModalContent className="pb-6">
          <ModalHeader className="flex flex-col gap-1 text-3xl pr-20">
            Please Select a branch
          </ModalHeader>
          <ModalBody className="overflow-hidden">
            <div className="flex justify-center">
            <Autocomplete
                label="" // Removed the label to simplify the UI.
                placeholder="Search a branch"
                defaultItems={branches}
                labelPlacement="outside"
                className="max-w-xs w-full mt-5 text-white border border-white rounded-lg" // Added white border
                disableSelectorIconRotation
                selectorIcon={<SelectorIcon />}
                onSelectionChange={handleSelectionChange} 
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.value}
                    className="text-white bg-black hover:bg-gray-800"
                  >
                    {/* Added styling for white text and hover effect */}
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
