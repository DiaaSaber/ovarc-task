import { Router } from "express";
import {
  getAllStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
  associateBookWithStore,
} from "../controllers/storeController";

const router = Router();

router.get("/", getAllStores);
router.get("/:id", getStore);
router.post("/", createStore);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);
router.post('/:storeId/books/:bookId', associateBookWithStore);

export default router;
