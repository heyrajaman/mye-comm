// Toggle this to FALSE when backend is ready
const USE_MOCK = true;

// !!! IMPORTANT: THIS IS A PUBLIC TEST KEY !!!
// For now, we use a dummy key. Later you will put your own Razorpay Test Key here.
const RAZORPAY_KEY_ID = "rzp_test_YourKeyHere";

export const initiatePayment = async (amount, user, onSuccess) => {
  if (USE_MOCK) {
    // 1. Simulate Backend creating an order
    // In real life, we would call api.post('/payment/create-order')
    await new Promise((resolve) => setTimeout(resolve, 500));

    const options = {
      key: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "My E-Commerce Store", // Your Business Name
      description: "Test Transaction",
      image: "https://via.placeholder.com/150", // Your Logo
      order_id: "", // In Mock mode, we leave this empty (Razorpay will generate a local one for testing)

      // Handler: What happens when payment succeeds?
      handler: function (response) {
        // response.razorpay_payment_id
        // response.razorpay_order_id
        // response.razorpay_signature
        console.log("Payment Successful!", response);
        onSuccess(response); // Call the callback function to place the order
      },

      prefill: {
        name: user?.name || "Test User",
        email: user?.email || "test@example.com",
        contact: user?.phone || "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // 2. Open the Razorpay Popup
    const rzp1 = new window.Razorpay(options);

    // Handle Payment Failure
    rzp1.on("payment.failed", function (response) {
      alert(`Payment Failed: ${response.error.description}`);
    });

    rzp1.open();
  } else {
    // Real Backend Integration Logic goes here later
    console.log("Backend not connected yet");
  }
};
