import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
    isOnlyForSubscribers: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.templates) {
  delete mongoose.models.templates;
}

const TemplateModel = mongoose.model("templates", templateSchema);
export default TemplateModel;
