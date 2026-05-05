const prisma = require("../prismaClient");

const getLeads = async (req, res) => {
  try {
    const { status, leadSource, assignedSalesperson, search } = req.query;

    const leads = await prisma.lead.findMany({
      where: {
        status: status || undefined,
        leadSource: leadSource || undefined,
        assignedSalesperson: assignedSalesperson || undefined,
        OR: search
          ? [
              { leadName: { contains: search } },
              { companyName: { contains: search } },
              { email: { contains: search } },
            ]
          : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get leads",
      error: error.message,
    });
  }
};

const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { id: Number(id) },
      include: { notes: true },
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get lead",
      error: error.message,
    });
  }
};

const createLead = async (req, res) => {
  try {
    const lead = await prisma.lead.create({
      data: {
        leadName: req.body.leadName,
        companyName: req.body.companyName,
        email: req.body.email,
        phone: req.body.phone,
        leadSource: req.body.leadSource,
        assignedSalesperson: req.body.assignedSalesperson,
        status: req.body.status,
        estimatedDealValue: Number(req.body.estimatedDealValue),
      },
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create lead",
      error: error.message,
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.update({
      where: { id: Number(id) },
      data: {
        leadName: req.body.leadName,
        companyName: req.body.companyName,
        email: req.body.email,
        phone: req.body.phone,
        leadSource: req.body.leadSource,
        assignedSalesperson: req.body.assignedSalesperson,
        status: req.body.status,
        estimatedDealValue: Number(req.body.estimatedDealValue),
      },
    });

    res.json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lead",
      error: error.message,
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.lead.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete lead",
      error: error.message,
    });
  }
};

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};