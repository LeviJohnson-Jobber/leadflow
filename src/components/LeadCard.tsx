import { Flame, Clock, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

export function LeadCard({ lead, className }: LeadCardProps) {
  const daysInStage = Math.floor(
    (new Date().getTime() - new Date(lead.stageEnteredAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      className={cn(
        "bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{lead.name}</h3>
        {lead.isHot && <Flame className="text-orange-500 w-5 h-5" />}
      </div>
      
      <div className="text-sm text-gray-600 mb-2">{lead.service}</div>
      
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        {lead.contactMethod === "phone" ? (
          <Phone className="w-4 h-4" />
        ) : (
          <Mail className="w-4 h-4" />
        )}
        <span>{lead.contactInfo}</span>
      </div>
      
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Clock className="w-3 h-3" />
        <span>{daysInStage} days in {lead.stage}</span>
      </div>
    </div>
  );
}