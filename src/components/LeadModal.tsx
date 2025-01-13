import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LostLeadModal } from "./LostLeadModal";
import { useState } from "react";

interface LeadModalProps {
  lead: {
    id: string;
    name: string;
    contactMethod: "phone" | "email";
    contactInfo: string;
    service: string;
    isHot: boolean;
    stage: string;
    lostReason?: string;
    lostNotes?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadModal({ lead, open, onOpenChange }: LeadModalProps) {
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);

  const handleMarkAsLost = (reason: string, notes: string) => {
    // Handle the logic for marking the lead as lost
    console.log(`Lead marked as lost: ${lead.name}, Reason: ${reason}, Notes: ${notes}`);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{lead.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-sm text-gray-600 mb-2">{lead.service}</div>
            <Button onClick={() => setIsLostModalOpen(true)}>Mark as Lost</Button>
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
