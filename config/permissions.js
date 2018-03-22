module.exports = {
    permissions: ["CARE_HOME_FULL", "CARER_FULL"],
    roles: [
        {
            role: "CARE_HOME",
            permissions: ["CARE_HOME_FULL"]
        },
        {
            role: "CARER",
            permissions: ["CARER_FULL"]
        }
    ]
}