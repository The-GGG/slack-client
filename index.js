const rp = require('request-promise');

module.exports = class SlackClient {
  constructor(token) {
    this.token = token;
  }

  sendMessage(channelId, message, attachments) {
    console.log(attachments);
    if (attachments && attachments.constructor !== Array) {
      throw new Error("attachments must be an array");
    }
    return rp({
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        uri: 'https://slack.com/api/chat.postMessage',
        form: {
          token: this.token,
          channel: channelId,
          text: message,
          attachments: JSON.stringify(attachments)
        }
      })
      .then(res => console.log(message))
      .catch(function(error) {
        console.error(error);
      });
  }
}