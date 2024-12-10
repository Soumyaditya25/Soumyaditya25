const axios = require('axios');
const fs = require('fs');

axios.get('https://api.quotable.io/random')
  .then(({ data }) => {
    const quote = `"${data.content}" - ${data.author}`;
    const content = fs.readFileSync('README.md', 'utf8');
    const updatedContent = content.replace(/## ❤️ Today's Inspiration(.|\n)*?\n## 🔥/, `## ❤️ Today's Inspiration\n\n"${quote}"\n\n## 🔥`);
    fs.writeFileSync('README.md', updatedContent);
  })
  .catch(console.error);
