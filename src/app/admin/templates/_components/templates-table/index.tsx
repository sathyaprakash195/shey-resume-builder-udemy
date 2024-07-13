"use client";
import { ITemplate } from "@/interfaces";
import { Button, message, Table } from "antd";
import React from "react";
import dayjs from "dayjs";
import { Pen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteTemplateById } from "@/server-actions/templates";

function TemplatesTable({ data }: { data: ITemplate[] }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteTemplateById(id);
      if (response.success) {
        message.success("Template deleted successfully");
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Is Only For Subscribers",
      dataIndex: "isOnlyForSubscribers",
      render: (value: boolean) => (value ? "Yes" : "No"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value: string) => dayjs(value).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: ITemplate) => (
        <div className="flex gap-5">
          <Button size="small" onClick={() => onDelete(record._id)}>
            <Trash2 size={12} />
          </Button>
          <Button
            size="small"
            onClick={() => {
              router.push(`/admin/templates/edit/${record._id}`);
            }}
          >
            <Pen size={12} />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
}

export default TemplatesTable;
