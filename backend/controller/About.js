import AboutCollection from "../models/About.js";

export const aboutControllerObj = {
  async createAboutDetails(req, res, next) {
    if (req.user.userId !== req.params.userId) {
      const adminError = {
        status: 406,
        message: "User not valid administrator.",
        extraDetails: "You are not allowed to create about!",
      };
      return next(adminError);
    }

    const { aboutDetails } = req.body;
    const {
      aboutMe,
      techName,
      selectedCategory,
      techImageURL,
      issueDate,
      certificateImageURL,
    } = aboutDetails;

    //INFO: Check all filed's value is present or not
    if (
      !aboutMe &&
      !techName &&
      selectedCategory === "Languages" &&
      !techImageURL &&
      !issueDate &&
      !certificateImageURL
    ) {
      const valueError = {
        status: 404,
        message: "Input value missing!",
        extraDetails: "Please fill the field properly.",
      };
      return next(valueError);
    }

    //INFO: Exsistance about details
    const defaultAboutMe =
      "In the world of web development, agility and precision are paramount. These aren't just buzzwords—they're the essence of my craft. Every line of code I write, every application I build, is driven by a commitment to seamless user experiences and robust, scalable solutions. I believe that powerful digital products speak louder than words. They captivate users, streamline operations, and elevate businesses. That's why I've dedicated myself to mastering the MERN stack—so I can bring your ideas to life with efficiency and elegance. Let's transform your vision into reality, one exceptional web application at a time.";

    const about = await AboutCollection.findOne({});

    //INFO: Check techName is already present or not
    if (about) {
      const techNameIsPresent = about.skillsArray.some(
        (item) => item.techName === techName
      );
      if (techNameIsPresent) {
        const techNameError = {
          status: 400,
          message: "Tech already present.",
          extraDetails: "Tech details already present.",
        };
        return next(techNameError);
      }
    }

    //INFO: Check certificate is already present or not
    if (about) {
      const certificateIsPresent = about.cerificatesArray.some(
        (item) => item.certificateImageURL === certificateImageURL
      );
      if (certificateIsPresent) {
        const certificateError = {
          status: 400,
          message: "Certificate already present.",
          extraDetails: "Certificate details already present.",
        };
        return next(certificateError);
      }
    }

    //INFO: Check about is present in DB or not
    if (!about) {
      //INFO: Create new about details and store in DB
      const aboutInfo = new AboutCollection({
        aboutMe: aboutMe.trim() || defaultAboutMe,
        skillsArray: [
          {
            techName: techName.trim(),
            techImageURL: techImageURL.trim(),
            category: selectedCategory,
          },
        ],
        cerificatesArray: [
          {
            issueDate,
            certificateImageURL,
          },
        ],
      });
      try {
        const saveAboutInfo = await aboutInfo.save();
        res.status(201).json({
          success: true,
          message: "You have successfully create about details.",
          aboutDetails: saveAboutInfo,
        });
      } catch (error) {
        return next(error);
      }
    } else if (about) {
      //INFO: If admin fill only tech related details
      if (
        techName &&
        techImageURL &&
        selectedCategory &&
        !issueDate &&
        !certificateImageURL
      ) {
        const updatedAboutInfo = await AboutCollection.findByIdAndUpdate(
          about._id,
          {
            $set: {
              aboutMe: aboutMe.trim() || defaultAboutMe,
              skillsArray: [
                ...about.skillsArray,
                {
                  techName: techName.trim(),
                  techImageURL: techImageURL.trim(),
                  category: selectedCategory,
                },
              ],
            },
          },
          { new: true }
        );

        res.status(201).json({
          success: true,
          message: "You have successfully updated about details.",
          aboutDetails: updatedAboutInfo,
        });
      } else if (
        issueDate &&
        certificateImageURL &&
        !techName &&
        !techImageURL &&
        selectedCategory === "Languages"
      ) {
        //INFO: If admin fill only certificate related details
        const updatedAboutInfo = await AboutCollection.findByIdAndUpdate(
          about._id,
          {
            $set: {
              aboutMe: aboutMe.trim() || defaultAboutMe,
              cerificatesArray: [
                ...about.cerificatesArray,
                {
                  issueDate,
                  certificateImageURL,
                },
              ],
            },
          },
          { new: true }
        );

        res.status(201).json({
          success: true,
          message: "You have successfully updated about details.",
          aboutDetails: updatedAboutInfo,
        });
      } else {
        //INFO: Else
        const updatedAboutInfo = await AboutCollection.findByIdAndUpdate(
          about._id,
          {
            $set: {
              aboutMe: aboutMe.trim() || defaultAboutMe,
              skillsArray: [
                ...about.skillsArray,
                {
                  techName: techName.trim(),
                  techImageURL: techImageURL.trim(),
                  category: selectedCategory,
                },
              ],
              cerificatesArray: [
                ...about.cerificatesArray,
                {
                  issueDate,
                  certificateImageURL,
                },
              ],
            },
          },
          { new: true }
        );

        res.status(201).json({
          success: true,
          message: "You have successfully updated about details.",
          aboutDetails: updatedAboutInfo,
        });
      }
    }
  },
};
