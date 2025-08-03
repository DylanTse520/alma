import { FlexContainer, Input, Text } from "@components/sharedStyles";
import { ControlProps } from "@jsonforms/core";
import { getErrorMessage } from "@lib/getErrorMessage";
import { useState } from "react";

export default function CustomTextareaRenderer(props: ControlProps) {
  const { data, handleChange, path, schema, errors } = props;

  const [touched, setTouched] = useState(false);

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
        as="textarea"
        id={schema.title}
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        placeholder={schema.description}
        rows={8}
        onBlur={() => setTouched(true)}
      />

      {showError && (
        <Text $size="12px" $leading="1.2" $color="#ef4444">
          {getErrorMessage(errors, schema.title)}
        </Text>
      )}
    </FlexContainer>
  );
}
