import { readFile } from "fs/promises";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { RESPONSE_ALREADY_SENT } from "@hono/node-server/utils/response";
import closeWithGrace from "close-with-grace";
import { Hono } from "hono";
import { trimTrailingSlash } from "hono/trailing-slash";
import { createElement as h } from "react";
import { renderToPipeableStream } from "react-server-dom-esm/server";
import { App } from "../ui/app.js";

const PORT = process.env.PORT || 3000;

const app = new Hono({ strict: true });
app.use(trimTrailingSlash());

app.use("/*", serveStatic({ root: "./public", index: "" }));

app.use(
  "/ui/*",
  serveStatic({
    root: "./ui",
    onNotFound: (path, context) => context.text("File not found", 404),
    rewriteRequestPath: (path) => path.replace("/ui", ""),
  })
);

app.get("/rsc", async (context) => {
  const moduleBasePath = new URL("../ui", import.meta.url).href;
  const { pipe } = renderToPipeableStream(h(App), moduleBasePath);
  pipe(context.env.outgoing);

  return RESPONSE_ALREADY_SENT;
});

app.get("/", async (context) => {
  const html = await readFile("./public/index.html", "utf8");
  return context.html(html, 200);
});

app.onError((err, context) => {
  console.error("error", err);
  return context.json({ error: true, message: "Something went wrong" }, 500);
});

const server = serve({ fetch: app.fetch, port: PORT }, (info) => {
  const url = `http://localhost:${info.port}`;
  console.log(`🚀  We have liftoff!\n${url}`);
});

closeWithGrace(async ({ signal, err }) => {
  if (err) console.error("Shutting down server due to error", err);
  else console.log("Shutting down server due to signal", signal);

  await new Promise((resolve) => server.close(resolve));
  process.exit();
});
