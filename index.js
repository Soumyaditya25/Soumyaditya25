const axios = require('axios');
const fs = require('fs');
const path = require('path');

axios.get('https://api.quotable.io/random')
  .then(response => {
    const quote = response.data.content;
    const author = response.data.author;
    const date = new Date().toDateString();
    const readmePath = path.join(process.env.GITHUB_WORKSPACE, 'README.md');
    const existingContent = fs.readFileSync(readmePath, 'utf8');
    const newContent = `\n\n## Today's Inspiration (${date})\n\n"${quote}" - ${author}\n`;
    fs.appendFileSync(readmePath, newContent);
  })
  .catch(error => console.error(error));
