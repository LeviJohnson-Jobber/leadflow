import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { PipelineStageSettings } from "./PipelineStageSettings";

interface PipelineStage {
  id: string;
  name: string;
}

interface PipelineStageListProps {
  stages: PipelineStage[];
  onStagesChange: (stages: PipelineStage[]) => void;
  onStageNameChange: (id: string, name: string) => void;
  onStageDelete: (id: string) => void;
  onAddStageAtPosition: (index: number) => void;
}

export function PipelineStageList({
  stages,
  onStagesChange,
  onStageNameChange,
  onStageDelete,
  onAddStageAtPosition,
}: PipelineStageListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onStagesChange(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="stages" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-2 overflow-x-auto pb-4 min-h-[200px] w-full"
            style={{ whiteSpace: 'nowrap' }}
          >
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className="flex-none w-[210px]">
                  <PipelineStageSettings
                    id={stage.id}
                    name={stage.name}
                    index={index}
                    onNameChange={onStageNameChange}
                    onDelete={onStageDelete}
                  />
                </div>
                {index < stages.length - 1 && (
                  <button
                    onClick={() => onAddStageAtPosition(index)}
                    className="flex-none mx-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}