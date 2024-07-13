import React from "react";
import { Button, Form, Input } from "antd";
import { Trash2 } from "lucide-react";

function Experience() {
  return (
    <div>
      <Form.List name="experience">
        {(fields, { add, remove }) => {
          return (
            <div>
              <div className="flex gap-5 items-center mb-5">
                <Button size="small" onClick={() => add()}>
                  Add experience
                </Button>
              </div>

              <div className="flex flex-col gap-20">
                {fields.map((field, index) => (
                  <div className="grid grid-cols-4 gap-5 items-end p-5 border border-solid border-primary">
                    <Form.Item label="Company" name={[field.name, "company"]}>
                      <Input />
                    </Form.Item>

                    <Form.Item label="Role" name={[field.name, "role"]}>
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Start Date"
                      name={[field.name, "startDate"]}
                    >
                      <Input type="date" />
                    </Form.Item>

                    <Form.Item label="End Date" name={[field.name, "endDate"]}>
                      <Input />
                    </Form.Item>

                    <div className="col-span-4 flex gap-5 items-end">
                      <Form.Item
                        label="Roles and Responsibilities"
                        name={[field.name, "rolesAndResponsibilities"]}
                        className="flex-1"
                      >
                        <Input.TextArea />
                      </Form.Item>
                      <Button
                        onClick={() => remove(field.name)}
                        className="w-max"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
}

export default Experience;
