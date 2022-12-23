import React from "react";
import Navbar from "./navbar";

export default function Layout({
  className,
  ...rest
}: React.DetailsHTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex h-full flex-col overflow-x-hidden">
      <Navbar />
      <main className={`${className} container mx-auto h-full p-4`} {...rest} />
    </div>
  );
}
