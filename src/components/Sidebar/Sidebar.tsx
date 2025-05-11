"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

// Wrapper utama
const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <aside className="bg-white shadow-layout rounded-2xl min-w-[298px] p-6 relative">
      {children}
    </aside>
  );
};

// Komponen logo
const Logo = ({ icon = "/kalgen-logo.png", width = 250, height = 140 }) => (
  <div className="flex justify-center">
    <Image
      src={icon}
      alt="kalgen-logo"
      width={width}
      height={height}
      priority
    />
  </div>
);

// Komponen item
const Item = ({
  href,
  icon,
  children,
}: {
  href?: string;
  icon?: string;
  children: ReactNode;
  active?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href || "#"}
      className="flex items-center gap-3 py-2 rounded-lg text-gray-700 transition-all cursor-pointer hover:bg-gray-50"
      onClick={(e) => (isActive && e.preventDefault(), e.stopPropagation())}
    >
      {icon && (
        <Image
          src={
            isActive || (href !== "/" && pathname.startsWith(href as string))
              ? `/icons/navbar/${icon}-active.svg`
              : `/icons/navbar/${icon}.svg`
          }
          alt={icon}
          width={36}
          height={36}
          className="transition-all duration-300 ease-in-out group-hover:scale-105"
        />
      )}
      <span
        className={cn(
          "text-xs",
          isActive ? "text-anarya-navbar" : "text-anarya-navbar-inactive"
        )}
      >
        {children}
      </span>
    </Link>
  );
};

// Komponen submenu dengan toggle state
const SubMenu = ({
  icon,
  label,
  children,
  pathPrefix,
}: {
  icon?: string;
  label: string;
  children: ReactNode;
  pathPrefix: string;
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname.startsWith(pathPrefix);

  useEffect(() => {
    if (isActive) {
      setIsOpen(true);
    }
  }, [isActive]);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-2 rounded-lg cursor-pointer transition-all"
      >
        <div className="flex gap-3 items-center">
          <Image
            src={
              isActive
                ? `/icons/navbar/${icon}-active.svg`
                : `/icons/navbar/${icon}.svg`
            }
            alt={label}
            width={36}
            height={36}
            className="transition-all duration-300 ease-in-out group-hover:scale-105"
          />
          <span
            className={cn(
              "text-xs",
              isActive ? "text-anarya-navbar" : "text-anarya-navbar-inactive"
            )}
          >
            {label}
          </span>
        </div>
        <Image
          src={`/icons/${
            isOpen ? "icon-caret-down.svg" : "icon-caret-right.svg"
          }`}
          alt="toggle"
          width={20}
          height={20}
          className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        />
      </div>

      {/* Submenu items (hidden jika isOpen false) */}
      <div
        className={cn(
          "ml-4 overflow-hidden transition-all flex-col gap-2",
          isOpen ? "max-h-40" : "max-h-0"
        )}
      >
        {isOpen && children}
      </div>
    </div>
  );
};

// Komponen footer
const Footer = () => {
  const { logout } = useAuth();
  return (
    <>
      <div className="text-xs text-anarya-footer text-center absolute bottom-6 left-1/2 -translate-x-1/2 w-full">
        <div className="flex flex-col gap-5">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-3 rounded-lg text-gray-700 transition-all cursor-pointer hover:font-bold"
          >
            <span>Logout</span>
          </button>
          Patologi Klinik & Mikrobiologi
        </div>
      </div>
    </>
  );
};

// Gabungkan semua komponen ke dalam Sidebar
Sidebar.Logo = Logo;
Sidebar.Item = Item;
Sidebar.SubMenu = SubMenu;
Sidebar.Footer = Footer;

export default Sidebar;
