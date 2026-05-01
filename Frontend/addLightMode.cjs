const fs = require('fs');

const files = [
  'src/shared/components/LeftPanel.jsx',
  'src/shared/components/TopHeader.jsx',
  'src/shared/components/DashboardLayout.jsx',
  'src/features/customer/CustomerPortal.jsx',
  'src/features/admin/AdminDashboard.jsx',
  'src/features/agent/AgentDashboard.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Backgrounds
  content = content.replace(/bg-\[#0F172A\]/g, 'bg-slate-50 dark:bg-[#0F172A]');
  content = content.replace(/bg-\[#0B1120\]/g, 'bg-white dark:bg-[#0B1120]');
  content = content.replace(/bg-\[#1E293B\]/g, 'bg-white dark:bg-[#1E293B]');
  
  // Specific backgrounds
  content = content.replace(/bg-slate-800\/50/g, 'bg-slate-100 dark:bg-slate-800/50');
  content = content.replace(/bg-slate-800\/30/g, 'bg-slate-50 dark:bg-slate-800/30');
  content = content.replace(/bg-slate-800\b(?![\/\w])/g, 'bg-slate-100 dark:bg-slate-800');
  content = content.replace(/bg-slate-700\b(?![\/\w])/g, 'bg-slate-200 dark:bg-slate-700');
  content = content.replace(/bg-slate-900\/20/g, 'bg-slate-50 dark:bg-slate-900/20');
  
  // Hover Backgrounds
  content = content.replace(/hover:bg-slate-800\/30/g, 'hover:bg-slate-50 dark:hover:bg-slate-800/30');
  content = content.replace(/hover:bg-slate-800\/50/g, 'hover:bg-slate-100 dark:hover:bg-slate-800/50');
  content = content.replace(/hover:bg-slate-800\b(?![\/\w])/g, 'hover:bg-slate-200 dark:hover:bg-slate-800');
  content = content.replace(/hover:bg-slate-700\b(?![\/\w])/g, 'hover:bg-slate-200 dark:hover:bg-slate-700');
  
  // Borders
  content = content.replace(/border-slate-800/g, 'border-slate-200 dark:border-slate-800');
  content = content.replace(/border-slate-700/g, 'border-slate-200 dark:border-slate-700');
  content = content.replace(/border-slate-600/g, 'border-slate-300 dark:border-slate-600');
  content = content.replace(/divide-slate-800\/50/g, 'divide-slate-200 dark:divide-slate-800/50');
  
  // Text Colors
  content = content.replace(/text-white/g, 'text-slate-900 dark:text-white');
  content = content.replace(/text-slate-200/g, 'text-slate-800 dark:text-slate-200');
  content = content.replace(/text-slate-300/g, 'text-slate-700 dark:text-slate-300');
  content = content.replace(/text-slate-400/g, 'text-slate-500 dark:text-slate-400');
  content = content.replace(/text-slate-500/g, 'text-slate-400 dark:text-slate-500');
  
  // Hover Text
  content = content.replace(/hover:text-slate-200/g, 'hover:text-slate-900 dark:hover:text-slate-200');
  content = content.replace(/hover:text-slate-300/g, 'hover:text-slate-800 dark:hover:text-slate-300');
  
  // Light primary buttons (Export Report, Create Ticket)
  content = content.replace(/bg-slate-200 hover:bg-white text-slate-900/g, 'bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900');
  
  // Custom tweaks for AgentDashboard priority texts if needed (red-400, amber-400 are usually okay in light mode, but maybe red-600 in light)
  content = content.replace(/text-red-400/g, 'text-red-600 dark:text-red-400');
  content = content.replace(/text-amber-400/g, 'text-amber-600 dark:text-amber-400');
  content = content.replace(/text-amber-500/g, 'text-amber-600 dark:text-amber-500');
  content = content.replace(/text-emerald-400/g, 'text-emerald-600 dark:text-emerald-400');
  
  // Backgrounds with opacity for priority labels
  content = content.replace(/bg-red-400\/10/g, 'bg-red-100 dark:bg-red-400/10');
  content = content.replace(/border-red-400\/20/g, 'border-red-200 dark:border-red-400/20');
  content = content.replace(/bg-amber-400\/10/g, 'bg-amber-100 dark:bg-amber-400/10');
  content = content.replace(/border-amber-400\/20/g, 'border-amber-200 dark:border-amber-400/20');
  
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
});
