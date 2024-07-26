import FoodComboCard from '@/components/User/FoodCombo/index.tsx';
import { useParams } from 'react-router-dom';

const FoodCombo: React.FC = () => {
  const { comboId } = useParams<{ comboId?: string }>();
  return <FoodComboCard id={comboId} />;
};
export default FoodCombo;
