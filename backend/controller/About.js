import { request } from "express";
import AboutCollection from "../models/About.js";

export const aboutControllerObj = {
  //NOTE: Create About Details
  async createAboutDetails(req, res, next) {
    try {
      //INFO: Check admin is valid or not
      if (req.user.userId !== req.params.userId) {
        return next({
          status: 406,
          message: "User not valid administrator.",
          extraDetails: "You are not allowed to create about!",
        });
      }

      //INFO: Get the about inputs from client
      const { aboutDetails } = req.body;
      // INFO: Destructuring the keys form aboutDetails object from client
      const {
        aboutMe,
        techName,
        selectedCategory,
        techImageURL,
        issueDate,
        certificateImageURL,
      } = aboutDetails;

      //INFO: Validate required fields
      if (
        !aboutMe &&
        !techName &&
        !techImageURL &&
        !issueDate &&
        !certificateImageURL
      ) {
        return next({
          status: 404,
          message: "Input value missing!",
          extraDetails: "Please fill the field properly.",
        });
      }

      //INFO: Existence of default aboutMe
      const defaultAboutMe =
        "In the world of web development, agility and precision are paramount. These aren't just buzzwords—they're the essence of my craft. Every line of code I write, every application I build, is driven by a commitment to seamless user experiences and robust, scalable solutions. I believe that powerful digital products speak louder than words. They captivate users, streamline operations, and elevate businesses. That's why I've dedicated myself to mastering the MERN stack—so I can bring your ideas to life with efficiency and elegance. Let's transform your vision into reality, one exceptional web application at a time.";

      //INFO: Extracting About details from DB. Check wheather it's present or not
      const about = await AboutCollection.findOne({});

      //INFO: Validate - If techName AND certificateImageURL already exists
      if (about) {
        if (
          techName &&
          about.skillsArray.some((item) => item.techName === techName)
        ) {
          return next({
            status: 400,
            message: "Tech already present.",
            extraDetails: "Tech details already present.",
          });
        }

        if (
          certificateImageURL &&
          about.certificatesArray.some(
            (item) => item.certificateImageURL === certificateImageURL
          )
        ) {
          return next({
            status: 400,
            message: "Certificate already present.",
            extraDetails: "Certificate details already present.",
          });
        }
      }

      //INFO: Storing new aboutMe input's value if present. If not then default aboutMe value will be stored
      const newAboutMe = aboutMe?.trim() || defaultAboutMe;

      //INFO: If about details not present in DB, then create new aboutDetails
      if (!about) {
        //INFO: Create new about details
        const aboutInfo = new AboutCollection({
          aboutMe: newAboutMe,
          skillsArray: techName
            ? [
                {
                  techName: techName.trim(),
                  techImageURL: techImageURL.trim(),
                  category: selectedCategory,
                },
              ]
            : [],
          certificatesArray: certificateImageURL
            ? [{ issueDate, certificateImageURL }]
            : [],
        });

        //INFO: Save the new aboutDetails in About collection in DB
        const saveAboutInfo = await aboutInfo.save();

        //INFO: Return the response for client
        return res.status(201).json({
          success: true,
          message: "You have successfully created about details.",
          aboutDetails: saveAboutInfo,
        });
      }

      //INFO: If 'about' exists, we create a new updatedFields object, where can update either skills or certificates or both
      const updatedFields = { aboutMe: newAboutMe };

      //INFO: IF client wants to create only skills item
      if (techName && techImageURL && selectedCategory) {
        updatedFields.skillsArray = [
          ...about.skillsArray,
          {
            techName: techName.trim(),
            techImageURL: techImageURL.trim(),
            category: selectedCategory,
          },
        ];
      }

      //INFO: If client wants to create only certificates item
      if (issueDate && certificateImageURL) {
        updatedFields.certificatesArray = [
          ...about.certificatesArray,
          { issueDate, certificateImageURL },
        ];
      }

      //INFO: We are updating the exsiting aboutDetails in DB
      const updatedAboutInfo = await AboutCollection.findByIdAndUpdate(
        about._id,
        { $set: updatedFields },
        { new: true }
      );

      //INFO: Send the response to the user
      res.status(201).json({
        success: true,
        message: "You have successfully create about details.",
        aboutDetails: updatedAboutInfo,
      });
    } catch (error) {
      return next(error);
    }
  },
  //NOTE: Get about details
  async getAboutDetails(req, res, next) {
    try {
      const aboutInfo = await AboutCollection.find();
      //INFO: Check about details present or not
      if (!aboutInfo || aboutInfo.length === 0) {
        const noAboutError = {
          status: 404, //INFO: Not found
          message: "About details not created yet!",
          extraDetails: "Please create your about details first.",
        };
        return next(noAboutError);
      }

      //INFO: Get the current date and the date from one month ago
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDay()
      );

      //INFO: Filter skills that were created within the last month
      const lastMonthSkillCount = aboutInfo[0].skillsArray.filter((skill) => {
        const skillCreatedAt = new Date(skill.createdAt); //INFO: Compare each skill's createdAt date with oneMonthAgo date
        return skillCreatedAt >= oneMonthAgo;
      }).length;

      //INFO: Filter certificates that were created within the last month
      const lastMonthCertificatesCount = aboutInfo[0].certificatesArray.filter(
        (certificate) => {
          const certificateCreatedAt = new Date(certificate.createdAt); //INFO: Compare each certificate's createdAt date with oneMonthAgo date
          return certificateCreatedAt >= oneMonthAgo;
        }
      ).length;

      res.status(200).json({
        aboutDetails: aboutInfo[0],
        lastMonthSkillCount,
        lastMonthCertificatesCount,
      });
    } catch (error) {
      return next(error);
    }
  },
  //NOTE: Get Skills Details
  async getSkillsDetails(req, res, next) {
    try {
      const { category } = req.query;
      //INFO: Get all about details data
      const aboutDetails = await AboutCollection.findOne();
      //INFO: Check about details present or not
      if (!aboutDetails) {
        const noAboutError = {
          status: 404, //INFO: Not found
          message: "About details not created yet!",
          extraDetails: "Please create your about details first.",
        };
        return next(noAboutError);
      }
      //INFO: Check Skill are present in About collection or not
      if (aboutDetails.skillsArray.length === 0) {
        const skillsError = {
          status: 404,
          message: "Skills array having 0 length!",
          extraDetails: "You haven't added Skills yet.",
        };
        return next(skillsError);
      }
      //INFO: Filter the skills array according to the category if present
      let skillsArrList = aboutDetails.skillsArray;

      if (category) {
        skillsArrList = skillsArrList.filter(
          (skill) => skill.category === category
        );
      }
      //INFO: Return the skillsArrList (filterd or all)
      res.status(200).json({
        success: true,
        skillsArrList,
      });
    } catch (error) {
      return next(error);
    }
  },
  //NOTE:: Delete specific skill
  async deleteSpecificSkill(req, res, next) {
    if (req.user.userId !== req.params.userId) {
      const notAllowedErr = {
        status: 406, //INFO: Not acceptable status
        message: "User not valid administrator.",
        extraDetails: "You are not allowed to delete the skill!",
      };
      return next(notAllowedErr);
    }

    try {
      const updatedAbout = await AboutCollection.findOneAndUpdate(
        {
          "skillsArray._id": req.params.skillId,
        }, //INFO: Match document containing the skill
        {
          $pull: { skillsArray: { _id: req.params.skillId } },
        }, //INFO: Remove the skill from skillsArray
        { new: true } //INFO: Return the updated document
      );

      //INFO: Check skills has been removed or not
      if (!updatedAbout) {
        const aboutErr = {
          status: 404,
          message: "Couldn't find the skill!",
          extraDetails: "Skill not found!",
        };
        return next(aboutErr);
      }
      res.status(200).json({
        success: true,
        message: "Skill has been removed.",
        updatedAbout,
      });
    } catch (error) {
      next(error);
    }
  },
  //NOTE: Get Certificates Details
  async getCertificatesDetails(req, res, next) {
    try {
      //INFO: Get all about details data
      const aboutDetails = await AboutCollection.findOne();

      //INFO: Check about details present or not
      if (!aboutDetails) {
        const noAboutError = {
          status: 404, //INFO: Not found
          message: "About details not created yet!",
          extraDetails: "Please create your about details first.",
        };
        return next(noAboutError);
      }
      //INFO: Check Certificate are present in About collection or not
      if (aboutDetails.certificatesArray.length === 0) {
        const certificatesError = {
          status: 404,
          message: "Certificates array having 0 length!",
          extraDetails: "You haven't added Certificates yet.",
        };
        return next(certificatesError);
      }
      const certificatesArrList = aboutDetails.certificatesArray;

      //INFO: Return the skillsArrList (filterd or all)
      res.status(200).json({
        success: true,
        certificatesArrList,
      });
    } catch (error) {
      return next(error);
    }
  },
  //NOTE:: Delete specific certificate
  async deleteSpecificCertificate(req, res, next) {
    if (req.user.userId !== req.params.userId) {
      const notAllowedErr = {
        status: 406, //INFO: Not acceptable status
        message: "User not valid administrator.",
        extraDetails: "You are not allowed to delete the certificate!",
      };
      return next(notAllowedErr);
    }

    try {
      const updatedAbout = await AboutCollection.findOneAndUpdate(
        {
          "certificatesArray._id": req.params.certificateId,
        }, //INFO: Match document containing the certificate
        {
          $pull: { certificatesArray: { _id: req.params.certificateId } },
        }, //INFO: Remove the certificate from certificatesArray
        { new: true } //INFO: Return the updated document
      );

      //INFO: Check skills has been removed or not
      if (!updatedAbout) {
        const aboutErr = {
          status: 404,
          message: "Couldn't find the certificate!",
          extraDetails: "Certificate not found!",
        };
        return next(aboutErr);
      }
      res.status(200).json({
        success: true,
        message: "Certificate has been removed.",
        updatedAbout,
      });
    } catch (error) {
      next(error);
    }
  },

  //NOTE: Update about details
  async updateAbout(req, res, next) {
    if (req.user.userId !== req.params.userId) {
      const notAllowedErr = {
        status: 406, //INFO: Not acceptable status
        message: "User not valid administrator.",
        extraDetails: "You are not allowed to update the about details!",
      };
      return next(notAllowedErr);
    }

    const skillId = req.query.skillId || "";
    const certificateId = req.query.certificateId || "";
    const { aboutDetails } = req.body;
    const {
      aboutMe,
      techName,
      selectedCategory,
      techImageURL,
      issueDate,
      certificateImageURL,
    } = aboutDetails;

    //INFO: Validate required fields
    if (
      !aboutMe &&
      !techName &&
      !techImageURL &&
      !issueDate &&
      !certificateImageURL
    ) {
      const inputValueErr = {
        status: 404,
        message: "Input value missing!",
        extraDetails: "Please fill the field properly.",
      };

      return next(inputValueErr);
    }

    // INFO: Update functionality
    try {
      const aboutDetails = await AboutCollection.findOne();

      if (!aboutDetails) {
        const aboutError = {
          status: 404,
          message: "About havn't created yet!",
          extraDetails: "About details not found!",
        };
        return next(aboutError);
      }

      if (skillId) {
        const skillIndex = aboutDetails.skillsArray.findIndex(
          (skill) => skill._id.toString() === skillId
        );

        const updatedSkillData = {
          techName: techName,
          category: selectedCategory,
          techImageURL: techImageURL,
        };

        if (skillIndex === -1) {
          const skillError = {
            status: 404,
            message: "Skill haven't created yet!",
            extraDetails: "Skill not found!",
          };
          return next(skillError);
        }

        //INFO: Update the skill data
        aboutDetails.skillsArray[skillIndex] = {
          ...aboutDetails.skillsArray[skillIndex],
          ...updatedSkillData,
        };
        aboutDetails.aboutMe = aboutMe;
      } else if (certificateId) {
        const certificateIndex = aboutDetails.certificatesArray.findIndex(
          (certificate) => certificate._id.toString() === certificateId
        );

        const updatedCertificateData = {
          issueDate: issueDate,
          certificateImageURL: certificateImageURL,
        };

        if (certificateIndex === -1) {
          const certificateError = {
            status: 404,
            message: "Certificate haven't created yet!",
            extraDetails: "Certificate not found!",
          };
          return next(certificateError);
        }

        //INFO: Update the Certificate data
        aboutDetails.certificatesArray[certificateIndex] = {
          ...aboutDetails.certificatesArray[certificateIndex],
          ...updatedCertificateData,
        };
        aboutDetails.aboutMe = aboutMe;
      }

      // Save the updated document
      await aboutDetails.save();
      return res
        .status(200)
        .json({ message: "Update successful", aboutDetails });
    } catch (error) {
      return next(error);
    }
  },
};
