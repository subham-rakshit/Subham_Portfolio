import ProjectsCollection from "../models/Projects.js";

export const projectsControllerObj = {
  async createNewProject(req, res, next) {
    const { projectDetails } = req.body;
    const {
      name,
      technologies,
      projectDescription,
      challenges,
      solutions,
      thumbnailURL,
      largeScreenViewURL,
      mediumScreenViewURL,
      smallScreenViewURL,
    } = projectDetails;

    //INFO: Check valid Admin or not
    if (req.user.userId !== req.params.userId) {
      const notAllowedErr = {
        status: 406, //INFO: Not acceptable status
        message: "User not valid administrator.",
        extraDetails: "You are not allowed to create a project!",
      };
      return next(notAllowedErr);
    }

    //INFO: Check all filed's value is present or not
    if (
      !name ||
      technologies.length === 0 ||
      !projectDescription ||
      !challenges ||
      !solutions ||
      !thumbnailURL ||
      !largeScreenViewURL ||
      !mediumScreenViewURL ||
      !smallScreenViewURL
    ) {
      const valueError = {
        status: 404,
        message: "Input value missing!",
        extraDetails: "Please fill the field properly.",
      };
      return next(valueError);
    }

    //INFO: Check project's name has any special charaters or not
    if (name && !name.match(/^[a-zA-Z0-9].*[a-zA-Z0-9]$/)) {
      const nameError = {
        status: 400,
        message: "Special characters ditected!",
        extraDetails:
          "Project's name can't start or end with special character.",
      };
      return next(nameError);
    }

    //INFO: Check any projects are present with same name
    if (name) {
      const projectExists = await ProjectsCollection.findOne({ name });
      if (projectExists) {
        const projectExistsError = {
          status: 400,
          message: "Duplicate project name",
          extraDetails: "Project's name already exists.",
        };
        return next(projectExistsError);
      }

      //NOTE: Create a slug for the project navigation URL purposes
      const slug = name
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .split(" ")
        .join("-")
        .toLowerCase();

      //INFO: Create a new project
      const newProject = new ProjectsCollection({
        name: name.trim(),
        technologies,
        projectDescription: projectDescription.trim(),
        challenges: challenges.trim(),
        solutions: solutions.trim(),
        thumbnailURL: thumbnailURL.trim(),
        largeScreenViewURL,
        mediumScreenViewURL,
        smallScreenViewURL,
        slug,
      });

      //INFO: Save the new project details in to DB
      try {
        const saveProject = await newProject.save();
        res.status(201).json({
          success: true,
          message: "You have successfully created a new project.",
          projectInfo: saveProject,
        });
      } catch (error) {
        return next(error);
      }
    }
  },
};
