interface HeaderProps {
  onToggleFilters: () => void;
  showFilters: boolean;
}

export default function Header({ onToggleFilters, showFilters }: HeaderProps) {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      {/* Banner image */}
      <div className="w-full overflow-hidden bg-slate-900 flex justify-center">
        <img
          src="/header-banner.jpg"
          alt="The American Civil War: A Nation Divided, 1861-1865"
          className="h-16 sm:h-20 md:h-24 w-auto object-contain"
        />
      </div>

      <div className="px-4 py-2 flex items-center justify-between">
        {/* Left spacer for balance */}
        <div className="flex-1" />

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Filter toggle button */}
          <button
            onClick={onToggleFilters}
            className={`px-3 py-2 rounded flex items-center gap-2 transition-colors ${
              showFilters
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            title="Toggle Filters"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="hidden sm:inline">Filters</span>
          </button>

          {/* Info/Help button */}
          <button
            className="px-3 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
            title="About"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Legend bar */}
      <div className="bg-slate-700 px-4 py-2 flex items-center gap-6 text-xs">
        <span className="text-slate-400">Map Legend:</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-slate-300">Union Victory</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-slate-300">Confederate Victory</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-slate-300">Inconclusive</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-4 border-l border-slate-600 pl-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-blue-400 opacity-30 border border-blue-400"></div>
            <span className="text-slate-300">Union State</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-gray-400 opacity-30 border border-gray-400"></div>
            <span className="text-slate-300">Confederate State</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-amber-400 opacity-30 border border-amber-400"></div>
            <span className="text-slate-300">Border State</span>
          </div>
        </div>
      </div>
    </header>
  );
}
