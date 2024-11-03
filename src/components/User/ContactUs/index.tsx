import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Food from '../../../assets/food.jpg';

function index() {
  return (
    <div>
      <div className="text-4xl text-foodbg dark:text-white mx-auto max-w-screen-xl px-4 2xl:px-0">
        <b>Contact Us</b>
      </div>
      <div className="mt-2 mx-auto max-w-screen-xl px-4 2xl:px-0">
        Enjoy great savings with exclusive deals and offers available on your
        favorite items.
      </div>

      <div className="mx-auto max-w-screen-xl mt-10">
        Hello
      </div>
    </div>
  );
}

export default index;
