import UserCollection from "../models/User.js";

export const userController = {
  //? Login Controller
  async login(req, res, next) {
    try {
      const { firstname, lastname, email, password } = req.body;

      //? Firstname checks
      if (firstname.length < 3 || firstname.length > 20) {
        if (firstname.length < 3) {
          const nameTooSmallErr = {
            status: 400,
            message: "Invalid firstname.",
            extraDetails: "Name must be at least 3 letters!",
          };
          return next(nameTooSmallErr);
        } else if (firstname.length > 20) {
          const nameTooLargeErr = {
            status: 400,
            message: "Invalid firstname.",
            extraDetails: "Name must be less than 20 letters!",
          };
          return next(nameTooLargeErr);
        }
      }

      //? Lastname checks
      if (lastname.length < 3 || lastname.length > 20) {
        if (lastname.length < 3) {
          const nameTooSmallErr = {
            status: 400,
            message: "Invalid lastname.",
            extraDetails: "Name must be at least 3 letters!",
          };
          return next(nameTooSmallErr);
        } else if (lastname.length > 20) {
          const nameTooLargeErr = {
            status: 400,
            message: "Invalid lastname.",
            extraDetails: "Name must be less than 20 letters!",
          };
          return next(nameTooLargeErr);
        }
      }

      //? Email checks
      if (!email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
        const emailError = {
          status: 401,
          message: "Invalid credentials!",
          extraDetails: "Please provide actual email address!",
        };
        return next(emailError);
      }

      //? Password Checks
      if (
        !password.match(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,20}$/
        )
      ) {
        const passwordError = {
          status: 400,
          message: "Invalid credentials!",
          extraDetails:
            "Password must be 12-20 characters long, including at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        };
        return next(passwordError);
      }

      //? Checks user existence
      const userExists = await UserCollection.findOne({ email });

      // If user details present
      if (userExists) {
        // Comapre the password
        const isPasswordValid = await userExists.comparePassword(
          password,
          userExists.password
        );

        // Successfully compared
        if (isPasswordValid) {
          const { password: userPassword, ...rest } = userExists._doc; // Separate the password from user details

          return res
            .status(200)
            .cookie("jwt_token", await userExists.generateToken(), {
              httpOnly: true,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            })
            .json({
              success: true,
              message: "Welcome back! Here is your Dashboard Panel.",
              userDetails: rest,
            });
        } else {
          const loginError = {
            status: 401,
            message: "Invalid user entry",
            extraDetails: "Invalid cradentials. Please try again.",
          };

          return next(loginError);
        }
      } else {
        // Create a new user
        const userCreated = new UserCollection({
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          email: email.trim(),
          password: password.trim(),
        });

        await userCreated.save(); // Save the use details in DB

        const { password: userPassword, ...rest } = userCreated._doc;

        return res
          .status(201)
          .cookie("jwt_token", await userCreated.generateToken(), {
            httpOnly: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          })
          .json({
            success: true,
            message: "You have successfully Logged In!",
            userDetails: rest,
          });
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
};
