"use client";
import * as React from "react";
const IconDelete = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <div className="bg-gradient-red rounded-lg hover:bg-gradient-red-hover">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "64px"}
      height={props.height ?? "40px"}
      fill="none"
      {...props}
    >
      <mask
        id="b"
        width={20}
        height={20}
        x={22}
        y={10}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path fill="#D9D9D9" d="M22 10h20v20H22z" />
      </mask>
      <g mask="url(#b)">
        <path
          fill="#fff"
          d="M27.833 27.5c-.458 0-.85-.163-1.177-.49a1.605 1.605 0 0 1-.49-1.177V15a.807.807 0 0 1-.593-.24.806.806 0 0 1-.24-.593c0-.236.08-.434.24-.594.16-.16.358-.24.594-.24H29.5c0-.236.08-.434.24-.593.16-.16.357-.24.593-.24h3.334c.236 0 .434.08.593.24.16.16.24.357.24.593h3.333c.236 0 .434.08.594.24.16.16.24.358.24.594s-.08.434-.24.593a.807.807 0 0 1-.594.24v10.833c0 .459-.163.851-.49 1.177-.326.327-.718.49-1.176.49h-8.334ZM36.167 15h-8.334v10.833h8.334V15Zm-5.834 9.167c.236 0 .434-.08.594-.24.16-.16.24-.358.24-.594V17.5a.807.807 0 0 0-.24-.594.806.806 0 0 0-.594-.24.806.806 0 0 0-.593.24.807.807 0 0 0-.24.594v5.833c0 .236.08.434.24.594.16.16.357.24.593.24Zm3.334 0c.236 0 .434-.08.593-.24.16-.16.24-.358.24-.594V17.5a.807.807 0 0 0-.24-.594.806.806 0 0 0-.593-.24.806.806 0 0 0-.594.24.807.807 0 0 0-.24.594v5.833c0 .236.08.434.24.594.16.16.358.24.594.24Z"
        />
      </g>
      <defs>
        <linearGradient
          id="a"
          x1={0}
          x2={64}
          y1={20}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FB5567" />
          <stop offset={1} stopColor="#F0242B" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);
export default IconDelete;
