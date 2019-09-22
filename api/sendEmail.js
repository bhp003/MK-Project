const SES = require('./ses');
const ses = new SES();
exports.handler = (event) => {
    const data = event;
    const response = await ses.sendEmail(data.name, data.email, data.message);
    return response;
};