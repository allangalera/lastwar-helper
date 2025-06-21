import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Authentication } from "./components/authentication";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Last War Helper</Title>
          <Authentication />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
