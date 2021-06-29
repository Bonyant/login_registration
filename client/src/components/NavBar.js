import React, { useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Context } from "./../index";
import { NavLink } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import Button from "@material-ui/core/Button";
import { observer } from "mobx-react-lite";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors/";
import { useHistory } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
  };

  const StyledButton = withStyles({
    root: {
      marginLeft: "auto",
    },
  })(Button);
  const theme = createMuiTheme({
    palette: {
      primary: purple,
    },
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <NavLink className="site_title" to={HOME_ROUTE}>
              Site Title
            </NavLink>
            {user.isAuth ? (
              <StyledButton variant="contained" onClick={() => logOut()}>
                Log Out
              </StyledButton>
            ) : (
              <StyledButton
                variant="contained"
                onClick={() => history.push(LOGIN_ROUTE)}
              >
                Login
              </StyledButton>
            )}
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
});

export default NavBar;
