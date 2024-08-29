import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please fill the input properly"],
      unique: true,
    },
    technologies: {
      type: Array,
      required: [true, "Please fill the input properly"],
    },
    projectDescription: {
      type: String,
      required: [true, "Please fill the input properly"],
    },
    challenges: {
      type: String,
      required: [true, "Please fill the input properly"],
    },
    solutions: {
      type: String,
      required: [true, "Please fill the input properly"],
    },
    projectLink: {
      type: String,
      required: [true, "Please fill the input properly"],
      unique: true,
    },
    gitHubLink: {
      type: String,
      required: [true, "Please fill the input properly"],
      unique: true,
    },
    thumbnailURL: {
      type: String,
      required: [true, "Please fill the input properly"],
    },
    largeScreenViewURL: {
      type: String,
      required: [true, "Please fill the input properly"],
    },
    mediumScreenViewURL: {
      type: String,
      required: [true, "Please fill the input properly"],
    },
    smallScreenViewURL: {
      type: String,
      required: [true, "Please fill the input properly"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ProjectsCollection = new mongoose.model("Project", projectSchema);

export default ProjectsCollection;
