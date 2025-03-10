import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  GraduationCap,
  Home,
  UserCircle,
  MessageCircle,
  Settings,
} from "lucide-react";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className = "" }: MainNavProps) {
  return (
    <nav className={`flex items-center space-x-4 lg:space-x-6 ${className}`}>
      <Button asChild variant="ghost">
        <Link to="/">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/profile">
          <UserCircle className="h-4 w-4 mr-2" />
          Profile
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/courses">
          <GraduationCap className="h-4 w-4 mr-2" />
          Courses
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/library">
          <BookOpen className="h-4 w-4 mr-2" />
          Library
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/support">
          <MessageCircle className="h-4 w-4 mr-2" />
          Support
        </Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/admin/members">
          <Settings className="h-4 w-4 mr-2" />
          Admin
        </Link>
      </Button>
    </nav>
  );
}
