"use client";

import { FlexContainer, Text } from "@components/shared";
import { mockLeads } from "@data/mockLeads";
import { Lead } from "@type/leadType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LeadsTable from "./_components/leadsTable";
import LeftSidebar from "./_components/leftSidebar";
import SearchInput from "./_components/searchInputs";
import StatusSelect from "./_components/statusSelect";

const OverflowContainer = styled(FlexContainer)`
  overflow: auto;
`;


export default function LeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("adminLoggedIn");
      if (loggedIn === "true") {
        setIsAuthenticated(true);
      } else {
        router.push("/leads/login");
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleRowClick = (lead: Lead) => {
    // For now, just log the lead details
    // In a real app, you might navigate to a detail page or open a modal
    console.log("Lead clicked:", lead);
  };

  if (isLoading) {
    return (
      <FlexContainer
        $direction="col"
        $justifyContent="center"
        $alignItems="center"
        $height="100vh"
      >
        <Text>Loading...</Text>
      </FlexContainer>
    );
  }

  if (!isAuthenticated) {
    return null;
  }
  return (
    <FlexContainer $width="100vw" $height="100vh">
      <LeftSidebar />

      <FlexContainer $width="1px" $height="100%" $bgColor="#e0e0e0" />

      <OverflowContainer
        $direction="col"
        $padding="24px 8px"
        $width="100%"
        $height="100%"
        $justifyContent="start"
        $alignItems="start"
      >
        <Text as="h1" $weight="600" $size="24px">
          Leads
        </Text>

        <FlexContainer $direction="col" $alignItems="start" $gap="12px">
          <FlexContainer $gap="8px">
            <SearchInput />
            <StatusSelect />
          </FlexContainer>

          <FlexContainer
            $direction="col"
            $gap="16px"
            $width="100%"
            $alignItems="flex-start"
          >
            <LeadsTable data={mockLeads} onRowClick={handleRowClick} />
          </FlexContainer>
        </FlexContainer>
      </OverflowContainer>
    </FlexContainer>
  );
}
