import { Box, LinearProgress } from "@mui/material";

export default function Loading({ height }) {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height,
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <Box sx={{ margin: "2rem" }}>
          <LinearProgress color="primary" />
        </Box>
        <Box sx={{ margin: "2rem" }}>
          <LinearProgress color="secondary" />
        </Box>
        <Box sx={{ margin: "2rem" }}>
          <LinearProgress color="primary" />
        </Box>
        <Box sx={{ margin: "2rem" }}>
          <LinearProgress color="secondary" />
        </Box>
        <Box sx={{ margin: "2rem" }}>
          <LinearProgress color="primary" />
        </Box>
      </div>
    </Box>
  );
}
