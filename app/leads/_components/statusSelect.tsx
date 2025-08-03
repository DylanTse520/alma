import { FlexContainer } from "@components/shared";
import { ChevronDown } from "lucide-react";
import styled from "styled-components";

const RelativeContainer = styled(FlexContainer)`
  position: relative;
`;

const ChevronDownIcon = styled(ChevronDown)`
  position: absolute;
  right: 10px;
  width: 18px;
  height: 18px;
  color: #b6b6b6;
`;

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 100px;
  border-radius: 8px;
  padding: 8px 32px 8px 12px;
  font-weight: 300;
  background-color: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: #dcdcdc;
  font-size: 14px;
  color: #b6b6b6;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #bfbfbf;
    outline: none;
  }

  &:hover {
    border-color: #bfbfbf;
  }
`;

export default function StatusSelect() {
  return (
    <RelativeContainer $gap="0px">
      <Select id="status">
        <option value="all">Status</option>
        <option value="pending">Pending</option>
        <option value="reached_out">Reached Out</option>
      </Select>
      <ChevronDownIcon />
    </RelativeContainer>
  );
}
