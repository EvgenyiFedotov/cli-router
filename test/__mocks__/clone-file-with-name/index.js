const fs = require('fs');
const http = require('http');

const handler = () => {
  return 'Hello world!';
};

module.exports.handler = handler;
