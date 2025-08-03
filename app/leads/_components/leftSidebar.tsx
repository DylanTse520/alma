"use client";

import { FlexContainer, Text, UnstyledButton } from "@components/shared";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const GreenHue = styled.div`
  position: absolute;
  top: -250px;
  left: -180px;
  width: 400px;
  height: 400px;
  border-radius: 9999px;
  background-color: #d9dea5;
  filter: blur(100px);
  z-index: -1;
`;

export default function LeftSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/leads/login");
  };

  return (
    <FlexContainer
      $position="relative"
      $width="240px"
      $height="100%"
      $padding="32px"
      $direction="col"
      $alignItems="start"
      $justifyContent="space-between"
    >
      <GreenHue />

      <FlexContainer $direction="col" $alignItems="start" $gap="80px">
        <Image src="/images/alma.png" alt="Alma Logo" width={96} height={32} />

        <FlexContainer $direction="col" $alignItems="start" $gap="20px">
          <UnstyledButton>
            <Text $weight="700" $size="16px">
              Leads
            </Text>
          </UnstyledButton>
          <UnstyledButton>
            <Text $weight="300" $size="16px">
              Settings
            </Text>
          </UnstyledButton>
        </FlexContainer>
      </FlexContainer>

      <UnstyledButton onClick={handleLogout}>
        <FlexContainer $direction="row" $alignItems="center" $gap="12px">
          <FlexContainer
            $width="44px"
            $height="44px"
            $rounded="9999px"
            $bgColor="#ECECEC"
          >
            <Text $weight="600">A</Text>
          </FlexContainer>
          <Text $weight="700">Admin</Text>
        </FlexContainer>
      </UnstyledButton>
    </FlexContainer>
  );
}
