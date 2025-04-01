import React from "react";
import { Bell, X } from "lucide-react";
import { format } from "date-fns";

// Define the structure of a notification
interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

// Define the props for the NotificationCenter component
interface NotificationCenterProps {
    notifications: Notification[];
    onClose: () => void;
    onMarkAsRead: (id: string) => void;
}

// NotificationCenter component
export function NotificationCenter({ notifications, onClose, onMarkAsRead }: NotificationCenterProps) {
    return (
        <div className="fixed right-0 top-16 h-screen w-full max-w-sm bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700">
            {/* Header section with title and close button */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
            </div>

            {/* Notifications list */}
            <div className="overflow-y-auto h-[calc(100vh-4rem)]">
                {notifications.length === 0 ? (
                    // Display message when there are no notifications
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No notifications yet
                    </div>
                ) : (
                    // Map through notifications and render each one
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700
                                ${notification.read ? 'opacity-75' : ''}`}
                        >
                            {/* Notification title and timestamp */}
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    {notification.title}
                                </h3>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                                </span>
                            </div>

                            {/* Notification message */}
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {notification.message}
                            </p>

                            {/* Mark as read button for unread notifications */}
                            {!notification.read && (
                                <button
                                    onClick={() => onMarkAsRead(notification.id)}
                                    className="mt-2 text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Mark as read
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}