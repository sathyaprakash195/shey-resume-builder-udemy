import { getAllSubscriptions } from "@/server-actions/subscriptions";
import React from "react";
import SubscriptionsTable from "./_components/subscriptions-table";

async function Subscriptions() {
  const response = await getAllSubscriptions();
  if (!response.success) {
    return <div>{response.message}</div>;
  }
  return (
    <div>
      <h1 className="text-primary text-lg font-bold uppercase">Subscriptions</h1>
      <SubscriptionsTable data={response.data} />
    </div>
  );
}

export default Subscriptions;
