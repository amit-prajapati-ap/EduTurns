import { Router, raw } from "express";
import { clerkWebhooks } from "../controllers/webhooks.controller.js";

const router = Router()

// router.post("/clerk", raw({ type: "application/json" }), clerkWebhooks);

export default router