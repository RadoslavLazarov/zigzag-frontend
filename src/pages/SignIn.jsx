import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { signIn } from "../store/slices/auth/authSlice";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { SIGN_IN } from "../graphql/mutations/auth";

export default function SignIn() {
  const [signInMutation, { loading, error, data }] = useMutation(gql(SIGN_IN), {
    onError: () => {
      setApiError("Something went wrong...");
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState(null);
  const [email, setEmail] = useState("admin@zigzag.com");
  const [password, setPassword] = useState("123");

  const handleSubmit = (event) => {
    event.preventDefault();

    signInMutation({
      variables: {
        email: email,
        password: password,
      },
    });
  };

  useEffect(() => {
    if (data?.signIn) {
      localStorage.setItem(
        "accessToken",
        data.signIn.authenticationModel.accessToken
      );
      localStorage.setItem(
        "refreshToken",
        data.signIn.authenticationModel.refreshToken
      );

      dispatch(signIn(data.signIn.authenticationModel));
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {apiError != null ? apiError : null}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
