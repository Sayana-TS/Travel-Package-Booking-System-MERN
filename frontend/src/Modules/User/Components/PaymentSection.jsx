import React from 'react';

const PaymentSection = ({ data }) => (
    <div className="space-y-4">
        <h2 className="text-xl font-bold">Payment</h2>
        <div className="space-y-4">
            {/* Payment Method Select */}
            <div>
                <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="payment-method">Payment Method</label>
                <select 
                    className="form-select w-full rounded-lg bg-white/10 dark:bg-white/10 p-3 text-sm text-white/80" 
                    id="payment-method"
                >
                    <option className="bg-background-dark">Credit Card</option>
                    <option className="bg-background-dark">Debit Card</option>
                    <option className="bg-background-dark">PayPal</option>
                </select>
            </div>
            {/* Card Number Input */}
            <div>
                <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="card-number">Card Number</label>
                <input 
                    className="form-input w-full rounded-lg bg-white/10 dark:bg-white/10 p-3 text-sm text-white/80" 
                    id="card-number" 
                    placeholder="•••• •••• •••• ••••" 
                    type="text"
                />
            </div>
            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="expiry-date">Expiry Date</label>
                    <input 
                        className="form-input w-full rounded-lg bg-white/10 dark:bg-white/10 p-3 text-sm text-white/80" 
                        id="expiry-date" 
                        placeholder="MM/YY" 
                        type="text"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2" htmlFor="cvv">CVV</label>
                    <input 
                        className="form-input w-full rounded-lg bg-white/10 dark:bg-white/10 p-3 text-sm text-white/80" 
                        id="cvv" 
                        placeholder="•••" 
                        type="text"
                    />
                </div>
            </div>
        </div>
        
        {/* Terms & Conditions Checkbox and Button */}
        <div className="pt-4 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
                <input 
                    className="form-checkbox h-5 w-5 rounded bg-white/10 text-primary border-white/20 checked:bg-primary" 
                    type="checkbox" 
                />
                <span className="text-sm text-white/80">
                    I agree to the <a className="font-medium text-primary hover:underline" href="#">Terms & Conditions</a>
                </span>
            </label>
            <button 
                className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-background-dark text-base font-bold hover:opacity-90 transition-opacity"
            >
                Confirm Booking
            </button>
        </div>
    </div>
);

export default PaymentSection;