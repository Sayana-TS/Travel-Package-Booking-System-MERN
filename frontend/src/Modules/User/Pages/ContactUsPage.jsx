import React, { useState } from 'react';
import UserLayout from '../Layouts/UserLayout';
import Breadcrumb from '../Components/Breadcrumb';

// --- MOCK DATA ---
const BREADCRUMB_PATH = [
    { label: 'Home', href: '#' },
];

const MOCK_REQUESTS = [
    {
        id: '12345',
        subject: 'Issue with booking payment',
        status: 'Open',
        date: '2023-08-15',
        originalMessage: 'I am having trouble completing my booking for the Yosemite trip. The payment is not going through.',
        replies: [
            { sender: 'Agent', time: '2 hours ago', message: 'We are looking into this issue. Please provide your booking reference number.', avatar: 'A' },
            { sender: 'You', time: '1 hour ago', message: 'My booking reference number is XYZ123.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKhYh3on37irl0VMhl_EMM-iif5pLksmVXncWl3NsM2v3koZrlTX6CM6VA4AwUQCrFOkkr6GiA3sGotWtHF0VUgZR9SKi9KyjDR3aPFrA2xGTYPGZ7j2796wo560IZoMnQPUeopTViARPfv8wN1GG7Q6h_Z_KhkBq_V06T1aE8opA6WZCcwO8vbmUS-7EizgSkL57LN_FrW4_Ui0InKFzAhHxaWZTIANFwAVSwNNnHXgEm1p8YnseNxLHgguoLY1zKYem-DElTkek' },
        ],
    },
    {
        id: '67890',
        subject: 'Payment inquiry',
        status: 'Pending',
        date: '2023-08-10',
        originalMessage: 'Just confirming if my recent payment went through.',
        replies: [],
    },
    {
        id: '11223',
        subject: 'Feedback on recent trip',
        status: 'Resolved',
        date: '2023-08-05',
        originalMessage: 'The local guide on the recent trip was excellent!',
        replies: [],
    },
];

// ===================================================================
// Sub-Component 1: ContactForm
// ===================================================================

const ContactForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (API call, etc.)
        console.log('Submitting new support ticket...');
    };

    return (
        <div className="bg-white dark:bg-card-dark rounded-xl p-8 mb-12 shadow-md">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Submit a Request</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white" htmlFor="subject">Subject</label>
                    <input 
                        className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-500 dark:placeholder:text-subtext-dark text-gray-900 dark:text-white" 
                        id="subject" 
                        placeholder="e.g., Issue with booking payment" 
                        type="text" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white" htmlFor="category">Category</label>
                    {/* Select input custom styling for arrow */}
                    <select 
                        className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none bg-no-repeat bg-right pr-8 text-gray-900 dark:text-white" 
                        id="category" 
                        style={{
                            backgroundImage: `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23056bd1%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06z%27 clip-rule=%27evenodd%27 /%3e%3c/svg%3e')`,
                            backgroundPosition: 'right 0.75rem center'
                        }}
                    >
                        <option className="text-gray-500 dark:text-gray-400">Select a category</option>
                        <option>Booking Inquiry</option>
                        <option>Payment Issue</option>
                        <option>Technical Support</option>
                        <option>General Feedback</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white" htmlFor="description">Description</label>
                    <textarea 
                        className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-500 dark:placeholder:text-subtext-dark text-gray-900 dark:text-white" 
                        id="description" 
                        placeholder="Please describe your issue in detail..." 
                        rows="5"
                    />
                </div>
                <div className="flex justify-end pt-2">
                    <button 
                        className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-md" 
                        type="submit"
                    >
                        Submit Ticket
                    </button>
                </div>
            </form>
        </div>
    );
};

// ===================================================================
// Sub-Component 2: RequestAccordionItem
// ===================================================================

const getStatusClasses = (status) => {
    switch (status) {
        case 'Open':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'Pending':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'Resolved':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

const RequestAccordionItem = ({ request }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleReply = (e) => {
        e.preventDefault();
        // Handle reply submission logic
        console.log(`Submitting reply for ticket ${request.id}`);
    };

    return (
        // The original HTML used group-focus-within for the accordion logic. 
        // In React, using a state variable (isOpen) and standard Tailwind class names is more reliable 
        // and doesn't rely on focus state for expand/collapse.
        <div className="group bg-white dark:bg-card-dark rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
            <button 
                className="w-full text-left p-6 flex items-center justify-between hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 items-center">
                    <div className="font-medium text-primary">#{request.id}</div>
                    <div className="text-gray-900 dark:text-white col-span-2 md:col-span-1 truncate">{request.subject}</div>
                    <div className="hidden md:block">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(request.status)}`}>
                            {request.status}
                        </span>
                    </div>
                    <div className="hidden md:block text-gray-500 dark:text-subtext-dark text-sm">{request.date}</div>
                </div>
                <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    expand_more
                </span>
            </button>
            
            {/* Accordion Content */}
            <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
                // The max-h value should be large enough to contain the content
            >
                <div className="border-t border-gray-200 dark:border-white/10 p-6 space-y-6">
                    <div>
                        <p className="font-semibold mb-2 text-gray-900 dark:text-white">Original Message:</p>
                        <p className="text-gray-500 dark:text-subtext-dark">{request.originalMessage}</p>
                    </div>

                    {request.replies.length > 0 && (
                        <div className="space-y-4">
                            <p className="font-semibold text-gray-900 dark:text-white">Replies:</p>
                            {request.replies.map((reply, index) => (
                                <div key={index} className="flex gap-3">
                                    <div 
                                        className="size-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm"
                                        style={{
                                            backgroundImage: reply.sender === 'You' ? `url(${reply.avatar})` : 'none',
                                            backgroundColor: reply.sender === 'You' ? 'transparent' : 'rgba(5, 107, 209, 0.1)', // Primary blue with opacity
                                            color: reply.sender === 'You' ? 'transparent' : '#056bd1',
                                            backgroundSize: reply.sender === 'You' ? 'cover' : 'initial',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        {reply.sender === 'Agent' ? reply.avatar : null}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{reply.sender} <span className="text-xs text-gray-500 dark:text-subtext-dark ml-2">{reply.time}</span></p>
                                        <p className="text-gray-500 dark:text-subtext-dark mt-1">{reply.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="pt-4">
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white" htmlFor={`reply-${request.id}`}>Your Reply</label>
                        <textarea 
                            className="w-full bg-background-light dark:bg-background-dark border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-500 dark:placeholder:text-subtext-dark text-gray-900 dark:text-white" 
                            id={`reply-${request.id}`} 
                            placeholder="Enter your reply..." 
                            rows="3"
                        />
                        <div className="flex justify-end mt-4">
                            <button 
                                className="bg-primary text-white font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-opacity" 
                                type="button" 
                                onClick={handleReply}
                            >
                                Submit Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// ===================================================================
// Main Component: ContactUsPage
// ===================================================================

const ContactUsPage = () => {
    // Current Page Breadcrumb
    const currentPageBreadcrumb = [
        ...BREADCRUMB_PATH,
        { label: 'Help', href: '/help' },
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white">
            <UserLayout>
                {/* WIDE CONTAINER FOR BREADCRUMB (max-w-8xl is assumed from previous context) */}
                <main className="w-full mx-auto max-w-8xl px-4 py-8 sm:px-10">
                    
                    {/* Breadcrumb Section */}
                    <div className="mb-8">
                        <Breadcrumb 
                            path={currentPageBreadcrumb} 
                            currentPage="Contact Us"
                        />
                    </div>

                    {/* MAIN CONTENT CONTAINER: max-w-4xl (to match HTML structure) and centered */}
                    <div className="mx-auto w-full max-w-4xl">
                        
                        {/* Header */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Contact Us</h2>
                            <p className="text-gray-500 dark:text-subtext-dark">Have a question or need assistance? Fill out the form below.</p>
                        </div>

                        {/* 1. Contact Form */}
                        <ContactForm />

                        {/* 2. Previous Requests */}
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Your Requests</h3>
                            <div className="space-y-4">
                                {MOCK_REQUESTS.map(request => (
                                    <RequestAccordionItem key={request.id} request={request} />
                                ))}
                            </div>
                        </div>

                    </div>
                </main>
            </UserLayout>
        </div>
    );
};

export default ContactUsPage;