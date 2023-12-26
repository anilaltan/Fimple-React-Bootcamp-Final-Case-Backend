const Ticket = require("../models/ticket");

const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../services/cloudinary");

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

// Upload User Image
const uploadImage = async (req, res) => {
  try {
    //Upload Image to Cloudinary
    const data = await uploadToCloudinary(req.file.path, "ticket-images");
    //Save Image Url and publiId ti the database
    const savedImg = await Ticket.updateOne(
      { _id: req.params.id },
      {
        $push: {
          photos: [{ imageUrl: data.url, publicId: data.public_id }],
        },
      }
    );

    res.status(200).send("user image uploaded with success!");
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete User Image
// router.delete("/image/:id", async (req, res) => {
//   try {
//     //Find user
//     const user = await User.findOne({ _id: req.params.id });
//     //Find it's publicId
//     const publicId = user.publicId;
//     //Remove it from cloudinary
//     await removeFromCloudinary(publicId);
//     //Remove it from the Database
//     const deleteImg = await User.updateOne(
//       { _id: req.params.id },
//       {
//         $set: {
//           imageUrl: "",
//           publicId: "",
//         },
//       }
//     );
//     res.status(200).send("user image deleted with success!");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

module.exports = {
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
  uploadImage,
};
