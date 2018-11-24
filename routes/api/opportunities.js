const express = require("express");
const router = express.Router();
const _ = require("lodash");

// Model
const Opportunity = require("../../models/Opportunity");
// Middleware
const auth = require("../../middleware/auth");
// Validation
const validateOpportunityInput = require("../../validation/opportunity");

// @route  POST /api/users/opportunities
// @des    Create a opportunity
// @access Private
router.post("/", auth, (req, res) => {
  const { errors } = validateOpportunityInput(req.body);
  if (errors) return res.status(400).send(errors);

  // Create opportunity
  const newOpr = new Opportunity(
    _.pick(req.body, [
      "contact",
      "title",
      "amount",
      "startDate",
      "endDate",
      "probability",
      "stage",
      "status",
      "description"
    ])
  );
  // Set company ID
  newOpr.company = req.user.id;

  newOpr
    .save()
    .then(user => res.status(201).json(user))
    .catch(err => {
      return res.status(400).json({ msg: "Something error" });
    });
});

// @route  GET /api/opportunities/:id
// @des    Get opportunity by id
// @access Private
router.get("/:id", auth, (req, res) => {
  const id = req.params.id;
  Opportunity.findOne({ _id: id, company: req.user.id })
    .populate("contact", ["name", "email"])
    .then(org => {
      res.json(org);
    })
    .catch(err => {
      res.status(404).json({ errors: "opportunity not found" });
    });
});

// @route  GET /api/opportunities
// @des    Get all opportunities for a company
// @access Private
router.get("/", auth, (req, res) => {
  Opportunity.find({ company: req.user.id })
    .populate("contact", ["name", "email"])
    .then(opportunities => {
      res.json(opportunities);
    })
    .catch(err => {
      res.status(404).json({ errors: "Opportunities not found" });
    });
});

// @route  PUT /api/users/opportunities/:id
// @des    Update opportunity by id
// @access Private
router.put("/:id", auth, (req, res) => {
  const { errors } = validateOpportunityInput(req.body);
  if (errors) return res.status(400).send(errors);

  const id = req.params.id;

  // Set update data
  const updateOpportunity = {};
  if (req.body.contact) updateOpportunity.contact = req.body.contact;
  if (req.body.title) updateOpportunity.title = req.body.title;
  if (req.body.amount) updateOpportunity.amount = req.body.amount;
  if (req.body.startDate) updateOpportunity.startDate = req.body.startDate;
  if (req.body.closeDate) updateOpportunity.closeDate = req.body.closeDate;
  if (req.body.probability)
    updateOpportunity.probability = req.body.probability;
  if (req.body.status) updateOpportunity.status = req.body.status;
  if (req.body.stage) updateOpportunity.stage = req.body.stage;
  if (req.body.description)
    updateOpportunity.description = req.body.description;

  Opportunity.findOne({ _id: id, company: req.user.id })
    .then(org => {
      if (org) {
        org.set(updateOpportunity);

        org
          .save()
          .then(org => {
            return res.json(org);
          })
          .catch(err => {
            if (err) throw err;
          });
      } else {
        return res.json({ errors: "Opportunities not found" });
      }
    })
    .catch(err => {
      res.status(404).json({ errors: "Opportunities not found" });
    });
});

// @route  DELETE /api/opportunities/:id
// @des    Delete opportunity by id
// @access Private
router.delete("/:id", auth, (req, res) => {
  const id = req.params.id;
  Opportunity.findOne({ _id: id, company: req.user.id })
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
        return res.json({ errors: "Opportunity not found" });
      }
    })
    .catch(err => {
      res.status(404).json({ errors: "Opportunity not found" });
    });
});

module.exports = router;
