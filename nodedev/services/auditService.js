const Audit = require("../models/audits");

async function createAudit({
    action,
    entity,
    entityId,
    performedBy,
    details
}) {
    return await Audit.create({
        action,
        entity,
        entityId,
        performedBy,
        details
    });
}

module.exports = {
    createAudit
};