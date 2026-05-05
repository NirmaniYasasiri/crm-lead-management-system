const prisma = require("../prismaClient");

const addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const note = await prisma.note.create({
      data: {
        content,
        createdBy: req.user.name,
        leadId: Number(id),
      },
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add note",
      error: error.message,
    });
  }
};

const getNotesByLead = async (req, res) => {
  try {
    const { id } = req.params;

    const notes = await prisma.note.findMany({
      where: {
        leadId: Number(id),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get notes",
      error: error.message,
    });
  }
};

module.exports = {
  addNote,
  getNotesByLead,
};