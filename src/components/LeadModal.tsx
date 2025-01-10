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

interface LeadModalProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadModal({ lead, open, onOpenChange }: LeadModalProps) {
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
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Notes
              </h3>
              <div className="text-sm text-gray-600">
                <p>Last contacted: Not available</p>
                <p>Next follow-up: Not scheduled</p>
                <p>Assigned to: John Doe</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}