const axios = require('axios');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data.content;
    const author = response.data.author;
    const date = new Date().toDateString();

    const readmePath = path.join(process.cwd(), 'README.md');

    const existingContent = fs.readFileSync(readmePath, 'utf8');

    const updatedContent = existingContent.replace(
      /## ❤️ Today's Inspiration([\s\S]*?)\n##/g,
      `## ❤️ Today's Inspiration\n\n"${quote}" - ${author}\n\n##`
    );

    fs.writeFileSync(readmePath, updatedContent);
    console.log('README updated successfully!');
  } catch (error) {
    console.error('Failed to update README:', error.message);
  }
})();
