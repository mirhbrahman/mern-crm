const express = require("express");
const router = express.Router();
const _ = require("lodash");

// Model
const Organization = require("../../models/Organization");

// Middleware
const auth = require("../../middleware/auth");
// Validation
const validateOrganizationInput = require("../../validation/organization");

// @route  POST /api/organizations
// @des    Create a organization
// @access Private
router.post("/", auth, (req, res) => {
  const { errors } = validateOrganizationInput(req.body);
  if (errors) return res.status(400).send(errors);

  // Check email already exist or not
  Organization.findOne({ email: req.body.email }).then(orgs => {
    if (orgs) {
      return res.status(400).json({ email: "Email already exist" });
    }
  });

  // Create organization
  const newOrg = new Organization(
    _.pick(req.body, [
      "name",
      "email",
      "phone",
      "website",
      "primaryAddress",
      "secondaryAddress"
    ])
  );
  // Set company ID
  newOrg.company = req.user.id;

  newOrg
    .save()
    .then(user => res.status(201).json(user))
    .catch(err => {
      return res.status(400).json({ msg: "Something error" });
    });
});

// @route  GET /api/organizations/:id
// @des    Get organization by id
// @access Private
router.get("/:id", auth, (req, res) => {
  const id = req.params.id;
  Organization.findOne({ _id: id, company: req.user.id })
    .then(org => {
      res.json(org);
    })
    .catch(err => {
      res.status(404).json({ errors: "Organization not found" });
    });
});

// @route  GET /api/organizations
// @des    Get all organizations for a company
// @access Private
router.get("/", auth, (req, res) => {
  Organization.find({ company: req.user.id })
    .then(orgs => {
      res.json(orgs);
    })
    .catch(err => {
      res.status(404).json({ errors: "Organizations not found" });
    });
});

// @route  PUT /api/organizations/:id
// @des    Update organization by id
// @access Private
router.put("/:id", auth, (req, res) => {
  const { errors } = validateOrganizationInput(req.body);
  if (errors) return res.status(400).send(errors);

  const id = req.params.id;

  // // Check email already exist or not
  // Contact.findOne({ email: req.body.email })
  //   .then(orgs => {
  //     if (orgs._id !== id) {
  //       res.status(400).json({ email: "Email already exist" });
  //     }
  //   })
  //   .catch(err => res.send({ msg: "Try again" }));

  // Set update data
  const updateOrganisation = {};
  if (req.body.name) updateOrganisation.name = req.body.name;
  if (req.body.email) updateOrganisation.email = req.body.email;
  if (req.body.phone) updateOrganisation.phone = req.body.phone;
  if (req.body.website) updateOrganisation.website = req.body.website;
  if (req.body.primaryAddress)
    updateOrganisation.primaryAddress = req.body.primaryAddress;
  if (req.body.secondaryAddress)
    updateOrganisation.secondaryAddress = req.body.secondaryAddress;

  Organization.findOne({ _id: id, company: req.user.id })
    .then(org => {
      if (org) {
        org.set(updateOrganisation);

        org
          .save()
          .then(org => {
            return res.json(org);
          })
          .catch(err => {
            if (err) throw err;
          });
      } else {
        return res.json({ errors: "Organizations not found" });
      }
    })
    .catch(err => {
      res.status(404).json({ errors: "Organizations not found" });
    });
});

// @route  DELETE /api/organizations/:id
// @des    Delete organization by id
// @access Private
router.delete("/:id", auth, (req, res) => {
  const id = req.params.id;
  Organization.findOne({ _id: id, company: req.user.id })
    .then(org => {
      if (org) {
        org
          .remove()
          .then(org => {
            return res.json(org);
          })
          .catch(err => {
            if (err) throw err;
          });
      } else {
        return res.json({ errors: "Organizations not found" });
      }
    })
    .catch(err => {
      res.status(404).json({ errors: "Organizations not found" });
    });
});

module.exports = router;
