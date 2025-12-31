import React, { useState, useEffect, useRef } from 'react';

const TicketCreateModal = ({ isOpen, onClose, onSubmit, isAdmin = false }) => {
  // Mock list of agents - In a real app, this would come from an API or Prop
  const agentList = [
    { id: 'a1', name: 'Sarah Jenkins', role: 'Technical Support' },
    { id: 'a2', name: 'Michael Chen', role: 'Billing Specialist' },
    { id: 'a3', name: 'Amara Okafor', role: 'Booking Agent' },
  ];

  const [formData, setFormData] = useState({
    subject: '',
    relatedItem: '',
    category: '',
    priority: '',
    description: '',
    assignedTo: '' 
  });

  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setFormData({ 
        subject: '', 
        relatedItem: '', 
        category: '', 
        priority: '', 
        description: '',
        assignedTo: '' 
      });
      setAttachments([]);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close on Click Outside or Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // finalData now includes assignedTo if it's an admin
      const finalData = { 
        ...formData, 
        files: attachments, 
        createdAt: new Date().toISOString(),
        status: formData.assignedTo ? 'Assigned' : 'Open' 
      };
      
      if (onSubmit) await onSubmit(finalData);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      onClose();
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-[#111418] rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[95vh] transform transition-all border border-slate-200 dark:border-slate-800"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {isAdmin ? 'Manual Ticket Entry' : 'New Support Ticket'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {isAdmin 
                ? 'Register a customer request and assign it to an agent.' 
                : 'Fill in the details below to create a new support ticket.'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-hide">
          <form id="ticket-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Admin Only: Assigned To Field */}
            {isAdmin && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 animate-[fadeIn_0.3s_ease-out]">
                <label className="block text-sm font-bold text-primary mb-1.5" htmlFor="assignedTo">
                  Assign to Agent
                </label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                    id="assignedTo" 
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                  >
                    <option value="">Leave Unassigned (General Pool)</option>
                    {agentList.map(agent => (
                      <option key={agent.id} value={agent.name}>
                        {agent.name} — {agent.role}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                    person_search
                  </span>
                </div>
              </div>
            )}

            {/* Subject */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="subject">Subject</label>
              <input 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Briefly describe the issue" 
                type="text"
              />
            </div>

            {/* Grid for Category & Related Item */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="relatedItem">Related Hotel/Service</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  id="relatedItem" 
                  name="relatedItem" 
                  value={formData.relatedItem}
                  onChange={handleInputChange}
                  placeholder="Hotel name or ID" 
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="category">Ticket Category</label>
                <select 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                  id="category" 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select category</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Payment">Payment</option>
                  <option value="Booking">Booking</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="priority">Priority Level</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                id="priority" 
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="description">Detailed Description</label>
              <textarea 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[120px]"
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Include all necessary details..." 
                rows="4"
              ></textarea>
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Attachments</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 hover:bg-primary/5 transition-colors group cursor-pointer relative">
                <input 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  id="file-upload" 
                  multiple 
                  type="file" 
                  onChange={handleFileChange}
                />
                <div className="space-y-1 text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">cloud_upload</span>
                  <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                    <span className="font-bold text-primary">Upload files</span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>

              {/* Attachment Previews */}
              {attachments.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold border border-primary/20">
                      <span className="truncate max-w-[150px]">{file.name}</span>
                      <button type="button" onClick={() => removeAttachment(index)} className="hover:text-red-500">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-white dark:bg-[#111418]">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-black uppercase text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 transition-all active:scale-95" 
            type="button"
          >
            Cancel
          </button>
          <button 
            form="ticket-form"
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-xl text-sm font-black uppercase text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 focus:ring-2 focus:ring-primary disabled:opacity-70 transition-all active:scale-95 flex items-center gap-2" 
            type="submit"
          >
            {isSubmitting ? (
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{isAdmin && formData.assignedTo ? 'Create & Assign' : 'Submit Ticket'}</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCreateModal;