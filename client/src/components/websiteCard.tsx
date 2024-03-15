import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { openHtmlContentInNewTab } from "@src/lib/utils";

type WebsiteCardProps = {
  websiteTitle: string;
  websiteDescription: string;
  target: string;
  content: string;
};
export const WebsiteCard: React.FC<WebsiteCardProps> = ({
  websiteTitle,
  websiteDescription,
  target,
  content,
}) => {
  return (
    <Card className=" shadow-md">
      <CardHeader>
        <CardTitle>{websiteTitle}</CardTitle>
        <CardDescription>{target}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription className=" line-clamp-1 leading-3">
          {websiteDescription}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={() => openHtmlContentInNewTab(content)}>
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
};
