"use client";

import Image from "next/image";
import { HomeButtonContainer, HomeContainer } from "@components/containers";
import { Button } from "@components/sharedstyles";

export default function Home() {
  return (
    <HomeContainer>
      <h1 className="sr-only">Alma</h1>
      <Image
        src="/images/alma.png"
        alt="Alma logo"
        width={150}
        height={50}
        priority
      />
      <HomeButtonContainer>
        <Button>Public Lead Form</Button>
        <Button>Internal Leads List</Button>
      </HomeButtonContainer>
    </HomeContainer>
  );
}
