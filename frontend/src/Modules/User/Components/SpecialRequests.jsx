import React from 'react';

const SpecialRequests = () => (
    <section className="space-y-4">
        <h2 className="text-xl font-bold">Special Requests</h2>
        <div>
            <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="special-requests">Notes</label>
            <textarea 
                className="form-textarea w-full rounded-lg bg-white/5 dark:bg-white/5 p-3 text-sm text-white/80" 
                id="special-requests" 
                placeholder="Any dietary restrictions, accessibility needs, or other preferences?" 
                rows="4"
            ></textarea>
        </div>
    </section>
);

export default SpecialRequests;