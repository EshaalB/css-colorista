
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ShapePreview = ({ settings }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [cssCode, setCssCode] = useState("");

  useEffect(() => {
    generateCSSCode();
  }, [settings]);

  const generateCSSCode = () => {
    let background = settings.backgroundColor;
    if (settings.fillType === "linear-gradient") {
      background = `linear-gradient(${settings.gradientAngle}deg, ${settings.backgroundColor}, ${settings.gradientColor})`;
    } else if (settings.fillType === "radial-gradient") {
      background = `radial-gradient(circle, ${settings.backgroundColor}, ${settings.gradientColor})`;
    }

    let width = `${settings.width}px`;
    let height = settings.shapeType === "rectangle" ? `${settings.height}px` : width;
    
    let borderRadius = "0";
    if (settings.shapeType === "circle") {
      borderRadius = "50%";
    } else if (settings.shapeType === "square" || settings.shapeType === "rectangle" || settings.shapeType === "text") {
      borderRadius = `${settings.borderRadius}px`;
    }

    let clipPath = "";
    if (settings.shapeType === "triangle") {
      clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
      borderRadius = "0";
    } else if (settings.shapeType === "random") {
      const randomPoints = [
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`
      ];
      clipPath = `polygon(${randomPoints.join(', ')})`;
      borderRadius = "0";
    }

    let transform = settings.rotation !== 0 ? `rotate(${settings.rotation}deg)` : "none";

    let boxShadow = "none";
    if (settings.shadowSize > 0) {
      boxShadow = `${settings.shadowOffsetX}px ${settings.shadowOffsetY}px ${settings.shadowBlur}px ${settings.shadowSize}px ${settings.shadowColor}`;
    }

    let css = "";
    
    if (settings.shapeType === "text") {
      css = `.text-shape {
  color: ${settings.textColor};
  font-size: ${settings.fontSize}px;
  font-weight: ${settings.fontWeight};
  line-height: ${settings.lineHeight};
  letter-spacing: ${settings.letterSpacing}px;
  padding: 20px;
  background: ${background};
  border: ${settings.borderWidth}px solid ${settings.borderColor};
  border-radius: ${borderRadius};
  transform: ${transform};
  box-shadow: ${boxShadow};
  width: ${width};
  text-align: center;
  overflow-wrap: break-word;
}`;
    } else {
      css = `.shape {
  width: ${width};
  height: ${height};
  background: ${background};
  border: ${settings.borderWidth}px solid ${settings.borderColor};
  border-radius: ${borderRadius};
  ${clipPath ? `clip-path: ${clipPath};` : ""}
  transform: ${transform};
  box-shadow: ${boxShadow};
}`;
    }

    setCssCode(css);
  };

  const getShapeStyle = () => {
    let background = settings.backgroundColor;
    if (settings.fillType === "linear-gradient") {
      background = `linear-gradient(${settings.gradientAngle}deg, ${settings.backgroundColor}, ${settings.gradientColor})`;
    } else if (settings.fillType === "radial-gradient") {
      background = `radial-gradient(circle, ${settings.backgroundColor}, ${settings.gradientColor})`;
    }

    let style = {
      width: `${settings.width}px`,
      height: settings.shapeType === "rectangle" ? `${settings.height}px` : `${settings.width}px`,
      background: background,
      border: `${settings.borderWidth}px solid ${settings.borderColor}`,
      transform: `rotate(${settings.rotation}deg)`,
    };

    if (settings.shadowSize > 0) {
      style.boxShadow = `${settings.shadowOffsetX}px ${settings.shadowOffsetY}px ${settings.shadowBlur}px ${settings.shadowSize}px ${settings.shadowColor}`;
    }

    if (settings.shapeType === "circle") {
      style.borderRadius = "50%";
    } else if (settings.shapeType === "square" || settings.shapeType === "rectangle") {
      style.borderRadius = `${settings.borderRadius}px`;
    } else if (settings.shapeType === "triangle") {
      style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
      style.height = `${settings.width}px`;
    } else if (settings.shapeType === "random") {
      const randomPoints = [
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`,
        `${Math.random() * 100}% ${Math.random() * 100}%`
      ];
      style.clipPath = `polygon(${randomPoints.join(', ')})`;
      style.height = `${settings.width}px`;
    } else if (settings.shapeType === "text") {
      style = {
        ...style,
        color: settings.textColor,
        fontSize: `${settings.fontSize}px`,
        fontWeight: settings.fontWeight,
        lineHeight: settings.lineHeight,
        letterSpacing: `${settings.letterSpacing}px`,
        padding: '20px',
        textAlign: 'center',
        borderRadius: `${settings.borderRadius}px`,
        overflowWrap: 'break-word',
      };
    }

    return style;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "CSS code copied to clipboard successfully!",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadCSS = () => {
    const element = document.createElement("a");
    const file = new Blob([cssCode], { type: "text/css" });
    element.href = URL.createObjectURL(file);
    element.download = "css-shape.css";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 preview-grid flex items-center justify-center overflow-hidden">
        {settings.shapeType === "text" ? (
          <div className="text-shape" style={getShapeStyle()}>
            {settings.text || "Your text here"}
          </div>
        ) : (
          <div className="shape" style={getShapeStyle()}></div>
        )}
      </div>
      
      <div className="p-6 border-t bg-muted/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Generated CSS</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadCSS}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="default" size="sm" onClick={copyToClipboard}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy CSS
                </>
              )}
            </Button>
          </div>
        </div>
        <pre className="bg-card p-4 rounded-md overflow-auto max-h-48 text-sm">
          <code>{cssCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default ShapePreview;
