## Payment Method

Add Paystack as the online payment gateway for the website.

Requirements:
- Support Ghana mobile money payments through Paystack.
- Support cash as a secondary payment option.
- Display prices in GHS.
- The checkout must collect the customer’s phone number for mobile money payments.
- The checkout should allow the user to choose their mobile money provider.
- For Ghana, support the major mobile money providers available through Paystack, such as MTN, AirtelTigo, and Telecel.
- The payment flow should be full payment before order confirmation.
- After successful payment, show a clear success state and confirm the order.
- If payment fails or is abandoned, show a friendly retry state.
- Keep the payment UI simple, trustworthy, and very clear.
- The checkout should feel lightweight and fast, not like a heavy e-commerce backend.

Implementation notes:
- Use Paystack’s standard payment flow.
- Keep the Paystack secret key on the server only.
- Use the public key on the client only.
- Build the flow so it can initialize payment, verify payment, and confirm the order.
- Add environment variable placeholders for Paystack keys.
- Include clear labels for “Pay with Mobile Money” and “Pay with Cash on Pickup”.
- Make the mobile money payment option the default online payment choice.
- The order should not be marked complete until Paystack confirms payment.
