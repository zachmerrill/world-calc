import React from "react";

export default function Title({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <h1 className="mt-0 mb-2 text-6xl font-extrabold">{children}</h1>;
}
