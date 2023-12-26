const express = require("express");
const ticketController = require("../controllers/ticket");
const router = express.Router();

router.get("/basvuru", ticketController.getTickets);

router.put("/basvuru/:id", ticketController.updateTicket);
router.get("/basvuru/:takipNo", ticketController.getTicket);

router.post("/basvuru-olustur", ticketController.createTicket);

module.exports = router;
