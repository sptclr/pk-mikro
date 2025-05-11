"use client";
import { cn } from "@/utils";
import * as React from "react";

type TableComponent = React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>
> & {
  Header: typeof TableHeader;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Head: typeof TableHead;
  Cell: typeof TableCell;
  Footer: typeof TableFooter;
};

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="table-container">
    <table ref={ref} className={cn("table-base", className)} {...props} />
  </div>
)) as TableComponent;

Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("table-header", className)} {...props} />
));
TableHeader.displayName = "Table.Header";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("table-body", className)} {...props} />
));
TableBody.displayName = "Table.Body";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("table-footer", className)} {...props} />
));
TableFooter.displayName = "Table.Footer";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("table-row", className)} {...props} />
));
TableRow.displayName = "Table.Row";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("table-head", "text-left", className)}
    {...props}
  />
));
TableHead.displayName = "Table.Head";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("table-cell", className)} {...props} />
));
TableCell.displayName = "Table.Cell";

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Footer = TableFooter;

export default Table;
