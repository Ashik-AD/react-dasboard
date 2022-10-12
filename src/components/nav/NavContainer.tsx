import { ReactNode, FC } from "react";
import styled from "styled-components";
import useTheme from "../../theme/useTheme";
const NavContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    theme: { menuStyle },
  } = useTheme();
  return (
    <StyledNavContainer collapsed={menuStyle.collapse}>
      {children}
    </StyledNavContainer>
  );
};

const StyledNavContainer = styled("div")<{ collapsed: boolean }>`
  flex: 0 0 auto;
  width: ${({ collapsed }) => (collapsed ? 100 : 260)}px;
  transition: width 0.3s linear;
  z-index: 1000;
  overflow: hidden;

  @media screen and (max-width: 1200px) {
    transform: translateX(-260px);
    display: none;
  }
`;
export default NavContainer;
