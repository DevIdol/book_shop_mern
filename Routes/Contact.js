import express from "express";
import { ContactEmail } from "../controllers/Contact.js";
const router = express.Router();

router.post("/send-email", ContactEmail);

export default router;
