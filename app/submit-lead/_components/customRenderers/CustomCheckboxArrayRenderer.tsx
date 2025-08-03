import { Checkbox, FlexContainer, Text } from "@components/sharedStyles";
import { ControlProps } from "@jsonforms/core";
import { getErrorMessage } from "@lib/getErrorMessage";
import { useState } from "react";

export default function CustomCheckboxArrayRenderer(props: ControlProps) {
  const { data, handleChange, path, schema, errors, required } = props;
  const [touched, setTouched] = useState(false);

  const enumOptions = (schema.items as any)?.enum || [];
  const selectedValues = data || [];
  const hasError = errors && errors.length > 0;

  const isRequired = required !== undefined ? required : false;
  const isEmpty = !selectedValues || selectedValues.length === 0;
  const hasRequiredError = isRequired && isEmpty && touched;

  const showError = (hasError || hasRequiredError) && touched;

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setTouched(true);
    let newValues: string[];
    if (checked) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter((v: string) => v !== value);
    }
    handleChange(path, newValues);
  };

  return (
    <FlexContainer $direction="col" $width="100%">
      <span id="group-label" className="sr-only">
        {schema.title}
      </span>
      <FlexContainer
        $direction="col"
        $width="100%"
        $alignItems="start"
        $gap="8px"
      >
        {enumOptions.map((option: string) => (
          <FlexContainer key={option} $gap="8px">
            <Checkbox
              type="checkbox"
              id={`${path}-${option}`}
              checked={selectedValues.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
            />
            <Text
              as="label"
              htmlFor={`${path}-${option}`}
              $size="14px"
              $color="#2E2E2E"
            >
              {option}
            </Text>
          </FlexContainer>
        ))}
      </FlexContainer>

      {showError && (
        <Text $size="12px" $leading="1.2" $color="#ef4444">
          {hasError
            ? getErrorMessage(errors, schema.title)
            : `${schema.title} is required`}
        </Text>
      )}
    </FlexContainer>
  );
}
