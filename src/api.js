import axios from "axios";

const BASE_URL = "https://api.covidactnow.org/v2";

const getCurrentStateDataPath = (state) => `/state/${state}.json`;
const getHistoricalStateDataPath = (state) => `/state/${state}.timeseries.json`;

const KEY_PATH_SEGMENT = `?apiKey=${process.env.REACT_APP_COVID_ACT_NOW_API_KEY}`;

export async function getCurrentStateData(state) {
  const { data } = await axios.get(
    `${BASE_URL}${getCurrentStateDataPath(state)}${KEY_PATH_SEGMENT}`
  );
  return data;
}

export async function getHistoricalStateData(state) {
  const { data } = await axios.get(
    `${BASE_URL}${getHistoricalStateDataPath(state)}${KEY_PATH_SEGMENT}`
  );
  return data;
}
