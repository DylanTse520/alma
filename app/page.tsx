"use client";

import Image from "next/image";
import { Button, FlexContainer } from "@components/sharedstyles";
import Link from "next/link";

export default function HomePage() {
  return (
    <FlexContainer direction="col" gap="40px" height="100vh">
      <h1 className="sr-only">Alma</h1>
      <Image
        src="/images/alma.png"
        alt="Alma logo"
        width={150}
        height={50}
        priority
      />
      <FlexContainer direction="col" gap="16px" width="320px">
        <Button as={Link} href="/submit-lead">
          Submit Your Lead
        </Button>
        <Button>View Leads</Button>
      </FlexContainer>
    </FlexContainer>
  );
}
