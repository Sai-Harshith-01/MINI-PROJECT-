const StatsCard = ({ title, value, icon, color = 'blue' }) => {
 const colorClasses = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
 };

 return (
  <div className="card">
   <div className="flex items-center justify-between">
    <div>
     <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
     <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${colorClasses[color]}`}>
     {icon}
    </div>
   </div>
  </div>
 );
};

export default StatsCard;
