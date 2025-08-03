import React from "react";
import {
  rankWith,
  ControlProps,
  scopeEndsWith,
  isStringControl,
  optionIs,
  uiTypeIs,
  LayoutProps,
  and,
  schemaMatches,
} from "@jsonforms/core";
import { withJsonFormsControlProps, JsonFormsDispatch } from "@jsonforms/react";

const CustomInstructionRenderer = (props: ControlProps) => {
  const { uischema } = props;
  const text = uischema.options?.text || "";
  const style = uischema.options?.style || "default";

  const getStyles = () => {
    const baseStyle = {
      marginBottom: "16px",
      padding: "12px",
      borderRadius: "6px",
      fontSize: "14px",
      lineHeight: "1.5",
    };

    switch (style) {
      case "header":
        return {
          ...baseStyle,
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          fontWeight: "500",
          color: "#1f2937",
        };
      case "info":
        return {
          ...baseStyle,
          backgroundColor: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e40af",
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: "#f9fafb",
          border: "1px solid #d1d5db",
          color: "#374151",
        };
    }
  };

  return <div style={getStyles()}>{text}</div>;
};

const CustomVerticalLayoutRenderer = (props: LayoutProps) => {
  const { uischema, schema, path, enabled, renderers, cells } = props;
  const layout = uischema as any;
  const elements = layout.elements || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {elements.map((element: any, index: number) => (
        <JsonFormsDispatch
          key={index}
          uischema={element}
          schema={schema}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      ))}
    </div>
  );
};

const CustomInputRenderer = (props: ControlProps) => {
  const { data, handleChange, path, schema, errors } = props;
  const isEmail = schema.format === "email";
  const [touched, setTouched] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
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
    <div>
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
        <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
          {Array.isArray(errors) && errors[0]
            ? String(errors[0])
            : "Invalid input"}
        </div>
      )}
    </div>
  );
};

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
    <div>
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
          {Array.isArray(errors) && errors[0]
            ? String(errors[0])
            : "Invalid input"}
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
          {Array.isArray(errors) && errors[0]
            ? String(errors[0])
            : "Please select at least one option"}
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

export const customRenderers = [
  {
    tester: customVerticalLayoutTester,
    renderer: CustomVerticalLayoutRenderer,
  },
  { tester: customInstructionTester, renderer: CustomInstructionRenderer },
  { tester: customInputTester, renderer: CustomInputControl },
  { tester: customCheckboxArrayTester, renderer: CustomCheckboxArrayControl },
  { tester: customTextareaTester, renderer: CustomTextareaControl },
];
