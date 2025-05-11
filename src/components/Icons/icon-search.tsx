"use client";
import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  onlyIcon?: boolean;
}

const IconSearch: React.FC<IconProps> = ({
  onlyIcon,
  width = "24px",
  height = "24px",
  fill = "#71839B",
  ...props
}) =>
  onlyIcon ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g mask="url(#a)">
        <path
          fill={fill}
          d="M9.5 16c-1.817 0-3.354-.63-4.612-1.887C3.629 12.854 3 11.317 3 9.5c0-1.817.63-3.354 1.888-4.612C6.146 3.629 7.683 3 9.5 3c1.817 0 3.354.63 4.613 1.888C15.37 6.146 16 7.683 16 9.5a6.096 6.096 0 0 1-1.3 3.8l5.6 5.6a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275l-5.6-5.6A6.096 6.096 0 0 1 9.5 16Zm0-2c1.25 0 2.313-.438 3.188-1.313C13.562 11.813 14 10.75 14 9.5c0-1.25-.438-2.313-1.313-3.188C11.813 5.438 10.75 5 9.5 5c-1.25 0-2.313.438-3.188 1.313S5 8.25 5 9.5c0 1.25.438 2.313 1.313 3.188C7.188 13.562 8.25 14 9.5 14Z"
        />
      </g>
    </svg>
  ) : (
    <div className="bg-anarya-bg-icon rounded-lg hover:bg-gray-300">
      <IconSearch
        onlyIcon
        width={width}
        height={height}
        fill={fill}
        {...props}
      />
    </div>
  );
export default IconSearch;
