import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, DollarSign } from "lucide-react";
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
              <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-gray-900">{lead.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{lead.email}</p>
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

            {lead.estimatedValue && (
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Estimated Value</p>
                  <p className="text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(lead.estimatedValue)}
                  </p>
                </div>
              </div>
            )}
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
        <div className="p-6 pt-4">
        </div>
      </DialogContent>
    </Dialog>
  );
}