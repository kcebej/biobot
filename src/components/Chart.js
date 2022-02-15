import { Box } from "@mui/material";

import { Loading } from ".";

const HEIGHT = "60vh";

function Wrapper({ children }) {
  return <Box sx={{ minHeight: HEIGHT, width: "100%" }}>{children}</Box>;
}

export default function Chart({ data, isError, isLoading }) {
  if (isLoading) {
    return (
      <Wrapper>
        <Loading height={HEIGHT} />
      </Wrapper>
    );
  }
  if (isError) {
    /** TODO: display informative error message */
    return null;
  }
  if (data?.length) {
    return null;
  }
  return null;
}
