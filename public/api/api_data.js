define({ "api": [
  {
    "type": "get",
    "url": "/accounts/:accountId",
    "title": "Account settings",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId"
      }
    ],
    "version": "0.3.1",
    "name": "Account_settings",
    "group": "Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "account",
            "description": "<p>Account details.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"59c1179faa1e3a1cec6edb3a\",\n    \"timezone\": \"UTC+01:00\",\n    \"name\": \"New account\",\n    \"standard_working_hours\": {\n        \"monday\": {\n            \"is_working\": false,\n            \"start_time\": 30,\n            \"end_time\": 180\n        },\n        \"tuesday\": {\n            \"is_working\": false,\n            \"start_time\": null,\n            \"end_time\": null\n        },\n        \"wednesday\": {\n            \"is_working\": false,\n            \"start_time\": null,\n            \"end_time\": null\n        },\n        \"thursday\": {\n            \"is_working\": false,\n            \"start_time\": null,\n            \"end_time\": null\n        },\n        \"friday\": {\n            \"is_working\": false,\n            \"start_time\": null,\n            \"end_time\": null\n        },\n        \"saturday\": {\n            \"is_working\": false,\n            \"start_time\": null,\n            \"end_time\": null\n        },\n        \"sunday\": {\n            \"is_working\": false,\n            \"start_time\": null,\n            \"end_time\": null\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Account.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/user/accounts",
    "title": "Add account",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/user/accounts"
      }
    ],
    "version": "0.3.1",
    "name": "Add_account",
    "group": "Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Account name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true,\n  \"_id\" : \"59ad2b468069a619f49345b7\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"name\",\n              \"message\": \"Name field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Account.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/user/accounts",
    "title": "Add account",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/user/accounts"
      }
    ],
    "version": "0.1.0",
    "name": "Add_account",
    "group": "Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Account name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"name\",\n              \"message\": \"Name field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         { \n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/_apidoc.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/users",
    "title": "Add user",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/users"
      }
    ],
    "version": "0.3.1",
    "name": "Add_user",
    "group": "Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message to user. Max 200 characters.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true,\n  \"message\" : \"User added\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"email\",\n              \"message\": \"Email field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Account.js",
    "groupTitle": "Account"
  },
  {
    "type": "delete",
    "url": "/user/accounts/:id",
    "title": "Delete account",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/user/accounts/:id"
      }
    ],
    "version": "0.3.1",
    "name": "Delete_account",
    "group": "Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Account id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>You have no permission to remove this account.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 You have no permission to remove this account\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"You have no permission to remove this account.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Account.js",
    "groupTitle": "Account"
  },
  {
    "type": "delete",
    "url": "/accounts/:accountId/users/:userId",
    "title": "Delete user",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/users/:userId"
      }
    ],
    "version": "0.3.1",
    "name": "Delete_user",
    "group": "Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Account.js",
    "groupTitle": "Account"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/users",
    "title": "Get account users",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/users"
      }
    ],
    "version": "0.3.1",
    "name": "Get_account_users",
    "group": "Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "results",
            "description": "<p>Users assigned to account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"results\": [\n        {\n            \"_id\": \"59c0519032bcff1a68ad2fe9\",\n            \"first_name\": \"Test\",\n            \"surname\": \"Test\",\n            \"login_time\": \"2017-09-18T23:05:14.229Z\",\n            \"permissions\": {\n                \"admin\": true,\n                \"project_viewer\": \"view\",\n                \"data_segmenter\": false,\n                \"resource_manager\": false,\n                \"my_work\": false\n            },\n            \"department\": {\n                \"_id\": \"59c11de18b893a0830dcd51e\",\n                \"name\": \"Test department\"\n            }\n        },\n        {\n            \"_id\": \"59c0519a32bcff1a68ad2feb\",\n            \"first_name\": \"Test\",\n            \"surname\": \"Test\",\n            \"login_time\": \"2017-09-18T23:05:14.229Z\",\n            \"permissions\": {\n                \"admin\": false,\n                \"project_viewer\": \"none\",\n                \"data_segmenter\": false,\n                \"resource_manager\": false,\n                \"my_work\": false\n            },\n            \"department\": null\n        }\n    ],\n    \"pages\": 1,\n    \"total\": 2\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Account.js",
    "groupTitle": "Account"
  },
  {
    "type": "put",
    "url": "/accounts/:accountId",
    "title": "Update account",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId"
      }
    ],
    "version": "0.3.1",
    "name": "Update_account",
    "group": "Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "timezone",
            "description": "<p>Timezone string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Account name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "standard_working_hours",
            "description": "<p>{&quot;monday&quot;: {&quot;is_working&quot;: false,&quot;start_time&quot;: 30,&quot;end_time&quot;: 180},&quot;tuesday&quot;: {&quot;is_working&quot;: false,&quot;start_time&quot;: null,&quot;end_time&quot;: null},&quot;wednesday&quot;: {&quot;is_working&quot;: false,&quot;start_time&quot;: null,&quot;end_time&quot;: null},&quot;thursday&quot;: {&quot;is_working&quot;: false,&quot;start_time&quot;: null,&quot;end_time&quot;: null},&quot;friday&quot;: {&quot;is_working&quot;: false,&quot;start_time&quot;: null,&quot;end_time&quot;: null},&quot;saturday&quot;: {&quot;is_working&quot;: false,&quot;start_time&quot;: null,&quot;end_time&quot;: null},&quot;sunday&quot;: {&quot;is_working&quot;: false,&quot;start_time&quot;: null,&quot;end_time&quot;: null}}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Account.js",
    "groupTitle": "Account"
  },
  {
    "type": "put",
    "url": "/accounts/:accountId/users/:userId",
    "title": "Update user",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/users/:userId"
      }
    ],
    "version": "0.3.1",
    "name": "Update_user",
    "group": "Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "department",
            "description": "<p>Department id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "permissions",
            "description": "<p>{&quot;admin&quot;: false, &quot;project_viewer&quot;: &quot;none&quot;, &quot;data_segmenter&quot;: false, &quot;resource_manager&quot;: false, &quot;my_work&quot;: false} project_viewer options: full, view, none.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Account.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/activities",
    "title": "Add activity",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/activities"
      }
    ],
    "version": "0.3.1",
    "name": "Add_activity",
    "group": "Activity",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Activity name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"name\",\n              \"message\": \"Name field is required.\"\n         }  \n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Activity.js",
    "groupTitle": "Activity"
  },
  {
    "type": "delete",
    "url": "/accounts/:accountId/activities/:activityId",
    "title": "Delete activity",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/activities/:activityId"
      }
    ],
    "version": "0.3.1",
    "name": "Delete_activity",
    "group": "Activity",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "activityId",
            "description": "<p>Account id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Activity not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Activity not found\n{\n     \"errors\": [\n         {\n              \"field\": \"activity\",\n              \"message\": \"Activity not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Activity.js",
    "groupTitle": "Activity"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/activities",
    "title": "Get account activities",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/activities"
      }
    ],
    "version": "0.3.1",
    "name": "Get_account_activities",
    "group": "Activity",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filter",
            "description": "<p>acvite(default), disabled, both</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "results",
            "description": "<p>Activities assigned to account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"activities\": [\n        {\n            \"_id\": \"59c11de18b893a0830dcd51e\",\n            \"name\": \"Example activity\",\n            \"active\": true\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Activity.js",
    "groupTitle": "Activity"
  },
  {
    "type": "put",
    "url": "/accounts/:accountId/activities/:activityId",
    "title": "Update activity",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/activities/:activityId"
      }
    ],
    "version": "0.3.1",
    "name": "Update_activity",
    "group": "Activity",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "activityId",
            "description": "<p>Activity id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Active status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Activity not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Activity not found\n{\n     \"errors\": [\n         {\n              \"field\": \"activity\",\n              \"message\": \"Activity not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\" \n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Activity.js",
    "groupTitle": "Activity"
  },
  {
    "type": "post",
    "url": "/password/remind",
    "title": "Forgot password",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/password/remind"
      }
    ],
    "version": "0.3.1",
    "name": "Forgot_password",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 User not found\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"User not found\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/password/remind/change",
    "title": "Forgot password change",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/password/remind/change"
      }
    ],
    "version": "0.3.1",
    "name": "Forgot_password_change",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Password remind token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Token not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Password field is required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Token not found\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Token not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Password field is required\n{\n     \"errors\": [\n         {\n              \"field\": \"password\",\n              \"message\": \"Password field is required\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/login"
      }
    ],
    "version": "0.3.1",
    "name": "Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDQ3ODExNzksImRhdGEiOnsiX2lkIjoiNTlhN2QwOWJjOTNiYTYwNmYwMDI5NzQ0IiwiYWNjZXNzX3Rva2VuIjoiIiwiZW1haWwiOiJhZHJpYW4ubWFzbGVyekByZWFkeTRzLnBsbCIsInBhc3N3b3JkIjoiJDJhJDEwJDZqOGFkZU94c213azVYVDdBZm01ck9VQjF3dFpnd2hUYnVac1h3SVpMdFdjNGJ4M0x0RW5tIiwiY291bnRyeSI6IlBvbGFuZCIsImpvYl90aXRsZSI6IlByb2dyYW1tZXIiLCJmaXJzdF9uYW1lIjoiQWRyaWFuIiwic3VybmFtZSI6Ik1hxZtsZXJ6IiwiX192IjowLCJ1cGRhdGVkIjoiMjAxNy0wOC0zMVQwOTowMjowMy4zMzBaIiwiY3JlYXRlZCI6IjIwMTctMDgtMzFUMDk6MDI6MDMuMzMwWiIsInBhc3N3b3JkX3Jlc2V0cyI6W119LCJpYXQiOjE1MDQxNzYzNzl9.30rt445vUkUrZfnkbIQHhfENgrdXlrdZw2RcYU0mgII\",\n  \"admin\" : false  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongPassword",
            "description": "<p>Wrong password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BlockedAccount",
            "description": "<p>Blocked account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong password\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Wrong password\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 User not found\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"User not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Blocked account\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Blocked account\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/register"
      }
    ],
    "version": "0.3.1",
    "name": "Register",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Min 8 characters, RegExp = /^(?=.<em>[A-Za-z])(?=.</em>\\d)(?=.<em>[$@$!%</em>#?&amp;^()])[A-Za-z\\d$@$!%*#?&amp;^()]{8,}$/.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country name,  max length: 50.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_title",
            "description": "<p>Job title, max length: 50.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name. Only alpha characters, max length: 50.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>Surname. Only alpha characters, max length: 50.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"email\",\n              \"message\": \"The email has already been taken.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/clients",
    "title": "Add client",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/clients"
      }
    ],
    "version": "0.3.1",
    "name": "Add_client",
    "group": "Client",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Client name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"name\",\n              \"message\": \"Name field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Client.js",
    "groupTitle": "Client"
  },
  {
    "type": "delete",
    "url": "/accounts/:accountId/clients/:clientId",
    "title": "Delete client",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/clients/:clientId"
      }
    ],
    "version": "0.3.1",
    "name": "Delete_client",
    "group": "Client",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Account id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Client not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Client not found\n{\n     \"errors\": [\n         {\n              \"field\": \"client\",\n              \"message\": \"Client not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Client.js",
    "groupTitle": "Client"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/clients",
    "title": "Get account clients",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/clients"
      }
    ],
    "version": "0.3.1",
    "name": "Get_account_clients",
    "group": "Client",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filter",
            "description": "<p>acvite(default), disabled, both</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>az(default), za</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "results",
            "description": "<p>Clients assigned to account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"clients\": [\n        {\n            \"_id\": \"59c11de18b893a0830dcd51e\",\n            \"name\": \"New client\",\n            \"project\": \"0\"\n            \"active\": true \n        }  \n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found \n{\n     \"errors\": [\n         {\n              \"field\": \"account\", \n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\" \n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/accounts/:accountId/clients/:clientId",
    "title": "Update client",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/clients/:clientId"
      }
    ],
    "version": "0.3.1",
    "name": "Update_client",
    "group": "Client",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Active status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Client not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Client not found\n{\n     \"errors\": [\n         {\n              \"field\": \"client\",\n              \"message\": \"Client not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Client.js",
    "groupTitle": "Client"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/projects/:projectId/comment",
    "title": "Add comment",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:clientId"
      }
    ],
    "version": "0.3.1",
    "name": "Add_comment",
    "group": "Comment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task id. Default: null.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true, \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"comment\",\n              \"message\": \"Comment field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/projects/:projectId/task/:taskId/comment",
    "title": "Task comments",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/task/:taskId/comment"
      }
    ],
    "version": "0.3.1",
    "name": "Task_Comments",
    "group": "Comment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>Project details response.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n {\n     \"comments\": [\n          {\n             \"_id\": \"5a016ad238b3f11af5fdbfa3\",\n             \"comment\": \"lorem impusa\",\n             \"author\": {\n                 \"_id\": \"59c3a476302d2c327aa2702f\",\n                 \"first_name\": \"Dominik\",\n                 \"surname\": \"Dziuban\"\n             }, \n             \"sub_comments\": [\n                 {\n                     \"_id\": \"5a016af438b3f11af5fdbfa4\",\n                     \"comment\": \"lorem impusa sub\",\n                     \"author\": {\n                         \"_id\": \"59c3a476302d2c327aa2702f\",\n                         \"first_name\": \"Dominik\",\n                         \"surname\": \"Dziuban\"\n                     }\n                     \"created\": \"2017-11-07T08:09:39.936Z\"\n                 }\n             ],\n             \"created\": \"2017-11-07T08:09:39.936Z\" \n          }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/departments",
    "title": "Add department",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/departments"
      }
    ],
    "version": "0.3.1",
    "name": "Add_department",
    "group": "Department",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Department name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"name\",\n              \"message\": \"Name field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Department.js",
    "groupTitle": "Department"
  },
  {
    "type": "delete",
    "url": "/accounts/:accountId/departments/:departmentId",
    "title": "Delete department",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/departments/:departmentId"
      }
    ],
    "version": "0.3.1",
    "name": "Delete_department",
    "group": "Department",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "departmentId",
            "description": "<p>Account id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Department not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Department not found\n{\n     \"errors\": [\n         {\n              \"field\": \"department\",\n              \"message\": \"Department not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Department.js",
    "groupTitle": "Department"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/departments",
    "title": "Get account departments",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/departments"
      }
    ],
    "version": "0.3.1",
    "name": "Get_account_departments",
    "group": "Department",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filter",
            "description": "<p>acvite(default), disabled, both</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "results",
            "description": "<p>Departments assigned to account.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"departments\": [\n        {\n            \"_id\": \"59c11de18b893a0830dcd51e\",\n            \"name\": \"New department\",\n            \"members\": [\n                {\n                    \"_id\": \"59c0519032bcff1a68ad2fe9\",\n                    \"first_name\": \"Test\",\n                    \"surname\": \"Test\"\n                }\n            ],\n            \"active\": true\n        }\n    ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Department.js",
    "groupTitle": "Department"
  },
  {
    "type": "put",
    "url": "/accounts/:accountId/departments/:departmentId",
    "title": "Update department",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/departments/:departmentId"
      }
    ],
    "version": "0.3.1",
    "name": "Update_department",
    "group": "Department",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "departmentId",
            "description": "<p>Department id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "active",
            "description": "<p>Active status</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Department not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Department not found \n{\n     \"errors\": [\n         {      \n              \"field\": \"department\",\n              \"message\": \"Department not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]  \n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [ \n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Department.js",
    "groupTitle": "Department"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/projects/:projectId/link",
    "title": "Add link",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/link"
      }
    ],
    "version": "0.3.1",
    "name": "Add_link",
    "group": "Gantt",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "source",
            "description": "<p>Source task id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "target",
            "description": "<p>Target task id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>Type of link. Available options: 0 (finish to start (default)), 1 (start to start), 2 (finish to finish), 3 (start to finish).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true, \n  \"linkId\": \"59e896bec181ba408ab46679\"   \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"source\",\n              \"message\": \"Source field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Gantt.js",
    "groupTitle": "Gantt"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/projects/:projectId/task",
    "title": "Add task",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/task"
      }
    ],
    "version": "0.3.1",
    "name": "Add_task__action__actionWindow__Window_",
    "group": "Gantt",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_task",
            "description": "<p>Task type. Available options: action(default), action_window, window.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Task name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "index",
            "description": "<p>Gantt index.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>Date of start task. Timestamp in miliseconds.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Task duration which represents number of quarters eg 3 = 45 min. Default 0. In case of action window this represents duration between start date and planned end date</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "action_window_duration",
            "description": "<p>Task duration which represents number of quarters eg 3 = 45 min between planned end date and final end date. Default 0.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "parent",
            "description": "<p>Parent window task id.  Default null.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "assigned_to",
            "description": "<p>User id to which this task is assigned to.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "activity_type",
            "description": "<p>Activity type to which this task is assigned to.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true,   \n  \"taskId\": \"59e896bec181ba408ab46679\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"text\",\n              \"message\": \"Text field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Gantt.js",
    "groupTitle": "Gantt"
  },
  {
    "type": "delete",
    "url": "/accounts/:accountId/projects/:projectId/link/:linkId",
    "title": "Delete link",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/link/:linkId"
      }
    ],
    "version": "0.3.1",
    "name": "Delete_link",
    "group": "Gantt",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "linkId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Link not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Link not found\n{\n     \"errors\": [\n         {\n              \"field\": \"link\",\n              \"message\": \"link not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Gantt.js",
    "groupTitle": "Gantt"
  },
  {
    "type": "delete",
    "url": "/accounts/:accountId/projects/:projectId/task/:taskId",
    "title": "Delete task",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/task/:taskId"
      }
    ],
    "version": "0.3.1",
    "name": "Delete_task",
    "group": "Gantt",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Project not found\n{\n     \"errors\": [\n         {\n              \"field\": \"task\",\n              \"message\": \"Task not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Gantt.js",
    "groupTitle": "Gantt"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/projects/:projectId",
    "title": "Project Gantt",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId"
      }
    ],
    "version": "0.3.1",
    "name": "Project_Gantt",
    "group": "Gantt",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "gantt",
            "description": "<p>Project gantt response.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n {\n     \"data\": [\n         {\n             \"_id\": \"59e5aa134f0558095297e2e0\",\n             \"start_date\": \"2017-10-16 02:00:0\",\n             \"end_date\": \"2017-10-17 02:00:00\",\n             \"project\": \"59df4c714fbe2a1ca7665fa2\",\n             \"parent\": \"0\",\n             \"duration\": 24,\n             \"action_window_duration\": 16,\n             \"action_window_progress\": 0, \n             \"progress\": 0.6,\n             \"type_task\": \"action_window\",\n             \"text\": \"New task\",\n             \"description\": \"example description\",\n             \"activity_type\": \"developent\", \n             \"open\": true\n         }\n     ],\n     \"collections\": {\n         \"links\": [\n             {\n                 \"_id\": \"59e616503d693b3f6ccc7d99\",\n                 \"type\": 0,\n                 \"target\": \"59e616503d693b3f6ccc7d98\",\n                 \"source\": \"59e5cdabb789e31d6d66c860\", \n                 \"id\": \"59e616503d693b3f6ccc7d99\",\n             }\n         ] \n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{ \n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Gantt.js",
    "groupTitle": "Gantt"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/projects/:projectId",
    "title": "Project Gantt",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId"
      }
    ],
    "version": "0.3.0",
    "name": "Project_Gantt",
    "group": "Gantt",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "gantt",
            "description": "<p>Project gantt response.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n {\n     \"data\": [\n         {\n             \"_id\": \"59e5aa134f0558095297e2e0\",\n             \"start_date\": \"2017-10-16 02:00:0\",\n             \"end_date\": \"2017-10-17 02:00:00\",\n             \"project\": \"59df4c714fbe2a1ca7665fa2\",\n             \"parent\": \"0\",\n             \"duration\": 24,\n             \"action_window_duration\": 16,\n             \"action_window_progress\": 0, \n             \"progress\": 0.6,\n             \"type_task\": \"action_window\",\n             \"text\": \"New task\",\n             \"description\": \"example description\",\n             \"activity_type\": \"developent\", \n             \"open\": true\n         }\n     ],\n     \"collections\": {\n         \"links\": [\n             {\n                 \"_id\": \"59e616503d693b3f6ccc7d99\",\n                 \"type\": 0,\n                 \"target\": \"59e616503d693b3f6ccc7d98\",\n                 \"source\": \"59e5cdabb789e31d6d66c860\", \n             }\n         ] \n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{ \n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/_apidoc.js",
    "groupTitle": "Gantt"
  },
  {
    "type": "put",
    "url": "/accounts/:accountId/projects/:projectId/link/:linkId",
    "title": "Update link",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/link/:linkId"
      }
    ],
    "version": "0.3.1",
    "name": "Update_link",
    "group": "Gantt",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "source",
            "description": "<p>Source task id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "target",
            "description": "<p>Target task id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>Type of link. Available options: 0 (finish to start (default)), 1 (start to start), 2 (finish to finish), 3 (start to finish).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": true  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Link not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Link not found\n{ \n     \"errors\": [\n         {\n              \"field\": \"link\",\n              \"message\": \"Link not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Gantt.js",
    "groupTitle": "Gantt"
  },
  {
    "type": "put",
    "url": "/accounts/:accountId/projects/:projectId/task/:taskId",
    "title": "Update task",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId/task/:taskId"
      }
    ],
    "version": "0.3.1",
    "name": "Update_task",
    "group": "Gantt",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_task",
            "description": "<p>Task type. Available options: action(default), action_window, window.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "start_date",
            "description": "<p>Date of start task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "progress",
            "description": "<p>Progres task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>Duration.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description task.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "assigned_to",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "activity_type",
            "description": "<p>Activity type.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "end_date",
            "description": "<p>Date of end task.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "action_window_duration",
            "description": "<p>expected duration for type action_window</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": true  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Project not found\n{ \n     \"errors\": [\n         {\n              \"field\": \"task\",\n              \"message\": \"Task not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Gantt.js",
    "groupTitle": "Gantt"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/mywork",
    "title": "My work",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/mywork"
      }
    ],
    "version": "0.3.1",
    "name": "My_work",
    "group": "MyWork",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "skipWeekends",
            "description": "<p>Skipps weekend dates. Available options: 0(default) - with weekends, 1 - without weekends</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"results\": [\n       {\n           \"date\": \"2017-12-13\",\n           \"tasks\": [\n               {\n                   \"_id\": \"5a3053cb8722e51fb8353b83\",\n                   \"project\": {\n                       \"_id\": \"5a2fe8b960c2a52c846c2795\",\n                       \"name\": \"Mac book\",\n                       \"client\": {\n                           \"_id\": \"5a2fdd14224b240e2046bab6\",\n                           \"name\": \"Apple\"\n                       },\n                       \"isPinned\": true\n                   },\n                   \"activity_type\": {\n                       \"_id\": \"5a2fdc4c224b240e2046bab1\",\n                       \"name\": \"Copywritting\"\n                   },\n                   \"description\": \"test\",\n                   \"type_task\": \"action\",\n                   \"color\": \"green\",\n                   \"real_progress\": 0,\n                   \"planned_end_date\": null,\n                   \"end_date\": 1513153800000,\n                   \"start_date\": 1513148400000\n               }\n           ]\n       }\n  ]\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/MyWork.js",
    "groupTitle": "MyWork"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/projects/:clientId",
    "title": "Add project",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:clientId"
      }
    ],
    "version": "0.3.1",
    "name": "Add_project",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Project name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "members",
            "description": "<p>Array of Members -&gt; [{&quot;_id&quot;: &quot;59c3a476302d2c327aa2702f&quot;}]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true,\n  \"projectId\": \"59d7847c4b5e3b434c373b3b\"      \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"name\",\n              \"message\": \"Name field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "delete",
    "url": "/accounts/:accountId/projects/:projectId",
    "title": "Delete project",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId"
      }
    ],
    "version": "0.3.1",
    "name": "Delete_project",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Account id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Project not found\n{\n     \"errors\": [\n         {\n              \"field\": \"project\",\n              \"message\": \"Project not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/projects/:clientId/list",
    "title": "Get client projects",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:clientId/list"
      }
    ],
    "version": "0.3.1",
    "name": "Get_client_projects",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "clientId",
            "description": "<p>Client id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>az(default), za</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "results",
            "description": "<p>Project assigned to client.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"projects\": [\n         {\n             \"_id\": \"59d5713cc6ae357b0de9d87b\",\n             \"name\": \"project\"\n         },\n         {\n             \"_id\": \"59d571e48546f87c049dc07d\",\n             \"name\": \"project3\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/projects",
    "title": "Get pinned projects",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/"
      }
    ],
    "version": "0.3.1",
    "name": "Get_pinned_projects",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "results",
            "description": "<p>Project pinned to user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"pinned_projects\": [\n         {\n             \"_id\": \"59d5713cc6ae357b0de9d872\",\n             \"name\": \"project1\",\n             \"client\":  { \n                 \"_id\": \"59d22e456007c20f6e6e7a2b\",\n                 \"name\": \"Cliencik\"\n              }\n         },\n         {\n             \"_id\": \"59d5713cc6ae357b0de9d87b\",\n             \"name\": \"project2\",\n             \"client\":  {\n                 \"_id\": \"59d22e456007c20f6e6e7a22\",\n                 \"name\": \"Cliencik2\"\n              }\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "post",
    "url": "/accounts/:accountId/projects/:projectId/pin",
    "title": "Pin project",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId"
      }
    ],
    "version": "0.3.1",
    "name": "Pin_project",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Account not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Account not found\n{\n     \"errors\": [\n         {\n              \"field\": \"account\",\n              \"message\": \"Account not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\" \n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/projects/:projectId/details",
    "title": "Project details",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/details/:projectId"
      }
    ],
    "version": "0.3.1",
    "name": "Project_Details",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>Project details response.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n {\n     \"project\": {\n         \"_id\": \"59d5713cc6ae357b0de9d87b\",\n         \"name\": \"project\",\n         \"client\": \n             {\n                 \"_id\": \"59d22e456007c20f6e6e7a2b\",\n                 \"name\": \"Cliencik\"\n             },\n         \"members\": [\n            {\n                 \"_id\": \"59c3a476302d2c327aa2702f\", \n                 \"first_name\": \"Dominik\", \n                 \"surname\": \"Dziuban\"\n             }\n         ],\n         \"progress\": \"0\",\n         \"status\": \"In progress\",\n         \"notes\": \"Test notes\"\n     },\n     \"comments\": [\n          {\n             \"_id\": \"5a016ad238b3f11af5fdbfa3\",\n             \"comment\": \"lorem impusa\",\n             \"author\": {\n                 \"_id\": \"59c3a476302d2c327aa2702f\",\n                 \"first_name\": \"Dominik\",\n                 \"surname\": \"Dziuban\"\n             },\n             \"sub_comments\": [\n                 {\n                     \"_id\": \"5a016af438b3f11af5fdbfa4\",\n                     \"comment\": \"lorem impusa sub\",\n                     \"author\": {\n                         \"_id\": \"59c3a476302d2c327aa2702f\",\n                         \"first_name\": \"Dominik\",\n                         \"surname\": \"Dziuban\"\n                     }\n                     \"created\": \"2017-11-07T08:09:39.936Z\"\n                 }\n             ],\n             \"created\": \"2017-11-07T08:09:39.936Z\" \n         }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/accounts/:accountId/projects/:projectId/details",
    "title": "Project details",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/details/:projectId"
      }
    ],
    "version": "0.3.1",
    "name": "Project_Details",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>Project details response.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n {\n     \"project\": {\n         \"_id\": \"59d5713cc6ae357b0de9d87b\",\n         \"name\": \"project\",\n         \"client\": \n             {\n                 \"_id\": \"59d22e456007c20f6e6e7a2b\",\n                 \"name\": \"Cliencik\"\n             },\n         \"members\": [\n            {\n                 \"_id\": \"59c3a476302d2c327aa2702f\", \n                 \"first_name\": \"Dominik\", \n                 \"surname\": \"Dziuban\"\n             }\n         ],\n         \"progress\": \"0\",\n         \"status\": \"In progress\",\n         \"notes\": \"Test notes\"\n     },\n     \"comments\": [\n          {\n             \"_id\": \"5a016ad238b3f11af5fdbfa3\",\n             \"comment\": \"lorem impusa\",\n             \"author\": {\n                 \"_id\": \"59c3a476302d2c327aa2702f\",\n                 \"first_name\": \"Dominik\",\n                 \"surname\": \"Dziuban\"\n             },\n             \"sub_comments\": [\n                 {\n                     \"_id\": \"5a016af438b3f11af5fdbfa4\",\n                     \"comment\": \"lorem impusa sub\",\n                     \"author\": {\n                         \"_id\": \"59c3a476302d2c327aa2702f\",\n                         \"first_name\": \"Dominik\",\n                         \"surname\": \"Dziuban\"\n                     }\n                     \"created\": \"2017-11-07T08:09:39.936Z\"\n                 }\n             ],\n             \"created\": \"2017-11-07T08:09:39.936Z\" \n         }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/MyWork.js",
    "groupTitle": "Project"
  },
  {
    "type": "put",
    "url": "/accounts/:accountId/projects/:projectId",
    "title": "Update project",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/accounts/:accountId/projects/:projectId"
      }
    ],
    "version": "0.3.1",
    "name": "Update_project",
    "group": "Project",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accountId",
            "description": "<p>Account id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>Project id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notes",
            "description": "<p>Notes project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "progress",
            "description": "<p>Progress project.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": true \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Project not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Project not found\n{ \n     \"errors\": [\n         {\n              \"field\": \"project\",\n              \"message\": \"Project not found.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Project.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/admin/users",
    "title": "All users",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/admin/users"
      }
    ],
    "version": "0.3.1",
    "name": "All_users",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Available options: first_name(default) - ascending by first name, surname - ascending by surname, email - ascending by email, login_time - descending by login time.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "results",
            "description": "<p>Users list.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"results\": [\n     {\n         \"_id\": \"59ba77cae925bf384ca1d100\",\n         \"email\": \"test.test@test.com\",\n         \"country\": \"United States\",\n         \"job_title\": \"Programmer\",\n         \"first_name\": \"Test\",\n         \"surname\": \"Test\",\n         \"membered_accounts\": [],\n         \"owned_accounts\": [\n             {\n                 \"_id\": \"59bf7b76ed930d2b94eb3a0b\",\n                 \"name\": \"test 2\",\n                 \"members_amount\": 1\n             }\n         ],\n         \"login_time\": \"2017-09-14T15:38:19.095Z\"\n     }\n  ],\n  \"pages\": 1,\n  \"total\": 2\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PeermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/password",
    "title": "Change password",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/user/password"
      }
    ],
    "version": "0.3.1",
    "name": "Change_password",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_password",
            "description": "<p>Old password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"password\",\n              \"message\": \"Password field is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/confirm-email",
    "title": "Confirm email",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/user/confirm-email"
      }
    ],
    "version": "0.3.1",
    "name": "Confirm_email",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Email confirm token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Token not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"email\",\n              \"message\": \"This email cannot be confirmed from this link.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Token not found\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Token not found\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/profile",
    "title": "Profile",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/user/profile"
      }
    ],
    "version": "0.3.1",
    "name": "Profile",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile response.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 201 OK\n   {\n    \"_id\": \"59a72a83a2050214841f5f77\",\n    \"email\": \"test@test.com\",\n    \"country\": \"Poland\",\n    \"job_title\": \"Programmer\",\n    \"first_name\": \"Test\",\n    \"surname\": \"Test\",\n    \"owned_accounts\": [\n        {\n            \"_id\": \"59ac8b6fcd83e006583773da\",\n            \"name\": \"Test account 3\",\n            \"members_amount\": 0\n        }\n    ],\n    \"membered_accounts\": [\n        {\n            \"account\": {\n                \"_id\": \"59bf7b76ed930d2b94eb3a0b\",\n                \"name\": \"test\"\n            },\n            \"permissions\": {\n                       \"admin\" : true,\n                       \"project_viewer\" : \"view\",\n                       \"data_segmenter\" : false,\n                       \"resource_manager\" : false,\n                       \"my_work\" : false \n               }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/email",
    "title": "Restore email",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/user/email"
      }
    ],
    "version": "0.3.1",
    "name": "Restore_email",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Email restore token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Token not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"email\",\n              \"message\": \"The email has already been taken.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Token not found\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Token not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/profile",
    "title": "Update profile",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/user/profile"
      }
    ],
    "version": "0.3.1",
    "name": "Update_profile",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_title",
            "description": "<p>Job title, max length: 50.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name. Only alpha characters, max length: 50.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>Surname. Only alpha characters, max length: 50.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAcceptable",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"email\",\n              \"message\": \"The email has already been taken.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/admin/users/:userId",
    "title": "Update user",
    "sampleRequest": [
      {
        "url": "http://35.167.196.64:8100/api/admin/users/:userId"
      }
    ],
    "version": "0.3.1",
    "name": "Update_user",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>User surname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job_title",
            "description": "<p>User job name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>User country</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\" : true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PeermissionDenied",
            "description": "<p>Permission denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ExpiredToken",
            "description": "<p>Access token expired.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission denied\n{\n     \"errors\": [\n         {\n              \"field\": \"permission\",\n              \"message\": \"Permission denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"User not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access denied.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Access token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access token expired.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/User.js",
    "groupTitle": "User"
  }
] });
