"use client";

import { Button, FlexContainer } from "@components/shared";
import schema from "@data/schema.json";
import uischema from "@data/uischema.json";
import { JsonForms } from "@jsonforms/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import customRenderers from "./customRenderers";

export default function Form() {
  const router = useRouter();

  const [data, setData] = useState({});
  const [valid, setValid] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = () => {
    if (valid) {
      console.log("Form data:", data);
      router.push("/submit-lead/success");
    }
  };

  if (!mounted) {
    return null;
  }
  return (
    <FlexContainer $direction="col" $gap="40px" $width="400px">
      <FlexContainer $direction="col" $gap="24px" $width="100%">
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={customRenderers}
          onChange={({ data, errors }) => {
            setData(data);
            setValid(!errors || errors.length === 0);
          }}
        />
      </FlexContainer>
      <Button onClick={handleSubmit} disabled={!valid}>
        Submit
      </Button>
    </FlexContainer>
  );
}
