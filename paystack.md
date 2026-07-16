Use Next.js with the App Router.

Read the Paystack keys from environment variables:
- NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
- PAYSTACK_SECRET_KEY

The public key is for the frontend checkout flow.
The secret key must be used only on the server for payment verification.

Do not hardcode the keys.
Do not expose the secret key to the browser.
Build the checkout so it initializes Paystack on the client, then verifies the payment on the server after successful payment.
