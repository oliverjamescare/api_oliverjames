define({ "api": [
  {
    "type": "get",
    "url": "/address/search/:id",
    "title": "Address details",
    "version": "0.0.1",
    "name": "Address_details",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Place id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"Id\": \"GB|RM|B|8836300\",\n        \"DomesticId\": \"8836300\",\n        \"Language\": \"ENG\",\n        \"LanguageAlternatives\": \"ENG\",\n        \"Department\": \"\",\n        \"Company\": \"\",\n        \"SubBuilding\": \"\",\n        \"BuildingNumber\": \"\",\n        \"BuildingName\": \"1 Railway Terrace\",\n        \"SecondaryStreet\": \"\",\n        \"Street\": \"\",\n        \"Block\": \"\",\n        \"Neighbourhood\": \"\",\n        \"District\": \"Tipton St. John\",\n        \"City\": \"Sidmouth\",\n        \"Line1\": \"1 Railway Terrace\",\n        \"Line2\": \"Tipton St. John\",\n        \"Line3\": \"\",\n        \"Line4\": \"\",\n        \"Line5\": \"\",\n        \"AdminAreaName\": \"Devon\",\n        \"AdminAreaCode\": \"\",\n        \"Province\": \"Devon\",\n        \"ProvinceName\": \"Devon\",\n        \"ProvinceCode\": \"\",\n        \"PostalCode\": \"EX10 0AA\",\n        \"CountryName\": \"United Kingdom\",\n        \"CountryIso2\": \"GB\",\n        \"CountryIso3\": \"GBR\",\n        \"CountryIsoNumber\": \"826\",\n        \"SortingNumber1\": \"87134\",\n        \"SortingNumber2\": \"\",\n        \"Barcode\": \"(EX100AA1D6)\",\n        \"POBoxNumber\": \"\",\n        \"Label\": \"1 Railway Terrace\\nTipton St. John\\nSIDMOUTH\\nEX10 0AA\\nUNITED KINGDOM\",\n        \"Type\": \"Residential\",\n        \"DataLevel\": \"Premise\",\n        \"Field1\": \"\",\n        \"Field2\": \"\",\n        \"Field3\": \"\",\n        \"Field4\": \"\",\n        \"Field5\": \"\",\n        \"Field6\": \"\",\n        \"Field7\": \"\",\n        \"Field8\": \"\",\n        \"Field9\": \"\",\n        \"Field10\": \"\",\n        \"Field11\": \"\",\n        \"Field12\": \"\",\n        \"Field13\": \"\",\n        \"Field14\": \"\",\n        \"Field15\": \"\",\n        \"Field16\": \"\",\n        \"Field17\": \"\",\n        \"Field18\": \"\",\n        \"Field19\": \"\",\n        \"Field20\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Address.js",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/address/search",
    "title": "Address search",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/address/search"
      }
    ],
    "version": "0.0.1",
    "name": "Address_search",
    "group": "Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "search",
            "description": "<p>Search string</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "container",
            "description": "<p>Container id to receive closer results</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"Id\": \"GB|RM|B|8836300\",\n        \"Type\": \"Address\",\n        \"Text\": \"1 Railway Terrace\",\n        \"Highlight\": \"\",\n        \"Description\": \"Tipton St. John, Sidmouth, EX10 0AA\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Address.js",
    "groupTitle": "Address"
  },
  {
    "type": "post",
    "url": "/care-home/waiting-list",
    "title": "Add care home to waiting list",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/care-home/waiting-list"
      }
    ],
    "version": "0.0.1",
    "name": "Add_care_home_to_waiting_list",
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
            "field": "name",
            "description": "<p>For care home registration - Care home owner name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postal_code",
            "description": "<p>Postal code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "company",
            "description": "<p>Company name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address_line_1",
            "description": "<p>First line of address string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address_line_2",
            "description": "<p>Second line of address string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City name.</p>"
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
    "filename": "docs/api/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/password/remind",
    "title": "Forgot password",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/password/remind"
      }
    ],
    "version": "0.0.1",
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
    "filename": "docs/api/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/password/remind/change",
    "title": "Forgot password change",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/password/remind/change"
      }
    ],
    "version": "0.0.1",
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
            "description": "<p>User not found.</p>"
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
          "content": "HTTP/1.1 404 User not found\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"User not found\"\n         }\n     ]\n }",
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
    "filename": "docs/api/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/login"
      }
    ],
    "version": "0.0.1",
    "name": "Login",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Email address. Required with password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>User password. Required with email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "refresh_token",
            "description": "<p>Token required to handle auth refresh. Required when email and password  is not sent.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n            \"_id\": \"5a5de32f5bb5952104a5d156\",\n            \"email\": \"test.test@test.com\",\n            \"status\": \"CREATED\",\n            \"access_token\": {\n                \"refresh_token\": \"a2Rdz6xpAi38CRzxorPuHZRqshL1pfgm5qvQAQm16jbGSAZgHpfVaY1DzOJyeRk22Nebv8fuIl4H8sT3y9EKjRpMb56oY6OeeYsBkle6oZfYo6oObEz7vNFWzq2OnUHF\",\n                \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTY3ODgyMTQsImRhdGEiOnsiX2lkIjoiNWE1ZGUzMmY1YmI1OTUyMTA0YTVkMTU2IiwiZW1haWwiOiJhZHJpYW4ubWFzbGVyekByZWFkeTRzLnBsIn0sImlhdCI6MTUxNjE4MzQxNH0.ny_lRr-1SO8LXyJWtGxS1DqZJaV-nbXoSYwbf5rCA2o\"\n            },\n            \"carer\": {\n                \"first_name\": \"Test\",\n                \"middle_name\": \"Test\",\n                \"surname\": \"Test\"\n            }\n        }\n}",
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
            "field": "AuthorizationFailed",
            "description": "<p>Authorization failed.</p>"
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
          "content": "HTTP/1.1 401 Authorization failed\n{\n     \"errors\": [\n         {\n              \"field\": \"auth\",\n              \"message\": \"Authorization failed\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Blocked account\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Blocked account\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/register"
      }
    ],
    "version": "0.0.1",
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
            "description": "<p>Min 8 characters, RegExp = /^(?=.<em>[A-Za-z])(?=.</em>[0-9])[A-Za-z0-9]{6,}$/.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number. Only numbers and min 6 characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "first_name",
            "description": "<p>For carer registration - Carer first name. Only alpha characters. Max 100 characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "surname",
            "description": "<p>For carer registration - Carer surname. Only alpha characters. Max 100 characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "middle_name",
            "description": "<p>For carer registration - Carer middle names (optional). Only alpha characters. Max 100 characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date_of_birth",
            "description": "<p>For carer registration - e.g. 1900-04-05. Correct Date format. Carer has to be adult.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>For carer registration - Available options: Male, Female, NULL(default).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "eligible_roles",
            "description": "<p>For carer registration - roles which carer is interested in as parsed into string array e.g. [&quot;Carer&quot;, &quot;Senior Carer&quot;]. Available values: Carer, Senior Carer.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "cv",
            "description": "<p>For carer registration - file with CV. Max 10MB. Available formats: pdf, doc, docx.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "criminal_record_value",
            "description": "<p>For carer registration - Q&amp;A value: Available values: 0 - Yes, 1 - No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "criminal_record_text",
            "description": "<p>For carer registration - Q&amp;A text. Fully optional. Explaination of Yes answer.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "physical_issues_value",
            "description": "<p>For carer registration - Q&amp;A value: Available values: 0 - Yes, 1 - No.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "engaging_in_moving_value",
            "description": "<p>For carer registration - Q&amp;A value: Available values: 0 - Yes, 1 - No.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "engaging_in_moving_text",
            "description": "<p>For carer registration - Q&amp;A text. Fully optional. Explaination of Yes answer.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "personal_care_for_resident_value",
            "description": "<p>For carer registration - Q&amp;A value: Available values: 0 - Cream them, lower body, upper body face, dress them, 1 - Face, upper body, lower body, creams, dress them, 2 - Face, lower body, upper body, dress them, creams, 3 - I'm not sure .</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "you_are_late_value",
            "description": "<p>For carer registration - Q&amp;A value: Available values: 0 - I͛d accept I͛m going to be late and focus on getting there ASAP to minimise delay , 1 - I'd take 2 minutes to call the client and let them know I͛m running late, 2 - 15 minutes is too long. I'd call them and advise them to find someone else to cover the shift , 3 - I'm not sure .</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "find_fallen_resident_value",
            "description": "<p>For carer registration - Q&amp;A value: Available values: 0 - Help the resident get up. Maintain their dignity. Then ring the emergency bell, 1 - Ring the emergency bell. Comfort the resident but not move them. Wait for other carers, 2 - Check for injuries. If they say they are fine, help them up by myself. Make a note to tell care team when I see them.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "serve_lunch_meals_value",
            "description": "<p>For carer registration - Q&amp;A value: Available values: 0 - This isn't right – can someone please stay with me this time, 1 - Where can I find the care plans – I will check each one to be safe and sure, 2 - Who are the residents with swallowing or choking risks. Should I be aware of any other issues before I serve – like diabetic meals?</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "care_service_name",
            "description": "<p>For care home registration - Care home name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>For care home registration - Care home owner name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type_of_home",
            "description": "<p>For care home registration - Type of home. Available types: Residential, Nursing, Learning disabilit, Supported living</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postal_code",
            "description": "<p>Postal code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "company",
            "description": "<p>Company name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address_line_1",
            "description": "<p>First line of address string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address_line_2",
            "description": "<p>Second line of address string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City.</p>"
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
    "filename": "docs/api/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/care-home/carers/:id/block",
    "title": "Add carer to blocked",
    "version": "0.0.1",
    "name": "Add_carer_to_blocked",
    "group": "Care_Home",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Carer id.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": true\n }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/CareHome.js",
    "groupTitle": "Care_Home"
  },
  {
    "type": "get",
    "url": "/care-home/calendar",
    "title": "Care home jobs calendar",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/care-home/calendar"
      }
    ],
    "version": "0.0.1",
    "name": "Care_home_jobs_calendar",
    "group": "Care_Home",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "optional": true,
            "field": "timezone",
            "description": "<p>User timezone</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n   {\n       \"calendar\": [\n           {\n               \"day\": \"2018-02-12\",\n               \"jobs\": [\n                   {\n                       \"_id\": \"5a814b8deb5cee1dc0720128\",\n                       \"start_date\": 1518422931942,\n                       \"end_date\": 1518425101942,\n                       \"role\": \"Senior Carer\",\n                       \"status\": \"POSTED\",\n                       \"author\": {\n                           \"_id\": \"5a71b2834f1f26305c6abf2a\",\n                           \"care_home\": {\n                               \"care_service_name\": \"Test care home\",\n                               \"type_of_home\": \"Nursing\",\n                               \"name\": \"Test Test\"\n                           },\n                           \"email\": \"test.test@test.com\",\n                           \"phone_number\": \"123456788777\",\n                           \"address\": {\n                               \"postal_code\": \"Ex8 2el\",\n                               \"city\": \"Exmouth\",\n                               \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                               \"location\": {\n                                   \"coordinates\": [\n                                       50.7583820,\n                                       19.005533\n                                   ],\n                                   \"type\": \"Point\"\n                               },\n                               \"address_line_2\": null,\n                               \"company\": null,\n                               \"link\": \"https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533\"\n                           }\n                       }\n                   }\n               ]\n           },\n           {\n               \"day\": \"2018-02-13\",\n               \"jobs\": []\n           }\n       ]\n   }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/CareHome.js",
    "groupTitle": "Care_Home"
  },
  {
    "type": "get",
    "url": "/care-home/my-jobs",
    "title": "Care home my jobs",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/care-home/my-jobs"
      }
    ],
    "version": "0.0.1",
    "name": "Care_home_my_jobs",
    "group": "Care_Home",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "results",
            "description": "<p>Results per page. Default 10.</p>"
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
            "field": "results",
            "description": "<p>Pagination results.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"results\": [\n         {\n             \"_id\": \"5a814b8deb5cee1dc0720128\",\n             \"start_date\": 1518422931942,\n             \"end_date\": 1518425101942,\n             \"status\": \"POSTED\",\n             \"carer\": {\n                 \"_id\": \"5a6b1413599b6f3c8c7eaa8b\",\n                 \"carer\": {\n                     \"surname\": \"Test\",\n                     \"first_name\": \"Test\",\n                     \"care_experience\": {\n                         \"months\": 2,\n                         \"years\": 1\n                     },\n                     \"reviews\": {\n                         \"average\": 5,\n                         \"count\": 1\n                     }\n                 },\n             }\n         }\n      ],\n      \"pages\": 1,\n      \"total\": 3\n\n }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/CareHome.js",
    "groupTitle": "Care_Home"
  },
  {
    "type": "get",
    "url": "/care-home/past-jobs/:id",
    "title": "Care home past job details",
    "version": "0.0.1",
    "name": "Care_home_past_job_details",
    "group": "Care_Home",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id.</p>"
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
            "field": "results",
            "description": "<p>Pagination results.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n    \"_id\": \"5ab5012f16427217b04ed694\",\n    \"start_date\": 1524787200000,\n    \"end_date\": 1524787300000,\n    \"role\": \"Carer\",\n    \"status\": \"ACCEPTED\",\n    \"general_guidance\": {\n        \"floor_plan\": \"http://localhost:8000/uploads/users/5a9419d8e33cb930aa7c3856/151972481016501b2ceacf735ed2f39aaf31f7a145e7f.png\",\n        \"parking\": \"test\",\n        \"notes_for_carers\": \"s\",\n        \"emergency_guidance\": \"sd\",\n        \"report_contact\": \"asd\",\n        \"superior_contact\": \"asd\"\n    },\n    \"notes\": null,\n    \"gender_preference\": \"No preference\",\n    \"author\": {\n        \"_id\": \"5a9419d8e33cb930aa7c3856\",\n        \"care_home\": {\n            \"care_service_name\": \"Test\",\n            \"type_of_home\": \"Residential\",\n            \"name\": \"Test\"\n        },\n        \"email\": \"test@test.com\",\n        \"phone_number\": \"3545232323\",\n         \"address\": {\n                \"postal_code\": \"Ex8 2el\",\n                \"city\": \"Exmouth\",\n                \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                \"location\": {\n                    \"coordinates\": [\n                        50.7583820,\n                        19.005533\n                    ],\n                    \"type\": \"Point\"\n                },\n                \"address_line_2\": null,\n                \"company\": null,\n                \"link\": \"https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533\"\n        }\n    },\n    \"carer\": {\n        \"_id\": \"5a9418e7e33cb930aa7c384f\",\n        \"carer\": {\n            \"first_name\": \"Test\",\n            \"surname\": \"Test\",\n            \"profile_image\": null\n        },\n        \"acceptance_document\": \"http://localhost:8000/uploads/jobs/5ab5012f16427217b04ed694/job-acceptance-FpXb97QSwxYbvkug.pdf\"\n    }\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/CareHome.js",
    "groupTitle": "Care_Home"
  },
  {
    "type": "get",
    "url": "/care-home/past-jobs",
    "title": "Care home past jobs",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/care-home/past-jobs"
      }
    ],
    "version": "0.0.1",
    "name": "Care_home_past_jobs",
    "group": "Care_Home",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "results",
            "description": "<p>Results per page. Default 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "from",
            "description": "<p>Date from</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "to",
            "description": "<p>Date to</p>"
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
            "field": "results",
            "description": "<p>Pagination results.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"results\": [\n         {\n             \"_id\": \"5a814b8deb5cee1dc0720128\",\n             \"start_date\": 1518422931942,\n             \"end_date\": 1518425101942,\n             \"status\": \"PAID\",\n             \"cost\": {\n                 \"total_cost\": 103.5\n             },\n             \"carer\": {\n                 \"_id\": \"5a6b1413599b6f3c8c7eaa8b\",\n                 \"carer\": {\n                     \"surname\": \"Test\",\n                     \"first_name\": \"Test\"\n                 },\n             }\n         }\n      ],\n      \"pages\": 1,\n      \"total\": 3\n\n }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/CareHome.js",
    "groupTitle": "Care_Home"
  },
  {
    "type": "get",
    "url": "/care-home/pending-reviews",
    "title": "Care home pending reviews",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/care-home/pending-reviews"
      }
    ],
    "version": "0.0.1",
    "name": "Care_home_pending_reviews",
    "group": "Care_Home",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "results",
            "description": "<p>Results per page. Default 10.</p>"
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
            "field": "results",
            "description": "<p>Pagination results.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n   {\n        \"results\": [\n            {\n                \"_id\": \"5ab5012f16427217b04ed694\",\n                \"start_date\": 1523404800000,\n                \"end_date\": 1523404900000,\n                \"created\": 1521811725872,\n                \"status\": \"PENDING_PAYMENT\",\n                \"carer\": {\n                    \"_id\": \"5a9418e7e33cb930aa7c384f\",\n                    \"carer\": {\n                        \"first_name\": \"Test\",\n                        \"surname\": \"Test\",\n                        \"profile_image\": null,\n                        \"care_experience\": {\n                            \"months\": 1,\n                            \"years\": 3\n                        },\n                        \"reviews\": {\n                            \"average\": 5,\n                            \"count\": 1\n                        }\n                    }\n                }\n            }\n         ],\n         \"pages\": 1,\n         \"total\": 3\n   }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/CareHome.js",
    "groupTitle": "Care_Home"
  },
  {
    "type": "get",
    "url": "/care-home/jobs",
    "title": "Care home total jobs",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/care-home/jobs"
      }
    ],
    "version": "0.0.1",
    "name": "Care_home_total_jobs",
    "group": "Care_Home",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "field": "results",
            "description": "<p>Pagination results.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"jobs\": 20\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/CareHome.js",
    "groupTitle": "Care_Home"
  },
  {
    "type": "get",
    "url": "/care-home/carers/search",
    "title": "Carers search",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/care-home/carers/search"
      }
    ],
    "version": "0.0.1",
    "name": "Carers_search",
    "group": "Care_Home",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "optional": true,
            "field": "search",
            "description": "<p>Search string</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"carers\": [\n       {\n           \"_id\": \"5a6b1413599b6f3c8c7eaa8b\",\n           \"carer\": {\n               \"surname\": \"Test\",\n               \"first_name\": \"Test\"\n           }\n       }\n   ]\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/CareHome.js",
    "groupTitle": "Care_Home"
  },
  {
    "type": "delete",
    "url": "/care-home/carers/:id/block",
    "title": "Remove carer from blocked",
    "version": "0.0.1",
    "name": "Remove_carer_from_blocked",
    "group": "Care_Home",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Carer id.</p>"
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
            "field": "AccessDenied",
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/CareHome.js",
    "groupTitle": "Care_Home"
  },
  {
    "type": "get",
    "url": "/carer/availability",
    "title": "Carer availability calendar",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/availability"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_availability_calendar",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "week",
            "description": "<p>Week number. Default is 0 - general availablility. 1 means current week. Maximum 5 weeks forward.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n     \"type\": \"general\",\n     \"availability\": {\n         \"monday\": {\n             \"am_shift\": true,\n\t            \"pm_shift\": false,\n\t            \"night_shift\": false\n         },\n\t        \"tuesday\": {\n\t            \"am_shift\": false,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"wednesday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"thursday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"friday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"saturday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"sunday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        }\n      }\n   }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "put",
    "url": "/carer/availability",
    "title": "Carer availability calendar update",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/availability"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_availability_calendar_update",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "week",
            "description": "<p>Week number. Default is 0 - general availablility. 1 means current week. Maximum 5 weeks forward.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n     \"type\": \"general\",\n     \"availability\": {\n         \"monday\": {\n             \"am_shift\": true,\n\t            \"pm_shift\": false,\n\t            \"night_shift\": false\n         },\n\t        \"tuesday\": {\n\t            \"am_shift\": false,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"wednesday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"thursday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"friday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"saturday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        },\n\t        \"sunday\": {\n\t            \"am_shift\": true,\n\t            \"pm_shift\": true,\n\t            \"night_shift\": true\n\t        }\n      }\n   }",
          "type": "json"
        }
      ]
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
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "get",
    "url": "/carer/jobs",
    "title": "Carer available jobs",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/jobs"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_available_jobs",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "results",
            "description": "<p>Results per page. Default 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "dont_meet_criteria",
            "description": "<p>Filter which disables availability checking. Available options 1 - enabled, 0(default) - disabled.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "distance",
            "description": "<p>Filter by distance.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort",
            "description": "<p>Sort parameter. Available options: roleASC - by role ascending, roleDESC - by role descending, startDESC - by start date descending, startASC(default) - by start date ascending, endDESC - by end date descending, endASC - by end date ascending, incomeDESC - by projected income descending, incomeASC - by projected income ascending</p>"
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
            "field": "results",
            "description": "<p>Pagination results.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"results\": [\n        {\n           \"_id\": \"5a814b8deb5cee1dc0720128\",\n           \"start_date\": 1518422931942,\n           \"end_date\": 1518425101942,\n           \"projected_income\": 75,\n           \"author\": {\n               \"_id\": \"5a71b2834f1f26305c6abf2a\",\n               \"care_home\": {\n                   \"care_service_name\": \"Test care home\",\n                   \"type_of_home\": \"Nursing\",\n                   \"name\": \"Test Test\",\n               },\n               \"email\": \"test.test@test.com\",\n               \"phone_number\": \"123456788777\",\n               \"address\": {\n                   \"postal_code\": \"Ex8 2el\",\n                   \"city\": \"Exmouth\",\n                   \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                   \"location\": {\n                       \"coordinates\": [\n                           50.7583820,\n                           19.005533\n                       ],\n                       \"type\": \"Point\"\n                   },\n                   \"address_line_2\": null,\n                   \"company\": null,\n                   \"link\": \"https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533\"\n               },\n               \"distance\": 4.25\n           },\n           \"role\": \"Senior Carer\",\n           \"conflict\": false,\n           \"status\": \"POSTED\",\n           \"general_guidance\": {\n               \"floor_plan\": \"http://localhost:8000/uploads/users/151808246323012.floor_plan.docx\",\n               \"parking\": \"test\",\n               \"notes_for_carers\": \"test\",\n               \"emergency_guidance\": \"test\",\n               \"report_contact\": \"test\",\n               \"superior_contact\": \"test\"\n           },\n           \"notes\": null\n       }\n    ],\n    \"pages\": 1,\n    \"total\": 3\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "get",
    "url": "/carer/home",
    "title": "Carer home screen",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/home"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_home_screen",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n       \"reviews\": {\n          \"count\": 1,\n          \"average\": 5\n      },\n      \"nextJobStartDate\": 1521136000000,\n      \"jobs24\": 0,\n      \"newJobs\": 1\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "get",
    "url": "/carer/calendar",
    "title": "Carer jobs calendar",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/calendar"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_jobs_calendar",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "optional": true,
            "field": "timezone",
            "description": "<p>User timezone</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n   {\n       \"calendar\": [\n           {\n               \"day\": \"2018-02-12\",\n               \"jobs\": [\n                   {\n                       \"_id\": \"5a814b8deb5cee1dc0720128\",\n                       \"start_date\": 1518422931942,\n                       \"end_date\": 1518425101942,\n                       \"role\": \"Senior Carer\",\n                       \"projected_income\": 75,\n                       \"author\": {\n                           \"_id\": \"5a71b2834f1f26305c6abf2a\",\n                           \"care_home\": {\n                               \"care_service_name\": \"Test care home\",\n                               \"type_of_home\": \"Nursing\",\n                               \"name\": \"Test Test\"\n                           },\n                           \"email\": \"test.test@test.com\",\n                           \"phone_number\": \"123456788777\",\n                           \"address\": {\n                               \"postal_code\": \"Ex8 2el\",\n                               \"city\": \"Exmouth\",\n                               \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                               \"location\": {\n                                   \"coordinates\": [\n                                       50.7583820,\n                                       19.005533\n                                   ],\n                                   \"type\": \"Point\"\n                               },\n                               \"address_line_2\": null,\n                               \"company\": null\n                           }\n                       },\n                       \"status\": \"POSTED\",\n                       \"general_guidance\": {\n                           \"floor_plan\": \"http://localhost:8000/uploads/users/151808246323012.floor_plan.docx\",\n                           \"parking\": \"test\",\n                           \"notes_for_carers\": \"test\",\n                           \"emergency_guidance\": \"test\",\n                           \"report_contact\": \"test\",\n                           \"superior_contact\": \"test\"\n                       },\n                       \"notes\": null\n                   }\n               ]\n           },\n           {\n               \"day\": \"2018-02-13\",\n               \"jobs\": []\n           }\n       ]\n   }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "get",
    "url": "/carer/calendar/monthly",
    "title": "Carer jobs calendar monthly",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/calendar/monthly"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_jobs_calendar_monthly",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "optional": true,
            "field": "timezone",
            "description": "<p>User timezone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "start_date",
            "description": "<p>Formatted to string start day e.g. 2018-03-01</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "end_date",
            "description": "<p>Formatted to string end day e.g. 2018-03-31</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"calendar\": [\n        {\n            \"day\": \"2018-02-12\",\n            \"jobs\": [\n                {\n                    \"_id\": \"5a814b8deb5cee1dc0720128\",\n                    \"start_date\": 1518422931942,\n                    \"end_date\": 1518425101942,\n                    \"role\": \"Senior Carer\",\n                    \"projected_income\": 75,\n                    \"author\": {\n                        \"_id\": \"5a71b2834f1f26305c6abf2a\",\n                        \"care_home\": {\n                            \"care_service_name\": \"Test care home\",\n                            \"type_of_home\": \"Nursing\",\n                            \"name\": \"Test Test\"\n                        },\n                        \"email\": \"test.test@test.com\",\n                        \"phone_number\": \"123456788777\",\n                        \"address\": {\n                            \"postal_code\": \"Ex8 2el\",\n                            \"city\": \"Exmouth\",\n                            \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                            \"location\": {\n                                \"coordinates\": [\n                                    50.7583820,\n                                    19.005533\n                                ],\n                                \"type\": \"Point\"\n                            },\n                            \"address_line_2\": null,\n                            \"company\": null\n                        }\n                    },\n                    \"status\": \"POSTED\",\n                    \"general_guidance\": {\n                       \"floor_plan\": \"http://localhost:8000/uploads/users/151808246323012.floor_plan.docx\",\n                       \"parking\": \"test\",\n                       \"notes_for_carers\": \"test\",\n                       \"emergency_guidance\": \"test\",\n                       \"report_contact\": \"test\",\n                       \"superior_contact\": \"test\"\n                    },\n                    \"notes\": null\n                }\n            ]\n        },\n        {\n            \"day\": \"2018-02-13\",\n            \"jobs\": []\n        }\n    ]\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "get",
    "url": "/carer/my-jobs",
    "title": "Carer my jobs",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/my-jobs"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_my_jobs",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "results",
            "description": "<p>Results per page. Default 10.</p>"
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
            "field": "results",
            "description": "<p>Pagination results.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"results\": [\n        {\n           \"_id\": \"5a814b8deb5cee1dc0720128\",\n           \"start_date\": 1518422931942,\n           \"end_date\": 1518425101942,\n           \"projected_income\": 75,\n           \"author\": {\n               \"_id\": \"5a71b2834f1f26305c6abf2a\",\n               \"care_home\": {\n                   \"care_service_name\": \"Test care home\",\n                   \"type_of_home\": \"Nursing\",\n                   \"name\": \"Test Test\",\n               },\n               \"email\": \"test.test@test.com\",\n               \"phone_number\": \"123456788777\",\n               \"address\": {\n                   \"postal_code\": \"Ex8 2el\",\n                   \"city\": \"Exmouth\",\n                   \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                   \"location\": {\n                       \"coordinates\": [\n                           50.7583820,\n                           19.005533\n                       ],\n                       \"type\": \"Point\"\n                   },\n                   \"address_line_2\": null,\n                   \"company\": null,\n                   \"link\": \"https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533\"\n               }\n           },\n           \"role\": \"Senior Carer\",\n           \"status\": \"POSTED\",\n           \"general_guidance\": {\n               \"floor_plan\": \"http://localhost:8000/uploads/users/151808246323012.floor_plan.docx\",\n               \"parking\": \"test\",\n               \"notes_for_carers\": \"test\",\n               \"emergency_guidance\": \"test\",\n               \"report_contact\": \"test\",\n               \"superior_contact\": \"test\"\n           },\n           \"notes\": null\n       }\n    ],\n    \"pages\": 1,\n    \"total\": 3\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "get",
    "url": "/carer/notifications/list",
    "title": "Carer notifications",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/home"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_notifications",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "results",
            "description": "<p>Results per page. Default 10.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n         \"results\": [\n             {\n                 \"_id\": \"5ab27206d27d0508a444b220\",\n                 \"title\": \"Modified job!\",\n                 \"description\": \"A job you accepted has been modified by the client\",\n                 \"job\": \"5a95290a1e28cd1d88ea64cd\",\n                 \"created\": 1521643104447,\n                 \"status\": \"READ\"\n             },\n         ],\n         \"pages\": 3,\n         \"total\": 21\n      }\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "get",
    "url": "/carer/notifications",
    "title": "Carer notifications settings",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/notifications"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_notifications_settings",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n      \"from\": 20,\n      \"to\": 1440,\n      \"days\": {\n          \"monday\": false,\n          \"tuesday\": false,\n          \"wednesday\": true,\n          \"thursday\": false,\n          \"friday\": false,\n          \"saturday\": false,\n          \"sunday\": true\n      }\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "put",
    "url": "/carer/notifications",
    "title": "Carer notifications settings update",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/notifications"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_notifications_settings_update",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n      \"from\": 20,\n      \"to\": 1440,\n      \"days\": {\n          \"monday\": false,\n          \"tuesday\": false,\n          \"wednesday\": true,\n          \"thursday\": false,\n          \"friday\": false,\n          \"saturday\": false,\n          \"sunday\": true\n      }\n}",
          "type": "json"
        }
      ]
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
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongParameters",
            "description": "<p>Wrong Parameters.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong Parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"carer.silent_notifications_settings.to\",\n              \"message\": \"Silent notifications settings to cannot be greater than 1440.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "get",
    "url": "/carer/submitted-jobs",
    "title": "Carer submitted jobs",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carer/submitted-jobs"
      }
    ],
    "version": "0.0.1",
    "name": "Carer_submitted_jobs",
    "group": "Carer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "results",
            "description": "<p>Results per page. Default 10.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "from",
            "description": "<p>Date from</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "to",
            "description": "<p>Date to</p>"
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
            "field": "results",
            "description": "<p>Pagination results.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n     \"results\": [\n         {\n               \"_id\": \"5a95290a1e28cd1d88ea64cd\",\n               \"start_date\": 1521136000000,\n               \"end_date\": 1521137000000,\n               \"status\": \"PAID\",\n               \"author\": {\n                   \"_id\": \"5a9419d8e33cb930aa7c3856\",\n                   \"care_home\": {\n                       \"care_service_name\": \"Test\",\n                       \"type_of_home\": \"Residential\",\n                       \"name\": \"Test\"\n                   },\n                   \"email\": \"test@test.com\",\n                   \"phone_number\": \"3545232323\",\n                   \"address\": {\n                       \"postal_code\": \"Ex8 2el\",\n                       \"city\": \"Exmouth\",\n                       \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                       \"location\": {\n                           \"coordinates\": [\n                               50.7583820,\n                               19.005533\n                           ],\n                           \"type\": \"Point\"\n                       },\n                       \"address_line_2\": null,\n                       \"company\": null,\n                       \"link\": \"https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533\"\n                   },\n               },\n               \"summary_sheet\": {\n                   \"voluntary_deduction\": 30,\n                   \"end_date\": 1525019410000,\n                   \"start_date\": 1525001400000\n               },\n               \"projected_income\": 46.58,\n               \"payment\": {\n                   \"transaction_charge\": 2.91,\n                   \"application_fee\": 5.17,\n                   \"deductions\": 9.32,\n                   \"job_income\": 46.58,\n                   \"net_income\": 34.35,\n                   \"status\": \"PAID\",\n                   \"payment_date\": 1523440106661,\n                   \"debit_date\": 1522879200000\n               }\n           },\n      ],\n      \"pages\": 1,\n      \"total\": 3\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "get",
    "url": "/carers/nearby",
    "title": "Checks carers near point",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/carers/nearby"
      }
    ],
    "version": "0.0.1",
    "name": "Checks_carers_near_point",
    "group": "Carer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "postal_code",
            "description": "<p>Postal code.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "company",
            "description": "<p>Company name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address_line_1",
            "description": "<p>First line of address string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address_line_2",
            "description": "<p>Second line of address string.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City.</p>"
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
            "field": "exists",
            "description": "<p>Existance status.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"exists\" : true,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "post",
    "url": "/contact",
    "title": "Send contact message",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/contact"
      }
    ],
    "version": "0.0.1",
    "name": "Send_contact_email",
    "group": "Contact",
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
            "field": "name",
            "description": "<p>Sender name. Max 50 characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Message subject. Max 100 characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message content. Max 200 characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "_id",
            "description": "<p>User id.</p>"
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
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"email\",\n              \"message\": \"The email is required.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Contact.js",
    "groupTitle": "Contact"
  },
  {
    "type": "put",
    "url": "/jobs/:id/accept",
    "title": "Accept job",
    "version": "0.0.1",
    "name": "Accept_job",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id</p>"
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
          "content": "HTTP/1.1 200 OK\n     {\n        \"status\": true\n    }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>Job already accepted.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Job already accepted\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job already accepted\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "put",
    "url": "/jobs/:id/accept",
    "title": "Accept job",
    "version": "0.0.1",
    "name": "Accept_job",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id</p>"
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
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>Job already accepted.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Job already accepted\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job already accepted\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/jobs",
    "title": "Add jobs",
    "version": "0.0.1",
    "name": "Add_jobs",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "field": "jobs",
            "description": "<p>Parsed to string job objects e.g [{ &quot;start_date&quot;: 1518436800000, &quot;end_date&quot;: 1518436900000, &quot;amount&quot; : 1, &quot;role&quot;: &quot;Carer&quot; },{ &quot;start_date&quot;: 1518436800000, &quot;end_date&quot;: 1518436900000, &quot;role&quot;: &quot;Senior Carer&quot;}]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender_preference",
            "description": "<p>Gender preference. Available options: Male, Female, No preference(default)</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "floor_plan",
            "description": "<p>Floor plan file. Required if not already exists. Allowed mime types: application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, image/png, image/jpg, image/jpeg</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "parking",
            "description": "<p>Description about parking. Required if not already exists.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "notes_for_carers",
            "description": "<p>Notes for carers. Required if not already exists.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "emergency_guidance",
            "description": "<p>Emergency guidance. Required if not already exists.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "report_contact",
            "description": "<p>Report contact info. Required if not already exists.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "superior_contact",
            "description": "<p>Superior contact info. Required if not already exists.</p>"
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
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>Group id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n   {\n      \"status\": true,\n      \"group\": \"5a814b8deb5cee1dc0720128\"\n   }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongParameters",
            "description": "<p>Wrong Parameters.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong Parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"start_date\",\n              \"message\": \"Start date is required\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/jobs/:id/summary",
    "title": "Add summary sheet",
    "version": "0.0.1",
    "name": "Add_summary_sheet",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "signature",
            "description": "<p>Signature image. Available file extensions: jpg, jpeg, png. Max file size 10MB.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Principals's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": "<p>Principals's position.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "voluntary_deduction",
            "description": "<p>Number of deducted minutes. Min 0.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "start_date",
            "description": "<p>Start date of job if it was different than original. Cannot be earlier than original start date. Timestamp formatted to UTC timezone.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "end_date",
            "description": "<p>End date of job if it was different than original. Timestamp formatted to UTC timezone.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true,\n    \"debit_date\": 134555939455638,\n    \"projected_income\": 0.17,\n    \"minutes\": 68\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongParameters",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>You're not assigned to this job.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"name\",\n              \"message\": \"Name is required.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 You're not assigned to this job\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"You're not assigned to this job\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "put",
    "url": "/jobs/:group/notifications/carers/:id",
    "title": "Cancel carer notification",
    "version": "0.0.1",
    "name": "Cancel_carer_notification",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "field": "group",
            "description": "<p>Group id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Carer id</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Group not found.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Group not found\n{\n     \"errors\": [\n         {\n              \"field\": \"group\",\n              \"message\": \"Group not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "put",
    "url": "/jobs/:id/cancel",
    "title": "Cancel job",
    "version": "0.0.1",
    "name": "Cancel_job",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>Summary sheet already sent.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Summary sheet already sent\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Summary sheet already sent\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/jobs/:id/other-jobs",
    "title": "Care home other jobs",
    "version": "0.0.1",
    "name": "Care_home_other_jobs",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id.</p>"
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
          "content": "HTTP/1.1 200 OK\n   {\n       \"results\": [\n           {\n              \"_id\": \"5a814b8deb5cee1dc0720128\",\n              \"start_date\": 1518422931942,\n              \"end_date\": 1518425101942,\n              \"projected_income\": 75,\n              \"author\": {\n                  \"_id\": \"5a71b2834f1f26305c6abf2a\",\n                  \"care_home\": {\n                      \"care_service_name\": \"Test care home\",\n                      \"type_of_home\": \"Nursing\",\n                      \"name\": \"Test Test\",\n                  },\n                  \"email\": \"test.test@test.com\",\n                  \"phone_number\": \"123456788777\",\n                  \"address\": {\n                      \"postal_code\": \"Ex8 2el\",\n                      \"city\": \"Exmouth\",\n                      \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                      \"location\": {\n                          \"coordinates\": [\n                              50.7583820,\n                              19.005533\n                          ],\n                          \"type\": \"Point\"\n                      },\n                      \"address_line_2\": null,\n                      \"company\": null,\n                      \"link\": \"https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533\"\n                  },\n                  \"distance\": 4.25\n              },\n              \"role\": \"Senior Carer\",\n              \"conflict\": false\n          }\n       ],\n       \"pages\": 1,\n       \"total\": 3\n   }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/jobs/:id/challenge",
    "title": "Challenge job payment",
    "version": "0.0.1",
    "name": "Challenge_job_payment",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Challenge detailed description. Max 1000 characters.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>This job cannot be challenged</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 This job cannot be challenged\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"This job cannot be challenged\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/jobs/carers",
    "title": "Check carers to contact with",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/jobs/carers"
      }
    ],
    "version": "0.0.1",
    "name": "Check_carers_to_contact_with",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "field": "jobs",
            "description": "<p>Parsed to string job objects e.g [{ &quot;_id&quot;: &quot;5a814b8deb5cee1dc0720128&quot;, &quot;start_date&quot;: 1518436800000, &quot;end_date&quot;: 1518436900000, &quot;amount&quot; : 1, &quot;role&quot;: &quot;Carer&quot;, &quot;priority_carers&quot;: [ &quot;5a814b8deb5cee1dc0720128&quot; ] }]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>Gender preference. Available options: Male, Female, No preference(default)</p>"
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
          "content": " HTTP/1.1 200 OK\n{\n    \"jobs\": [\n       {\n           \"_id\": \"5a814b8deb5cee1dc0720128\",\n           \"start_date\": 1521126000000,\n           \"end_date\": 1521127000000,\n           \"amount\": 10,\n           \"role\": \"Carer\",\n           \"notes\": \"\",\n           \"priority_carers\": [\n               \"5a814b8deb5cee1dc0720128\"\n           ],\n           \"gender_preference\": \"No preference\"\n           \"carersToContact\": 10\n       }\n   ]\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "put",
    "url": "/jobs/:id/decline",
    "title": "Decline job",
    "version": "0.0.1",
    "name": "Decline_job",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id</p>"
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
          "content": "HTTP/1.1 200 OK\n   {\n      \"status\": true\n   }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>You can't decline previously accepted job.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 You can't decline previously accepted job\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"You can't decline previously accepted job\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "put",
    "url": "/jobs/:id",
    "title": "Edit job",
    "version": "0.0.1",
    "name": "Edit_job",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "start_date",
            "description": "<p>Start date of job.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "end_date",
            "description": "<p>End date of job.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "role",
            "description": "<p>Required role of carer. Available options: Carer, Senior Carer.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "floor_plan",
            "description": "<p>Floor plan file. Required if not already exists. Allowed mime types: application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, image/png, image/jpg, image/jpeg</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "parking",
            "description": "<p>Description about parking.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "notes_for_carers",
            "description": "<p>Notes for carers.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "emergency_guidance",
            "description": "<p>Emergency guidance.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "report_contact",
            "description": "<p>Report contact info.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "superior_contact",
            "description": "<p>Superior contact info.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "notes",
            "description": "<p>Additional notes.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender_preference",
            "description": "<p>Gender preference. Available options: No preference, Male, Female.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongParameters",
            "description": "<p>Wrong Parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>Accepted job.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Wrong Parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"start_date\",\n              \"message\": \"Start date is required\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Accepted job\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"You can't edit already accepted job\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/jobs/:id/income",
    "title": "Get deducted income",
    "version": "0.0.1",
    "name": "Get_deducted_income",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "voluntary_deduction",
            "description": "<p>Number of deducted minutes. Min 0.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "start_date",
            "description": "<p>Start date of job if it was different than original. Cannot be earlier than original start date. Timestamp formatted to UTC timezone.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "end_date",
            "description": "<p>End date of job if it was different than original. Timestamp formatted to UTC timezone.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"projected_income\": 100,\n    \"deducted\": 50\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/jobs/:id",
    "title": "Job details",
    "version": "0.0.1",
    "name": "Job_details",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id</p>"
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
            "field": "job",
            "description": "<p>Job object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"_id\": \"5a814b8deb5cee1dc0720128\",\n        \"start_date\": 1518422931942,\n        \"end_date\": 1518425101942,\n        \"projected_income\": 75,\n        \"author\": {\n            \"_id\": \"5a71b2834f1f26305c6abf2a\",\n            \"care_home\": {\n                \"care_service_name\": \"Test care home\",\n                \"type_of_home\": \"Nursing\",\n                \"name\": \"Test Test\"\n            },\n            \"email\": \"test.test@test.com\",\n            \"phone_number\": \"123456788777\",\n            \"address\": {\n                    \"postal_code\": \"Ex8 2el\",\n                    \"city\": \"Exmouth\",\n                    \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                    \"location\": {\n                        \"coordinates\": [\n                            50.7583820,\n                            19.005533\n                        ],\n                        \"type\": \"Point\"\n                    },\n                    \"address_line_2\": null,\n                    \"company\": null,\n                    \"link\": \"https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533\"\n                }\n        },\n        \"role\": \"Senior Carer\",\n        \"status\": \"POSTED\",\n        \"gender_preference\": \"No preference\",\n        \"general_guidance\": {\n            \"floor_plan\": \"http://localhost:8000/uploads/users/151808246323012.floor_plan.docx\",\n            \"parking\": \"test\",\n            \"notes_for_carers\": \"test\",\n            \"emergency_guidance\": \"test\",\n            \"report_contact\": \"test\",\n            \"superior_contact\": \"test\"\n        },\n        \"notes\": null,\n        \"carer\": {\n            \"_id\": \"5a9404d68ce0962d6c988f97\",\n            \"acceptance_date\": 1518422931942,\n            \"carer\": {\n                \"first_name\": \"Test\",\n                \"surname\": \"Test\",\n                \"jobs\": [\n                    {\n                        \"_id\": \"5a95290a1e28cd1d88ea64cd\",\n                        \"author\": {\n                            \"_id\": \"5a9419d8e33cb930aa7c3856\",\n                            \"care_home\": {\n                                \"care_service_name\": \"Test Care  Home\",\n                                \"type_of_home\": \"Residential\",\n                                \"name\": \"Test Test\"\n                            },\n                            \"email\": \"test.test@test.com\",\n                            \"phone_number\": \"3545232323\",\n                            \"address\": {\n                                \"postal_code\": \"Ex8 2el\",\n                                \"city\": \"Exmouth\",\n                                \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n                                \"location\": {\n                                    \"coordinates\": [\n                                        50.7583820,\n                                        19.005533\n                                    ],\n                                    \"type\": \"Point\"\n                                },\n                                \"address_line_2\": null,\n                                \"company\": null,\n                                \"link\": \"https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533\"\n                            }\n                        },\n                        \"review\": {\n                            \"created\": 1520957549836,\n                            \"description\": \"Great work\",\n                            \"rate\": 5\n                        }\n                    }\n                ],\n                \"dbs\": {\n                    \"status\": \"Clear\",\n                    \"dbs_date\": 157766400000,\n                    \"ref_number\": \"354783912343\",\n                },\n                \"training_record\": {\n                    \"fire_safety\": null,\n                    \"dementia\": null,\n                    \"h_and_s\": null,\n                    \"first_aid_awareness\": 1471816800000,\n                    \"first_aid_and_basic_life_support\": null,\n                    \"infection_control\": null,\n                    \"medication_management\": null,\n                    \"manual_handling_people\": null,\n                    \"safeguarding\": null,\n                    \"other\": null,\n                    \"qualifications\": [\n                        \"Nursing qualification (elsewhere)\",\n                        \"Agency carer induction training\"\n                    ]\n                },\n                \"profile_image\": null,\n                \"care_experience\": {\n                    \"months\": 2,\n                    \"years\": 1\n                },\n                \"reviews\": {\n                    \"average\": 5,\n                    \"count\": 1\n                }\n            },\n            \"email\": \"test@test.pl\",\n            \"phone_number\": \"111222111\"\n        }\n}",
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
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access Denied.</p>"
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
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "put",
    "url": "/jobs/:id/request-carer-change",
    "title": "Request carer change",
    "version": "0.0.1",
    "name": "Request_carer_change",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id</p>"
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
          "content": "HTTP/1.1 200 OK\n {\n    \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>This job has no carer.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 This job has no carer\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"This job has no carer\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "post",
    "url": "/jobs/:id/carer/review",
    "title": "Review job carer",
    "version": "0.0.1",
    "name": "Review_job_carer",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "rate",
            "description": "<p>Rate. Min 1, max 5.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Review description</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>Carer of this job has already been rated</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Carer of this job has already been rated\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Carer of this job has already been rated\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "get",
    "url": "/jobs/:group/notifications/carers",
    "title": "Submitted jobs notifications",
    "version": "0.0.1",
    "name": "Submitted_jobs_notifications",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "field": "group",
            "description": "<p>Group id.</p>"
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
            "field": "results",
            "description": "<p>Pagination results.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n   {\n       \"results\": [\n           {\n               \"_id\": \"5a9401138ce0962d6c988f90\",\n               \"carer\": {\n                   \"first_name\": \"Test\",\n                   \"surname\": \"Test\",\n                   \"profile_image\": null,\n                   \"care_experience\": {\n                       \"months\": 0,\n                       \"years\": 1\n                   },\n                   \"reviews\": {\n                       \"average\": 0,\n                       \"count\": 0\n                   }\n               },\n               \"isPriority\": true,\n               \"notification_time\": 1522073952622\n           },\n           {\n               \"_id\": \"5a9404d68ce0962d6c988f97\",\n               \"carer\": {\n                   \"first_name\": \"Test\",\n                   \"surname\": \"Test\",\n                   \"profile_image\": null,\n                   \"care_experience\": {\n                       \"months\": 0,\n                       \"years\": 1\n                   },\n                   \"reviews\": {\n                       \"average\": 0,\n                       \"count\": 0\n                   }\n               },\n               \"isPriority\": false,\n               \"notification_time\": 1522077552622\n           }\n       ],\n       \"pages\": 1,\n       \"total\": 2\n   }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Group not found.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Group not found\n{\n     \"errors\": [\n         {\n              \"field\": \"group\",\n              \"message\": \"Group not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "put",
    "url": "/jobs/:id/withdraw",
    "title": "Withdraw job",
    "version": "0.0.1",
    "name": "Withdraw_job",
    "group": "Job",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>Job id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "message",
            "description": "<p>Withdrawal message explanation. Required when job hasn't started yet.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>User account password. Required when job has already been started.</p>"
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
          "content": "HTTP/1.1 200 OK\n     {\n        \"status\": true\n     }",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Job not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WrongParameters",
            "description": "<p>WrongParameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Conflict",
            "description": "<p>You can't withdraw from job which has summary sheet sent.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Job not found\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"Job not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 WrongParameters\n{\n     \"errors\": [\n         {\n              \"field\": \"message\",\n              \"message\": \"Message field is required\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 You can't withdraw from job which has summary sheet sent\n{\n     \"errors\": [\n         {\n              \"field\": \"job\",\n              \"message\": \"You can't withdraw from job which has summary sheet sent\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Job.js",
    "groupTitle": "Job"
  },
  {
    "type": "put",
    "url": "/payments/bank",
    "title": "Add / Update bank details",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/payments/card"
      }
    ],
    "version": "0.0.1",
    "name": "Add___Update_bank_details",
    "group": "Payments",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "field": "token",
            "description": "<p>Stripe source token holding bank details.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",
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
            "field": "WrongParameters",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 406 Wrong Parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Invalid token\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Payment.js",
    "groupTitle": "Payments"
  },
  {
    "type": "put",
    "url": "/payments/card",
    "title": "Add / Update card details",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/payments/card"
      }
    ],
    "version": "0.0.1",
    "name": "Add___Update_card_details",
    "group": "Payments",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "field": "token",
            "description": "<p>Stripe source token holding card details.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",
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
            "field": "WrongParameters",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 406 Wrong Parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Invalid token\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/Payment.js",
    "groupTitle": "Payments"
  },
  {
    "type": "put",
    "url": "/user/care-home",
    "title": "Change care home profile",
    "version": "0.0.1",
    "name": "Change_care_home_profile",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "optional": true,
            "field": "name",
            "description": "<p>Care home owner name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "care_service_name",
            "description": "<p>Care service name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "type_of_home",
            "description": "<p>Type of home.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "superior_contact",
            "description": "<p>General guidance -  If our carer needs to call your service, who should they speak to.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "report_contact",
            "description": "<p>General guidance -  Where should carer report to upon arrival.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "emergency_guidance",
            "description": "<p>General guidance -  Carer guidance in event of fire alarm sounding.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "notes_for_carers",
            "description": "<p>General guidance -  Notes on High risk / complexity residents / any other requests for our carers.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "parking",
            "description": "<p>General guidance -  Where to park your car.</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "floor_plan",
            "description": "<p>General guidance -  Upload a floorplan of your care home. Max 10MB. Allowed mime types: application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, image/png, image/jpg, image/jpeg</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City. Required in changing address process.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "postal_code",
            "description": "<p>Postal code. Required in changing address process.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address_line_1",
            "description": "<p>Address first line. Required in changing address process.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address_line_2",
            "description": "<p>Address second line.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "company",
            "description": "<p>Company address name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone_number",
            "description": "<p>Phone number.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",
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
            "field": "WrongParameters",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 406 Wrong Parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"phone_number\",\n              \"message\": \"This phone number has already been taken\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/carer",
    "title": "Change carer profile",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/user/carer"
      }
    ],
    "version": "0.0.1",
    "name": "Change_carer_profile",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "max_job_distance",
            "description": "<p>Max job distance. Takes part in available jobs algorithm.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>Gender - Available options: Male, Female.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City. Required in changing address process.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "postal_code",
            "description": "<p>Postal code. Required in changing address process.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address_line_1",
            "description": "<p>Address first line. Required in changing address process.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address_line_2",
            "description": "<p>Address second line.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "company",
            "description": "<p>Company address name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone_number",
            "description": "<p>Phone number.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",
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
            "field": "WrongParameters",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 406 Wrong Parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"phone_number\",\n              \"message\": \"This phone number has already been taken\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/email",
    "title": "Change email",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/user/email"
      }
    ],
    "version": "0.0.1",
    "name": "Change_email",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>New email.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",
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
            "field": "WrongParameters",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access Denied.</p>"
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
          "content": "HTTP/1.1 406 Wrong Parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"email\",\n              \"message\": \"This email has already been taken\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/password",
    "title": "Change password",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/user/password"
      }
    ],
    "version": "0.0.1",
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
            "description": "<p>Access token</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",
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
            "field": "WrongParameters",
            "description": "<p>Wrong parameters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access Denied.</p>"
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
          "content": "HTTP/1.1 406 Wrong Parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"password\",\n              \"message\": \"Wrong password\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/profile-image",
    "title": "Change profile image",
    "version": "0.0.1",
    "name": "Change_profile_image",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile image file. Avaliable mime types: image/png, image/jpeg. Max file size 5MB.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PermissionDenied",
            "description": "<p>Permission Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Permission Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Permission Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/uniqueness",
    "title": "Check uniqueness",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/user/uniqueness"
      }
    ],
    "version": "0.0.1",
    "name": "Check_uniqueness",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Email to check is already used.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone_number",
            "description": "<p>Phone number to check is already used.</p>"
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
            "field": "exists",
            "description": "<p>Status of existance.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"exists\" : false\n}",
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
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Invalid param.\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/confirm-email",
    "title": "Confirm email",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/user/confirm-email"
      }
    ],
    "version": "0.0.1",
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
            "field": "NotFound",
            "description": "<p>User not found.</p>"
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
          "content": "HTTP/1.1 406 Wrong parameters\n{\n     \"errors\": [\n         {\n              \"field\": \"email\",\n              \"message\": \"This email cannot be confirmed from this link.\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 User not found\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"User not found\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/email/verification",
    "title": "Resend email verification",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/user/email/verification"
      }
    ],
    "version": "0.0.1",
    "name": "Resend_email_verification",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",
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
            "field": "Conflict",
            "description": "<p>Email is already confirmed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AccessDenied",
            "description": "<p>Access Denied.</p>"
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
          "content": "HTTP/1.1 409 Email is already confirmed\n{\n     \"errors\": [\n         {\n              \"field\": \"email\",\n              \"message\": \"Email is already confirmed\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/notifications/token",
    "title": "Update notifications token",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/user/notifications/token"
      }
    ],
    "version": "0.0.1",
    "name": "Update_notifications_token",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "optional": true,
            "field": "device_id",
            "description": "<p>Device id. Null or not present value clears field.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "device_token",
            "description": "<p>Device token - Firebase token required for push notifications. Null or not present value clears field.</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",
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
            "description": "<p>Access Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/profile",
    "title": "User profile",
    "sampleRequest": [
      {
        "url": "https://api.oliver-james.ready4s.it/api/user/profile"
      }
    ],
    "version": "0.0.1",
    "name": "User_profile",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-access-token",
            "description": "<p>Access token</p>"
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
            "description": "<p>User properties.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"_id\": \"5a6b1413599b6f3c8c7eaa8b\",\n        \"email\": \"test.test@test.com\",\n        \"phone_number\": \"9876543211\",\n        \"email_verified\": false,\n        \"address\": {\n            \"postal_code\": \"Ex8 2el\",\n            \"city\": \"Exmouth\",\n            \"address_line_1\": \"Elwyn Rd, Exmouth EX8 2E\",\n            \"location\": {\n                \"coordinates\": [\n                    50.7583820,\n                    19.005533\n                ],\n                \"type\": \"Point\"\n            },\n            \"address_line_2\": null,\n            \"company\": null,\n            \"link\": \"https://www.google.com/maps/search/?api=1&query=50.7583820,19.005533\"\n        },\n        \"carer\": {\n            \"first_name\": \"Test\",\n            \"surname\": \"Test\",\n            \"middle_name\": \"Test\",\n            \"profile_image\": \"http://localhost:8000/uploads/users/1519038810982test.jpg\",\n            \"max_job_distance\": 15,\n            \"gender\": \"Male\",\n            \"eligible_roles\": [\n                \"Carer\",\n                \"Senior Carer\"\n            ],\n            \"payment_system\": {\n                \"bank_number\": \"**** **** **** 3737\"\n            }\n        },\n        \"care_home\": {\n            \"name\": \"Test Test\",\n            \"care_service_name\": \"Test care home\",\n            \"type_of_home\": \"Nursing\",\n            \"general_guidance\": {\n                \"superior_contact\": \"asd\",\n                \"report_contact\": \"asd\",\n                \"emergency_guidance\": \"sd\",\n                \"notes_for_carers\": \"s\",\n                \"parking\": \"test\",\n                \"floor_plan\": \"http://localhost:8000/uploads/users/151808246323012. test.docx\"\n            },\n            \"gender_preference\": \"No preference\",\n            \"blocked_carers\": [\n                {\n                    \"_id\": \"5a6b1413599b6f3c8c7eaa8b\",\n                    \"carer\": {\n                        \"first_name\": \"Test\",\n                        \"surname\": \"Test\"\n                }\n            ],\n            \"payment_system\": {\n                \"card_number\": \"**** **** **** 3737\"\n            }\n        }\n    }",
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
            "description": "<p>Access Denied.</p>"
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
          "content": "HTTP/1.1 401 Access Denied\n{\n     \"errors\": [\n         {\n              \"field\": \"user\",\n              \"message\": \"Access Denied\"\n         }\n     ]\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 410 Token expired\n{\n     \"errors\": [\n         {\n              \"field\": \"token\",\n              \"message\": \"Access token expired\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "filename": "docs/api/input/User.js",
    "groupTitle": "User"
  }
] });
