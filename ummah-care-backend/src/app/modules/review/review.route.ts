import { auth } from "@/app/middlewares/auth-middleware";
import { validateRequest } from "@/app/middlewares/validate-request.middleware";
import { Router } from "express";
import { reviewController } from "./review.controller";
import { createReviewSchema } from "./review.validation";

const router: Router = Router();

// Public routes
router.get("/", reviewController.getReviews);
router.get("/user/:userId", reviewController.getUserReviews);
router.get("/user/:userId/rating", reviewController.getUserAverageRating);
router.get("/:id", reviewController.getReviewById);

// Protected routes
router.post("/", auth(), validateRequest(createReviewSchema), reviewController.createReview);

router.delete("/:id", auth(), reviewController.deleteReview);

export const reviewRoutes = router;
