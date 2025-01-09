import { cn } from "@/lib/utils";
import { Lead, LeadCard } from "./LeadCard";

interface PipelineColumnProps {
  title: string;
  leads: Lead[];
  className?: string;
}

export function PipelineColumn({ title, leads, className }: PipelineColumnProps) {
  return (
    <div className={cn("min-w-[300px] bg-pipeline-column rounded-lg p-4", className)}>
      <h2 className="font-medium text-gray-900 mb-4">{title}</h2>
      <div className="space-y-3">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}