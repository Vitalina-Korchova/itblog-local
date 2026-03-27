import cors from "cors";
import express from "express";
import { adminRouter } from "./routes/admin-routes.js";
import { authRouter } from "./routes/auth-routes.js";
import { publicRouter } from "./routes/public-routes.js";
import { errorHandler } from "./middleware/error-handler.js";

export const app = express();

const allowedOrigins = new Set([
  "https://mynewsitseoblog.pp.ua",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.use("/api", publicRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use(errorHandler);
