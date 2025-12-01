const NewsCard = ({ news }) => {
 const handleReadMore = () => {
  window.open(news.link, '_blank');
 };

 // Deterministic rotation based on title length to keep it consistent
 const defaultImgIndex = (news.title ? news.title.length % 5 : 0) + 1;
 const defaultImg = `/news-default/img${defaultImgIndex}.png`;

 const imageSrc = news.urlToImage || news.image || defaultImg;

 return (
  <div
   className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer overflow-hidden border border-gray-100"
   onClick={handleReadMore}
  >
   <div className="flex flex-row items-stretch h-full">
    {/* Left Column - Content */}
    <div className="flex flex-col flex-1 p-5 min-w-0">
     {/* Source Badge */}
     <div className="mb-3">
      <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
       {news.source}
      </span>
     </div>

     {/* Title */}
     <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
      {news.title}
     </h3>

     {/* Description */}
     <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2 leading-relaxed">
      {news.summary}
     </p>

     {/* Footer - Date and Read More */}
     <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
      <span className="text-xs text-gray-500 font-medium">
       {new Date(news.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
       })}
      </span>
      <span className="text-blue-600 text-xs font-semibold hover:text-blue-700 transition-colors flex items-center gap-1">
       Read More
       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
       </svg>
      </span>
     </div>
    </div>

    {/* Right Column - Image */}
    <div className="flex-shrink-0 w-[140px] h-full flex items-center p-3">
     <div className="w-full h-[110px] rounded-xl overflow-hidden">
      <img
       src={imageSrc}
       alt={news.title}
       className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
     </div>
    </div>
   </div>
  </div>
 );
};

export default NewsCard;
