import React from "react";

export default function Title({
  className,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={`mt-0 mb-2 text-6xl font-extrabold ${className}`}
      {...rest}
    />
  );
}
