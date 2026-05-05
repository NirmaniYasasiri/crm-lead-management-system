const prisma = require("../prismaClient");

const getDashboardStats = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany();

    const totalLeads = leads.length;
    const newLeads = leads.filter((lead) => lead.status === "New").length;
    const qualifiedLeads = leads.filter((lead) => lead.status === "Qualified").length;
    const wonLeads = leads.filter((lead) => lead.status === "Won").length;
    const lostLeads = leads.filter((lead) => lead.status === "Lost").length;

    const totalEstimatedDealValue = leads.reduce(
      (sum, lead) => sum + lead.estimatedDealValue,
      0
    );

    const totalWonDealValue = leads
      .filter((lead) => lead.status === "Won")
      .reduce((sum, lead) => sum + lead.estimatedDealValue, 0);

    res.json({
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      totalEstimatedDealValue,
      totalWonDealValue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
