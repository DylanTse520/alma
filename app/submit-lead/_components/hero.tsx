import Image from "next/image";
import { FlexContainer, Text } from "@components/sharedStyles";

export default function Hero() {
  return (
    <FlexContainer $gap="8px" $width="100%" $bgColor="#D9DEA5">
      <Image
        src="/images/discs.png"
        alt="Four discs"
        width={260}
        height={390}
        priority
      />

      <FlexContainer
        $direction="col"
        $gap="36px"
        $width="100%"
        $alignItems="start"
        $padding="0 0 40px 0"
      >
        <Image
          src="/images/alma.png"
          alt="Alma logo"
          width={60}
          height={20}
          priority
        />

        <Text as="h1" $size="44px" $weight="800" $leading="1.2" $align="left">
          Get An Assessment <br /> Of Your Immigration Case
        </Text>
      </FlexContainer>
    </FlexContainer>
  );
}
