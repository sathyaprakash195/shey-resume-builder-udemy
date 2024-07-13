import React from "react";
import UsersTable from "./_components/users-table";
import { getAllUsers } from "@/server-actions/users";

async function AdminUsers() {
  const response = await getAllUsers();
  if (!response.success) {
    return <div>{response.message}</div>;
  }

  return (
    <div>
      <h1 className="text-primary text-lg font-bold uppercase">Users</h1>

      <UsersTable data={response.data} />
    </div>
  );
}

export default AdminUsers;
