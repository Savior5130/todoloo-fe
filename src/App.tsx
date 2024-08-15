import { ThemeProvider } from "styled-components";
import HomeScreen from "./screens/HomeScreen";
import { lightTheme } from "./styles/theme";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
