define({ "api": [
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
            "optional": true,
            "field": "location_id",
            "description": "<p>Location Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "postal_code",
            "description": "<p>Postal code - required when location Id is not present.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address_line_1",
            "description": "<p>First line of address string - required when location Id is not present.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address_line_2",
            "description": "<p>Second line of address string - fully optional.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City - required when location Id is not present.</p>"
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
  }
] });
