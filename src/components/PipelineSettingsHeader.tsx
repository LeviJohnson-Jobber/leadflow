import { Button } from "./ui/button";

interface PipelineSettingsHeaderProps {
  onSave: () => void;
  onCancel: () => void;
}

export function PipelineSettingsHeader({ onSave, onCancel }: PipelineSettingsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Customize Pipeline</h1>
      <div className="space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={onSave}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
}