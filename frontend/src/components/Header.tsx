interface HeaderProps {
  onToggleFilters: () => void;
  showFilters: boolean;
}

export default function Header({ onToggleFilters, showFilters }: HeaderProps) {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">US Civil War</h1>
            <p className="text-xs text-slate-300">Interactive Historical Map</p>
          </div>
        </div>

        {/* Center: Time period indicator */}
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-300">
          <span>1861</span>
          <div className="w-32 h-1 bg-slate-600 rounded relative">
            <div className="absolute inset-0 bg-blue-400 rounded" style={{ width: '100%' }} />
          </div>
          <span>1865</span>
        </div>

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
