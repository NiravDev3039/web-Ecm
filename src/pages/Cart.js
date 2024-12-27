import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false); // State for purchase confirmation

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      setShowModal(true); // Show the modal when clicking checkout
    }
  };

  const handleConfirmPurchase = () => {
    setPurchaseConfirmed(true); // Confirm the purchase and display the invoice
    setShowModal(false); // Close the checkout modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  if (cart.length === 0 && !purchaseConfirmed) {
    return <p className="text-center text-lg font-semibold text-gray-600">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Shopping Cart</h2>

      {!purchaseConfirmed ? (
        <div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                <img className="h-48 w-48 object-contain rounded-lg" src={item.image} alt={item.title} />
                <div className="flex-1 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold text-gray-800">Total: ₹{calculateTotal()}</p>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Invoice/Confirmation Message */}
          <h3 className="text-2xl font-semibold text-center text-green-600 mb-4">Purchase Complete!</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h4>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <p className="text-lg text-gray-800">{item.title}</p>
                  <p className="text-lg text-gray-600">
                    {item.quantity} x ₹{item.price} = ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-xl font-semibold text-gray-800">
                Total: ₹{calculateTotal()}
              </p>
              <p className="text-sm text-gray-600 mt-2">Thank you for your purchase!</p>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showModal && !purchaseConfirmed && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Checkout</h2>
            <p className="text-lg text-gray-800 mb-4">Are you ready to complete your purchase?</p>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
