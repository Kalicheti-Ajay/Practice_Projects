const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
    {
        action: {
            type: String,
            required: true
        },

        entity: {
            type: String,
            required: true
        },

        entityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        details: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Audit", auditSchema);