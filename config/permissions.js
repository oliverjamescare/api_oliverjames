module.exports = {
    permissions: ["CARE_HOME_FULL", "CARER_FULL", "ADMIN_BASIC", "ADMIN_PARAMETERS", "ADMIN_STAFF" ],
    roles: [
        {
            role: "CARE_HOME",
            permissions: ["CARE_HOME_FULL"]
        },
        {
            role: "CARER",
            permissions: ["CARER_FULL"]
        },
	    {
		    role: "ADMIN_DIRECTOR",
		    permissions: ["ADMIN_BASIC", "ADMIN_PARAMETERS", "ADMIN_STAFF"]
	    },
	    {
		    role: "ADMIN_MANAGER",
		    permissions: ["ADMIN_BASIC", "ADMIN_STAFF"]
	    },
	    {
		    role: "ADMIN",
		    permissions: ["ADMIN_BASIC"]
	    },
    ]
}