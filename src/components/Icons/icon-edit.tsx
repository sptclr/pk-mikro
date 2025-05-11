"use client";
import * as React from "react";
const IconEdit = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <div className="bg-gradient-green rounded-lg hover:bg-gradient-green-hover">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "64px"}
      height={props.height ?? "40px"}
      fill="none"
      {...props}
    >
      <rect width={64} height={40} fill="url(#a)" rx={8} />
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
          d="M26.167 27.5c-.459 0-.851-.163-1.177-.49a1.605 1.605 0 0 1-.49-1.177V14.167c0-.459.163-.851.49-1.177.326-.327.718-.49 1.177-.49h5.437c.278 0 .486.087.625.26a.87.87 0 0 1-.01 1.146c-.146.174-.358.26-.636.26h-5.416v11.667h11.666v-5.437c0-.278.087-.486.26-.625a.896.896 0 0 1 1.147 0c.173.139.26.347.26.625v5.437c0 .459-.163.851-.49 1.177-.326.327-.718.49-1.177.49H26.167Zm3.333-5.833v-2.021a1.646 1.646 0 0 1 .48-1.167l7.166-7.166a1.673 1.673 0 0 1 1.188-.5 1.646 1.646 0 0 1 1.187.5l1.166 1.187c.153.167.271.35.355.552.083.202.125.406.125.615 0 .208-.038.413-.115.614a1.56 1.56 0 0 1-.364.552L33.52 22c-.153.153-.33.274-.531.365-.202.09-.414.135-.636.135h-2.02a.806.806 0 0 1-.594-.24.806.806 0 0 1-.24-.593Zm1.667-.834h1.166L37.167 16l-.584-.583-.604-.584-4.812 4.813v1.187Z"
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
          <stop stopColor="#83E22F" />
          <stop offset={1} stopColor="#40C033" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);
export default IconEdit;
