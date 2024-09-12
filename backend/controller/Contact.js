import { SMTP_MAIL } from "../config/envConfig.js";
import { mailTransport, contactInfoEmailTemplate } from "../utilis/mail.js";

export const contactControler = async (req, res, next) => {
  const { formDetails } = req.body;
  const { username, companyname, jobrole, jobdetails, email, phonenumber } =
    formDetails;

  //INFO: Valid username checks
  if (username.length <= 2 || username.length > 50) {
    const nameError = {
      status: 400,
      message: "User name invalid",
      extraDetails: "UserName must be 3 to 50 characters long",
    };
    return next(nameError);
  }

  //INFO: Valid other details
  if (
    companyname.length <= 2 ||
    jobrole.length <= 2 ||
    jobdetails.length <= 2
  ) {
    const otherError = {
      status: 400,
      message: "Other details invalid",
      extraDetails: "Input fields must be atleast 3 characters long",
    };
    return next(otherError);
  }

  //INFO: Valid phone number checks
  if (
    !phonenumber.match(
      /^\+?(?:\d{1,4})?[-.\s]?(?:\(?\d{1,4}\)?[-.\s]?)?(?:\d{1,4}[-.\s]?){1,4}\d{1,9}$/
    )
  ) {
    const phoneError = {
      status: 400,
      message: "Invalid phone number",
      extraDetails: "Please provide a valid phone number",
    };
    return next(phoneError);
  }

  //INFO: Valid email checks
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    const emailError = {
      status: 400,
      message: "Invalid phone number",
      extraDetails: "Please provide a valid email ID.",
    };
    return next(emailError);
  }

  //INFO: We are sending these details to my email address
  mailTransport().sendMail({
    from: email,
    to: SMTP_MAIL,
    subject: "CONTACT QUERY FROM PORTFOLIO",
    html: contactInfoEmailTemplate(
      username,
      companyname,
      jobrole,
      jobdetails,
      email,
      phonenumber
    ),
  });

  res.status(200).json({
    success: true,
    message: "Congratulations! Your message has been sent successfully.",
  });
};
