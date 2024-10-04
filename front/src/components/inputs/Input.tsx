import React from "react";
import InputMask from "react-input-mask";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string | (string | RegExp)[];
}

export default function Input({ mask, ...props }: InputProps) {
  if (mask) {
    return (
      <InputMask mask={mask} {...props}>
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <input
            className="bg-white rounded-md border-solid border-[0.5px] border-blue-500 h-9 pl-4 focus:outline-none text-sm items-center"
            {...inputProps}
          />
        )}
      </InputMask>
    );
  }
  return (
    <input
      className="bg-white rounded-md border-solid border-[0.5px] border-blue-500 h-9 pl-4 focus:outline-none text-sm items-center"
      {...props}
    ></input>
  );
}
