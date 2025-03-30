
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Palette, Code, Github } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-creator-purple" />
          <h1 className="text-xl font-bold">CSS Colorista</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" size="sm" className="hidden sm:flex gap-1">
              <Code className="h-4 w-4" />
              CSS Docs
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
