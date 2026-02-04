const router = require("express").Router();
const {authenticateToken} = require("../middleware/auth");

const { getGallery, addImage, deleteImage } = require("../controllers/gallery");

// Get all gallery images with limit and offset
router.get("/gallery", getGallery);   
// Add a new image to the gallery (protected route)
router.post("/gallery", authenticateToken, addImage);
// Delete an image from the gallery (protected route)
router.delete("/gallery/:id", authenticateToken, deleteImage);

module.exports = router;