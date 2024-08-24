import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import authorRoutes from "./routes/authorRoutes";
import storeRoutes from "./routes/storeRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/stores", storeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
