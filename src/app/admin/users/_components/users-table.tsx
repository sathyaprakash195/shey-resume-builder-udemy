"use client";
import { IUser } from "@/interfaces";
import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

function UsersTable({ data }: { data: IUser[] }) {
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Is Subscribed",
      dataIndex: "currentSubscription",
      render: (currentSubscription: any) =>
        currentSubscription ? "Yes" : "No",
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      render: (isAdmin: any) => (isAdmin ? "Yes" : "No"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: any) =>
        dayjs(createdAt).format("MMM DD, YYYY hh:mm A"),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default UsersTable;
