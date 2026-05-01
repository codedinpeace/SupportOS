const fs = require('fs');
const path = require('path');

const files = [
  'src/app/App.css',
  'src/features/auth/components/AuthLayout.jsx',
  'src/features/auth/pages/Register.jsx',
  'src/features/auth/pages/Login.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (file.endsWith('.css')) {
    content = content.replace('.dark body {\n  @apply bg-zinc-950 text-zinc-50;\n}', '.dark body {\n  @apply bg-slate-900 text-slate-50;\n}');
  } else {
    // Backgrounds
    content = content.replace(/dark:bg-zinc-950/g, 'dark:bg-slate-900');
    content = content.replace(/dark:bg-zinc-900\/70/g, 'dark:bg-slate-800/90');
    content = content.replace(/dark:bg-zinc-900\/50/g, 'dark:bg-slate-800/50');
    content = content.replace(/dark:bg-zinc-800\/50/g, 'dark:bg-slate-900'); // inputs background
    content = content.replace(/dark:bg-zinc-800/g, 'dark:bg-slate-800'); // secondary button
    content = content.replace(/dark:bg-zinc-700/g, 'dark:bg-slate-700'); // tabs
    content = content.replace(/dark:bg-zinc-50/g, 'dark:bg-slate-500'); // primary button bg
    
    // Hover Backgrounds
    content = content.replace(/dark:hover:bg-zinc-200/g, 'dark:hover:bg-slate-400');
    content = content.replace(/dark:hover:bg-zinc-700/g, 'dark:hover:bg-slate-700');
    
    // Borders
    content = content.replace(/dark:border-zinc-800/g, 'dark:border-slate-700');
    content = content.replace(/dark:border-zinc-700/g, 'dark:border-slate-600');
    
    // Texts
    content = content.replace(/dark:text-zinc-50/g, 'dark:text-slate-50');
    content = content.replace(/dark:text-zinc-100/g, 'dark:text-slate-100');
    content = content.replace(/dark:text-zinc-300/g, 'dark:text-slate-300');
    content = content.replace(/dark:text-zinc-400/g, 'dark:text-slate-400');
    
    // Hover Texts
    content = content.replace(/dark:hover:text-zinc-300/g, 'dark:hover:text-slate-300');
    content = content.replace(/dark:hover:text-zinc-100/g, 'dark:hover:text-slate-100');
    
    // Shadows
    content = content.replace(/dark:shadow-\[0_8px_40px_-12px_rgba\(0,0,0,0\.5\)\]/g, 'dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]');
    
    // Primary Button Text
    content = content.replace(/dark:text-zinc-900/g, 'dark:text-white');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
});
