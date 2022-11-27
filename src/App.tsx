import "./global.css";
import "./styles/table/Table.css";
import "./styles/modal/Modal.css";

import useTheme from "./theme/useTheme";
import GlobalStyle from "./global.styled";
import AppRoutes from "./routes/AppRoutes";
import useAuth from "./hooks/useAuth";
import useRedirect from "./hooks/useRedirect";

const App = () => {
  const {
    theme: {
      mode,
      primaryColor: { color },
      skin,
    },
  } = useTheme();
  return (
    <>
      <GlobalStyle
        textColor={mode.textColor}
        backgroundColor={mode.background}
        foregroundColor={mode.foreground}
        skinColor={color}
        skin={skin}
      />
      <AppRoutes />
    </>
  );
};
export default App;
