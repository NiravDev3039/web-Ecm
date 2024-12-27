const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center gap-2 mt-3">
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        className={`px-4 py-2 rounded-md transition duration-200 ease-in-out ${
          currentPage === index + 1
            ? 'bg-blue-500 text-white transform scale-105'
            : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-500'
        }`}
        onClick={() => onPageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
