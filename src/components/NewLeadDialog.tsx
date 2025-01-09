import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Lead } from "./LeadCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NewLeadDialogProps {
  onLeadCreate: (lead: Omit<Lead, "id" | "createdAt" | "stageEnteredAt">) => void;
}

export function NewLeadDialog({ onLeadCreate }: NewLeadDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState<"phone" | "email">("phone");
  const [contactInfo, setContactInfo] = useState("");
  const [service, setService] = useState("");
  const [isHot, setIsHot] = useState(false);
  const [stage, setStage] = useState("New");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLeadCreate({
      name,
      contactMethod,
      contactInfo,
      service,
      isHot,
      stage,
    });
    setOpen(false);
    setName("");
    setContactInfo("");
    setService("");
    setIsHot(false);
    setStage("New");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Contact Method</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={(value) => setContactMethod(value as "phone" | "email")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone">Phone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactInfo">Contact Info</Label>
            <Input
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              type={contactMethod === "email" ? "email" : "tel"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service">Service Requested</Label>
            <Textarea
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Initial Stage</Label>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                <SelectItem value="Quoted">Quoted</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Won">Won</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isHot"
              checked={isHot}
              onChange={(e) => setIsHot(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="isHot">Mark as Hot Lead</Label>
          </div>
          
          <Button type="submit" className="w-full">Add Lead</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}