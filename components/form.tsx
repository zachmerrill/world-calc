import React from "react";

export default function Form({
  className,
  ...rest
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form className={`${className} flex flex-col gap-4`} {...rest} />;
}
