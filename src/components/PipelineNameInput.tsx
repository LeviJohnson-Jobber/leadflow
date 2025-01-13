import { Input } from "./ui/input";

interface PipelineNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PipelineNameInput({ value, onChange }: PipelineNameInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-600">Pipeline name</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-xs"
      />
    </div>
  );
}