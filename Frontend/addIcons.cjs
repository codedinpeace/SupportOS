const fs = require('fs');

const files = [
  'src/features/auth/pages/Register.jsx',
  'src/features/auth/pages/Login.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Add lucide-react import
  if (!content.includes('lucide-react')) {
    content = content.replace(
      "import { motion, AnimatePresence } from 'framer-motion';",
      "import { motion, AnimatePresence } from 'framer-motion';\nimport { User, Mail, Lock, Building, Globe, Key, Headphones } from 'lucide-react';"
    );
  }

  // 2. Update Tabs
  content = content.replace(
    /const tabs = \[\s*{\s*id: 'customer', label: 'Customer' \s*},\s*{\s*id: 'business', label: 'Business' \s*},\s*{\s*id: 'agent', label: 'Agent' \s*},\s*\];/,
    `const tabs = [
    { id: 'customer', label: 'Customer', icon: User },
    { id: 'business', label: 'Business', icon: Building },
    { id: 'agent', label: 'Agent', icon: Headphones },
  ];`
  );

  // 3. Update tab render
  content = content.replace(
    /\{tab\.label\}/,
    `<div className="flex items-center justify-center gap-2">
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </div>`
  );

  // 4. Update Inputs (Full Name)
  content = content.replace(
    /<input type="text" placeholder="(John Doe|Jane Doe)" className="w-full px-4/g,
    `<div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input type="text" placeholder="$1" className="w-full pl-10 pr-4`
  );

  // 5. Update Inputs (Email)
  content = content.replace(
    /<input type="email" placeholder="([^"]+)" className="w-full px-4/g,
    `<div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input type="email" placeholder="$1" className="w-full pl-10 pr-4`
  );

  // 6. Update Inputs (Password)
  content = content.replace(
    /<input type="password" placeholder="••••••••" className="w-full px-4/g,
    `<div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4`
  );

  // 7. Update Inputs (Organization)
  content = content.replace(
    /<input type="text" placeholder="Acme Corp" className="w-full px-4/g,
    `<div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input type="text" placeholder="Acme Corp" className="w-full pl-10 pr-4`
  );

  // 8. Update Inputs (Website)
  content = content.replace(
    /<input type="url" placeholder="([^"]+)" className="w-full px-4/g,
    `<div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input type="url" placeholder="$1" className="w-full pl-10 pr-4`
  );

  // 9. Update Inputs (Invitation Code)
  content = content.replace(
    /<input type="text" placeholder="123456" maxLength=\{6\} className="w-full px-4/g,
    `<div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-slate-500" />
                    <input type="text" placeholder="123456" maxLength={6} className="w-full pl-12 pr-4`
  );

  // 10. Close all the relative divs for inputs
  // We need to insert `</div>` after every modified input tag
  // We can match `required />` and replace with `required />\n                  </div>`
  content = content.replace(/required \/>/g, 'required />\n                  </div>');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
});
