import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Edit, FileEdit } from "lucide-react";
import type { Lead } from "./LeadCard";
import { cn } from "@/lib/utils";
import LeadMap from "./LeadMap";

interface LeadDetailsModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDetailsModal({ lead, open, onOpenChange }: LeadDetailsModalProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-xl font-semibold text-gray-900">{lead.name}</h2>
        </div>

        <Separator />

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {lead.contactMethod === "phone" ? (
                <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
              ) : (
                <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-500">Contact</p>
                <p className="text-gray-900">{lead.contactInfo}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-gray-900">
                  {lead.location?.address || "No address provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          {lead.location && (
            <LeadMap location={lead.location} />
          )}

          {/* Service Details */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Service Required</h3>
            <div className="bg-gray-50 px-4 py-3 rounded-lg">
              <p className="text-gray-900">{lead.service}</p>
            </div>
          </div>

          {/* Status Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Status</h3>
            <div className="flex items-center gap-2">
              <span className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                lead.isHot ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
              )}>
                {lead.isHot ? "Hot Lead" : "Regular Lead"}
              </span>
              <span className="text-sm text-gray-500">
                in {lead.stage} for {Math.floor(
                  (new Date().getTime() - new Date(lead.stageEnteredAt).getTime()) / (1000 * 60 * 60 * 24)
                )} days
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 p-6 pt-4">
          <Button variant="outline" className="gap-2">
            <FileEdit className="w-4 h-4" />
            Add Note
          </Button>
          <Button className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Lead
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}