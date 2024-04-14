const Comment = require("../models/comment");
const ExpressError = require("../utils/ExpressError");

module.exports.listAllComments = async (req, res, next) => {
  const comments = await Comment.find({});
  res.render("index", { comments });
};

module.exports.renderNewForm = (req, res) => {
  res.render("new");
};

module.exports.showComment = async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id).populate("author");
  if (!comment) {
    throw new ExpressError("Document not found", 404);
  }
  res.render("show", { comment });
};

module.exports.renderEditForm = async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new ExpressError("Document not found", 404);
  }
  res.render("edit", { comment });
};

module.exports.createComment = async (req, res, next) => {
  const { title, text } = req.validatedComment;
  const comment = new Comment({ title, text });
  comment.author = req.session.userId;
  await comment.save(); // to be catched by DB error handling
  res.redirect("/comments");
};

module.exports.updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.validatedComment;
  const updatedComment = await Comment.findByIdAndUpdate(id, { title, text });
  if (!updatedComment) {
    throw new ExpressError("Document not found", 404);
  }
  res.redirect("/comments");
};

module.exports.deleteComment = async (req, res, next) => {
  const { id } = req.params;
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) {
    throw new ExpressError("Document not found", 404);
  }
  res.redirect("/comments");
};
