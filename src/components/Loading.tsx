interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Loading({ message = "Loading...", size = 'medium' }: LoadingProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-6 h-6';
      case 'medium':
        return 'w-8 h-8';
      case 'large':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#36393F]">
      <div className="text-center">
        {/* Spinner */}
        <div className={`${getSizeClasses()} mx-auto mb-4 border-4 border-primary-200 border-t-green rounded-full animate-spin`}></div>
        
        {/* Loading text */}
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}