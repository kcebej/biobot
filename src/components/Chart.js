import { AxisBottom, AxisLeft } from "@visx/axis";
import { extent } from "d3-array";
import { format } from "d3-format";
import { StringParam, useQueryParam, withDefault } from "use-query-params";

import { Grid } from "@visx/grid";
import { LinePath } from "@visx/shape";
import { scaleLinear, scaleTime } from "@visx/scale";

import { Box } from "@mui/material";

import { Loading } from ".";

const HEIGHT = "60vh";

function Wrapper({ children }) {
  return <Box sx={{ minHeight: HEIGHT, width: "100%" }}>{children}</Box>;
}

const SVG_HEIGHT = 450;
const SVG_WIDTH = 800;
const MARGINS = { top: 10, right: 10, bottom: 90, left: 50 };

const H = SVG_HEIGHT - MARGINS.bottom - MARGINS.top;
const W = SVG_WIDTH - MARGINS.left - MARGINS.right;

const TEXT_OFFSET = { x: 15, y: 25 };

export default function Chart({ data, isError, isLoading }) {
  const [column] = useQueryParam("column", withDefault(StringParam, "cases"));

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

  if (data?.actualsTimeseries?.length) {
    const timeseries = data?.actualsTimeseries?.filter((d) => !!d?.[column]);

    const xScale = scaleTime({
      domain: extent(timeseries, (d) => new Date(d.date)),
      range: [0, W],
    });
    const yScale = scaleLinear({
      domain: [0, Math.max(...timeseries.map((d) => d[column])) * 1.025],
      range: [H, 0],
    });

    return (
      <Wrapper>
        <svg
          style={{ height: "100%", width: "100%" }}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        >
          <g transform={`translate(${MARGINS.left},${MARGINS.top})`}>
            <rect
              fill="#ECECEC"
              fillOpacity={0.5}
              height={H}
              width={W}
              x={0}
              y={0}
            />
            <Grid height={H} width={W} xScale={xScale} yScale={yScale} />
            {/* quick 'n' dirty way to make axes not stark black
            TODO: replace with axis line, tick line, and tick label styling */}
            <g opacity={0.625}>
              <AxisLeft scale={yScale} tickFormat={format("~s")} />
              <AxisBottom scale={xScale} top={H} />
            </g>
            <text x={TEXT_OFFSET.x} y={TEXT_OFFSET.y}>
              {column}
            </text>
            <LinePath
              curve={null}
              data={timeseries}
              stroke="DodgerBlue"
              strokeWidth={1.5}
              x={(d) => xScale(new Date(d.date))}
              y={(d) => yScale(d[column])}
            />
          </g>
        </svg>
      </Wrapper>
    );
  }
  return null;
}
