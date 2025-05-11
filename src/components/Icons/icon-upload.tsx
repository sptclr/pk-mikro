"use client";
import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  onlyIcon?: boolean;
}

const IconUpload: React.FC<IconProps> = ({
  onlyIcon,
  width = "20px",
  height = "20px",
  fill = "#344767",
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
        width={width}
        height={height}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path fill="#475569" d="M0 0h20v20H0z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill="#475569"
          d="M5 16.667c-.459 0-.851-.164-1.177-.49A1.605 1.605 0 0 1 3.333 15v-1.667c0-.236.08-.434.24-.593.16-.16.357-.24.593-.24s.434.08.594.24c.16.16.24.357.24.593V15h10v-1.667c0-.236.08-.434.24-.593.159-.16.357-.24.593-.24s.434.08.594.24c.16.16.24.357.24.593V15c0 .458-.164.85-.49 1.177-.327.326-.719.49-1.177.49H5ZM9.166 6.542 7.604 8.104a.776.776 0 0 1-.594.24.85.85 0 0 1-.833-.844.763.763 0 0 1 .24-.583l3-3a.731.731 0 0 1 .27-.177.922.922 0 0 1 .313-.053c.11 0 .215.018.312.053a.73.73 0 0 1 .271.177l3 3a.763.763 0 0 1 .24.583.85.85 0 0 1-.833.844.776.776 0 0 1-.595-.24l-1.562-1.562V12.5c0 .236-.08.434-.24.594a.806.806 0 0 1-.593.24.806.806 0 0 1-.594-.24.807.807 0 0 1-.24-.594V6.542Z"
        />
      </g>
    </svg>
  ) : (
    <div className="bg-anarya-bg-icon rounded-lg hover:bg-gray-300">
      <IconUpload
        onlyIcon
        width={width}
        height={height}
        fill={fill}
        {...props}
      />
    </div>
  );
export default IconUpload;
