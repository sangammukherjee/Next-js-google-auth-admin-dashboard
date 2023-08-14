import mongoose from "mongoose";

const VisitorsSchema = new mongoose.Schema(
  {
    visitors: Number,
    location: String,
    device: String,
    premiumUserNo: Number,
    month: String,
  },
  { timestamps: true }
);

const Visitor =
  mongoose.models.Visitors || mongoose.model("Visitors", VisitorsSchema);

export default Visitor;
