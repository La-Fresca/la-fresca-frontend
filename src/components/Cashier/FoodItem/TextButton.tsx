import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

interface Props {
  value: string;
}

export default function TextButton({ value }: Props) {
  const navigate = useNavigate();
  return (
    <Button
      className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg h-8 mt-8 px-10"
      onClick={() => navigate('/cashier')}
    >
      {value}
    </Button>
  );
}
