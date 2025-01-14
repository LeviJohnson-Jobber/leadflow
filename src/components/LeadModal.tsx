import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LostLeadModal } from "./LostLeadModal";
import LeadMap from "./LeadMap";
import { useState } from "react";
import { Flame, Clock, Phone, Mail, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadModalProps {
  lead: {
    id: string;
    name: string;
    contactMethod: "phone" | "email";
    contactInfo: string;
    service: string;
    isHot: boolean;
    stage: string;
    stageEnteredAt: Date;
    location?: {
      address: string;
      lat: number;
      lng: number;
    };
    lostReason?: string;
    lostNotes?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadModal({ lead, open, onOpenChange }: LeadModalProps) {
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);
  
  const daysInStage = Math.floor(
    (new Date().getTime() - new Date(lead.stageEnteredAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isOverdue = daysInStage > 7;

  const handleMarkAsLost = (reason: string, notes: string) => {
    // Handle the logic for marking the lead as lost
    console.log(`Lead marked as lost: ${lead.name}, Reason: ${reason}, Notes: ${notes}`);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{lead.name}</DialogTitle>
              <div className="flex gap-1">
                {isOverdue && <AlertCircle className="text-red-500 w-5 h-5" />}
                {lead.isHot && <Flame className="text-orange-500 w-5 h-5" />}
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="text-sm text-gray-600">{lead.service}</div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {lead.contactMethod === "phone" ? (
                  <Phone className="w-4 h-4" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                <span>{lead.contactInfo}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span className={cn(isOverdue && "text-red-500")}>
                  {daysInStage} days in {lead.stage}
                </span>
              </div>
            </div>

            {lead.location && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Location</h3>
                <LeadMap location={lead.location} />
              </div>
            )}

            {lead.stage !== "lost" && (
              <Button onClick={() => setIsLostModalOpen(true)} variant="destructive">
                Mark as Lost
              </Button>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <LostLeadModal
        open={isLostModalOpen}
        onOpenChange={setIsLostModalOpen}
        onConfirm={handleMarkAsLost}
        leadName={lead.name}
      />
    </>
  );
}