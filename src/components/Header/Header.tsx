"use client";
import { cn } from "@/utils";
import React, { ReactNode } from "react";
import IconPerson from "../Icons/icon-person";
import { IconChevronRight } from "../Icons";

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <div className="flex flex-col">{children}</div>;
};

interface BreadcrumbProps {
  paths: string[];
}

const Breadcrumb = ({ paths }: BreadcrumbProps) => {
  return (
    <nav className="text-anarya-navbar-title text-2xl font-semibold flex">
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {index > 0 && <IconChevronRight fill="#71839B" onlyIcon />}
          <span>{path}</span>
        </React.Fragment>
      ))}
    </nav>
  );
};

const Separator = () => <hr className="my-4" />;

const Info = ({ children }: { children: ReactNode }) => (
  <div className="w-full flex justify-between items-center">{children}</div>
);

const Actions = ({
  children,
  justify = "justify-between",
  gap = "unset",
}: {
  children: ReactNode;
  justify?: string;
  gap?: string;
}) => <div className={`flex ${justify} ${gap} action`}>{children}</div>;

const UserIcon = () => {
  return (
    <div className="p-3 border border-black rounded-full cursor-pointer">
      <IconPerson />
    </div>
  );
};

interface ButtonProps {
  children: ReactNode;
  variant?: "default" | "primary" | "danger" | "success";
  group?: boolean;
  className?: string;
  onClick?: () => void;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "danger" | "success";
  group?: boolean;
  onClick?: () => void;
  className?: string;
  disableVariant?: boolean;
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "default",
  group,
  onClick,
  className,
  disabled = false,
  disableVariant = false,
}: ButtonProps) => {
  const baseStyle =
    "px-4 py-2 rounded-lg transition-all text-anarya-btn-default flex gap-2 items-center";

  const variantStyle = disableVariant
    ? ""
    : cn(
        variant === "default" && "bg-anarya-bg-icon hover:bg-gray-300",
        variant === "primary" && "bg-green-500 text-white hover:bg-green-600",
        variant === "danger" &&
          "bg-anarya-btn-danger text-white hover:bg-red-600",
        variant === "success" &&
          "bg-anarya-btn-success text-white hover:bg-green-700"
      );

  const disabledStyle = disabled
    ? "bg-gray-300 text-gray-600 opacity-80 cursor-not-allowed pointer-events-none"
    : "";

  return group ? (
    <div className="flex gap-2 items-center group">{children}</div>
  ) : (
    <button
      className={cn(baseStyle, variantStyle, disabledStyle, className)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Assign sub-components
Header.Breadcrumb = Breadcrumb;
Header.Separator = Separator;
Header.Info = Info;
Header.Actions = Actions;
Header.UserIcon = UserIcon;
Header.Button = Button;

export default Header;
