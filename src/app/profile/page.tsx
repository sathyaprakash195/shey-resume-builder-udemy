"use client";
import React from "react";
import { Button, Form, message, Tabs } from "antd";
import Basic from "./_components/basic";
import Experience from "./_components/experience";
import Education from "./_components/education";
import Skills from "./_components/skills";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import { updateUserProfile } from "@/server-actions/users";
import UserSubscription from "./_components/user-subscription";
import { uploadFileToFirebaseAndReturnUrl } from "@/helpers/media-upload";

function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const { currentUserData, setCurrentUserData }: IUsersStore =
    usersGlobalStore();
  const [loading, setLoading] = React.useState(false);
  const [candidatePhoto, setCandidatePhoto] = React.useState<any>(
    currentUserData?.profileDataForResume?.candidatePhoto || ""
  );
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      ["skills", "education", "experience"].forEach((key) => {
        if (!values[key]) {
          values[key] = currentUserData?.profileDataForResume[key] || [];
        }
      });

      if (typeof candidatePhoto === "object") {
        values.candidatePhoto = await uploadFileToFirebaseAndReturnUrl(
          candidatePhoto
        );
      } else {
        values.candidatePhoto = candidatePhoto;
      }
      const response = await updateUserProfile({
        userId: currentUserData!._id,
        data: {
          ...currentUserData,
          profileDataForResume: values,
        },
      });
      if (response.success) {
        message.success("Profile updated successfully");
        setCurrentUserData(response.data);
      } else {
        message.error("Failed to update profile");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-bold uppercase text-primary">Profile</h1>

      <UserSubscription />

      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={currentUserData?.profileDataForResume}
      >
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
        >
          <Tabs.TabPane tab="Basic" key="1">
            <Basic
              candidatePhoto={candidatePhoto}
              setCandidatePhoto={setCandidatePhoto}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Education" key="3">
            <Education />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Skills" key="4">
            <Skills />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Experience" key="2">
            <Experience />
          </Tabs.TabPane>
        </Tabs>

        <div className="flex justify-end gap-10 mt-10">
          <Button disabled={loading}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save & Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProfilePage;
