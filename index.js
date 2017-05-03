const rp = require('request-promise');

module.exports = class SlackClient {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  sendMessage(message, attachments) {
    if (attachments && attachments.constructor !== Array) {
      throw new Error("attachments must be an array");
    }
    return rp({
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        uri: this.webhookUrl,
        body: JSON.stringify({
          text: message,
          attachments: attachments}),
    })
      .then(res => console.log(message))
      .catch(function(error) {
        console.error('error!!!!');
        console.error(error);
      });
  }
}