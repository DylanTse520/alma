import styled from "styled-components";

const FlexContainer = styled.div<{
  $direction?: "row" | "col";
  $gap?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $width?: string;
  $height?: string;
  $bgColor?: string;
  $padding?: string;
  $margin?: string;
}>`
  display: flex;
  flex-flow: ${(props) =>
    props.$direction === "col" ? "column nowrap" : "row nowrap"};
  gap: ${(props) => props.$gap || "16px"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  align-items: ${(props) => props.$alignItems || "center"};
  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "auto"};
  background-color: ${(props) => props.$bgColor || "transparent"};
  padding: ${(props) => props.$padding || "0"};
  margin: ${(props) => props.$margin || "0"};
`;

const Text = styled.p<{
  $color?: string;
  $size?: string;
  $leading?: string;
  $weight?: "200" | "300" | "400" | "600" | "700" | "800" | "900";
}>`
  color: ${(props) => props.$color || "#000000"};
  font-size: ${(props) => props.$size || "16px"};
  font-weight: ${(props) => props.$weight || "400"};
  line-height: ${(props) => props.$leading || "1.5"};
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #1d1d1d;
  color: #f3f3f3;
  border: none;
  border-radius: 10px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(110%);
  }
`;

export { Button, FlexContainer, Text };

