import { FlexContainer, Text } from "@components/sharedStyles";
import { ControlProps } from "@jsonforms/core";
import { useState } from "react";

export default function CustomInputRenderer(props: ControlProps) {
  const { data, handleChange, path, schema, errors } = props;

  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const isEmail = schema.format === "email";
  const hasError = errors && errors.length > 0;
  const showError = hasError && touched;

  const getInputStyles = () => {
    let borderColor = "#d1d5db";
    let boxShadow = "none";

    if (showError) {
      borderColor = "#ef4444";
    } else if (focused) {
      borderColor = "#3b82f6";
      boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
    }

    return {
      width: "100%",
      padding: "10px 12px",
      border: `1px solid ${borderColor}`,
      borderRadius: "6px",
      fontSize: "14px",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      outline: "none",
      boxShadow,
    };
  };

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
      <input
        id={schema.title}
        type={isEmail ? "email" : "text"}
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        placeholder={schema.description}
        style={getInputStyles()}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTouched(true);
        }}
      />

      {showError && (
        <Text $size="12px" $leading="1.2" $color="#ef4444">
          {Array.isArray(errors) && errors[0]
            ? String(errors[0])
            : "Invalid input"}
        </Text>
      )}
    </FlexContainer>
  );
}
