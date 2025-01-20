import { DollarSign, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { LeadDetailsModal } from "./LeadDetailsModal";

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
  onDefaultsChange?: () => void;
}

export function LeadCard({ lead, className, index }: LeadCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isHot, setIsHot] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);
  
  useEffect(() => {
    const checkStatus = () => {
      // Check if lead is hot based on stored hot lead value
      const hotLeadValue = Number(localStorage.getItem('hotLeadValue')) || 20000;
      setIsHot(lead.estimatedValue ? lead.estimatedValue >= hotLeadValue : false);

      // Check if lead is overdue based on stored stage max days
      const stageMaxDays = JSON.parse(localStorage.getItem('stageMaxDays') || '{}');
      const daysInStage = Math.floor(
        (new Date().getTime() - new Date(lead.stageEnteredAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const maxDaysForStage = stageMaxDays[lead.stage];
      setIsOverdue(maxDaysForStage ? daysInStage > maxDaysForStage : false);
    };

    // Check status initially
    checkStatus();

    // Add storage event listener
    const handleStorageChange = () => {
      checkStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-window updates
    window.addEventListener('defaultsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('defaultsUpdated', handleStorageChange);
    };
  }, [lead.estimatedValue, lead.stage, lead.stageEnteredAt]);

  const daysInStage = Math.floor(
    (new Date().getTime() - new Date(lead.stageEnteredAt).getTime()) / (1000 * 60 * 60 * 24)
  );

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