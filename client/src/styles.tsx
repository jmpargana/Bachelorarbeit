import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3ec1d3",
      dark: "#ff9a00",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#ff165d",
      dark: "#ba000d",
      contrastText: "#fff"
    },
  },
});

export default theme;
