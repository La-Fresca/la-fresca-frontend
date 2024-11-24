import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { useBranches } from '@/api/useBranch';
import { useQuery } from '@tanstack/react-query';
import { Branch } from '@/types/branch';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Props {
  id: string | undefined;
}

export default function BranchDropdown({ id }: Props) {
  const { getAllBranches } = useBranches();
  const [branchName, setBranchName] = useState<string | undefined>();

  // Fetch branches
  const branchQuery = useQuery({
    queryKey: ['branches'],
    queryFn: getAllBranches,
  });

  const navigate = useNavigate();

  const view = (branchId: string | null | undefined) => {
    if (branchId) {
      navigate(`/top-level-manager/branches/view/${branchId}`);
    }
  };

  // Ensure the query hook is always used, even when loading
  const branches: Branch[] = branchQuery.data || []; // Fallback to empty array when loading
  const branch = branches.find((b) => b.id === id);

  // Set branch name once the data is available
  useEffect(() => {
    if (branch) {
      setBranchName(branch.address);
    }
  }, [branch]);

  if (branchQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute top-[85px] z-50 border rounded-xl text-black border-stroke bg-white shadow-default dark:border-strokedark dark:bg-meta-4 dark:text-white">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            {branchName || 'Overall'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="dark:bg-[#373737] bg-white rounded-lg dark:text-white text-[#3a3a3a] border border-[#b3b3b360] shadow-default">
          {branches.length > 0 ? (
            branches.map((branch) => (
              <DropdownItem
                key={branch.id}
                className={
                  branch.id === id
                    ? 'bg-[#aaaaaa5b] rounded-lg text-[#535353] dark:text-white'
                    : 'hover:bg-[#aaaaaa17] rounded-lg'
                }
                onClick={() => view(branch.id)}
              >
                {branch.address}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem className="hover:bg-[#aaaaaa17] rounded-lg">
              No branches available
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
