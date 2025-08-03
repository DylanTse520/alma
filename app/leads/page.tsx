"use client";

import { FlexContainer, Text } from "@components/shared";
import { mockLeads } from "@data/mockLeads";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Lead } from "@type/leadType";
import LeadsTable from "./_components/leadsTable";
import LeftSidebar from "./_components/leftSidebar";

// Main layout container
const PageLayout = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

// Main content area (everything except sidebar)
const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
`;

// Header controls container
const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

// Mock search input
const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  width: 300px;
  font-size: 14px;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Mock status dropdown
const StatusDropdown = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
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
    return null; // This will be handled by the redirect
  }

  return (
    <PageLayout>
      <LeftSidebar />

      <MainContent>
        <FlexContainer
          $direction="col"
          $gap="24px"
          $padding="24px"
          $alignItems="flex-start"
          $width="100%"
        >
          {/* Simple Header */}
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "700",
              color: "#1d1d1d",
            }}
          >
            Leads
          </h1>

          {/* Header Controls */}
          <HeaderControls>
            <SearchInput type="text" placeholder="Search leads..." readOnly />
            <StatusDropdown disabled>
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="REACHED_OUT">Reached Out</option>
            </StatusDropdown>
          </HeaderControls>

          {/* Leads Table */}
          <FlexContainer
            $direction="col"
            $gap="16px"
            $width="100%"
            $alignItems="flex-start"
          >
            <LeadsTable data={mockLeads} onRowClick={handleRowClick} />
          </FlexContainer>
        </FlexContainer>
      </MainContent>
    </PageLayout>
  );
}
