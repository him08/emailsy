// const sgMail = require("@sendgrid/mail")
// const {SendGridTemplateId,SendGridEmail}= require("../config/keys")
const fs = require('fs');
const path = require('path')
const handlebars = require('handlebars');
const filePath = path.join(__dirname, '../templates/sendSurvey.hbs')
const templateSource = fs.readFileSync(filePath, 'utf8');
const nodemailer = require('nodemailer')
const template = handlebars.compile(templateSource);

exports.sendEmail = async (survey,urlY,urlN) => {
  const {recipients,body,subject}=survey
  // const templateData={body,subject,urlY,urlN}
  // const msg = {
  //   to: recipients.map(r=>r?.email),
  //   from: SendGridEmail,
  //   templateId: SendGridTemplateId,
  //   dynamic_template_data: templateData
  // }

  const mailOptions = {
    from: 'himanshivarshney25@gmail.com',
    to: recipients.map(r=>r?.email),
    subject: subject,
    html: template({ body,urlN,urlY }), // Pass dynamic data to the template
  };
try{
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'himanshivarshney25@gmail.com',
        pass: 'eoac rhle gdsq hcnv',
      },
    });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Email sent:', info.response);
  });
}
catch(err){
  console.log(err)
}
  // await sgMail.send(msg)
}