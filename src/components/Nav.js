import {
  AppBar,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { StringParam, useQueryParam } from "use-query-params";

import { states } from "../utils";

export default function Nav() {
  const [selectedState, setSelectedState] = useQueryParam("state", StringParam);

  return (
    <AppBar position="static">
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="h6">🦠 COVID-19 by State</Typography>
        <Tooltip arrow open={!selectedState} title="Please select a state">
          <TextField
            color="secondary"
            label="state"
            onChange={(e) => {
              setSelectedState(e?.target?.value);
            }}
            required
            select
            size="small"
            sx={{ minWidth: "20ch" }}
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
      </Toolbar>
    </AppBar>
  );
}
