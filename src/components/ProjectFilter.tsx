interface ProjectFilterProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProjectFilter({ categories, activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
          ${activeFilter === 'all' 
            ? 'bg-blue-600 text-white dark:bg-blue-500' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
            ${activeFilter === category 
              ? 'bg-blue-600 text-white dark:bg-blue-500' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}