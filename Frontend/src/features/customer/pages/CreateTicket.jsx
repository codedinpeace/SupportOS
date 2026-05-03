import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeadphonesIcon, CheckCircle2, AlertCircle } from 'lucide-react'
import { useCreateTicket } from '../hook/useCreateTicket'

const CreateTicket = () => {
  const navigate = useNavigate()
  const { submitTicket, loading, error } = useCreateTicket()

  const [form, setForm] = useState({ title: '', category: 'Technical Issue', urgency: 'Low - General Question', description: '' })
  const [createdTicket, setCreatedTicket] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) return
    const data = await submitTicket(form)
    if (data) {
      setCreatedTicket(data.ticket)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Create Support Ticket</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Describe your issue and we'll connect you with a support specialist.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Form Area */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="space-y-5">

            {/* Title */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-2">
                Ticket Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Briefly describe the issue"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow placeholder:text-slate-400"
              />
            </div>

            {/* Category and Urgency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none"
                >
                  <option>Technical Issue</option>
                  <option>Billing</option>
                  <option>Account Access</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-2">
                  Urgency
                </label>
                <select
                  name="urgency"
                  value={form.urgency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none"
                >
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
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="7"
                placeholder="Provide step-by-step details of the occurrence..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow placeholder:text-slate-400 resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-lg px-3 py-2">
                <AlertCircle size={13} />
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !form.title.trim() || !form.description.trim()}
                className="w-full py-3 text-sm font-bold text-white bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg transition-all shadow-md shadow-violet-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>

          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">

          {/* Selected Company Card */}
          {(() => {
            const saved = JSON.parse(localStorage.getItem('selectedBusiness') || 'null')
            return saved ? (
              <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-3">Raising ticket for</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{saved.emoji}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{saved.name}</p>
                    <p className="text-xs text-slate-400">{saved.category}</p>
                  </div>
                </div>
              </div>
            ) : null
          })()}

          {/* Service Status Banner */}
          <div className="relative rounded-xl overflow-hidden bg-slate-900 shadow-md h-48 flex flex-col justify-end p-5">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-0"></div>
            <div className="relative z-20">
              <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold tracking-wider uppercase bg-white/20 text-white rounded">
                Service Status
              </span>
              <h3 className="text-base font-bold text-white mb-1">Operational Excellence</h3>
              <p className="text-xs text-slate-300">All systems are performing within peak parameters.</p>
            </div>
          </div>

          {/* Urgent Help */}
          <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full shrink-0">
              <HeadphonesIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Need urgent help?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Average response: 4 mins</p>
            </div>
          </div>

        </div>
      </div>

      {/* Success Popup */}
      {createdTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-400/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Ticket Created!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Your issue has been submitted successfully</p>
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-4">
              <p className="text-xs text-slate-400 mb-1">Your Ticket Number</p>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400 tracking-wider">{createdTicket.ticketNumber}</p>
            </div>
            <p className="text-xs text-slate-400 mb-5">Save this number to track your ticket status</p>
            <button
              onClick={() => navigate('/customer')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all"
            >
              Back to Portal
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default CreateTicket