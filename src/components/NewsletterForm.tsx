import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import type { Category } from '../types';

export function NewsletterForm() {
    // State for email input
    const [email, setEmail] = useState('');

    // State for subscription frequency (daily or weekly)
    const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

    // State for selected categories (default is 'all')
    const [selectedCategories] = useState<Category[]>(['all']);

    // State to track if the form has been submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Log the form data (replace this with a backend API call)
        console.log({ email, frequency, selectedCategories });

        // Mark the form as submitted and reset the email field
        setIsSubmitted(true);
        setEmail('');
    };

    // Render a thank-you message if the form is submitted
    if (isSubmitted) {
        return (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Thank you for subscribing!
                </h3>
                <p className="text-blue-600 dark:text-blue-300">
                    Check your email to confirm your subscription.
                </p>
            </div>
        );
    }

    // Render the subscription form
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            {/* Header with icon and title */}
            <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Subscribe to Our Newsletter
                </h3>
            </div>

            {/* Subscription form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email input field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                    />
                </div>

                {/* Frequency selection (radio buttons) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Frequency
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="frequency"
                                value="daily"
                                checked={frequency === 'daily'}
                                onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
                                className="mr-2"
                            />
                            Daily
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="frequency"
                                value="weekly"
                                checked={frequency === 'weekly'}
                                onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
                                className="mr-2"
                            />
                            Weekly
                        </label>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md
                                     transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
}