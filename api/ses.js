const AWS = require('aws-sdk');
const ses = new AWS.SES();

const OK = 200;
const ERR = 500;

module.exports = class SES {
  sendEmail(sender, receiver, content) {
    return new Promise((resolve) => {
      const params = {
        Destination: {
          ToAddresses: [receiver]
        },
        Message: {
          Subject: { Data: sender},
          Body: {
            Text: { Data: content }
          }
        },
        Source: process.env.senderEmail
      }
  
      ses.sendEmail(params, (err, data) => {
        if (err) {
          resolve({
            statusCode: ERR,
            body: 'Email failed to send!'
          });
        }
        else {
          resolve({
            statusCode: OK,
            body: 'Email sent successfully!'
          });
        }
      });
    });
  }
}