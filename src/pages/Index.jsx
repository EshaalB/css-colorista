
import { useState } from "react";
import Header from "@/components/Header";
import ShapeControls from "@/components/ShapeControls";
import ShapePreview from "@/components/ShapePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Wand2, Palette, Shapes, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [settings, setSettings] = useState({
    shapeType: "circle",
    width: 200,
    height: 100,
    borderRadius: 20,
    rotation: 0,
    backgroundColor: "#8B5CF6",
    borderWidth: 4,
    borderColor: "#6D28D9",
    fillType: "solid",
    gradientColor: "#0EA5E9",
    gradientAngle: 45,
    shadowSize: 10,
    shadowBlur: 15,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    // Text-specific settings
    text: "CSS Colorista",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: 0,
    textColor: "#FFFFFF",
  });

  const randomizeSettings = () => {
    const shapeTypes = ["circle", "square", "rectangle", "triangle", "text", "random"];
    const fillTypes = ["solid", "linear-gradient", "radial-gradient"];
    const colors = ["#8B5CF6", "#0EA5E9", "#EC4899", "#F97316", "#10B981", "#F43F5E", "#6366F1"];
    const textOptions = ["CSS Art", "Colorista", "Beautiful Shapes", "Awesome CSS", "Web Design", "Creative CSS"];
    
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
    const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    
    const newSettings = {
      ...settings,
      shapeType: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      width: randomBetween(50, 300),
      height: randomBetween(50, 200),
      borderRadius: randomBetween(0, 100),
      rotation: randomBetween(0, 360),
      backgroundColor: randomColor(),
      borderWidth: randomBetween(0, 10),
      borderColor: randomColor(),
      fillType: fillTypes[Math.floor(Math.random() * fillTypes.length)],
      gradientColor: randomColor(),
      gradientAngle: randomBetween(0, 360),
      shadowSize: randomBetween(0, 20),
      shadowBlur: randomBetween(0, 30),
      shadowOffsetX: randomBetween(-20, 20),
      shadowOffsetY: randomBetween(-20, 20),
      shadowColor: `rgba(0, 0, 0, ${randomBetween(1, 9) / 10})`,
      // Text-specific randomizations
      text: textOptions[Math.floor(Math.random() * textOptions.length)],
      fontSize: randomBetween(12, 48),
      fontWeight: [300, 400, 500, 600, 700, 800][randomBetween(0, 5)],
      lineHeight: randomBetween(10, 20) / 10,
      letterSpacing: randomBetween(-3, 10),
      textColor: randomColor(),
    };
    
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="container py-6 px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-creator-purple to-creator-teal bg-clip-text text-transparent">
              CSS Colorista
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Create beautiful CSS shapes and gradients with an interactive generator
            </p>
            <div className="flex items-center justify-center gap-3">
              <Wand2 className="w-5 h-5 text-creator-purple animate-pulse-slow" />
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Palette className="w-5 h-5 text-creator-teal animate-pulse-slow" />
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Shapes className="w-5 h-5 text-creator-pink animate-pulse-slow" />
            </div>
          </div>
        </div>
        
        <div className="container flex-1 pb-8 px-4">
          <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-4 bg-white/50 dark:bg-black/50 backdrop-blur border-b flex items-center justify-between">
                <h2 className="font-semibold">Controls</h2>
                <Button variant="outline" size="sm" onClick={randomizeSettings}>
                  <Shuffle className="h-4 w-4 mr-2" />
                  Randomize
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="p-6">
                  <ShapeControls 
                    settings={settings} 
                    onSettingsChange={setSettings} 
                  />
                </div>
              </ScrollArea>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-4 bg-white/50 dark:bg-black/50 backdrop-blur border-b">
                <h2 className="font-semibold">Preview</h2>
              </div>
              <div className="h-[calc(100vh-280px)]">
                <ShapePreview settings={settings} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          CSS Colorista — Create beautiful CSS shapes with ease
        </div>
      </footer>
    </div>
  );
};

export default Index;
