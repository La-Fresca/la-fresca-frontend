import Complaint from "@/components/BranchManager/Complaint/index";
import { useParams } from 'react-router-dom';

const view: React.FC = () => {
  const { complaintId } = useParams<{ complaintId?: string }>();
  console.log(complaintId);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
        <Complaint id={complaintId} />
      </div>
    </>
  );
};

export default view;
