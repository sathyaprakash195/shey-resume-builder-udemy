"use client";
import Spinner from "@/components/spinner";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import { UserButton } from "@clerk/nextjs";
import { message } from "antd";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import AdminMenu from "./admin-menu";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isProtected =
    !pathname.includes("/sign-in") && !pathname.includes("/sign-up");
  const isAdminRoute = pathname.includes("/admin");
  const params = useParams();

  const { setCurrentUserData, currentUserData }: IUsersStore =
    usersGlobalStore() as any;

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserFromMongoDB();
      if (response.success) {
        setCurrentUserData(response.data);
      } else {
        message.error(response.message);
        setError(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isProtected && !currentUserData) {
      getCurrentUser();
    }
  }, [pathname]);

  if (!isProtected) {
    return <div>{children}</div>;
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (error) return <div className="p-5">{error}</div>;

  if (
    currentUserData &&
    !currentUserData?.isAdmin &&
    isAdminRoute &&
    !loading
  ) {
    return (
      <div className="p-5 text-sm text-gray-500">
        You are not authorized to access this page
      </div>
    );
  }

  let showHeader = true;
  if (pathname === `/template/${params.id}`) {
    showHeader = false;
  }

  return (
    <div>
      {showHeader && (
        <div className="header p-5 bg-primary flex justify-between items-center">
          <h1
            className="text-xl font-bold text-white cursor-pointer"
            onClick={() => router.push("/")}
          >
            SHEY-RESUMES
          </h1>
          <div className="flex gap-5 items-center">
            {currentUserData?.isAdmin ? (
              <AdminMenu />
            ) : (
              <h1
                className="text-sm text-white cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                {currentUserData?.name}
              </h1>
            )}
            <UserButton />
          </div>
        </div>
      )}

      <div className="p-5">{children}</div>
    </div>
  );
}

export default LayoutProvider;
