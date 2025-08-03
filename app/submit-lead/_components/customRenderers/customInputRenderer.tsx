import { FlexContainer, Input, Text } from "@components/sharedStyles";
import { ControlProps } from "@jsonforms/core";
import { getErrorMessage } from "@lib/getErrorMessage";
import { useState } from "react";

export default function CustomInputRenderer(props: ControlProps) {
  const { data, handleChange, path, schema, errors } = props;

  const [touched, setTouched] = useState(false);

  const isEmail = schema.format === "email";
  const hasError = errors && errors.length > 0;
  const showError = !!hasError && touched;

  return (
    <FlexContainer
      $direction="col"
      $width="100%"
      $alignItems="start"
      $gap="2px"
    >
      <label className="sr-only" htmlFor={schema.title}>
        {schema.title}
      </label>
      <Input
        id={schema.title}
        type={isEmail ? "email" : "text"}
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        placeholder={schema.description}
        onBlur={() => setTouched(true)}
        $error={showError}
      />

      {showError && (
        <Text $size="12px" $leading="1.2" $color="#ef4444">
          {getErrorMessage(errors, schema.title)}
        </Text>
      )}
    </FlexContainer>
  );
}
