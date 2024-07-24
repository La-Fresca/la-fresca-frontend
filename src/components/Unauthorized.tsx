import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      <h1>Unauthorized</h1>
      <Button
        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white shadow-lg rounded-lg"
        onClick={goBack}
      >
        Bo Back
      </Button>
    </div>
  );
};

export default Unauthorized;
