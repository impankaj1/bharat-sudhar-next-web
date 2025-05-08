import { Bell } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const Logo = ({ size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6 mr-1.5 text-lg",
    md: "h-8 w-8 mr-2 text-xl",
    lg: "h-12 w-12 mr-3 text-3xl",
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <Bell
          className={`${sizeClasses[size]
            .split(" ")
            .slice(0, 2)
            .join(" ")} text-primary`}
        />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full border-2 border-white"></div>
      </div>
      <div className="font-bold flex items-center">
        <span className="text-primary">Bharat</span>
        <span className="text-secondary">Sudhar</span>
      </div>
    </div>
  );
};

export default Logo;
