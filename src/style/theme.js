import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    primary: {main: '#EC7D62'},
    secondary: {main: '#6161ED'},
  },

  props:{
    MuiTextField: {
      fullWidth: true,
    }
  }

});
