import { Button } from '@nextui-org/react';

interface Props {
  value: string;
  onClick?: () => void;
}

export default function TextButton({ value, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 mt-8 px-10"
    >
      {value}
    </Button>
  );
}
