const prisma = require("../prismaClient");

// This function calculates dashboard statistics from the Lead table
const getDashboardStats = async (req, res) => {
  try {
    // Get all leads from the database
    const leads = await prisma.lead.findMany();

    // Count total leads
    const totalLeads = leads.length;

    // Count leads by status
    const newLeads = leads.filter((lead) => lead.status === "New").length;
    const qualifiedLeads = leads.filter((lead) => lead.status === "Qualified").length;
    const wonLeads = leads.filter((lead) => lead.status === "Won").length;
    const lostLeads = leads.filter((lead) => lead.status === "Lost").length;

    // Calculate total estimated deal value
    const totalEstimatedDealValue = leads.reduce((sum, lead) => {
      return sum + Number(lead.estimatedDealValue || 0);
    }, 0);

    // Calculate total value of won deals only
    const totalWonDealValue = leads
      .filter((lead) => lead.status === "Won")
      .reduce((sum, lead) => {
        return sum + Number(lead.estimatedDealValue || 0);
      }, 0);

    // Send dashboard data to frontend
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
