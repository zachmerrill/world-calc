import React from "react";

export default function Label({
  className,
  ...rest
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={` ${className} flex flex-col gap-2`} {...rest} />;
}
