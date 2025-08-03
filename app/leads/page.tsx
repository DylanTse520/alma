"use client";

import { FlexContainer, Text } from "@components/shared";
import { leadsAtom } from "@store/index";
import { Lead } from "@type/leadType";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LeadsTable from "./_components/leadsTable";
import LeftSidebar from "./_components/leftSidebar";
import SearchInput from "./_components/searchInputs";
import StatusSelect from "./_components/statusSelect";

const OverflowContainer = styled(FlexContainer)`
  overflow: hidden;
`;

export default function LeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useAtom(leadsAtom);
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

  const handleStatusUpdate = (lead: Lead, newStatus: Lead["status"]) => {
    setLeads(
      leads.map((l) => (l.id === lead.id ? { ...l, status: newStatus } : l))
    );
  };

  if (isLoading) {
    <FlexContainer
      $width="100%"
      $height="100%"
      $justifyContent="center"
      $alignItems="center"
    >
      <Text as="span">Loading</Text>
    </FlexContainer>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <FlexContainer $width="100vw" $height="100vh" $gap="0px">
      <LeftSidebar />

      <FlexContainer $width="1px" $height="100%" $bgColor="#e0e0e0" />

      <OverflowContainer
        $direction="col"
        $padding="24px"
        $width="100%"
        $height="100%"
        $justifyContent="start"
        $alignItems="start"
      >
        <Text as="h1" $weight="600" $size="24px">
          Leads
        </Text>

        <FlexContainer
          $direction="col"
          $alignItems="start"
          $width="100%"
          $gap="12px"
        >
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
            <LeadsTable leads={leads} onStatusUpdate={handleStatusUpdate} />
          </FlexContainer>
        </FlexContainer>
      </OverflowContainer>
    </FlexContainer>
  );
}
