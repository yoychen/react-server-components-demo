import { createElement as h, startTransition, use } from "react";
import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-esm/client";

const initialContentFetchPromise = fetch("/rsc");
const initialContentPromise = createFromFetch(initialContentFetchPromise, {
  moduleBaseURL: `${window.location.origin}/ui`,
});

function Root() {
  const content = use(initialContentPromise);
  return content;
}

startTransition(() => {
  createRoot(document.getElementById("root")).render(
    h("div", {
      className: "app",
      children: [h(Root)],
    })
  );
});
