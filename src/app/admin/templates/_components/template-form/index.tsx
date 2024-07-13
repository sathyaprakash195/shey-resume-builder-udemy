"use client";
import { Button, Form, Input, message, Radio, Upload } from "antd";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useRouter } from "next/navigation";
import { uploadFileToFirebaseAndReturnUrl } from "@/helpers/media-upload";
import {
  createNewTemplate,
  updateTemplateById,
} from "@/server-actions/templates";

function TemplateForm({
  initialValues = {},
  type = "new",
}: {
  initialValues?: any;
  type?: "new" | "edit";
}) {
  const [thumbnail, setThumbnail] = React.useState<any>(
    initialValues?.thumbnail || ""
  );
  const [html, setHtml] = React.useState<any>(initialValues?.html || "");
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if (typeof thumbnail !== "string") {
        values.thumbnail = await uploadFileToFirebaseAndReturnUrl(thumbnail);
      } else {
        values.thumbnail = thumbnail;
      }
      values.html = html;
      let response = null;
      if (type === "new") {
        response = await createNewTemplate(values);
      } else {
        response = await updateTemplateById(initialValues._id, values);
      }
      if (response.success) {
        message.success(
          type === "new"
            ? "Template created successfully"
            : "Template updated successfully"
        );
        router.push("/admin/templates");
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  let selectedFilesList: any[] = [];
  if (type === "edit" && thumbnail && typeof thumbnail === "string") {
    selectedFilesList = [
      {
        url: initialValues.thumbnail,
      },
    ];
  } else if (thumbnail) {
    selectedFilesList = [
      {
        url: URL.createObjectURL(thumbnail),
      },
    ];
  } else {
    selectedFilesList = [];
  }

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="mt-7 flex flex-col gap-7"
      initialValues={initialValues}
    >
      <Form.Item label="Name" name="name">
        <Input placeholder="Enter template name" />
      </Form.Item>

      <Form.Item label="Thumbnail">
        <Upload
          listType="picture-card"
          beforeUpload={(file) => {
            setThumbnail(file);
            return false;
          }}
          onRemove={() => setThumbnail("")}
          fileList={selectedFilesList}
        >
          <div className="span text-xs">Upload Thumbnail</div>
        </Upload>
      </Form.Item>

      <Form.Item label="Is Only For Subscribers" name="isOnlyForSubscribers">
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="HTML">
        <CodeMirror value={html} onChange={(value) => setHtml(value)} />
      </Form.Item>

      <div className="flex justify-end gap-7">
        <Button
          onClick={() => router.push("/admin/templates")}
          type="default"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </div>
    </Form>
  );
}

export default TemplateForm;
