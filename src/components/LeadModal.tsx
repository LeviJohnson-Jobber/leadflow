import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LeadMap from "./LeadMap";
import { useState } from "react";
import { Flame, Clock, Phone, Mail, AlertCircle, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    assignedTo: string;
    location?: {
      address: string;
      lat: number;
      lng: number;
    };
    rating?: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadModal({ lead, open, onOpenChange }: LeadModalProps) {
  const [rating, setRating] = useState(lead.rating || 0);
  const [assignedTo, setAssignedTo] = useState(lead.assignedTo);
  
  const daysInStage = Math.floor(
    (new Date().getTime() - new Date(lead.stageEnteredAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isOverdue = daysInStage > 7;

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    // TODO: Implement API call to update rating
    console.log(`Rating updated to ${newRating}`);
  };

  const handleAssigneeChange = (value: string) => {
    setAssignedTo(value);
    // TODO: Implement API call to update assignee
    console.log(`Assigned to ${value}`);
  };

  return (
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

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4" />
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRatingChange(value)}
                    className={cn(
                      "p-1 rounded hover:bg-gray-100",
                      value <= rating ? "text-yellow-400" : "text-gray-300"
                    )}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Assigned To
              </label>
              <Select value={assignedTo} onValueChange={handleAssigneeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                  <SelectItem value="Sarah Williams">Sarah Williams</SelectItem>
                  <SelectItem value="David Brown">David Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {lead.location && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Location</h3>
              <LeadMap location={lead.location} />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}