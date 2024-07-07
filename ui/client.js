"use client";
import { createElement as h, useState } from "react";

export async function Client({ someProps }) {
  const [someState] = useState(0);

  return h("div", {
    children: [
      "The props from the parent: ",
      someProps,
      h("br"),
      "This is a client state: ",
      someState,
    ],
  });
}
