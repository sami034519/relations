import connection from "../config/db.js";
const enteruser = async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      connection.query(
        `insert into user set email=? , password=?`,
        [req.body.email, req.body.password],
        (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        }
      );
    });
    return res.status(200).json({
      data: data,
      message: "user created",
    });
  } catch (err) {
    console.log(err);
  }
};
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const getuserbyid = async (req, res) => {
  try {
    const data = await new Promise((resolve, reject) => {
      connection.query(
        `select firstname, lastname from profile join user on user.id=profile.userid where user.id=?`,
        [req.params.id],
        (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        }
      );
    });
    return res.status(200).json({
      data: data,
      
      message: `user found ${process.pid}`,
    });
  } catch (err) {
    console.log(err);
  }
};
import crypto from "crypto";

// const data = 'Hello, world!';
// const hash = crypto.createHash('sha256').update(data).digest('hex');

// console.log('SHA-256 Hash:', hash);

export default { enteruser, upload, getuserbyid };
