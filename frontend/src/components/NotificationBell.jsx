import { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

const NotificationBell = () => {
 const [notifications, setNotifications] = useState([]);
 const [showDropdown, setShowDropdown] = useState(false);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  fetchNotifications();
 }, []);

 const fetchNotifications = async () => {
  try {
   const data = await notificationService.getNotifications();
   setNotifications(data);
  } catch (error) {
   console.error('Failed to fetch notifications:', error);
  }
 };

 const unreadCount = notifications.filter(n => !n.is_read).length;

 const handleMarkAsRead = async (notificationId) => {
  try {
   await notificationService.markAsRead(notificationId);
   fetchNotifications();
  } catch (error) {
   console.error('Failed to mark as read:', error);
  }
 };

 const handleMarkAllAsRead = async () => {
  setLoading(true);
  try {
   await notificationService.markAllAsRead();
   fetchNotifications();
  } catch (error) {
   console.error('Failed to mark all as read:', error);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="relative">
   {/* Bell Icon */}
   <button
    onClick={() => setShowDropdown(!showDropdown)}
    className="relative text-white hover:text-primary-100 transition-colors"
   >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
    {unreadCount > 0 && (
     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {unreadCount}
     </span>
    )}
   </button>

   {/* Dropdown */}
   {showDropdown && (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
     <div className="p-4 border-b flex justify-between items-center">
      <h3 className="font-bold text-gray-800">Notifications</h3>
      {unreadCount > 0 && (
       <button
        onClick={handleMarkAllAsRead}
        disabled={loading}
        className="text-sm text-primary-500 hover:text-primary-700"
       >
        Mark all as read
       </button>
      )}
     </div>

     {notifications.length === 0 ? (
      <div className="p-4 text-center text-gray-500">
       No notifications
      </div>
     ) : (
      notifications.map((notification) => (
       <div
        key={notification.id}
        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notification.is_read ? 'bg-blue-50' : ''
         }`}
        onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
       >
        <div className="flex justify-between items-start">
         <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-sm">
           {notification.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
           {notification.message}
          </p>
          <span className="text-xs text-gray-500 mt-1 block">
           {new Date(notification.created_at).toLocaleString()}
          </span>
         </div>
         {!notification.is_read && (
          <div className="w-2 h-2 bg-primary-500 rounded-full ml-2 mt-1"></div>
         )}
        </div>
       </div>
      ))
     )}
    </div>
   )}
  </div>
 );
};

export default NotificationBell;
