import { OrderTable } from '@/modules/order'
import React from 'react'

const OrderPage = () => {
  return (
    <section>
      <h1 className="text-5xl my-5">Order</h1>
      <OrderTable />
    </section>
  );
}

export default OrderPage