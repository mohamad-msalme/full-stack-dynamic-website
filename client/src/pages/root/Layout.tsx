import React from "react";
import { loader } from "./loader";
import { useData } from "./useData";
import { LogoutBtn } from "@src/components/LogoutBtn";
import { NoCardData } from "@src/components/NoCardData";
import { WebsiteCard } from "@src/components/websiteCard";
import { AddWebsiteDialog } from "@src/components/AddWebsiteDialog";

const Root = () => {
  const websites = useData();
  return (
    <div className=" flex flex-col space-y-8 min-h-screen">
      <div className=" shadow flex items-center justify-between p-4 pr-4">
        <img className=" w-10 h-10 rounded" src="src/assets/logo.jpg" alt="" />
        <LogoutBtn />
      </div>
      <div className=" p-8 rounded-md ring-1 ring-gray-100 m-8 shadow-2xl mb-8 min-h-[85vh]">
        <AddWebsiteDialog />
        {websites.length === 0 && <NoCardData />}
        <div className="grid mt-8  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8">
          {websites.length > 0
            ? websites.map((website) => (
                <WebsiteCard
                  key={website._id}
                  websiteDescription={website.websiteDescription}
                  websiteTitle={website.websiteName}
                  target={website.targetAudience.name}
                  content={website.content}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

Root.loader = loader;
export default Root;
