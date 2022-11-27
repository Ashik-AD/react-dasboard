import styled from "styled-components";
import { Link } from "react-router-dom";
import Box from "../../box/Box";
import { Text } from "../../../ui";
import Logo from "../../../assets/logo-2.png";

const AppLogo = () => (
  <Link to="/dashboards/crm/">
    <Box display="flex" align="center" space={0.4}>
      <StyledLogo src={Logo} alt="app logo" />
      <Text heading="h6" styles={{ fontWeight: 600 }}>
        TRIOLO
      </Text>
    </Box>
  </Link>
);
export default AppLogo;

const StyledLogo = styled("img")`
  height: 30px;
  width: 35px;
  object-fit: contained;
`;
