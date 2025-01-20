import { DollarSign, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { LeadDetailsModal } from "./LeadDetailsModal";
import { useQuery } from "@tanstack/react-query";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  estimatedValue?: number;
  createdAt: Date;
  stage: string;
  stageEnteredAt: Date;
  lastContacted?: Date;
  nextFollowUp?: Date;
  assignedTo: string;
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
  lostReason?: string;
  lostNotes?: string;
}

interface LeadCardProps {
  lead: Lead;
  className?: string;
  index: number;
}

const getDefaults = () => {
  try {
    const hotLeadValue = Number(localStorage.getItem('hotLeadValue')) || 20000;
    const stageMaxDays = JSON.parse(localStorage.getItem('stageMaxDays') || '{}');
    return { hotLeadValue, stageMaxDays };
  } catch (error) {
    console.error('Error reading defaults:', error);
    return { hotLeadValue: 20000, stageMaxDays: {} };
  }
};

export function LeadCard({ lead, className, index }: LeadCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const { data: defaults } = useQuery({
    queryKey: ['pipelineDefaults'],
    queryFn: getDefaults,
    staleTime: 1000, // Consider data fresh for 1 second
    gcTime: 5000, // Keep in cache for 5 seconds (formerly cacheTime)
  });

  const daysInStage = Math.floor(
    (new Date().getTime() - new Date(lead.stageEnteredAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  const isHot = lead.estimatedValue ? lead.estimatedValue >= (defaults?.hotLeadValue || 20000) : false;
  const maxDaysForStage = defaults?.stageMaxDays?.[lead.stage];
  const isOverdue = maxDaysForStage ? daysInStage > maxDaysForStage : false;
  const isLost = lead.stage === "lost";

  return (
    <>
      <Draggable draggableId={lead.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={cn(
              "bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-[180px] flex flex-col justify-between cursor-pointer",
              isOverdue && "border-l-4 border-l-red-500",
              className
            )}
            onClick={() => setShowDetails(true)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 truncate max-w-[80%]">{lead.name}</h3>
                {isHot && <Flame className="w-4 h-4 text-orange-500" />}
              </div>
              
              <div className="text-sm text-gray-600 mb-2 truncate">{lead.service}</div>
              
              {isLost && lead.lostReason && (
                <div className="flex items-center gap-2 text-sm text-red-600 mb-2">
                  <span className="truncate">{lead.lostReason}</span>
                </div>
              )}

              {!isLost && lead.estimatedValue && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <DollarSign className="w-4 h-4" />
                  <span className="truncate">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(lead.estimatedValue)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className={cn(isOverdue && "text-red-500")}>
                {daysInStage} days in {lead.stage}
              </span>
            </div>
          </div>
        )}
      </Draggable>

      <LeadDetailsModal
        lead={showDetails ? lead : null}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
}