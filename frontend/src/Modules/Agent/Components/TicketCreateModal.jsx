import React, { useState, useEffect, useRef } from 'react';

const TicketCreateModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    relatedItem: '',
    category: '',
    priority: '',
    description: ''
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
      setFormData({ subject: '', relatedItem: '', category: '', priority: '', description: '' });
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
    // Future-ready: Add file size/type validation here
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Call
    try {
      const finalData = { ...formData, files: attachments, createdAt: new Date().toISOString() };
      console.log('Submitting Ticket:', finalData);
      
      if (onSubmit) await onSubmit(finalData);
      
      // Artificial delay for UX feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
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
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">New Support Ticket</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Fill in the details below to create a new support ticket.</p>
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
                placeholder="e.g., Unable to access booking panel" 
                type="text"
              />
            </div>

            {/* Grid for Category & Related Item */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="relatedItem">Related Hotel or Package</label>
                <input 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  id="relatedItem" 
                  name="relatedItem" 
                  value={formData.relatedItem}
                  onChange={handleInputChange}
                  placeholder="Select or type" 
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
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="priority">Priority</label>
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
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="description">Description</label>
              <textarea 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[120px]"
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a detailed description of the issue..." 
                rows="4"
              ></textarea>
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Attachments (Optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 hover:bg-primary/5 dark:hover:bg-primary/5 transition-colors group cursor-pointer relative">
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
                    <span className="font-bold text-primary">Upload a file</span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">PNG, JPG up to 10MB</p>
                </div>
              </div>

              {/* Attachment Previews */}
              {attachments.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold border border-primary/20 animate-in fade-in zoom-in duration-200">
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
            className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-black uppercase text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95" 
            type="button"
          >
            Cancel
          </button>
          <button 
            form="ticket-form"
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-xl text-sm font-black uppercase text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2" 
            type="submit"
          >
            {isSubmitting ? (
              <>
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Submit Ticket</span>
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