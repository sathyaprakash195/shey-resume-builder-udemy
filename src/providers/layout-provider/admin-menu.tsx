import { Button, Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";

function AdminMenu() {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/admin/templates">Templates</Link>,
    },
    {
      key: "2",
      label: <Link href="/admin/users">Users</Link>,
    },
    {
      key: "3",
      label: <Link href="/admin/subscriptions">Subscriptions</Link>,
    },
  ];
  return (
    <div>
      <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
        <Button size="small">Admin</Button>
      </Dropdown>
    </div>
  );
}

export default AdminMenu;
