import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default Loading;
