import { StringParam, useQueryParam } from "use-query-params";
import { useQuery } from "react-query";

import { Container } from "@mui/material";

import { Chart, CurrentStats } from ".";
import { getHistoricalStateData } from "../api";

export default function VizContainer() {
  const [state] = useQueryParam("state", StringParam);

  const comboStateData = useQuery(
    ["comboStateData", state],
    () => getHistoricalStateData(state),
    { enabled: !!state }
  );

  return (
    <Container maxWidth="xl">
      <CurrentStats {...comboStateData} />
      <Chart {...comboStateData} />
    </Container>
  );
}
