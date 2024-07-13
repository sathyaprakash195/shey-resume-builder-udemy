import React from "react";
import { Button, Form, Input } from "antd";
import { Trash2 } from "lucide-react";

function Skills() {
  return (
    <div>
      <Form.List name="skills">
        {(fields, { add, remove }) => {
          return (
            <div>
              <div className="flex gap-5 items-center mb-5">
                <Button size="small" onClick={() => add()}>
                  Add skill
                </Button>
              </div>

              <div className="flex flex-col gap-5">
                {fields.map((field, index) => (
                  <div className="grid grid-cols-4 gap-5 items-end">
                    <Form.Item
                      label="Technology"
                      name={[field.name, "technology"]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Rating"
                      name={[field.name, "rating"]}
                    >
                      <Input />
                    </Form.Item>

                    <Button
                      onClick={() => remove(field.name)}
                      className="w-max"
                    >
                      <Trash2 size={16} />
                    </Button>
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

export default Skills;
