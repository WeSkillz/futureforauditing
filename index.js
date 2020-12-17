const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// create express app
const app = express();
app.use(cors());
app.use(
    cors({
        origin: ['https://www.futureforauditing.com', 'http://localhost:3000'],
        optionsSuccessStatus: 200,
    }),
);

// Require:
const postmark = require("postmark");

// Send an email:
const client = new postmark.ServerClient("7c07e6d3-438e-4bc9-830c-ca37563260f5");

// parse requests of content-type - application/x-www-form-urlencoded

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.post('/contact', async (req, res) => {
    try {
        console.log('request body::', req.body);
        await client.sendEmailWithTemplate({
            "From": "info@futureforauditing.com",
            "To": req.body.email,
            "TemplateAlias": "welcome",
            "TemplateModel": {
                "product_url": "https://www.futureforauditing.com",
                "product_name": "Future For Auditing",
                "name": "name_Value",
                "action_url": "action_url_Value",
                "login_url": "login_url_Value",
                "username": "username_Value",
                "trial_length": "trial_length_Value",
                "trial_start_date": "trial_start_date_Value",
                "trial_end_date": "trial_end_date_Value",
                "support_email": "support_email_Value",
                "live_chat_url": "live_chat_url_Value",
                "sender_name": "sender_name_Value",
                "help_url": "help_url_Value",
                // "company_name": "company_name_Value",
                "company_address": "123 Jaber Complex, Amman, Jordan",
                "message": req.body.message,
                "services": req.body.services,
                "name": req.body.name,
                "email": req.body.email,
                "phone": req.body.phone,
            }
        });

        await client.sendEmailWithTemplate({
            "From": "info@futureforauditing.com",
            "To": "maher@futureforauditing.com",
            "TemplateAlias": "contact-request",
            "TemplateModel": {
              "product_url": "https://www.futureforauditing.com",
              "product_name": "Future For Auditing",
              "name": "name_Value",
              "action_url": "action_url_Value",
              "login_url": "login_url_Value",
              "username": "username_Value",
              "trial_length": "trial_length_Value",
              "trial_start_date": "trial_start_date_Value",
              "trial_end_date": "trial_end_date_Value",
              "support_email": "support_email_Value",
              "live_chat_url": "live_chat_url_Value",
              "sender_name": "sender_name_Value",
              "help_url": "help_url_Value",
            //   "company_name": "company_name_Value",
              "company_address": "123 Jaber Complex, Amman, Jordan",
              "message": req.body.message,
                "services": req.body.services,
                "name": req.body.name,
                "email": req.body.email,
                "phone": req.body.phone,
            }
          });

    } catch (error) {
        console.log("Error sending this email", error)
    }
    let name = req.body.name;
    let email = req.body.email;
    res.send(JSON.stringify({
        "message": "Welcome " + name + " to Future For Auditing.",
        "email": email
    }));
});

app.use(express.static(path.join(__dirname, './public')));

// listen for requests
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});