import { Flame, Clock, Phone, Mail, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { LeadModal } from "./LeadModal";

export interface Lead {
  id: string;
  name: string;
  contactMethod: "phone" | "email";
  contactInfo: string;
  service: string;
  isHot: boolean;
  createdAt: Date;
  stage: string;
  stageEnteredAt: Date;
}

interface LeadCardProps {
  lead: Lead;
  className?: string;
  index: number;
}

export function LeadCard({ lead, className, index }: LeadCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  
  const daysInStage = Math.floor(
    (new Date().getTime() - new Date(lead.stageEnteredAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isOverdue = daysInStage > 7;

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
            onClick={() => setModalOpen(true)}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 truncate max-w-[80%]">{lead.name}</h3>
                <div className="flex gap-1">
                  {isOverdue && <AlertCircle className="text-red-500 w-5 h-5" />}
                  {lead.isHot && <Flame className="text-orange-500 w-5 h-5" />}
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-2 truncate">{lead.service}</div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                {lead.contactMethod === "phone" ? (
                  <Phone className="w-4 h-4" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                <span className="truncate">{lead.contactInfo}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <span className={cn(isOverdue && "text-red-500")}>
                {daysInStage} days in {lead.stage}
              </span>
            </div>
          </div>
        )}
      </Draggable>

      <LeadModal
        lead={lead}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}