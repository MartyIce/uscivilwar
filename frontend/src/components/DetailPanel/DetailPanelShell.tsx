import type { ReactNode } from 'react';

interface DetailPanelShellProps {
  children: ReactNode;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
  onClose: () => void;
}

function NavigationHeader({
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onClose,
}: {
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
  onClose: () => void;
}) {
  const hasHistory = canGoBack || canGoForward;

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center gap-1">
        {hasHistory && (
          <>
            <button
              onClick={onGoBack}
              disabled={!canGoBack}
              className={`p-1.5 rounded transition-colors ${
                canGoBack
                  ? 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={onGoForward}
              disabled={!canGoForward}
              className={`p-1.5 rounded transition-colors ${
                canGoForward
                  ? 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title="Go forward"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      <button
        onClick={onClose}
        className="p-1.5 rounded text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
        title="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default function DetailPanelShell({
  children,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onClose,
}: DetailPanelShellProps) {
  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
      <NavigationHeader
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={onGoBack}
        onGoForward={onGoForward}
        onClose={onClose}
      />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
