"use client";

import { Button, FlexContainer, Text } from "@components/sharedStyles";
import Image from "next/image";
import Link from "next/link";

export default function SubmitLeadSuccessPage() {
  return (
    <FlexContainer $direction="col" $gap="40px" $width="100vw" $height="100vh">
      <FlexContainer $direction="col" $gap="8px">
        <Image
          src="/images/file.png"
          alt="File icon"
          width={80}
          height={80}
        />

        <FlexContainer $direction="col">
          <Text as="h1" $size="24px" $weight="700" $leading="1.2">
            Thank you
          </Text>
          <Text as="p" $size="16px" $weight="600" $leading="1.2">
            Your information was submitted to our team of immigration <br />
            attorneys. Expect an email from hello@tryalma.ai.
          </Text>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer $width="400px">
        <Button as={Link} href="/">
          Go Back to Homepage
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
}
