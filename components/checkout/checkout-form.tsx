import { Button } from "@react-email/components";
import { PaymentElement } from "@stripe/react-stripe-js";

function CheckoutForm() {
  //   const formAction = async (data: FormData): Promise<void> => {
  //     const uiMode = data.get(
  //       "uiMode"
  //     ) as Stripe.Checkout.SessionCreateParams.UiMode;
  //     const { client_secret, url } = await createCheckoutSession(data);

  //     //if (uiMode === "embedded") return setClientSecret(client_secret);

  //     window.location.assign(url as string);
  //   };

  return (
    <div className="px-6 flex flex-col w-full">
      <div className="bg-neutral-800 rounded-2xl shadow-xl p-4">
        <form action="/api/checkout-session">
          <PaymentElement />
          <Button type="submit">Checkout</Button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
