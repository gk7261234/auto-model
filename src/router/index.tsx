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
    },
    {
      title: "绘制模型",
      exact: true,
      key: "workspace",
      path: "/workspace",
      component: Loadable({
        loader: () => import("../pages/workspace/index"),
        loading: () => <div />
      })
  },
];

export default routes;