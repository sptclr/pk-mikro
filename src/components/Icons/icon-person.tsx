"use client";
import * as React from "react";
const IconPerson = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <div className="">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "16px"}
      height={props.height ?? "16px"}
      fill="none"
      {...props}
    >
      <path
        fill="#67748E"
        d="M8 8c-1.1 0-2.042-.392-2.825-1.175C4.392 6.042 4 5.1 4 4s.392-2.042 1.175-2.825C5.958.392 6.9 0 8 0s2.042.392 2.825 1.175C11.608 1.958 12 2.9 12 4s-.392 2.042-1.175 2.825C10.042 7.608 9.1 8 8 8Zm-8 8v-2.8c0-.567.146-1.087.438-1.563.291-.475.679-.837 1.162-1.087a14.844 14.844 0 0 1 3.15-1.163A13.759 13.759 0 0 1 8 9c1.1 0 2.183.13 3.25.387 1.067.259 2.117.646 3.15 1.163.483.25.87.612 1.162 1.087.292.476.438.996.438 1.563V16H0Z"
      />
    </svg>
  </div>
);
export default IconPerson;
