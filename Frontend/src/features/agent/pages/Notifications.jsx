import React from 'react';
import { useSocket } from '../../../shared/context/SocketContext';
import { Bell, Trash2, Ticket, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
    const { notifications, setNotifications } = useSocket();

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 py-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Notifications</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Stay updated with the latest ticket activities.</p>
                </div>
                {notifications.length > 0 && (
                    <button 
                        onClick={clearAll}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <Trash2 size={16} />
                        Clear all
                    </button>
                )}
            </div>

            <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <AnimatePresence mode="popLayout">
                    {notifications.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 px-6 text-center"
                        >
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <Bell size={32} />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No new notifications</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">We'll notify you when new tickets are created.</p>
                        </motion.div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {notifications.map((ticket, index) => (
                                <motion.div 
                                    key={ticket._id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                                >
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl h-fit">
                                            <Ticket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                                                        New Ticket Created: {ticket.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                                        {ticket.description}
                                                    </p>
                                                </div>
                                                <span className="shrink-0 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                                    <Clock size={12} />
                                                    {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 pt-1">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    <User size={14} />
                                                    User ID: {ticket.userId}
                                                </div>
                                                <div className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-amber-100 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 rounded-sm">
                                                    NEW
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Notifications;
