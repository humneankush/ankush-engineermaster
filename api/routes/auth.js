const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key: process.env.SENDGRID_API_KEY,
//     },
//   })
// );

// register route
router.post("/register", async (req, res) => {
  try {
    const e =
      (await User.findOne({ email: req.body.email })) ||
      (await User.findOne({ mobNo: req.body.mobNo }));

    if (e) {
      res
        .status(400)
        .json("user already exist please use different email or mobilNO");
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        mobNo: req.body.mobNo,
        password: hashPassword,
      });

      const user = await newUser.save();
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const usr =
      (await User.findOne({ email: req.body.email })) ||
      (await User.findOne({ mobNo: req.body.mobNo }));
    if (!usr) {
      res.status(300).json("user not exist ");
    } else {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        usr.password
      );

      if (!validatePassword) {
        res.status(400).json("check your password");
      } else {
        const { password, ...info } = usr._doc;

        res.status(200).json({ ...info, accessToken });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// reset password
router.post("/reset-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(422).json("user does not exist with that mail");
    } else {
      const msg = {
        to: user.email, // Change to your recipient
        from: "humneankush@gmail.com", // Change to your verified sender
        subject: "password reset",
        text: "and easy to do anywhere, even with Node.js",
        html: ` <p>You requested for password reset</p>
              <h5>click in this <a href="${process.env.EMAIL}/reset">link</a> to reset password</h5>
              `,
      };
      sgMail
        .send(msg)
        .then(() => {
          res.json("check your email");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } catch (error) {}
});

// to generate new password

router.post("/new-password", async (req, res) => {
  try {
    const newPassword = req.body.password;
    const user = await User.findOne({ email: req.body.email });

    !user && res.status(300).json("user not found");

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await user.updateOne({
      password: hashPassword,
    });
    await user.save();

    res.status(200).json("password updated succesfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
