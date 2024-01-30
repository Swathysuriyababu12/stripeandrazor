const asyncHandler = require("express-async-handler");

const Mark = require("../models/markdownModel");
const User = require("../models/userModel");

const getMarks = asyncHandler(async (req, res) => {
  const marks = await Mark.find({ user: req.user.id });

  res.status(200).send(marks);
});

const createMark = asyncHandler(async (req, res) => {
  const { markdownContent, sanitizedHtmlContent } = req.body;

  const mark = await Mark.create({
    draft: sanitizedHtmlContent,
    markdown: markdownContent,
    user: req.user.id,
  });

  res.status(201).send(mark);
});

const updateMark = asyncHandler(async (req, res) => {
  const mark = await Mark.findById(req.params.id);

  if (!mark) {
    res.status(400);
    throw new Error("Mark not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make sure the logged in user matches marks user
  if (mark.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const updatedMark = await Mark.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).send(updatedMark);
});

const deleteMark = asyncHandler(async (req, res) => {
  const mark = await Mark.findById(req.params.id);

  if (!mark) {
    res.status(400);
    throw new Error("Mark not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make sure the logged in user matches marks user
  if (mark.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const deletedMark = await Mark.deleteOne({ _id: req.params.id });

  res.status(200).send({ id: req.params.id });
});

module.exports = {
  getMarks,
  createMark,
  updateMark,
  deleteMark,
};
