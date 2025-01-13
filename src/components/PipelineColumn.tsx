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
  const isWonStage = droppableId === "won";
  const isLostStage = droppableId === "lost";

  return (
    <div className={cn(
      "bg-gradient-to-b from-slate-50 to-white rounded-lg p-3 flex flex-col h-full border border-slate-200",
      isWonStage && "from-[#F2FCE2] to-white",
      isLostStage && "from-red-50 to-white",
      className
    )}>
      <h2 className={cn(
        "font-medium mb-3 px-2",
        isWonStage && "text-green-700",
        isLostStage && "text-red-700"
      )}>{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 flex-1 overflow-y-auto px-2"
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