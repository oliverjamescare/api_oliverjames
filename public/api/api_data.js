define({ "api": [
  {
    "type": "post",
    "url": "/care-home/waiting-list",
    "title": "Add care home to waiting list",
    "sampleRequest": [
      {
        "url": "http://api.oliver-james.ready4s.it/api/care-home/waiting-list"
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
    "filename": "docs/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/password/remind",
    "title": "Forgot password",
    "sampleRequest": [
      {
        "url": "http://api.oliver-james.ready4s.it/api/password/remind"
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
    "filename": "docs/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/password/remind/change",
    "title": "Forgot password change",
    "sampleRequest": [
      {
        "url": "http://api.oliver-james.ready4s.it/api/password/remind/change"
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
    "filename": "docs/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "sampleRequest": [
      {
        "url": "http://api.oliver-james.ready4s.it/api/login"
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
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n            \"_id\": \"5a5de32f5bb5952104a5d156\",\n            \"email\": \"test.test@test.com\",\n            \"access_token\": {\n                \"refresh_token\": \"a2Rdz6xpAi38CRzxorPuHZRqshL1pfgm5qvQAQm16jbGSAZgHpfVaY1DzOJyeRk22Nebv8fuIl4H8sT3y9EKjRpMb56oY6OeeYsBkle6oZfYo6oObEz7vNFWzq2OnUHF\",\n                \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTY3ODgyMTQsImRhdGEiOnsiX2lkIjoiNWE1ZGUzMmY1YmI1OTUyMTA0YTVkMTU2IiwiZW1haWwiOiJhZHJpYW4ubWFzbGVyekByZWFkeTRzLnBsIn0sImlhdCI6MTUxNjE4MzQxNH0.ny_lRr-1SO8LXyJWtGxS1DqZJaV-nbXoSYwbf5rCA2o\"\n            },\n            \"carer\": {\n                \"first_name\": \"Test\",\n                \"middle_name\": \"Test\",\n                \"surname\": \"Test\"\n            }\n        }\n}",
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
    "filename": "docs/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register",
    "sampleRequest": [
      {
        "url": "http://api.oliver-james.ready4s.it/api/register"
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
    "filename": "docs/input/Auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/carers/nearby",
    "title": "Checks carers near point",
    "sampleRequest": [
      {
        "url": "http://api.oliver-james.ready4s.it/api/carers/nearby"
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
          "content": "HTTP/1.1 201 OK\n{\n  \"exists\" : true,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "docs/input/Carer.js",
    "groupTitle": "Carer"
  },
  {
    "type": "post",
    "url": "/contact",
    "title": "Send contact message",
    "sampleRequest": [
      {
        "url": "http://api.oliver-james.ready4s.it/api/contact"
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
    "filename": "docs/input/Contact.js",
    "groupTitle": "Contact"
  },
  {
    "type": "get",
    "url": "/user/uniqueness",
    "title": "Check uniqueness",
    "sampleRequest": [
      {
        "url": "http://api.oliver-james.ready4s.it/api/user/uniqueness"
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
    "filename": "docs/input/User.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/confirm-email",
    "title": "Confirm email",
    "sampleRequest": [
      {
        "url": "http://api.oliver-james.ready4s.it/api/user/confirm-email"
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
    "filename": "docs/input/User.js",
    "groupTitle": "User"
  }
] });
