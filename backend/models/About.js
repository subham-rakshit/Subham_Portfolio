import mongoose from "mongoose";

// Define a schema for skills with timestamps
const skillSchema = new mongoose.Schema(
  {
    techName: String,
    techImageURL: String,
    category: String,
  },
  { timestamps: true }
);

// Define a schema for certificates with timestamps
const certificateSchema = new mongoose.Schema(
  {
    issueDate: String,
    certificateImageURL: String,
  },
  { timestamps: true }
);

// Define the main About schema
const aboutSchema = new mongoose.Schema({
  aboutMe: {
    type: String,
    required: true,
  },
  skillsArray: [skillSchema], // Use the skillSchema
  certificatesArray: [certificateSchema], // Use the certificateSchema
});

// Create the model
const AboutCollection = mongoose.model("About", aboutSchema);

export default AboutCollection;
