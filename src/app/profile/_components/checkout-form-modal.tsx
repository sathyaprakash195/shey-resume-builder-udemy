import { saveUserSubscription } from "@/server-actions/subscriptions";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import {
  PaymentElement,
  AddressElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Button, message, Modal } from "antd";
import React from "react";

function CheckoutFormModal({
  showCheckoutFormModal,
  setShowCheckoutFormModal,
}: {
  showCheckoutFormModal: boolean;
  setShowCheckoutFormModal: (showCheckoutFormModal: boolean) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { currentUserData, setCurrentUserData }: IUsersStore =
    usersGlobalStore();

  const handleSubmit = async (event: any) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment successful");
        const response = await saveUserSubscription({
          userId: currentUserData?._id!,
          amount: 10,
          paymentId: result.paymentIntent?.id,
        });
        if (response.success) {
          setCurrentUserData(response.data);
          message.success("Subscription activated successfully");
        } else {
          throw new Error(response.message);
        }
        setShowCheckoutFormModal(false);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={showCheckoutFormModal}
      onClose={() => setShowCheckoutFormModal(false)}
      onCancel={() => setShowCheckoutFormModal(false)}
      centered
      title="COMPLETE YOUR SUBSCRIPTION PAYMENT"
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["US", "IND"],
          }}
        />

        <div className="flex justify-end gap-5 mt-5">
          <Button
            onClick={() => setShowCheckoutFormModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay Now
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CheckoutFormModal;
