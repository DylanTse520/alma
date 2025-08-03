"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FlexContainer, Text, Input } from "@components/shared";

const ADMIN_CREDENTIALS = {
  email: "admin@tryalma.ai",
  password: "correctpassword",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Mock authentication - store login state in localStorage
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/leads");
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <FlexContainer
      $direction="col"
      $justifyContent="center"
      $alignItems="center"
      $height="100vh"
    >
      <FlexContainer
        $direction="col"
        $gap="0px"
        $width="100%"
        style={{ maxWidth: "400px" }}
      >
        <FlexContainer $direction="col" $gap="24px" $width="100%" $margin="64px 0">
            <Text as="h1" $size="24px" $weight="700" $color="#1d1d1d">
              Admin Login
            </Text>

          <FlexContainer $direction="col" $gap="16px" $width="100%">
            <FlexContainer
              $direction="col"
              $gap="4px"
              $alignItems="flex-start"
              $width="100%"
            >
              <Text as="label" htmlFor="email" className="sr-only">
                Email
              </Text>
              <Input
                id="email"
                type="email"
                placeholder="admin@tryalma.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                $error={!!error}
              />
            </FlexContainer>

            <FlexContainer
              $direction="col"
              $gap="4px"
              $alignItems="flex-start"
              $width="100%"
            >
              <Text as="label" htmlFor="password" className="sr-only">
                Password
              </Text>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                $error={!!error}
              />
            </FlexContainer>

            {error && (
              <Text $size="14px" $color="#ef4444" $align="left">
                {error}
              </Text>
            )}

            <Button disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer $direction="col" $gap="8px">
          <Text $size="12px" $leading="1.2" $color="#999999">
            Demo credentials:
          </Text>
          <FlexContainer $direction="col" $gap="2px">
            <Text $size="12px" $leading="1.2" $color="#999999">
              Email: admin@tryalma.ai
            </Text>
            <Text $size="12px" $leading="1.2" $color="#999999">
              Password: correctpassword
            </Text>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
}
