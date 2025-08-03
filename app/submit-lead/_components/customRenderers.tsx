import React from "react";
import {
  rankWith,
  ControlProps,
  scopeEndsWith,
  isStringControl,
  optionIs,
  uiTypeIs,
  LayoutProps,
} from "@jsonforms/core";
import { withJsonFormsControlProps, JsonFormsDispatch } from "@jsonforms/react";

// Custom Instruction Renderer
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

  return (
    <div style={getStyles()}>
      {text}
    </div>
  );
};

// Custom Vertical Layout Renderer
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

// Custom Input Control for string fields
const CustomInputRenderer = (props: ControlProps) => {
  const { data, handleChange, path, schema, errors } = props;
  const isEmail = schema.format === "email";
  const hasError = errors && errors.length > 0;

  return (
    <div className="control">
      <label
        style={{
          marginBottom: "4px",
          display: "block",
          fontWeight: "500",
          fontSize: "14px",
        }}
      >
        {schema.title}
        {schema.minLength && schema.minLength > 0 && (
          <span style={{ color: "#ef4444" }}> *</span>
        )}
      </label>
      {schema.description && (
        <div
          style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}
        >
          {schema.description}
        </div>
      )}
      <input
        type={isEmail ? "email" : "text"}
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        placeholder={
          isEmail
            ? "Enter your email address"
            : `Enter your ${schema.title?.toLowerCase()}`
        }
        style={{
          width: "100%",
          padding: "10px 12px",
          border: hasError ? "1px solid #ef4444" : "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          outline: "none",
        }}
        onFocus={(e) => {
          if (!hasError) {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
          }
        }}
        onBlur={(e) => {
          if (!hasError) {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }
        }}
      />
      {hasError && (
        <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
          {Array.isArray(errors) && errors[0]
            ? String(errors[0])
            : "Invalid input"}
        </div>
      )}
    </div>
  );
};

// Custom Textarea Control
const CustomTextareaRenderer = (props: ControlProps) => {
  const { data, handleChange, path, schema, uischema, errors } = props;
  const hasError = errors && errors.length > 0;
  const rows = (uischema as any)?.options?.rows || 4;

  return (
    <div className="control">
      <label
        style={{
          marginBottom: "4px",
          display: "block",
          fontWeight: "500",
          fontSize: "14px",
        }}
      >
        {schema.title}
      </label>
      {schema.description && (
        <div
          style={{ marginBottom: "8px", fontSize: "12px", color: "#6b7280" }}
        >
          {schema.description}
        </div>
      )}
      <textarea
        value={data || ""}
        onChange={(e) => handleChange(path, e.target.value)}
        placeholder={`Enter ${schema.title?.toLowerCase()}`}
        rows={rows}
        style={{
          width: "100%",
          padding: "10px 12px",
          border: hasError ? "1px solid #ef4444" : "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          outline: "none",
          resize: "vertical",
          minHeight: "80px",
          fontFamily: "inherit",
        }}
        onFocus={(e) => {
          if (!hasError) {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
          }
        }}
        onBlur={(e) => {
          if (!hasError) {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }
        }}
      />
      {hasError && (
        <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
          {Array.isArray(errors) && errors[0]
            ? String(errors[0])
            : "Invalid input"}
        </div>
      )}
    </div>
  );
};

// Custom Checkbox Array Control
const CustomCheckboxArrayRenderer = (props: ControlProps) => {
  const { data, handleChange, path, schema, errors } = props;

  const enumOptions = (schema.items as any)?.enum || [];
  const selectedValues = data || [];
  const hasError = errors && errors.length > 0;

  const handleCheckboxChange = (value: string, checked: boolean) => {
    let newValues: string[];
    if (checked) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter((v: string) => v !== value);
    }
    handleChange(path, newValues);
  };

  return (
    <div className="control">
      <label style={{ marginBottom: "8px", display: "block", fontWeight: "500", fontSize: "14px" }}>
        {schema.title}
        <span style={{ color: "#ef4444" }}> *</span>
      </label>
      {schema.description && (
        <div className="description" style={{ marginBottom: "12px", fontSize: "12px", color: "#6b7280" }}>
          {schema.description}
        </div>
      )}
      <div className="checkbox-group">
        {enumOptions.map((option: string) => (
          <div
            key={option}
            className="checkbox-item"
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
      {hasError && (
        <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "8px" }}>
          {Array.isArray(errors) && errors[0]
            ? String(errors[0])
            : "Please select at least one option"}
        </div>
      )}
    </div>
  );
};

// Testers for each custom renderer
const customVerticalLayoutTester = rankWith(5, uiTypeIs("VerticalLayout"));
const customInstructionTester = rankWith(4, uiTypeIs("Instruction"));
const customInputTester = rankWith(3, isStringControl);
const customCheckboxArrayTester = rankWith(3, scopeEndsWith("visasInterested"));
const customTextareaTester = rankWith(3, scopeEndsWith("additionalInfo"));

// Wrapped controls with JSONForms props
const CustomInputControl = withJsonFormsControlProps(CustomInputRenderer);
const CustomCheckboxArrayControl = withJsonFormsControlProps(
  CustomCheckboxArrayRenderer
);
const CustomTextareaControl = withJsonFormsControlProps(CustomTextareaRenderer);

export const customRenderers = [
  { tester: customVerticalLayoutTester, renderer: CustomVerticalLayoutRenderer },
  { tester: customInstructionTester, renderer: CustomInstructionRenderer },
  { tester: customInputTester, renderer: CustomInputControl },
  { tester: customCheckboxArrayTester, renderer: CustomCheckboxArrayControl },
  { tester: customTextareaTester, renderer: CustomTextareaControl },
];
