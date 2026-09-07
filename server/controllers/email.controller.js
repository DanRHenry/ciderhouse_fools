const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/send", async (req, res) => {
  const nodemailer = require("nodemailer");
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
      //   port: 25,
      //   host: "aspmx.l.google.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    if (transporter.sendMail(req.body.message)){
        res.status(250).json({
          message: "Message sent",
        });
    }
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});

// router.post("/upload", upload.single("file"), (req, res) => {
//   try {
//     res.json(req.file);
//   } catch (err) {
//     console.error(err);
//   }
// });

// router.get("/photolistings", async (req, res) => {
//   try {
//     const userID = jwt.verify(req.headers.authorization, SECRET).id;

//     const userImageDir = `./uploads/${userID}`;
//     if (fs.existsSync(userImageDir)) {
//       const fileList = [];
//       fs.readdirSync(userImageDir).forEach((file) => {
//         fileList.push(file);
//       });

//       console.log("fileList: ", fileList);

//       if (fileList.length > 0) {
//         res.status(200).json({
//           message: ` exists!`,
//           imagesList: fileList,
//         });
//       } else {
//         res.status(404).json({
//           message: "no photos found",
//         });
//       }
//     } else {
//       res.status(500).json({
//         message: "no user folder found",
//       });
//     }
//     // const getAllPhotos = await Storage.find({});

//     // getAllPhotos
//     //   ? res.status(200).json({
//     //       message: "All Photos: ",
//     //       getAllPhotos,
//     //     })
//     //   : res.status(404).json({
//     //       message: "No Photos Found",
//     //     });
//   } catch (err) {
//     console.error(err);
//   }
// });

// router.get("/imageName/:imageName/:userID", (req, res) => {
//   // router.get("/imageName/:imageName/:userID", (req, res) => {
//   console.log("getting image by name and user");
//   const { imageName, userID } = req.params;
//   console.log("image Name: ", imageName);
//   console.log("userID: ", userID);

//   const userImageDir = `./uploads/${userID}`;

//   const file = fs.readFileSync(`${userImageDir}/${imageName}`);
//   const base64Data = file.toString(encoding);
//   const uri = `data:${mime};${encoding},${base64Data}`;
//   file
//     ? res.status(200).json({
//         message: "Found image!",
//         uri,
//       })
//     : res.status(404).json({
//         message: "image not found",
//       });

//   // Storage
//   //   .findById(req.params.id)
//   //   .then((image) => {
//   //     res.contentType(image.img.contentType);
//   //     res.send(image.img.data);
//   //   })
//   //   .catch((err) => console.error(err));
// });

// router.post("/upload", upload.single("file"), (req, res) => {

module.exports = router;
