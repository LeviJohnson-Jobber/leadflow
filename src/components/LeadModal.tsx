import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Clock, Phone, Mail, AlertCircle, User, Globe, MessageSquare, Star, Map } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Lead } from "./LeadCard";
import LeadMap from "./LeadMap";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const SALES_REPS = [
  "John Doe",
  "Jane Smith",
  "Mike Johnson",
  "Sarah Williams",
  "David Brown"
];

interface LeadModalProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadModal({ lead, open, onOpenChange }: LeadModalProps) {
  const [lastContacted, setLastContacted] = useState<Date | undefined>(lead.lastContacted);
  const [nextFollowUp, setNextFollowUp] = useState<Date | undefined>(lead.nextFollowUp);
  const [assignedTo, setAssignedTo] = useState(lead.assignedTo || "John Doe");
  
  const daysInStage = Math.floor(
    (new Date().getTime() - new Date(lead.stageEnteredAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isOverdue = daysInStage > 7;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {lead.name}
            {lead.isHot && <Flame className="text-orange-500 w-5 h-5" />}
            {isOverdue && <AlertCircle className="text-red-500 w-5 h-5" />}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <User className="w-4 h-4" /> Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {lead.contactMethod === "phone" ? (
                    <Phone className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Mail className="w-4 h-4 text-gray-500" />
                  )}
                  <span>{lead.contactInfo}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" /> Lead Score
              </h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= (lead.isHot ? 4 : 2)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Service Details
              </h3>
              <div className="space-y-2 text-sm">
                <p>{lead.service}</p>
                <p className="text-gray-500">Source: Website Form</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Timeline
              </h3>
              <div className="space-y-2 text-sm">
                <p>Current Stage: {lead.stage}</p>
                <p className={`${isOverdue ? "text-red-500" : "text-gray-500"}`}>
                  {daysInStage} days in current stage
                </p>
                <p className="text-gray-500">
                  Created {formatDistanceToNow(new Date(lead.createdAt))} ago
                </p>
              </div>
            </CardContent>
          </Card>

          {lead.location && (
            <Card className="col-span-2">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Map className="w-4 h-4" /> Location
                </h3>
                <LeadMap location={lead.location} />
              </CardContent>
            </Card>
          )}

          <Card className="col-span-2">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Notes & Follow-up
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Contacted</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {lastContacted ? (
                            format(lastContacted, "PPP")
                          ) : (
                            <span className="text-muted-foreground">Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={lastContacted}
                          onSelect={setLastContacted}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Next Follow-up</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {nextFollowUp ? (
                            format(nextFollowUp, "PPP")
                          ) : (
                            <span className="text-muted-foreground">Schedule follow-up</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={nextFollowUp}
                          onSelect={setNextFollowUp}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Assigned To</label>
                  <Select value={assignedTo} onValueChange={setAssignedTo}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a sales rep" />
                    </SelectTrigger>
                    <SelectContent>
                      {SALES_REPS.map((rep) => (
                        <SelectItem key={rep} value={rep}>
                          {rep}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}