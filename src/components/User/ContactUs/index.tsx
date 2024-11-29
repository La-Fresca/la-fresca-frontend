import React, { useEffect, useState } from 'react';
import { useBranches } from '@/api/useBranch';
import { Branch } from '@/types/branch';


function index() {
  const { getAllBranches } = useBranches();
  const [branch, setBranch] = useState<Branch[]>([]);
  // const branches = [
  //   {
  //     name: 'Dehiwala',
  //     address: '220 Galle Road Mount Lavinia, Sri Lanka 10370',
  //     hours: '9am to 11pm',
  //     phone: '1234',
  //   },
  //   {
  //     name: 'Dehiwala',
  //     address: '220 Galle Road Mount Lavinia, Sri Lanka 10370',
  //     hours: '9am to 11pm',
  //     phone: '1234',
  //   },
  //   {
  //     name: 'Dehiwala',
  //     address: '220 Galle Road Mount Lavinia, Sri Lanka 10370',
  //     hours: '9am to 11pm',
  //     phone: '1234',
  //   }
  // ];

  const fetchBranch = async () => {
    try {
      const data = await getAllBranches();
      setBranch(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  console.log(branch);

  return (
    <div>
      <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
        <b>Contact Us</b>
      </div>
      <div className="mt-2 mx-auto max-w-screen-xl px-4 2xl:px-0">
        Reach out for any questions, feedback, or support—we’re here to help!
      </div>

      <div className="mx-auto max-w-screen-xl mt-10 flex">
      <div className="">
          <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="available"
                className="block text-sm font-medium text-gray-700"
              >
                Available
              </label>
              <input type="checkbox" id="available" className="mt-1" />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        
        <div className="">
          {branch.map((item: any) => {
            return (
              <div className="className">
                <b>{item.name}</b>
                <br />
                <p>{item.address}</p>
                <p>{item.hours}</p>
                <p>{item.phone}</p>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


export default index;
