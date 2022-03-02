const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://SNP_0305:SreeP@clustersreeneher99.2d99s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  (err) => {
    if (!err) console.log("MongoDB Connection succeeded");
    else console.log("MongoDB Connection failed" + err);
  }
);
