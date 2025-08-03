"use client";

import {
  Button,
  FlexContainer,
  Text,
  UnstyledButton,
} from "@components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/table";
import useViewportPageSize from "@lib/useViewportPageSize";
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
import { useEffect, useState } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
  border-radius: 16px;
  overflow: hidden;
`;

const HeaderButton = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 100%;
`;

const ArrowDownIcon = styled(ArrowDown)`
  width: 16px;
  height: 16px;
  color: #b6b6b6;
  transform: translateY(1px);
`;

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderButton>
      <Text as="span" $size="14px" $weight="300" $color="#b6b6b6">
        {children}
      </Text>
      <ArrowDownIcon />
    </HeaderButton>
  );
};

const NoWrapText = styled(Text)`
  white-space: nowrap;
`;

const Cell = ({ children }: { children: string }) => {
  return (
    <NoWrapText as="span" $weight="300" title={children}>
      {children}
    </NoWrapText>
  );
};

const ReachOutButton = styled(Button)`
  white-space: nowrap;
  width: fit-content;
  margin-left: auto;
  padding: 6px 12px;
  border-radius: 8px;
`;

const PaginationContainer = styled(FlexContainer)`
  border-top: 1px solid #e7e7e7;
`;

const PageNavButton = styled(UnstyledButton)`
  height: 26px;
  width: 26px;
  color: #6d6d6d;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageButton = styled(UnstyledButton)<{ $active?: boolean }>`
  height: 26px;
  width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.$active ? "#202020" : "transparent")};
  border-radius: 2px;
  background-color: transparent;
  color: ${(props) => (props.$active ? "#1C1C1C" : "#6D6D6D")};
  font-size: 13px;
  transition: all 0.2s;
`;

export default function LeadsTable({
  leads,
  onStatusUpdate,
}: {
  leads: Lead[];
  onStatusUpdate: (lead: Lead, newStatus: Lead["status"]) => void;
}) {
  const dynamicPageSize = useViewportPageSize();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: dynamicPageSize,
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize: dynamicPageSize,
    }));
  }, [dynamicPageSize]);

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "name",
      header: () => <Header>Name</Header>,
      cell: ({ row }) => <Cell>{row.getValue("name") as string}</Cell>,
      size: 200,
    },
    {
      accessorKey: "createdAt",
      header: () => <Header>Submitted</Header>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <Cell>
            {`${date.toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}, ${date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}`}
          </Cell>
        );
      },
      size: 180,
    },
    {
      accessorKey: "status",
      header: () => <Header>Status</Header>,
      cell: ({ row }) => {
        const status = row.getValue("status") as Lead["status"];
        return (
          <Cell>
            {status
              .split("_")
              .map((word) => {
                return (
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
              })
              .join(" ")}
          </Cell>
        );
      },
      size: 140,
    },
    {
      accessorKey: "country",
      header: () => <Header>Country</Header>,
      cell: ({ row }) => <Cell>{row.getValue("country") as string}</Cell>,
      size: 180,
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => {
        const status = row.getValue("status") as Lead["status"];
        const canReachOut = status === "PENDING";

        if (canReachOut) {
          return (
            <ReachOutButton
              onClick={() =>
                onStatusUpdate(row.original, "REACHED_OUT" as Lead["status"])
              }
              disabled={!canReachOut}
            >
              Reach Out
            </ReachOutButton>
          );
        }
      },
      size: 120,
    },
  ];

  const table = useReactTable({
    data: leads,
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
                  $width={
                    header.column.getSize() === Number.MAX_SAFE_INTEGER
                      ? "auto"
                      : `${header.column.getSize()}px`
                  }
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
                    $width={
                      cell.column.getSize() === Number.MAX_SAFE_INTEGER
                        ? "auto"
                        : `${cell.column.getSize()}px`
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <FlexContainer $height="96px">
                  <Text as="span" $size="16px" $weight="300" $color="#666666">
                    No leads found
                  </Text>
                </FlexContainer>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <PaginationContainer
        $height="48px"
        $justifyContent="end"
        $padding="0 36px 0 0"
      >
        <FlexContainer $gap="8px">
          <PageNavButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={16} />
          </PageNavButton>

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

          <PageNavButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={16} />
          </PageNavButton>
        </FlexContainer>
      </PaginationContainer>
    </TableContainer>
  );
}
