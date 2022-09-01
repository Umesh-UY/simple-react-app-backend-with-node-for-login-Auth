const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/Users");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/sign-up", async (request, resp) => {
  let user = new User(request.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});
app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      resp.send(user);
    } else {
      resp.send({ result: "No user Found" });
    }
  }else{
    resp.send({ result: "No user Found" });
  }
});
app.listen(5000);
