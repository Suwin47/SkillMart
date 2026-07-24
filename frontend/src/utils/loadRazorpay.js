let razorpayPromise = null;

const loadRazorpay = () => {
  // SDK already loaded
  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  // Script is already loading
  if (razorpayPromise) {
    return razorpayPromise;
  }

  razorpayPromise = new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.onload = () => resolve(true);
      existingScript.onerror = () => resolve(false);
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);

    script.onerror = () => {
      razorpayPromise = null;
      resolve(false);
    };

    document.body.appendChild(script);
  });

  return razorpayPromise;
};

export default loadRazorpay;