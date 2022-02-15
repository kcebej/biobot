import { StringParam, useQueryParam } from "use-query-params";
import { useQuery } from "react-query";

import { Container } from "@mui/material";

import { Chart, CurrentStats } from ".";
import { getCurrentStateData, getHistoricalStateData } from "../api";

export default function VizContainer() {
  const [state] = useQueryParam("state", StringParam);

  const currentStateData = useQuery(
    ["currentStateData", state],
    () => getCurrentStateData(state),
    { enabled: !!state }
  );
  const historicalStateData = useQuery(
    ["historicalStateData", state],
    () => getHistoricalStateData(state),
    { enabled: !!state }
  );

  return (
    <Container maxWidth="xl">
      <CurrentStats {...currentStateData} />
      <Chart {...historicalStateData} />
    </Container>
  );
}
