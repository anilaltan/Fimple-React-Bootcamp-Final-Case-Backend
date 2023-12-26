const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    TC: {
      type: Number,
      required: true,
      minLength: 11,
    },
    basvuruNedeni: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photos: [
      {
        imageUrl: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      default: "Beklemede",
    },
    response: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
