import FoodItemCard from '@/components/User/FoodItem/index.tsx';
import { useParams } from 'react-router-dom';

const FoodItem: React.FC = () => {
  const { itemId } = useParams<{ itemId?: string }>();
  return <FoodItemCard id={itemId} />;
};
export default FoodItem;
