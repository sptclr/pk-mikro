"use client";
import * as React from "react";
const IconChevronLeft = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <div className="">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "32px"}
      height={props.height ?? "32px"}
      fill="none"
      {...props}
    >
      <mask
        id="a"
        width={24}
        height={24}
        x={6}
        y={6}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path fill="#D9D9D9" d="M30 6H6v24h24z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill={props.fill ?? "#344767"}
          d="m17.4 18 3.9-3.9a.948.948 0 0 0 .275-.7.949.949 0 0 0-.275-.7.948.948 0 0 0-.7-.275.948.948 0 0 0-.7.275l-4.6 4.6c-.1.1-.17.208-.212.325a1.106 1.106 0 0 0-.063.375c0 .133.021.258.063.375a.877.877 0 0 0 .212.325l4.6 4.6a.948.948 0 0 0 .7.275.948.948 0 0 0 .7-.275.948.948 0 0 0 .275-.7.949.949 0 0 0-.275-.7L17.4 18Z"
        />
      </g>
    </svg>
  </div>
);
export default IconChevronLeft;
