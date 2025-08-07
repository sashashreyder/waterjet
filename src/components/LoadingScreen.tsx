import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sky-600 mb-2">RezkaGidro</h1>
          <p className="text-slate-600">Гидроабразивная резка</p>
        </div>
        
        <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="mt-4 text-sm text-slate-500">
          Загрузка... {progress}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
