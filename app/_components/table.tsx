import styled from "styled-components";

const TableWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  caption-side: bottom;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
`;

const TableHeader = styled.thead``;

const TableBody = styled.tbody``;

const TableFooter = styled.tfoot`
  border-top: 1px solid #e5e7eb;
  background-color: rgba(249, 250, 251, 0.5);
  font-weight: 500;
`;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(249, 250, 251, 0.5);
  }

  &[data-state="selected"] {
    background-color: #f3f4f6;
  }

  &:not(:last-child) td {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const TableHead = styled.th`
  height: 40px;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 8px;
  text-align: left;
  vertical-align: middle;
  font-weight: 500;
  color: #6b7280;

  &:has([role="checkbox"]) + & {
    padding-left: 0;
  }

  & > [role="checkbox"] {
    transform: translateY(2px);
  }
`;

const TableCell = styled.td`
  padding: 8px;
  vertical-align: middle;

  &:has([role="checkbox"]) + & {
    padding-left: 0;
  }

  & > [role="checkbox"] {
    transform: translateY(2px);
  }
`;

const TableCaption = styled.caption`
  margin-top: 16px;
  font-size: 14px;
  color: #6b7280;
`;

export {
  TableWrapper,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
