"use client";

import { FlexContainer } from "@components/shared";
import Hero from "./_components/hero";
import Form from "./_components/form";

export default function SubmitLeadPage() {
  return (
    <FlexContainer $direction="col" $gap="24px" $width="100vw" $padding="0 0 80px 0">
      <Hero />
      <Form />
    </FlexContainer>
  );
}
