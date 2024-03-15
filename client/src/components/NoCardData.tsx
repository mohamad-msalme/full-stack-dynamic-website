import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const NoCardData: React.FC = () => {
  return (
    <Card className=" m-[1rem_auto] w-fit p-4">
      <CardHeader>
        <CardTitle>No Websites</CardTitle>
        <CardDescription>Click on Add website Button 🤷‍♂️</CardDescription>
      </CardHeader>
    </Card>
  );
};
