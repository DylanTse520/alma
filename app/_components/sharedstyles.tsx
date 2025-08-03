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
  $align?: string;
}>`
  color: ${(props) => props.$color || "#000000"};
  font-size: ${(props) => props.$size || "16px"};
  font-weight: ${(props) => props.$weight || "400"};
  line-height: ${(props) => props.$leading || "1.5"};
  text-align: ${(props) => props.$align || "center"};
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
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(110%);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 12px 12px;
  font-size: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.$error ? "#ef4444" : "#e0e0e0")};
  border-radius: 10px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${(props) => (props.$error ? "#ef4444" : "#3b82f6")};
    outline: none;
  }

  &::placeholder {
    color: #d9d9d9;
  }
`;

const Checkbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 18px;
  height: 18px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: #e0e0e0;
  border-radius: 4px;
  background-color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  &:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }
  
  &:checked::after {
    content: "✓";
    display: block;
    color: white;
    font-size: 12px;
    font-weight: 900;
    text-align: center;
    line-height: 14px;
  }
`;

export { Button, FlexContainer, Text, Input, Checkbox };
