import React, { useEffect, useState } from 'react';
import { useBranches } from '@/api/useBranch';
import { Branch } from '@/types/branch';
import { Button } from '@nextui-org/react';
import { ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';

function index() {
  const { getAllBranches } = useBranches();
  const [branch, setBranch] = useState<Branch[]>([]);

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

      <div className="mx-auto max-w-screen-xl flex w-[100%] rounded-xl py-10">
        <div className="w-[50%] px-10 pr-20">
          <form className="rounded h-[100%] px-10">
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
                className="mt-1 block w-full px-5 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-xl bg-[#28282877] border border-[rgb(174 183 192 / 1]"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="mt-1 block w-full px-5 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-xl bg-[#28282877] border border-[rgb(174 183 192 / 1]"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full px-5 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-xl bg-[#28282877] border border-[rgb(174 183 192 / 1]"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="name"
                className="mt-1 block w-full px-5 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-xl bg-[#28282877] border border-[rgb(174 183 192 / 1]"
              />
            </div>
            <div className="text-right">
              <Button
                className="bg-gradient-to-r from-orange-600 hover:from-orange-400 to-orange-400 hover:to-orange-600 text-white shadow-lg rounded-lg h-8 mt-8 px-10"
                type="submit"
              >
                Send
              </Button>
            </div>
          </form>
        </div>

        <div className="w-[50%] px-10">
          {branch.map((item: any) => {
            return (
              <div className="leading-loose">
                <b className="">{item.name}</b>
                <br />
                <p className="flex items-center">
                  <MapPinIcon className="w-5 h-5" />
                  &nbsp;{item.address}
                </p>
                <p className="flex items-center">
                  <ClockIcon className="w-5 h-5" />
                  &nbsp;9 am - 10 pm
                </p>
                <p className="flex items-center">
                  <PhoneIcon className="w-5 h-5 pl-[2px]" />
                  &nbsp;{item.phone}
                </p>
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
