import Link from 'next/link';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Nav>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/blog">Blog</NavLink>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-around;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default Navbar;