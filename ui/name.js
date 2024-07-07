import { createElement as h } from "react";

const getSomeData = () => {
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve({ name: "tutu" });
    }, 5000);
  });
};

export async function Name() {
  const { name } = await getSomeData();

  return h("div", {
    children: ["Hi, my name is ", name],
  });
}
