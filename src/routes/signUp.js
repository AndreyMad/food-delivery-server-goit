const fs = require("fs");
const path = require("path");
const validator = require("validator");
const signUpRoute = async (req, res) => {
  if (req.method !== "POST") {
    console.log("wrong method");
    return;
  } else {
    let body = "";
    await req.on("data", function(data) {
      body += data;
    });
    const user = JSON.parse(body);

    //validate reqData
    const isValidReqData =
      !validator.isEmpty(user.username) &&
      validator.isMobilePhone(user.telephone) &&
      validator.isByteLength(user.password, { min: 5 }) &&
      validator.isEmail(user.email);

    if (!isValidReqData) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.write("Error: Bad Request");
      res.end();
      return;
    }
    fs.mkdir(`../../src/db/autonom`, { recursive: true }, err => {
      if (err) throw err;
    });
    const filePath = path.join(
      __dirname,
      "../../",
      "src/",
      "db/",
      "users/",
      // `${user.username}/`,
      `${user.username}.json`
    );
    fs.writeFile(filePath, body, err => {
      if (err) {
        throw err;
      }
      const userBody = {
        status: "success",
        user: JSON.parse(body)
      };
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(userBody));
      res.end();
    });
  }
};
module.exports = signUpRoute;
