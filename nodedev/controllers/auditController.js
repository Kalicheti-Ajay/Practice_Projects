const Audit = require("../models/audits");

async function getAudits(req, res) {
    try {
        const audits = await Audit.find()
            .populate("performedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(audits);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = {
    getAudits
};