import { Draggable } from "@hello-pangea/dnd";
import { Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface PipelineStageSettingsProps {
  id: string;
  name: string;
  index: number;
  onNameChange: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export function PipelineStageSettings({
  id,
  name,
  index,
  onNameChange,
  onDelete,
}: PipelineStageSettingsProps) {
  const isSpecialStage = id === "won" || id === "lost";

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg p-4 space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Name</label>
            <Input
              value={name}
              onChange={(e) => onNameChange(id, e.target.value)}
              className="w-full"
            />
          </div>
          {!isSpecialStage && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-600 w-full justify-start"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Stage
            </Button>
          )}
        </div>
      )}
    </Draggable>
  );
}