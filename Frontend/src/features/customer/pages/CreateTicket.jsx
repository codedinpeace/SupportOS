import { UploadCloud, HeadphonesIcon } from 'lucide-react';

const CreateTicket = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Create Support Ticket</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Describe your issue and we'll connect you with a clinical support specialist.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form Area */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <form className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-2">
                Ticket Title
              </label>
              <input 
                type="text" 
                placeholder="Briefly describe the issue" 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-shadow placeholder:text-slate-400"
              />
            </div>

            {/* Category and Urgency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none">
                  <option>Technical Issue</option>
                  <option>Billing</option>
                  <option>Account Access</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-2">
                  Urgency
                </label>
                <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none">
                  <option>Low - General Question</option>
                  <option>Medium - Minor Disruption</option>
                  <option>High - Major Disruption</option>
                  <option>Critical - System Outage</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-2">
                Detailed Description
              </label>
              <textarea 
                rows="6"
                placeholder="Provide step-by-step details of the occurrence..." 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow placeholder:text-slate-400 resize-none"
              ></textarea>
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-2">
                Attachments (Max 5MB)
              </label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                <UploadCloud className="w-8 h-8 text-slate-400 mb-3" />
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                  Drag files here or <span className="text-blue-600 dark:text-blue-400">browse</span>
                </p>
                <p className="text-xs text-slate-500">PDF, JPG, PNG or CSV supported</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <button type="button" className="px-6 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Save Draft
              </button>
              <button type="button" className="px-6 py-2.5 text-sm font-bold text-slate-900 bg-blue-200 hover:bg-blue-300 transition-colors rounded-lg">
                Submit Ticket
              </button>
            </div>

          </form>
        </div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          
          {/* Operational Excellence Photo Banner */}
          <div className="relative rounded-xl overflow-hidden bg-slate-900 shadow-md h-56 flex flex-col justify-end p-6 border border-slate-200 dark:border-slate-800">
            {/* Background image overlay mock */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-0"></div>
            
            <div className="relative z-20">
              <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold tracking-wider uppercase bg-white/20 text-white rounded backdrop-blur-sm">
                Service Status
              </span>
              <h3 className="text-lg font-bold text-white mb-1">Operational Excellence</h3>
              <p className="text-xs text-slate-300">All clinical systems are performing within peak parameters.</p>
            </div>
          </div>

          {/* Urgent Help Panel */}
          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full shrink-0">
              <HeadphonesIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Need urgent help?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Average response: 4 mins</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CreateTicket;
