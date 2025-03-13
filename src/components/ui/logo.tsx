interface LogoProps {
  variant?: "default" | "white";
  className?: string;
}

export function Logo({ variant = "default", className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`w-10 h-10 ${variant === "white" ? "bg-white/20" : "bg-gradient-to-br from-blue-600 to-blue-700"} rounded-lg flex items-center justify-center shadow-lg`}
      >
        <span className="text-white font-bold text-xl">U</span>
      </div>
      <div className="flex flex-col">
        <span
          className={`font-bold text-lg ${variant === "white" ? "text-white" : "text-blue-600"}`}
        >
          UBPCT
        </span>
        <span
          className={`text-xs ${variant === "white" ? "text-blue-100" : "text-gray-500"}`}
        >
          União Brasileira
        </span>
      </div>
    </div>
  );
}
