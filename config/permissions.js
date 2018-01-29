module.exports = {
    permissions: ["CARER_READ", "CARER_SAVE", "CARER_UPDATE", "CARER_DELETE", "CARE_HOME_READ", "CARE_HOME_SAVE", "CARE_HOME_UPDATE", "CARE_HOME_DELETE"],
    roles: [
        {
            role: "CARE_HOME",
            permissions: ["CARE_HOME_READ", "CARE_HOME_SAVE", "CARE_HOME_UPDATE", "CARE_HOME_DELETE"]
        },
        {
            role: "CARER",
            permissions: ["CARER_READ", "CARER_SAVE", "CARER_UPDATE", "CARER_DELETE",]
        }
    ]
}