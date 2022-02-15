import { format } from "d3-format";
import { StringParam, useQueryParam } from "use-query-params";

import { Box, Typography } from "@mui/material";

import { COLUMNS } from "./Nav";
import { Loading } from ".";
import { states } from "../utils";

const HEIGHT = "30ch";

function Wrapper({ children }) {
  return <Box sx={{ minHeight: HEIGHT, width: "100%" }}>{children}</Box>;
}

export default function CurrentStats({ data, isError, isLoading }) {
  const [state] = useQueryParam("state", StringParam);
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
  if (data?.actuals) {
    return (
      <Wrapper>
        <Box sx={{ margin: "2rem" }}>
          <Typography component="h1" variant="h2">
            {`Current data for ${states[state]}`}
          </Typography>
          {/* TODO: more readable date formatting */}
          <Typography
            component="h2"
            variant="h5"
          >{`Last updated ${data.lastUpdatedDate}`}</Typography>

          <Box sx={{ display: "flex", marginTop: "1rem" }}>
            {COLUMNS.map((column) => (
              <Typography
                sx={{ padding: "0.5rem 1.75rem 0.5rem 0rem" }}
                variant="h6"
              >
                <span style={{ color: "#888" }}>{`${column}: `}</span>
                {format(".4~s")(data.actuals[column])}
              </Typography>
            ))}
          </Box>
        </Box>
      </Wrapper>
    );
  }
  return null;
}
