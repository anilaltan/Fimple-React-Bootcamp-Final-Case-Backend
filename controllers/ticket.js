const Ticket = require("../models/ticket");

const createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getTicket = async (req, res) => {
  try {
    const { takipNo } = req.params;
    const ticket = await Ticket.findById(takipNo);
    if (!ticket) {
      return res.status(404).send({ error: "Başvuru bulunamadı" });
    }
    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();

    if (!tickets || tickets.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Herhangi bir başvuru bulunamadı" });
    }
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status, response },
      { new: true }
    );
    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
};
