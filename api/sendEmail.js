const SES = require('./ses');
const ses = new SES();
exports.handler = (event) => {
    const data = event;
    ses.sendEmail(data.name, data.email, data.message);
};