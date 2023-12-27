const express = require("express");
const ticketController = require("../controllers/ticket");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/basvuru", auth, ticketController.getTickets);

router.put("/basvuru/:id", ticketController.updateTicket);
router.get("/basvuru/:takipNo", ticketController.getTicket);

router.post(
  "/basvuru/:id",
  upload.single("ticketImage"),
  ticketController.uploadImage
);

router.post(
  "/basvuru-olustur",
  upload.array("ticketImages", 2),
  ticketController.createTicket
);

module.exports = router;
