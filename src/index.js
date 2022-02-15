import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  transformSearchStringJsonSafe,
  QueryParamProvider,
} from "use-query-params";

import App from "./App";
import theme from "./theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: false, refetchOnWindowFocus: false },
  },
});

const queryStringifyOptions = {
  transformSearchString: transformSearchStringJsonSafe,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <QueryParamProvider
            ReactRouterRoute={Route}
            stringifyOptions={queryStringifyOptions}
          >
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </QueryParamProvider>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
