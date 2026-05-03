import React from 'react';
import { History, Paperclip, BarChart2, CheckCircle2, ChevronRight, Share2, MoreHorizontal, Send, Image as ImageIcon, Link as LinkIcon, Bold, Italic } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const id = ticketId || 'TKT-8842';

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-8rem)]">
      
      {/* Left Panel - Ticket Info */}
      <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-6 lg:overflow-y-auto pr-2 custom-scrollbar shrink-0">
        
        {/* Ticket Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 tracking-wider">
            <Link to="/agent/tickets" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">TICKETS</Link>
            <ChevronRight size={12} />
            <span className="text-slate-800 dark:text-slate-200">{id}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">
            High-frequency latency in clinical data synchronization
          </h1>
          <div className="flex items-center gap-2 mb-6">
            <span className="px-2.5 py-1 text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-full uppercase tracking-wider">
              Urgent
            </span>
            <span className="px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full uppercase tracking-wider">
              In Progress
            </span>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800"></div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Created</div>
            <div className="text-sm font-medium text-slate-900 dark:text-slate-200">Oct 24, 2023 · 09:12 AM</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Customer</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">St. Jude Medical Group</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Assigned Agent</div>
            <div className="flex items-center gap-2">
              <img src="https://i.pravatar.cc/150?u=sarah" alt="Agent" className="w-5 h-5 rounded-full" />
              <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Sarah Jenkins</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Category</div>
            <div className="text-sm font-medium text-slate-900 dark:text-slate-200">Infrastructure / Sync</div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800"></div>

        {/* Description */}
        <div>
          <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-3">Problem Description</div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            User reports that the synchronization between the patient portal and the clinical database is experiencing delays of 500ms to 2.5s. This is causing timeout errors on the mobile tablet interface.
          </p>
          <div className="bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-lg p-4 font-mono text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            // Error Log Export<br/>
            SYNC_TIMEOUT: server failed to respond in 2000ms<br/>
            at /api/v2/clinical/sync [408 Request Timeout]
          </div>
        </div>

        <div className="mt-auto pt-6 flex items-center gap-2 mb-4 lg:mb-0">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-bold text-sm transition-colors">
            <CheckCircle2 size={16} className="text-slate-500 dark:text-slate-400" />
            Resolve Ticket
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Right Panel - Live Thread */}
      <div className="flex-1 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col h-[500px] lg:h-full overflow-hidden shadow-sm">
        
        {/* Chat Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0"></div>
            <h2 className="text-[10px] sm:text-sm font-bold text-slate-900 dark:text-white tracking-wider uppercase truncate">Thread: Jane Doe</h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-slate-500 dark:text-slate-400">
            <button className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white text-[10px] sm:text-xs font-semibold transition-colors"><History size={14}/> <span className="hidden xs:inline">History</span></button>
            <button className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white text-[10px] sm:text-xs font-semibold transition-colors"><Paperclip size={14}/> <span className="hidden xs:inline">Logs</span></button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          
          {/* Customer Message */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img src="https://i.pravatar.cc/150?u=jane" alt="Jane" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white mr-2">JANE DOE</span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">09:12 AM</span>
              </div>
            </div>
            <div className="ml-11 text-sm text-slate-700 dark:text-slate-300 leading-relaxed pr-8">
              Hi support team, we're seeing huge delays on the tablets this morning. It's making it impossible for doctors to view patient records in real-time. Any updates?
            </div>
          </div>

          {/* Agent Message */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3 mb-2 flex-row-reverse">
              <img src="https://i.pravatar.cc/150?u=sarah" alt="Agent" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mr-2">09:15 AM</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">SARAH (YOU)</span>
              </div>
            </div>
            <div className="mr-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tr-none p-4 max-w-xl text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-sm">
              Hello Jane. I'm investigating the logs now. It looks like a synchronization bottleneck in the v2 API path. I've escalated this to the engineering team.
            </div>
          </div>

          {/* System Log */}
          <div className="flex justify-center my-6">
            <div className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-full flex items-center gap-2 text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
              <Share2 size={12} />
              Engineering assigned to ticket · 09:18 AM
            </div>
          </div>

          {/* Customer Message */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img src="https://i.pravatar.cc/150?u=jane" alt="Jane" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white mr-2">JANE DOE</span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">09:20 AM</span>
              </div>
            </div>
            <div className="ml-11 text-sm text-slate-700 dark:text-slate-300 leading-relaxed pr-8">
              Thanks Sarah. We have a heavy load of clinics starting at 10:00 AM. If it's not fixed by then, we'll have to switch to manual paper records.
            </div>
          </div>

        </div>

        {/* Compose Area */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1E293B]">
          
          {/* AI Suggestions */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-2">
              <BarChart2 size={12} className="text-blue-500" />
              AI Suggested Replies
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
              <button className="shrink-0 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-xs text-slate-600 dark:text-slate-400 rounded-lg text-left transition-colors truncate max-w-xs">
                "We understand the urgency. Engineering is currently deploying a patch..."
              </button>
              <button className="shrink-0 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-xs text-slate-600 dark:text-slate-400 rounded-lg text-left transition-colors truncate max-w-xs">
                "Could you confirm if all tablets are affected or just specific models?"
              </button>
            </div>
          </div>

          {/* Text Editor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
            <textarea 
              rows="3"
              placeholder="Compose your clinical response..."
              className="w-full px-4 py-3 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none resize-none"
            ></textarea>
            
            <div className="px-4 py-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                <button className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"><Bold size={16}/></button>
                <button className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"><Italic size={16}/></button>
                <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
                <button className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"><LinkIcon size={16}/></button>
                <button className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"><ImageIcon size={16}/></button>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors uppercase tracking-wider">
                  Internal Note
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded font-bold text-xs uppercase tracking-wider transition-colors">
                  Send <Send size={12}/>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TicketDetails;
