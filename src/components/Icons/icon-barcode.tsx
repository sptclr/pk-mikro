"use client";
import { cn } from "@/utils";
import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  onlyIcon?: boolean;
}

const IconBarcode: React.FC<IconProps> = ({ onlyIcon = false, ...props }) => {
  const defaultSize = 40;
  const x = (defaultSize - ((props.width as number) ?? defaultSize)) / 2;
  const y = (defaultSize - ((props.height as number) ?? defaultSize)) / 2;
  const viewBox = `${x} ${y} ${props.width ?? defaultSize} ${
    props.height ?? defaultSize
  }`;

  return (
    <div
      className={cn(
        "rounded-lg ",
        !onlyIcon && "bg-anarya-bg-icon hover:bg-gray-300"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width ?? "40px"}
        height={props.height ?? "40px"}
        viewBox={onlyIcon ? viewBox : undefined}
        fill="none"
        {...props}
      >
        <path
          fill="#475569"
          d="M15 26.667c0 .236-.08.434-.24.593a.806.806 0 0 1-.593.24h-2.5a.807.807 0 0 1-.594-.24.806.806 0 0 1-.24-.593v-2.5c0-.236.08-.434.24-.594.16-.16.358-.24.594-.24s.434.08.593.24c.16.16.24.358.24.594v1.666h1.667c.236 0 .434.08.593.24.16.16.24.358.24.594Zm13.333-3.334c.236 0 .434.08.594.24.16.16.24.358.24.594v2.5c0 .236-.08.434-.24.593a.807.807 0 0 1-.594.24h-2.5a.806.806 0 0 1-.593-.24.806.806 0 0 1-.24-.593c0-.236.08-.434.24-.594.16-.16.357-.24.593-.24H27.5v-1.666c0-.236.08-.434.24-.594.16-.16.357-.24.593-.24ZM13.75 25a.4.4 0 0 1-.292-.125.4.4 0 0 1-.125-.292v-9.166a.4.4 0 0 1 .125-.292.4.4 0 0 1 .292-.125h.833a.4.4 0 0 1 .292.125.4.4 0 0 1 .125.292v9.166a.4.4 0 0 1-.125.292.4.4 0 0 1-.292.125h-.833Zm2.5 0a.4.4 0 0 1-.292-.125.4.4 0 0 1-.125-.292v-9.166a.4.4 0 0 1 .125-.292.4.4 0 0 1 .584 0 .4.4 0 0 1 .125.292v9.166a.4.4 0 0 1-.125.292.4.4 0 0 1-.292.125Zm2.5 0a.4.4 0 0 1-.292-.125.4.4 0 0 1-.125-.292v-9.166a.4.4 0 0 1 .125-.292.4.4 0 0 1 .292-.125h.833a.4.4 0 0 1 .292.125.4.4 0 0 1 .125.292v9.166a.4.4 0 0 1-.125.292.4.4 0 0 1-.292.125h-.833Zm2.5 0a.4.4 0 0 1-.292-.125.4.4 0 0 1-.125-.292v-9.166a.4.4 0 0 1 .125-.292.4.4 0 0 1 .292-.125h1.667a.4.4 0 0 1 .291.125.4.4 0 0 1 .125.292v9.166a.4.4 0 0 1-.125.292.4.4 0 0 1-.291.125H21.25Zm3.333 0a.4.4 0 0 1-.291-.125.4.4 0 0 1-.125-.292v-9.166a.4.4 0 0 1 .125-.292.4.4 0 0 1 .583 0 .4.4 0 0 1 .125.292v9.166a.4.4 0 0 1-.125.292.4.4 0 0 1-.292.125Zm1.667 0a.4.4 0 0 1-.292-.125.4.4 0 0 1-.125-.292v-9.166a.4.4 0 0 1 .125-.292.4.4 0 0 1 .584 0 .4.4 0 0 1 .125.292v9.166a.4.4 0 0 1-.125.292.4.4 0 0 1-.292.125ZM15 13.333c0 .236-.08.434-.24.594a.806.806 0 0 1-.593.24H12.5v1.666c0 .236-.08.434-.24.594a.806.806 0 0 1-.593.24.807.807 0 0 1-.594-.24.807.807 0 0 1-.24-.594v-2.5c0-.236.08-.434.24-.593.16-.16.358-.24.594-.24h2.5c.236 0 .434.08.593.24.16.16.24.357.24.593Zm10 0c0-.236.08-.434.24-.593.16-.16.357-.24.593-.24h2.5c.236 0 .434.08.594.24.16.16.24.357.24.593v2.5c0 .236-.08.434-.24.594a.807.807 0 0 1-.594.24.806.806 0 0 1-.593-.24.807.807 0 0 1-.24-.594v-1.666h-1.667a.806.806 0 0 1-.593-.24.807.807 0 0 1-.24-.594Z"
        />
      </svg>
    </div>
  );
};
export default IconBarcode;
