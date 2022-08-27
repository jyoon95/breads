const express = require("express");
const bread = require("../models/bread.js");
const breads = express.Router();
const Bread = require("../models/bread.js");
const Baker = require("../models/baker.js");

// Index:
breads.get("/", async (req, res) => {
  const foundBakers = await Baker.find().lean();
  const foundBreads = await Bread.find().limit(2).lean();
  //index was lower case
  res.render("Index", {
    breads: foundBreads,
    bakers: foundBakers,
    title: "Index Page",
  });
});

// SHOW
breads.get("/:arrayIndex", (req, res) => {
  Bread.findById(req.params.arrayIndex)
    .populate("baker")
    .then((foundBread) => {
      const bakedBy = foundBread.getBakedBy();
      console.log(bakedBy);
      res.render("show", {
        bread: foundBread,
      });
    });
});

// NEW
breads.get("/new", (req, res) => {
  Baker.find().then((foundBakers) => {
    res.render("new", {
      bakers: foundBakers,
    });
  });
});

// EDIT
breads.get("/:arrayIndex/edit", (req, res) => {
  Baker.find().then((foundBakers) => {
    Bread.findById(req.params.arrayIndex).then((foundBread) => {
      res.render("edit", {
        bread: foundBread,
        bakers: foundBakers,
      });
    });
  });
});

// CREATE
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = "true";
  } else {
    req.body.hasGluten = "false";
  }
  Bread.create(req.body);
  res.redirect("/breads");
});

// breads.get("/data/seed", (req, res) => {
//   Bread.insertMany([
//     {
//       name: "Rye",
//       hasGluten: true,
//       image:
//         "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//     },
//     {
//       name: "French",
//       hasGluten: true,
//       image:
//         "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
//     },
//     {
//       name: "Gluten Free",
//       hasGluten: false,
//       image:
//         "https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
//     },
//     {
//       name: "Pumpernickel",
//       hasGluten: true,
//       image:
//         "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
//     },
//   ]).then((createdBreads) => {
//     res.redirect("/breads");
//   });
// });

//UPDATE
breads.put("/:arrayIndex", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.findByIdAndUpdate(req.params.arrayIndex, req.body, { new: true }).then(
    (updatedBread) => {
      console.log(updatedBread);
      res.redirect(`/breads/${req.params.arrayIndex}`);
    }
  );
});

//DELETE
breads.delete("/:arrayIndex", (req, res) => {
  Bread.findByIdAndDelete(req.params.arrayIndex).then((deletedBread) => {
    res.status(303).redirect("/breads");
  });
});

module.exports = breads;
