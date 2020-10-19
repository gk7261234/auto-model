import React from "react";

import Loadable from "react-loadable";

import { routeType } from "./types";

const routes: routeType[] = [
    {
        title: "路由示例",
        exact: true,
        key: "example",
        path: "/",
        component: Loadable({
          loader: () => import("../pages/Example/Example"),
          loading: () => <div />
        })
    }
];

export default routes;