import React from 'react'
import { OrderCard } from './OrderCard'

export const OrderHistory = () => {
  return (
    <div className='flex flex-row w-screen px-10'>
      <div className='flex flex-col mx-10'>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      </div>
      <div>
      <OrderCard />
      </div>
      
    </div>
  )
}
