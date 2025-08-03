import { FlexContainer, Input } from "@components/shared";
import { Search } from "lucide-react";
import styled from "styled-components";

const RelativeContainer = styled(FlexContainer)`
  position: relative;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 10px;
  width: 16px;
  height: 16px;
  color: #b6b6b6;
`;

const StyledInput = styled(Input)`
  border-color: #dcdcdc;
  border-radius: 8px;
  padding: 8px 12px 8px 32px;
  font-size: 14px;
  font-weight: 300;
  background-color: transparent;
`;

export default function SearchInput() {
  return (
    <RelativeContainer $gap="0px" $width="250px">
      <SearchIcon />
      <StyledInput id="search" type="text" placeholder="Search" />
    </RelativeContainer>
  );
}
