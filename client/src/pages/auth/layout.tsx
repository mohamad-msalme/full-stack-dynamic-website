import { cn } from "@src/lib/utils";
import React from "react";
import { Outlet } from "react-router-dom";
import { AuthLeftSide } from "./AuthLeftSide";
import { Card, CardContent } from "@src/components/ui/card";

const LayoutAuth: React.FC = () => {
  return (
    <div
      className={cn(
        "flex justify-center items-center w-full h-screen bg-authBg"
      )}
    >
      <Card>
        <CardContent className=" flex gap-12 p-10 md:p-20">
          <AuthLeftSide />
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};
export default LayoutAuth;
