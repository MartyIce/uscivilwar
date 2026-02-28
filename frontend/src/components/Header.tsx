import { useState } from 'react';

interface HeaderProps {
  onToggleFilters: () => void;
  showFilters: boolean;
}

export default function Header({ onToggleFilters, showFilters }: HeaderProps) {
  const [showInfoModal, setShowInfoModal] = useState(false);

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
            onClick={() => setShowInfoModal(true)}
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

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">About This App</h2>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  An interactive map exploring the American Civil War (1861-1865).
                  Navigate through time to see battles, movements, and key figures.
                </p>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Interactive timeline with play/pause controls</li>
                    <li>Click battles on the map or timeline to see details</li>
                    <li>Track army movements of major commanders</li>
                    <li>Browse key figures from both sides</li>
                    <li>Filter events by type, date, and theater</li>
                    <li>Deep dive into major battles (e.g., Gettysburg)</li>
                    <li>View military command structure</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Quick Tips</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Timeline:</strong> Use play button or drag slider to move through time</li>
                    <li><strong>Track Armies:</strong> Click to follow commanders across the map</li>
                    <li><strong>People:</strong> Browse and click on figures to see their story</li>
                    <li><strong>Battles:</strong> Click markers for details, some have "Deep Dive" views</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
