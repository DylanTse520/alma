import {
  isStringControl,
  optionIs,
  rankWith,
  uiTypeIs
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import CustomCheckboxArrayRenderer from "./CustomCheckboxArrayRenderer";
import CustomInputRenderer from "./customInputRenderer";
import CustomInstructionRenderer from "./customInstructionRenderer";
import CustomTextareaRenderer from "./customTextareaRenderer";
import CustomVerticalLayoutRenderer from "./customVerticalLayoutRenderer";

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
