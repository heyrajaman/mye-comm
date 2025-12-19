import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import AddressForm from "../components/checkout/AddressForm";
import PaymentForm from "../components/checkout/PaymentForm";
import { createOrder } from "../services/orderService";
import { clearCartThunk } from "../store/thunks/cartThunks";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // <--- FIXED: UNCOMMENTED THIS LINE

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/shop" replace />;
  }

  const subtotal = items.reduce(
    (acc, item) => acc + (item.Product?.price || 0) * item.quantity,
    0
  );
  const total = subtotal;

  // Step 1 -> Step 2
  const handleAddressSubmit = (addressData) => {
    setShippingAddress(addressData);
    setStep(2);
  };

  // Step 2 -> Place Order
  const handleOrderSubmit = async (paymentMethod) => {
    try {
      setLoading(true);

      const orderData = {
        userId: user?.id,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.Product?.price,
        })),
        totalAmount: total,
        shippingAddress,
        paymentMethod,
      };

      console.log("Sending Order:", orderData);

      // await createOrder(orderData); // Uncomment when backend is ready

      // SIMULATE SUCCESS
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // --- FIXED SECTION START ---
      // 1. CLEAR THE CART (both Redux state and localStorage)
      await dispatch(clearCartThunk()).unwrap();

      // 2. REDIRECT TO SUCCESS PAGE
      navigate("/order-success");
      // --- FIXED SECTION END ---
    } catch (error) {
      console.error("Order Failed", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Processing your order...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:w-2/3 space-y-6">
          {/* STEP 1: ADDRESS */}
          <div
            className={`bg-white p-6 rounded-xl shadow-sm border ${
              step === 1
                ? "border-blue-500 ring-1 ring-blue-500"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step === 1
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {step > 1 ? "✓" : "1"}
                </span>
                Shipping Address
              </h2>
              {step > 1 && (
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-blue-600 font-semibold hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {step === 1 ? (
              <AddressForm
                onSubmit={handleAddressSubmit}
                initialData={shippingAddress}
              />
            ) : (
              <div className="text-gray-600 ml-10 text-sm">
                <p className="font-medium text-gray-900">
                  {shippingAddress?.fullName}
                </p>
                <p>
                  {shippingAddress?.addressLine1}, {shippingAddress?.city}
                </p>
              </div>
            )}
          </div>

          {/* STEP 2: PAYMENT */}
          <div
            className={`bg-white p-6 rounded-xl shadow-sm border ${
              step === 2
                ? "border-blue-500 ring-1 ring-blue-500"
                : "border-gray-200"
            } ${step < 2 ? "opacity-60" : ""}`}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step === 2
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                2
              </span>
              Payment Method
            </h2>
            {step === 2 && (
              <PaymentForm
                onSubmit={handleOrderSubmit}
                onBack={() => setStep(1)}
              />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.Product?.imageUrl}
                      alt={item.Product?.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {item.Product?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-800">
                    ₹{(item.Product?.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
