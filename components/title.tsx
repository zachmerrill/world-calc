import React from "react";

export default function Title({
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={`pb-4 text-5xl font-extrabold ${className}`} {...rest} />
  );
}
