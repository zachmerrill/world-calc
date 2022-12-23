import React from "react";

export default function TextInput({
  className,
  type,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`${className} block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm`}
      {...rest}
    />
  );
}
