import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface LostLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string, notes: string) => void;
  leadName: string;
}

const LOST_REASONS = [
  "Price too High",
  "Lack of Urgency",
  "Not a Good Fit",
  "Competition Won",
  "Scheduling Conflicts"
] as const;

export function LostLeadModal({ open, onOpenChange, onConfirm, leadName }: LostLeadModalProps) {
  const [reason, setReason] = useState<string>("");
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    if (!reason) return;
    onConfirm(reason, notes);
    setReason("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark "{leadName}" as Lost</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Lost Reason *</label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {LOST_REASONS.map((lostReason) => (
                  <SelectItem key={lostReason} value={lostReason}>
                    {lostReason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Notes</label>
            <Textarea
              placeholder="Add any additional notes about why this lead was lost"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={!reason}
          >
            Mark Lost
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}