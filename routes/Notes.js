const express = require("express");
const { validateToken } = require("../middleware/AuthMiddleware");
const router = express.Router();
const { Notes } = require("../models")

router.post("/", validateToken, async (req, res) => {
  const note = req.body;
  const userId = req.user.id;
  note.userId = userId;
  await Notes.create(note);
  res.json(note);
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const notes = await Notes.findAll({ where: { UserId: userId } });
  res.json(notes);
});

router.get("/edit/:id", validateToken, async (req, res) => {
  const noteId = req.params.id;
  const note = await Notes.findAll({ where: { id: noteId } });
  res.json(note[0]);
});

router.delete("/:noteId", validateToken, async (req, res) => {
  const noteId = req.params.noteId;
  await Notes.destroy({
    where: {
      id: noteId,
    },
  });
  res.json("Note removed");
});

router.put("/editNote", validateToken, async (req, res) => {
  const { id, title, content } = req.body;
  const note = await Notes.update(
    {
      title: title,
      content: content,
    },
    {
      where: { id: id },
    }
  );
  res.json(note);
});
module.exports = router;
