import styled from "styled-components";

const Button = styled.button`
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

export { Button };
