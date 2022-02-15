import {
  AppBar,
  Box,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { StringParam, useQueryParam, withDefault } from "use-query-params";

import { states } from "../utils";

/** TODO: more human-readable display by having column name = key and a separate label
 * e.g., key = cases, label = Cumulative cases
 */
export const COLUMNS = [
  "cases",
  "newCases",
  "deaths",
  "positiveTests",
  "negativeTests",
];

export default function Nav() {
  const [column, setColumn] = useQueryParam(
    "column",
    withDefault(StringParam, "newCases")
  );
  const [selectedState, setSelectedState] = useQueryParam("state", StringParam);

  return (
    <AppBar position="static">
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="h6">🦠 COVID-19 by State</Typography>
        <Box>
          <Tooltip arrow open={!selectedState} title="Please select a state">
            <TextField
              color="text"
              label="state"
              onChange={(e) => {
                setSelectedState(e?.target?.value);
              }}
              required
              select
              size="small"
              sx={{ marginRight: "1rem", minWidth: "20ch" }}
              value={selectedState || ""}
              variant="outlined"
            >
              {Object.entries(states).map(([abbrev, state]) => (
                <MenuItem key={state} value={abbrev}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
          <TextField
            color="text"
            label="column"
            onChange={(e) => {
              setColumn(e?.target?.value);
            }}
            required
            select
            size="small"
            sx={{ minWidth: "20ch" }}
            value={column}
            variant="outlined"
          >
            {COLUMNS.map((col) => (
              <MenuItem key={col} value={col}>
                {col}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
