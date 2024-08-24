import { Router } from "express";
import {
  getAllStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
  associateBookWithStore,
  uploadCsv,
} from "../controllers/storeController";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/", getAllStores);
router.get("/:id", getStore);
router.post("/", createStore);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);
router.post("/:storeId/books/:bookId", associateBookWithStore);
router.post("/upload-csv", upload.single("file"), uploadCsv);

export default router;
