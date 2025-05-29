import React from 'react'
import CartItems from '../componenets/CartItems'

const Cart = () => {
  return (
    <>
     <div className="flex justify-center items-start min-h-screen p-10">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Cart</h2>
        <CartItems />
      </div>
    </div>
    </>
  )
}

export default Cart