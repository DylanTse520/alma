import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHeader = styled.thead``;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(249, 250, 251, 0.5);
  }

  &:not(:last-child) td {
    border-bottom: 1px solid #eeeeee;
  }
`;

const TableHead = styled.th<{ $width?: string }>`
  height: 44px;
  border-bottom: 1px solid #eeeeee;
  padding: 0 16px;
  width: ${({ $width }) => $width || "auto"};
`;

const TableCell = styled.td<{ $width?: string }>`
  height: 60px;
  padding: 0 16px;
  width: ${({ $width }) => $width || "auto"};
`;

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell };
