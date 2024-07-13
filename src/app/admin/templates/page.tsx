import { getAllTemplates } from "@/server-actions/templates";
import { Button } from "antd";
import Link from "next/link";
import React from "react";
import TemplatesTable from "./_components/templates-table";

async function AdminTemplates() {
  const response = await getAllTemplates();
  if(!response.success) {
    return <div>{response.message}</div>
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Templates</h1>
        <Button>
          <Link href="/admin/templates/new">New Template</Link>
        </Button>
      </div>

      <TemplatesTable data={response.data} />
    </div>
  );
}

export default AdminTemplates;
