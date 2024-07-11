import React from 'react'
import { OrderCard } from './OrderCard'
import { OrderDetails } from './OrderDetails'

export const OrderHistory = () => {
  return (
    <div className='flex flex-row w-screen px-10'>
      <div className='w-[40%] flex flex-col mx-10'>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      </div>
      <div className='w-[60%] flex flex-col mx-10'>
      <OrderDetails />
      </div>
      
    </div>
  )
}
