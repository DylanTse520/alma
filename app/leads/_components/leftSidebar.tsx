"use client";

import Image from "next/image";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  border-right: 1px solid #e5e7eb;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 32px;
  padding: 8px;
`;

const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 0;
  background-color: transparent;
  color: #374151;
  border: none;
  font-size: 14px;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: transparent;
  }

  &:focus {
    outline: none;
  }
`;

const AdminSection = styled.div`
  margin-top: auto;
  padding-top: 24px;
`;

const AdminButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 0;
  background-color: transparent;
  color: #6b7280;
  border: none;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: transparent;
  }

  &:focus {
    outline: none;
  }
`;


const ProfileCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
`;

export default function LeftSidebar() {
  return (
    <SidebarContainer>
      <LogoContainer>
        <Image 
          src="/images/alma.png" 
          alt="Alma Logo" 
          width={120} 
          height={40} 
        />
      </LogoContainer>

      <NavSection>
        <NavButton $isActive={true}>
          Leads
        </NavButton>
        
        <NavButton>
          Settings
        </NavButton>
      </NavSection>

      <AdminSection>
        <AdminButton>
          <ProfileCircle>A</ProfileCircle>
          Admin
        </AdminButton>
      </AdminSection>
    </SidebarContainer>
  );
}
