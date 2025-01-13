import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { PipelineColumn } from "./PipelineColumn";
import type { Lead } from "./LeadCard";

interface PipelineStage {
  id: string;
  name: string;
}

interface PipelineGridProps {
  stages: PipelineStage[];
  leads: Lead[];
  onDragEnd: (result: DropResult) => void;
}

export function PipelineGrid({ stages, leads, onDragEnd }: PipelineGridProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-7 gap-4 h-[calc(100vh-180px)]">
        {stages.map((stage) => (
          <PipelineColumn
            key={stage.id}
            title={stage.name}
            leads={leads.filter((lead) => lead.stage === stage.id)}
            droppableId={stage.id}
          />
        ))}
      </div>
    </DragDropContext>
  );
}