import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  aboutMe: {
    type: String,
    required: true,
  },
  skillsArray: [
    {
      techName: String,
      techImageURL: String,
      category: String,
    },
  ],
  cerificatesArray: [
    {
      issueDate: String,
      certificateImageURL: String,
    },
  ],
});

const AboutCollection = new mongoose.model("About", aboutSchema);

export default AboutCollection;
