import { Box } from "@mui/material";

import { Nav, VizContainer } from "./components";

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "cornsilk",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Nav />
      <VizContainer />
    </Box>
  );
}

export default App;
