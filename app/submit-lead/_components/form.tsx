import { Button, FlexContainer } from "@components/sharedstyles";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/submit-lead/success");
  };

  return (
    <FlexContainer $direction="col" $gap="16px" $width="400px">
      <Button onClick={handleSubmit}>Submit</Button>
    </FlexContainer>
  );
}
