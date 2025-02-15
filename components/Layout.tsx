import { ReactNode } from 'react';
import Navbar from './Navbar';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <MainContainer>
        {children}
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

export default Layout;