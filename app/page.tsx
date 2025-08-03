"use client";

import Image from "next/image";
import { Button, FlexContainer, Text } from "@components/sharedStyles";
import Link from "next/link";

export default function HomePage() {
  return (
    <FlexContainer $direction="col" $gap="40px" $height="100vh">
      <Text as="h1" className="sr-only">
        Alma
      </Text>

      <Image
        src="/images/alma.png"
        alt="Alma logo"
        width={150}
        height={50}
        priority
      />

      <FlexContainer $direction="col" $gap="16px" $width="320px">
        <Button as={Link} href="/submit-lead">
          Submit Your Lead
        </Button>
        <Button as={Link} href="/leads/login">
          View Leads
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
}
