const { Router } = require("express");
const {
  loginUserController,
  registerUserController,
  updatePasswordController,
  updateProfileController,
  verifyEmailTokenController,
  sendVerificationMailController,
  sendPasswordMailController,
  resetPasswordController,
} = require("../controllers/user.controller.js");
const auth = require("../middleware/auth.middleware.js");
const router = Router();

router.post("/register", registerUserController);

router.post("/sendMail", auth, sendVerificationMailController);
router.post("/verify-email", verifyEmailTokenController);

router.post("/login", loginUserController);
router.patch("/updateUserDetail", updateProfileController);
router.patch("/updatePassword", updatePasswordController);

router.post("/forgot-password", sendPasswordMailController);
router.post("/reset-password", resetPasswordController);
module.exports = router;
