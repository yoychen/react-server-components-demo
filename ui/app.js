import { createElement as h, Suspense } from "react";
import { Name } from "./name.js";
import { Client } from "./client.js";

export async function App() {
  // return h("div", {
  //   children: ["Hi"],
  // });
  // <div>hi</div>

  // return h(Suspense, {
  //   fallback: h("div", { children: "loading" }),
  //   children: [h(Name)],
  // });

  return h("div", {
    children: ["Hi", h(Client, { someProps: "123" })],
  });
}
