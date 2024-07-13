import { Form, Input, Upload } from "antd";
import React from "react";

function Basic({
  candidatePhoto,
  setCandidatePhoto,
}: {
  candidatePhoto: any;
  setCandidatePhoto: any;
}) {
  let selectedFiles: any = [];
  if (candidatePhoto && typeof candidatePhoto === "string") {
    selectedFiles = [
      {
        url: candidatePhoto,
      },
    ];
  }

  if (candidatePhoto && typeof candidatePhoto === "object") {
    selectedFiles = [
      {
        url: URL.createObjectURL(candidatePhoto),
      },
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
      <Form.Item label="Name" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" required>
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone" required>
        <Input />
      </Form.Item>
      <Form.Item label="Portfolio" name="portfolio" required>
        <Input />
      </Form.Item>
      <Form.Item label="Profession" name="profession" required>
        <Input />
      </Form.Item>
      <div className="col-span-4">
        <Form.Item label="Career Objective" name="careerObjective" required>
          <Input.TextArea rows={4} />
        </Form.Item>
      </div>
      <div className="col-span-4">
        <Form.Item label="Address" name="address" required>
          <Input.TextArea rows={2} />
        </Form.Item>
      </div>

      <Upload
        listType="picture-card"
        beforeUpload={(file) => {
          setCandidatePhoto(file);
          return false;
        }}
        onRemove={() => setCandidatePhoto(null)}
        fileList={selectedFiles}
      >
        <span className="text-sm">Candidate Photo</span>
      </Upload>
    </div>
  );
}

export default Basic;
