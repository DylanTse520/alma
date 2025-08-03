import { FlexContainer, Text } from "@components/sharedStyles";
import { ControlProps } from "@jsonforms/core";
import { getErrorMessage } from "@lib/getErrorMessage";
import { useState, useRef } from "react";
import styled from "styled-components";

const FileUploadContainer = styled.div<{ $error?: boolean }>`
  width: 100%;
  border: 1px dashed ${(props) => (props.$error ? "#ef4444" : "#e0e0e0")};
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => (props.$error ? "#ef4444" : "#3b82f6")};
    background-color: #f8fafc;
  }

  &.dragover {
    border-color: #3b82f6;
    background-color: #eff6ff;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f4f6;
  padding: 8px 12px;
  border-radius: 8px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    color: #dc2626;
  }
`;

export default function CustomFileUploadRenderer(props: ControlProps) {
  const { data, handleChange, path, schema, errors } = props;
  const [touched, setTouched] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasError = errors && errors.length > 0;
  const showError = !!hasError && touched;

  const handleFileSelect = (file: File | null) => {
    if (file) {
      // Convert file to base64 for storage (you might want to upload to a server instead)
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          data: reader.result, // base64 string
        };
        handleChange(path, fileData);
      };
      reader.readAsDataURL(file);
    } else {
      handleChange(path, null);
    }
    setTouched(true);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type.startsWith("application/vnd.") ||
        file.type.startsWith("application/msword"))
    ) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeFile = () => {
    handleChange(path, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <FlexContainer
      $direction="col"
      $width="100%"
      $alignItems="start"
      $gap="8px"
    >
      <Text as="label" className="sr-only" htmlFor={schema.title}>
        {schema.title}
      </Text>
      <input
        id={schema.title}
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={{ display: "none" }}
        aria-label={schema.title}
      />

      <FileUploadContainer
        $error={showError}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={dragOver ? "dragover" : ""}
      >
        {!data ? (
          <FlexContainer $direction="col" $gap="8px">
            <Text $size="16px" $weight="600" $color="#6b7280">
              Drop your resume or CV here
            </Text>
            <Text $size="14px" $leading="1.2" $color="#9ca3af">
              or click to browse files
            </Text>
          </FlexContainer>
        ) : (
          <FileInfo>
            <FlexContainer $direction="col" $alignItems="start" $gap="2px">
              <Text $size="14px" $weight="600" $color="#374151">
                {data.name}
              </Text>
              <Text $size="12px" $color="#6b7280">
                {formatFileSize(data.size)}
              </Text>
            </FlexContainer>
            <RemoveButton
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              Remove
            </RemoveButton>
          </FileInfo>
        )}
      </FileUploadContainer>

      {showError && (
        <Text $size="12px" $leading="1.2" $color="#ef4444">
          {getErrorMessage(errors, schema.title)}
        </Text>
      )}
    </FlexContainer>
  );
}
