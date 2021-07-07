import React, { useState, useContext } from "react";
import { Container, FormControl, FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const useStyles = makeStyles({
  root: {
    width: "auto",
    padding: "50px",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
  },
  auth: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  space: {
    whiteSpace: "pre-line",
  },
  button: {
    margin: "10% auto",
    border: "1px solid grey",
  },
});

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      history.push(HOME_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className={classes.auth}
      style={{ height: window.innerHeight - 54 }}
    >
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {isLogin ? "Authorization" : "Registration"}
          </Typography>
          <Typography className={classes.space}></Typography>
          <Container className={classes.auth}>
            <FormControl>
              <TextField
                required
                id="standard-email-input"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </Container>
          <Typography className={classes.space}></Typography>
          <Container className={classes.auth}>
            <FormControl>
              <TextField
                required
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormHelperText id="my-helper-text">
                We'll never share your password.
              </FormHelperText>
            </FormControl>
          </Container>

          <CardActions>
            <Button className={classes.button} size="medium" onClick={click}>
              {isLogin ? "Login In" : "Sign Up"}
            </Button>
          </CardActions>
        </CardContent>
        <Container>
          {isLogin ? (
            <div>
              Don't have an account?{" "}
              <NavLink to={REGISTRATION_ROUTE}>Register now!</NavLink>
            </div>
          ) : (
            <div>
              Have an account? <NavLink to={LOGIN_ROUTE}>Login in!</NavLink>
            </div>
          )}
        </Container>
      </Card>
    </Container>
  );
});

export default Auth;
