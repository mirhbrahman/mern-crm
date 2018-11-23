const express = require("express");
const router = express.Router();
const _ = require("lodash");

const LEAD = 0;

// Model
const Contact = require("../../models/Contact");

// Middleware
const auth = require("../../middleware/auth");
// Validation
const validateContactInput = require("../../validation/contact");

// @route  POST /api/users/contacts
// @des    Create a contact
// @access Private
router.post("/", auth, (req, res) => {
  const { errors } = validateContactInput(req.body);
  if (errors) return res.status(400).send(errors);

  // Check email already exist or not
  Contact.findOne({ email: req.body.email }).then(contacts => {
    if (contacts) {
      return res.status(400).json({ email: "Email already exist" });
    }
  });

  // Create contact
  const newOrg = new Contact(
    _.pick(req.body, [
      "organization",
      "name",
      "email",
      "phone",
      "title",
      "department",
      "website",
      "primaryAddress",
      "secondaryAddress",
      "status",
      "role",
      "lead_status"
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

// @route  GET /api/users/contacts/contacts/:id
// @des    Get contact by id
// @access Private
router.get("/contacts/:id", auth, (req, res) => {
  const id = req.params.id;
  Contact.findOne({ _id: id, company: req.user.id })
    .populate("organization", "name")
    .then(org => {
      res.json(org);
    })
    .catch(err => {
      res.status(404).json({ errors: "Contact not found" });
    });
});

// @route  GET /api/users/contacts/leads/:id
// @des    Get lead by id
// @access Private
router.get("/leads/:id", auth, (req, res) => {
  const id = req.params.id;
  Contact.findOne({ _id: id, company: req.user.id, role: LEAD })
    .populate("organization", "name")
    .then(org => {
      res.json(org);
    })
    .catch(err => {
      res.status(404).json({ errors: "Contact not found" });
    });
});

// @route  GET /api/users/contacts/contacts
// @des    Get all contacts for a company
// @access Private
router.get("/contacts/", auth, (req, res) => {
  Contact.find({ company: req.user.id })
    .populate("organization", "name")
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      res.status(404).json({ errors: "Contacts not found" });
    });
});

// @route  GET /api/users/contacts/leads
// @des    Get all leads for a company
// @access Private
router.get("/leads/", auth, (req, res) => {
  Contact.find({ company: req.user.id, role: LEAD })
    .populate("organization", "name")
    .then(contacts => {
      res.json(contacts);
    })
    .catch(err => {
      res.status(404).json({ errors: "Contacts not found" });
    });
});

// @route  PUT /api/users/contacts/:id
// @des    Update contact by id
// @access Private
router.put("/:id", auth, (req, res) => {
  const { errors } = validateContactInput(req.body);
  if (errors) return res.status(400).send(errors);

  const id = req.params.id;

  // // Check email already exist or not
  // Contact.findOne({ email: req.body.email })
  //   .then(contacts => {
  //     if (contacts._id !== id) {
  //       res.status(400).json({ email: "Email already exist" });
  //     }
  //   })
  //   .catch(err => res.send({ msg: "Try again" }));

  // Set update data
  const updateContact = {};
  if (req.body.organization) updateContact.organization = req.body.organization;
  if (req.body.name) updateContact.name = req.body.name;
  if (req.body.email) updateContact.email = req.body.email;
  if (req.body.phone) updateContact.phone = req.body.phone;
  if (req.body.title) updateContact.title = req.body.title;
  if (req.body.department) updateContact.department = req.body.department;
  if (req.body.website) updateContact.website = req.body.website;
  if (req.body.primaryAddress)
    updateContact.primaryAddress = req.body.primaryAddress;
  if (req.body.secondaryAddress)
    updateContact.secondaryAddress = req.body.secondaryAddress;
  if (req.body.status) updateContact.status = req.body.status;
  if (req.body.role) updateContact.role = req.body.role;
  if (req.body.leadStatus) updateContact.leadStatus = req.body.leadStatus;

  Contact.findOne({ _id: id, company: req.user.id })
    .then(org => {
      if (org) {
        org.set(updateContact);

        org
          .save()
          .then(org => {
            return res.json(org);
          })
          .catch(err => {
            if (err) throw err;
          });
      } else {
        return res.json({ errors: "Contacts not found" });
      }
    })
    .catch(err => {
      res.status(404).json({ errors: "Contacts not found" });
    });
});

// @route  DELETE /api/users/contacts/:id
// @des    Delete contact by id
// @access Private
router.delete("/:id", auth, (req, res) => {
  const id = req.params.id;
  Contact.findOne({ _id: id, company: req.user.id })
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
        return res.json({ errors: "Contacts not found" });
      }
    })
    .catch(err => {
      res.status(404).json({ errors: "Contacts not found" });
    });
});

module.exports = router;
