"use client";

import { Text } from "@components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Lead } from "@type/leadType";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import styled from "styled-components";

// Styled components for table-specific styling
const TableContainer = styled.div`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
`;

const ClickableCell = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SortableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
`;

const EmptyState = styled.div`
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background-color: #fafafa;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: ${(props) => (props.$active ? "#3b82f6" : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#374151")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$active ? "#2563eb" : "#f9fafb")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface LeadsTableProps {
  data: Lead[];
  onRowClick?: (lead: Lead) => void;
}

export default function LeadsTable({ data, onRowClick }: LeadsTableProps) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: () => (
        <SortableHeader>
          Name
          <ArrowDown size={16} />
        </SortableHeader>
      ),
      cell: ({ row }) => (
        <ClickableCell onClick={() => onRowClick?.(row.original)}>
          {row.getValue("name") as string}
        </ClickableCell>
      ),
      size: 200,
    },
    {
      accessorKey: "country",
      header: () => (
        <SortableHeader>
          Country
          <ArrowDown size={16} />
        </SortableHeader>
      ),
      cell: ({ row }) => (
        <ClickableCell onClick={() => onRowClick?.(row.original)}>
          {row.getValue("country") as string}
        </ClickableCell>
      ),
      size: 150,
    },
    {
      accessorKey: "status",
      header: () => (
        <SortableHeader>
          Status
          <ArrowDown size={16} />
        </SortableHeader>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const isReachedOut = status === "REACHED_OUT";
        return (
          <span
            style={{
              backgroundColor: isReachedOut ? "#dcfce7" : "#fef3c7",
              color: isReachedOut ? "#166534" : "#92400e",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            {status.replace("_", " ")}
          </span>
        );
      },
      size: 140,
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <SortableHeader>
          Submitted
          <ArrowDown size={16} />
        </SortableHeader>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <span style={{ fontSize: "12px", color: "#6b7280" }}>
            {date.toLocaleDateString()}{" "}
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
      size: 180,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
  });

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{
                    width:
                      header.column.getSize() === Number.MAX_SAFE_INTEGER
                        ? "auto"
                        : `${header.column.getSize()}px`,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width:
                        cell.column.getSize() === Number.MAX_SAFE_INTEGER
                          ? "auto"
                          : `${cell.column.getSize()}px`,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <EmptyState>
                  <Text $size="16px" $color="#666666">
                    No leads found
                  </Text>
                </EmptyState>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <PaginationContainer>
        <PaginationControls>
          <PageButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={16} />
          </PageButton>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
            const pageIndex = table.getState().pagination.pageIndex;
            const totalPages = table.getPageCount();

            let startPage = Math.max(0, pageIndex - 2);
            const endPage = Math.min(totalPages - 1, startPage + 4);

            if (endPage - startPage < 4) {
              startPage = Math.max(0, endPage - 4);
            }

            const page = startPage + i;
            if (page > endPage) return null;

            return (
              <PageButton
                key={page}
                $active={pageIndex === page}
                onClick={() => table.setPageIndex(page)}
              >
                {page + 1}
              </PageButton>
            );
          })}

          <PageButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={16} />
          </PageButton>
        </PaginationControls>
      </PaginationContainer>
    </TableContainer>
  );
}
