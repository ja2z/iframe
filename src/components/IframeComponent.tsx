import { useState, useEffect, useRef } from 'react';

interface IframeComponentProps {
  src: string;
  title: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

const IframeComponent = ({
  src,
  title,
  className = "",
  onLoad,
  onError
}: IframeComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (src) {
      setIsLoading(true);
      setHasError(false);
      setErrorMessage("");
    }
  }, [src]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    setErrorMessage("Failed to load iframe content");
    onError?.("Failed to load iframe content");
  };

  // Handle cases where src is empty or invalid
  if (!src || src.trim() === "") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          <div className="text-gray-500 text-lg mb-2">No URL provided</div>
          <div className="text-gray-400 text-sm">
            Please configure a URL in the plugin settings
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col ${className}`} style={{ minHeight: 0 }}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-gray-600 text-sm">Loading content...</div>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
          <div className="text-center p-4">
            <div className="text-red-600 text-lg mb-2">⚠️ Error Loading Content</div>
            <div className="text-red-500 text-sm mb-3">{errorMessage}</div>
            <button
              onClick={() => {
                setIsLoading(true);
                setHasError(false);
                if (iframeRef.current) {
                  iframeRef.current.src = iframeRef.current.src;
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="w-full h-full border-0 flex-1"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        loading="lazy"
        style={{
          backgroundColor: 'transparent',
          display: 'block',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default IframeComponent;
