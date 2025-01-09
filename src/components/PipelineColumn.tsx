import { cn } from "@/lib/utils";
import { Lead, LeadCard } from "./LeadCard";
import { Droppable } from "react-beautiful-dnd";

interface PipelineColumnProps {
  title: string;
  leads: Lead[];
  className?: string;
  droppableId: string;
}

export function PipelineColumn({ title, leads, className, droppableId }: PipelineColumnProps) {
  return (
    <div className={cn("bg-pipeline-column rounded-lg p-3 flex flex-col h-full", className)}>
      <h2 className="font-medium text-gray-900 mb-3">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 flex-1 overflow-y-auto"
          >
            {leads.map((lead, index) => (
              <LeadCard key={lead.id} lead={lead} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}