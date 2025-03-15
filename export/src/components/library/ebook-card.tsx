import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import type { Tables } from "@/types/supabase";

type Ebook = Tables<"ebooks">;

interface EbookCardProps {
  ebook: Ebook;
}

export function EbookCard({ ebook }: EbookCardProps) {
  const [preview, setPreview] = useState(false);

  return (
    <>
      <Card className="flex flex-col overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={ebook.cover_url}
            alt={ebook.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">{ebook.category}</Badge>
          </div>
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="font-semibold line-clamp-2 mb-2">{ebook.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {ebook.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setPreview(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <a
              href={ebook.file_url}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <iframe
            src={ebook.file_url}
            title={ebook.title}
            className="w-full h-full"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
