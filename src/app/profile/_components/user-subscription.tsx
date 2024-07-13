import { getStripeClientSecret } from "@/server-actions/payments";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import { Button, message } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
import React from "react";
import CheckoutFormModal from "./checkout-form-modal";
import dayjs from "dayjs";

function UserSubscription() {
  const { currentUserData }: IUsersStore = usersGlobalStore() as any;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [showCheckoutFormModal, setShowCheckoutFormModal] =
    React.useState<boolean>(false);
  const getClientSecret = async () => {
    try {
      setLoading(true);
      const response = await getStripeClientSecret();
      if (response.success) {
        setClientSecret(response.data);
        setShowCheckoutFormModal(true);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    clientSecret,
  };

  if (currentUserData?.currentSubscription) {
    return (
      <div className="bg-green-500 bg-opacity-20 p-5 border-green-500 border border-solid text-sm">
        You have an active subscription purchased on{" "}
        {dayjs(currentUserData.currentSubscription.createdAt).format(
          "MMMM DD, YYYY hh:mm A"
        )}
      </div>
    );
  } else
    return (
      <div className="bg-gray-500 bg-opacity-30 p-5 border-gray-500 border border-solid flex justify-between items-center">
        <h1 className="text-sm">You do not have an active subscription</h1>
        <Button type="primary" onClick={getClientSecret} loading={loading}>
          Subscribe Now ($10)
        </Button>

        {showCheckoutFormModal && clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutFormModal
              showCheckoutFormModal={showCheckoutFormModal}
              setShowCheckoutFormModal={setShowCheckoutFormModal}
            />
          </Elements>
        )}
      </div>
    );
}

export default UserSubscription;
