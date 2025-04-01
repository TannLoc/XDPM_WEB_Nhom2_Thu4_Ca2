import CustomerTable from '@/modules/customer'
import React from 'react'

const CustomerPage = () => {
  return (
    <section>
      <h1 className="text-5xl my-5">Customer</h1>
      <CustomerTable></CustomerTable>
    </section>
  )
}

export default CustomerPage