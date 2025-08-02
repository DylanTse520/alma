"use client";

import { HomeButtonContainer, HomeContainer } from "@components/containers";
import { Button } from "@components/sharedstyles";

export default function Home() {
  return (
    <HomeContainer>
      <HomeButtonContainer>
        <Button>Public Lead Form</Button>
        <Button>Internal Leads List</Button>
      </HomeButtonContainer>
    </HomeContainer>
  );
}
