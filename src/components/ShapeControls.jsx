
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ColorPicker from "./ColorPicker";

const ShapeControls = ({ settings, onSettingsChange }) => {
  const handleSliderChange = (setting, value) => {
    onSettingsChange({
      ...settings,
      [setting]: value[0],
    });
  };

  const handleColorChange = (setting, value) => {
    onSettingsChange({
      ...settings,
      [setting]: value,
    });
  };

  const handleSelectChange = (setting, value) => {
    onSettingsChange({
      ...settings,
      [setting]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Shape</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Shape Type</Label>
            <Select value={settings.shapeType} onValueChange={(value) => handleSelectChange("shapeType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="rectangle">Rectangle</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Width ({settings.width}px)</Label>
            <Slider 
              value={[settings.width]} 
              min={10} 
              max={500} 
              step={1}
              onValueChange={(value) => handleSliderChange("width", value)} 
            />
          </div>

          {settings.shapeType === "rectangle" && (
            <div className="space-y-2">
              <Label>Height ({settings.height}px)</Label>
              <Slider 
                value={[settings.height]} 
                min={10} 
                max={500} 
                step={1}
                onValueChange={(value) => handleSliderChange("height", value)} 
              />
            </div>
          )}

          {(settings.shapeType === "circle" || settings.shapeType === "square") && (
            <div className="space-y-2">
              <Label>Border Radius ({settings.borderRadius}px)</Label>
              <Slider 
                value={[settings.borderRadius]} 
                min={0} 
                max={250} 
                step={1}
                onValueChange={(value) => handleSliderChange("borderRadius", value)} 
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Rotation ({settings.rotation}°)</Label>
            <Slider 
              value={[settings.rotation]} 
              min={0} 
              max={360} 
              step={1}
              onValueChange={(value) => handleSliderChange("rotation", value)} 
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Style</h3>
        <div className="space-y-4">
          <ColorPicker 
            label="Background Color"
            color={settings.backgroundColor}
            onChange={(color) => handleColorChange("backgroundColor", color)}
          />

          <div className="space-y-2">
            <Label>Border Width ({settings.borderWidth}px)</Label>
            <Slider 
              value={[settings.borderWidth]} 
              min={0} 
              max={20} 
              step={1}
              onValueChange={(value) => handleSliderChange("borderWidth", value)} 
            />
          </div>

          <ColorPicker 
            label="Border Color"
            color={settings.borderColor}
            onChange={(color) => handleColorChange("borderColor", color)}
          />

          <div className="pt-2">
            <Label className="mb-2 block">Fill Type</Label>
            <Select value={settings.fillType} onValueChange={(value) => handleSelectChange("fillType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fill type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="solid">Solid Color</SelectItem>
                  <SelectItem value="linear-gradient">Linear Gradient</SelectItem>
                  <SelectItem value="radial-gradient">Radial Gradient</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {settings.fillType !== "solid" && (
            <ColorPicker 
              label="Gradient Color 2"
              color={settings.gradientColor}
              onChange={(color) => handleColorChange("gradientColor", color)}
            />
          )}

          {settings.fillType === "linear-gradient" && (
            <div className="space-y-2">
              <Label>Gradient Angle ({settings.gradientAngle}°)</Label>
              <Slider 
                value={[settings.gradientAngle]} 
                min={0} 
                max={360} 
                step={1}
                onValueChange={(value) => handleSliderChange("gradientAngle", value)} 
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Shadow</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Shadow Size ({settings.shadowSize}px)</Label>
            <Slider 
              value={[settings.shadowSize]} 
              min={0} 
              max={50} 
              step={1}
              onValueChange={(value) => handleSliderChange("shadowSize", value)} 
            />
          </div>

          <div className="space-y-2">
            <Label>Shadow Blur ({settings.shadowBlur}px)</Label>
            <Slider 
              value={[settings.shadowBlur]} 
              min={0} 
              max={50} 
              step={1}
              onValueChange={(value) => handleSliderChange("shadowBlur", value)} 
            />
          </div>

          <div className="space-y-2">
            <Label>Shadow Offset X ({settings.shadowOffsetX}px)</Label>
            <Slider 
              value={[settings.shadowOffsetX]} 
              min={-50} 
              max={50} 
              step={1}
              onValueChange={(value) => handleSliderChange("shadowOffsetX", value)} 
            />
          </div>

          <div className="space-y-2">
            <Label>Shadow Offset Y ({settings.shadowOffsetY}px)</Label>
            <Slider 
              value={[settings.shadowOffsetY]} 
              min={-50} 
              max={50} 
              step={1}
              onValueChange={(value) => handleSliderChange("shadowOffsetY", value)} 
            />
          </div>

          <ColorPicker 
            label="Shadow Color"
            color={settings.shadowColor}
            onChange={(color) => handleColorChange("shadowColor", color)}
          />
        </div>
      </div>
    </div>
  );
};

export default ShapeControls;
