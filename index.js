const rp = require('request-promise');

module.exports = class SlackClient {
  constructor(token) {
    this.token = token;
  }

  sendMessage(channelId, message, attachments) {
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
      .then(res => {
        console.log(`send message response: ${res}`);
        return res;
      })
      .catch(function(error) {
        console.error(`error sending message: ${error}`);
        throw error;
      });
  }

  updateMessage(channelId, ts, message, attachments) {
    if (attachments && attachments.constructor !== Array) {
      throw new Error("attachments must be an array");
    }
    return rp({
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        uri: 'https://slack.com/api/chat.update',
        form: {
          token: this.token,
          channel: channelId,
          ts: ts,
          text: message,
          attachments: JSON.stringify(attachments)
        }
      })
      .then(res => {
        console.log(`update message response: ${res}`);
        return res;
      })
      .catch(function(error) {
        console.error(`error updating message: ${error}`);
        throw error;
      });
  }
}