const fs = require('fs');

const files = [
  'src/features/agent/AgentDashboard.jsx',
  'src/features/admin/AdminDashboard.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace backslash-backtick with backtick
  content = content.replace(/\\`/g, '`');
  // Replace backslash-dollar with dollar
  content = content.replace(/\\\$/g, '$');
  
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
});
