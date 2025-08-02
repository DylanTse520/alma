"use client";

import { HomeButtonContainer, HomeContainer } from "./_components/containers";
import { Button } from "./_components/sharedstyles";

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
