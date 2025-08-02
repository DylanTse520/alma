import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 100vh;
  min-height: 100vh;
`;

const HomeButtonContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 320px;
  gap: 16px;
`;

export { HomeContainer, HomeButtonContainer };
