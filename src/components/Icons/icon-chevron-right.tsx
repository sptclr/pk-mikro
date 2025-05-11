"use client";
import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  onlyIcon?: boolean;
}

const IconChevronRight: React.FC<IconProps> = ({
  onlyIcon,
  width = "32px",
  height = "32px",
  ...props
}) =>
  onlyIcon ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
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
        style={{ maskType: "alpha" }}
      >
        <path fill="#D9D9D9" d="M6 6h24v24H6z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill={props.fill ?? "currentColor"}
          d="m18.6 18-3.9-3.9a.948.948 0 0 1 1.4-1.4l4.6 4.6a.877.877 0 0 1 .275.7c0 .283-.091.517-.275.7l-4.6 4.6a.948.948 0 1 1-1.4-1.4l3.9-3.9Z"
        />
      </g>
    </svg>
  ) : (
    <div>
      <IconChevronRight
        onlyIcon
        width={width}
        height={height}
        fill={props.fill}
        {...props}
      />
    </div>
  );

export default IconChevronRight;
