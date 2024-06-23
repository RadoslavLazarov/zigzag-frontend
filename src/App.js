import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import Snackbar from "@mui/material/Snackbar";

import { signIn } from "./store/slices/auth/authSlice";
import { setLoading } from "./store/slices/loading/loadingSlice";
import Routing from "./routes";
import { ME } from "./graphql/mutations/auth";
import Loading from "./components/loading/Loading";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastStore = useSelector((state) => state.toast);
  const authStore = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.loading.isLoading);

  const [me, { loading, error, data }] = useMutation(gql(ME), {
    onError: (error) => {
      dispatch(setLoading(false));
      navigate("/auth");
    },
    onCompleted: (data) => {
      dispatch(signIn(data.me.authenticationModel));
      dispatch(setLoading(false));
    },
  });

  useEffect(() => {
    const checkUserIsAuthenticated = async () => {
      dispatch(setLoading(true));
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken) {
        me({
          variables: {
            refreshToken: refreshToken !== null ? refreshToken : null,
          },
        });
      } else {
        dispatch(setLoading(false));
      }
    };

    checkUserIsAuthenticated();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Routing />
      {toastStore.open && (
        <Snackbar
          anchorOrigin={{
            vertical: toastStore.vertical,
            horizontal: toastStore.horizontal,
          }}
          open={toastStore.open}
          autoHideDuration={2000}
          message={toastStore.message}
          key={toastStore.vertical + toastStore.horizontal}
        />
      )}
    </>
  );
}

export default App;
