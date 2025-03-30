
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ColorPicker = ({ label, color, onChange }) => {
  const [colorValue, setColorValue] = useState(color || "#8B5CF6");

  useEffect(() => {
    if (color !== colorValue) {
      setColorValue(color);
    }
  }, [color]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColorValue(newColor);
    onChange(newColor);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`color-${label}`}>{label}</Label>
      <div className="flex items-center gap-2">
        <div 
          className="w-10 h-10 rounded-md border"
          style={{ backgroundColor: colorValue }}
        />
        <Input
          id={`color-${label}`}
          type="color"
          value={colorValue}
          onChange={handleColorChange}
          className="w-12 h-10 p-1 cursor-pointer"
        />
        <Input
          type="text"
          value={colorValue}
          onChange={handleColorChange}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
