import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CardHighlightProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CardHighlight({
  icon: Icon,
  title,
  description,
}: CardHighlightProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-blue-100">
      <CardContent className="p-6 space-y-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-xl text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
