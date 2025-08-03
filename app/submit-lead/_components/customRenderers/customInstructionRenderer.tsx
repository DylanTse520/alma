import { FlexContainer, Text } from "@components/sharedStyles";
import { ControlProps } from "@jsonforms/core";
import Image from "next/image";

export default function CustomInstructionRenderer(props: ControlProps) {
  const { uischema } = props;
  const { iconPath, iconAlt, title, text } = (uischema.options || {}) as {
    iconPath: string;
    iconAlt: string;
    title: string;
    text?: string;
  };

  return (
    <FlexContainer $direction="col" $gap="8px" $width="580px" $padding="8px 0">
      <Image src={iconPath} alt={iconAlt} width={80} height={80} />

      <FlexContainer $direction="col">
        <Text as="h2" $size="24px" $weight="700" $leading="1.2">
          {title}
        </Text>
        {text && (
          <FlexContainer $padding="0 0 24px 0">
            <Text as="p" $size="16px" $weight="600" $leading="1.2">
              {text}
            </Text>
          </FlexContainer>
        )}
      </FlexContainer>
    </FlexContainer>
  );
}
