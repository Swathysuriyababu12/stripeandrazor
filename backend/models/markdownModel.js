const mongoose = require("mongoose");

const markSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
   
    draft: {
      type: String,
      
    },
    markdown: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Mark", markSchema);
