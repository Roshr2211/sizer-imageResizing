import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Make sure to install js-cookie

export default function Resizer({ get_img_details, set_img_details }) {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [customPresets, setCustomPresets] = useState([]);

  const fixedPresets = [
    { name: 'Small', width: 320, height: 240 },
    { name: 'Medium', width: 640, height: 480 },
    { name: 'Large', width: 1024, height: 768 },
  ];

  // Load custom presets from cookies on mount
  useEffect(() => {
    const savedPresets = Cookies.get('customPresets');
    if (savedPresets) {
      setCustomPresets(JSON.parse(savedPresets));
    }
  }, []);

  const handleResize = () => {
    if (get_img_details) {
      // Update image details with the new width and height
      set_img_details({
        ...get_img_details,
        w: parseInt(width),
        h: parseInt(height),
      });
    }
  };

  const addCustomPreset = () => {
    const newPreset = {
      name: `Custom ${customPresets.length + 1}`,
      width: parseInt(width),
      height: parseInt(height),
    };
    const updatedPresets = [...customPresets, newPreset];
    setCustomPresets(updatedPresets);
    Cookies.set('customPresets', JSON.stringify(updatedPresets), { expires: 365 });
  };

  const applyPreset = (preset) => {
    setWidth(preset.width);
    setHeight(preset.height);
  };

  const removePreset = (index) => {
    const updatedPresets = customPresets.filter((_, i) => i !== index);
    setCustomPresets(updatedPresets);
    Cookies.set('customPresets', JSON.stringify(updatedPresets), { expires: 365 });
  };

  return (
    <div className="resizer">
      <h2>Resize</h2>
      <div className="presets">
        <h3>Presets</h3>
        {/* Fixed Presets */}
        {fixedPresets.map((preset, index) => (
          <button key={index} onClick={() => applyPreset(preset)}>
            {preset.name} ({preset.width}x{preset.height})
          </button>
        ))}

        {/* Custom Presets */}
        {customPresets.length > 0 && <h4>Custom Presets</h4>}
        {customPresets.map((preset, index) => (
          <div key={index} className="preset-item">
            <button onClick={() => applyPreset(preset)}>
              {preset.name} ({preset.width}x{preset.height})
            </button>
            <button onClick={() => removePreset(index)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="resize-controls">
        <input
          type="number"
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <button className="resize-button" onClick={handleResize}>Resize</button>
      </div>

      <div className="custom-preset-controls">
        <button onClick={addCustomPreset} disabled={!width || !height}>
          Add Custom Preset
        </button>
      </div>
    </div>
  );
}
