"use client";

import { FlexContainer } from "@components/sharedstyles";
import Hero from "./_components/hero";
import Form from "./_components/form";

export default function SubmitLeadPage() {
  return (
    <FlexContainer $direction="col" $gap="0px" $width="100vw">
      <Hero />
      <Form />
    </FlexContainer>
  );
}
