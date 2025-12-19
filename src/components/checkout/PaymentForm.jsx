import { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";

const PaymentForm = ({ onSubmit, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  // State for Payment Details
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (paymentMethod === "card") {
      if (!cardDetails.number || !cardDetails.cvv || !cardDetails.expiry) {
        alert("Please enter valid card details.");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId.includes("@")) {
        alert("Please enter a valid UPI ID (e.g., user@bank)");
        return;
      }
    }

    // Send both method AND details to the parent
    onSubmit({
      method: paymentMethod,
      details:
        paymentMethod === "card"
          ? cardDetails
          : paymentMethod === "upi"
          ? { upiId }
          : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fadeIn space-y-6">
      <div className="space-y-4">
        {/* === OPTION 1: CARD === */}
        <div
          className={`border rounded-xl transition overflow-hidden ${
            paymentMethod === "card"
              ? "border-blue-500 ring-1 ring-blue-500"
              : "border-gray-200"
          }`}
        >
          <label
            className={`flex items-center p-4 cursor-pointer ${
              paymentMethod === "card" ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <div className="ml-4 flex-1 flex justify-between items-center">
              <span className="font-medium text-gray-900">
                Credit / Debit Card
              </span>
              <FaCreditCard className="text-gray-500 text-xl" />
            </div>
          </label>

          {/* CARD DETAILS FORM (Only shows if Card is selected) */}
          {paymentMethod === "card" && (
            <div className="p-4 border-t border-blue-100 bg-white space-y-3 animate-fadeIn">
              <input
                type="text"
                name="name"
                placeholder="Cardholder Name"
                value={cardDetails.name}
                onChange={handleCardChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="number"
                placeholder="Card Number (0000 0000 0000 0000)"
                maxLength="19"
                value={cardDetails.number}
                onChange={handleCardChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                  className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  maxLength="3"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* === OPTION 2: UPI === */}
        <div
          className={`border rounded-xl transition overflow-hidden ${
            paymentMethod === "upi"
              ? "border-blue-500 ring-1 ring-blue-500"
              : "border-gray-200"
          }`}
        >
          <label
            className={`flex items-center p-4 cursor-pointer ${
              paymentMethod === "upi" ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <div className="ml-4 flex-1 flex justify-between items-center">
              <span className="font-medium text-gray-900">
                UPI (GPay, PhonePe)
              </span>
              <FaMobileAlt className="text-blue-500 text-xl" />
            </div>
          </label>

          {/* UPI FORM (Only shows if UPI is selected) */}
          {paymentMethod === "upi" && (
            <div className="p-4 border-t border-blue-100 bg-white animate-fadeIn">
              <input
                type="text"
                placeholder="Enter UPI ID (e.g. name@okhdfcbank)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
        </div>

        {/* === OPTION 3: COD === */}
        <div
          className={`border rounded-xl transition ${
            paymentMethod === "cod"
              ? "border-blue-500 ring-1 ring-blue-500"
              : "border-gray-200"
          }`}
        >
          <label
            className={`flex items-center p-4 cursor-pointer ${
              paymentMethod === "cod" ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <div className="ml-4 flex-1 flex justify-between items-center">
              <span className="font-medium text-gray-900">
                Cash on Delivery
              </span>
              <FaMoneyBillWave className="text-green-500 text-xl" />
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="w-1/3 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-2/3 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-sm"
        >
          {paymentMethod === "cod"
            ? "Place Order"
            : `Pay via ${paymentMethod === "card" ? "Card" : "UPI"}`}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
