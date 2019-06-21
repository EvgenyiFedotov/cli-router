const fs = require('fs');
const http = require('http');

const {{ name }} = () => {
  return 'Hello world!';
};

module.exports.{{ name }} = {{ name }};
