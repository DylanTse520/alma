import { FlexContainer } from "@components/shared";
import { Layout, LayoutProps } from "@jsonforms/core";
import { JsonFormsDispatch } from "@jsonforms/react";

export default function CustomVerticalLayoutRenderer(props: LayoutProps) {
  const { uischema, schema, path, enabled, renderers, cells } = props;
  const layout = uischema as Layout;
  const elements = layout.elements || [];

  return (
    <FlexContainer $direction="col" $gap="16px" $width="100%">
      {elements.map((element, index) => (
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
    </FlexContainer>
  );
}
