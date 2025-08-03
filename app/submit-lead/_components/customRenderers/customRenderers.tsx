import {
  ControlProps,
  isStringControl,
  optionIs,
  rankWith,
  uiTypeIs,
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import React from "react";
import CustomInstructionRenderer from "./customInstructionRenderer";
import CustomVerticalLayoutRenderer from "./customVerticalLayoutRenderer";
import { getErrorMessage } from "@lib/getErrorMessage";
import CustomInputRenderer from "./customInputRenderer";

const CustomTextareaRenderer = (props: ControlProps) => {
  const { data, handleChange, path, schema, uischema, errors } = props;
  const [touched, setTouched] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const hasError = errors && errors.length > 0;
  const showError = hasError && touched;
  const rows = (uischema as any)?.options?.rows || 4;

  const getTextareaStyles = () => {
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
      resize: "vertical" as const,
      minHeight: "80px",
      fontFamily: "inherit",
      boxShadow,
    };
  };

  return (
    <div style={{ width: "100%" }}>
      <label className="sr-only" htmlFor={schema.title}>
        {schema.title}
      </label>
      <textarea
        id={schema.title}
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        placeholder={schema.description}
        rows={rows}
        style={getTextareaStyles()}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTouched(true);
        }}
      />
      {showError && (
        <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
          {getErrorMessage(errors, schema.title)}
        </div>
      )}
    </div>
  );
};

const CustomCheckboxArrayRenderer = (props: ControlProps) => {
  const { data, handleChange, path, schema, errors } = props;
  const [touched, setTouched] = React.useState(false);

  const enumOptions = (schema.items as any)?.enum || [];
  const selectedValues = data || [];
  const hasError = errors && errors.length > 0;
  const showError = hasError && touched;

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
    <div role="group" aria-labelledby="group-label">
      <span id="group-label" className="sr-only">
        {schema.title}
      </span>
      <div>
        {enumOptions.map((option: string) => (
          <div
            key={option}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <input
              type="checkbox"
              id={`${path}-${option}`}
              checked={selectedValues.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              style={{
                width: "16px",
                height: "16px",
                cursor: "pointer",
              }}
            />
            <label
              htmlFor={`${path}-${option}`}
              style={{
                cursor: "pointer",
                fontWeight: "normal",
                fontSize: "14px",
              }}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {showError && (
        <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "8px" }}>
          {getErrorMessage(errors, schema.title) ||
            "Please select at least one option"}
        </div>
      )}
    </div>
  );
};

const customVerticalLayoutTester = rankWith(3, uiTypeIs("VerticalLayout"));
const customInstructionTester = rankWith(3, uiTypeIs("Instruction"));
const customTextareaTester = rankWith(4, optionIs("multi", true));
const customCheckboxArrayTester = rankWith(4, optionIs("format", "checkbox"));
const customInputTester = rankWith(3, isStringControl);

const CustomInputControl = withJsonFormsControlProps(CustomInputRenderer);
const CustomCheckboxArrayControl = withJsonFormsControlProps(
  CustomCheckboxArrayRenderer
);
const CustomTextareaControl = withJsonFormsControlProps(CustomTextareaRenderer);

const customRenderers = [
  {
    tester: customVerticalLayoutTester,
    renderer: CustomVerticalLayoutRenderer,
  },
  { tester: customInstructionTester, renderer: CustomInstructionRenderer },
  { tester: customInputTester, renderer: CustomInputControl },
  { tester: customCheckboxArrayTester, renderer: CustomCheckboxArrayControl },
  { tester: customTextareaTester, renderer: CustomTextareaControl },
];

export default customRenderers;
