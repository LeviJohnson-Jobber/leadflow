import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Define the Lead type
interface Lead {
  id: string;
  name: string;
  contactMethod: "phone" | "email";
  contactInfo: string;
  service: string;
  isHot: boolean;
  stage: string;
  assignedTo: string;
  createdAt: string;
  stageEnteredAt: string;
}

export function NewLeadDialog({
  onLeadCreate,
}: {
  onLeadCreate: (lead: Omit<Lead, "id" | "createdAt" | "stageEnteredAt">) => void;
}) {
  const form = useForm<{
    name: string;
    contactMethod: "phone" | "email";
    contactInfo: string;
    service: string;
    isHot: boolean;
  }>();

  const onSubmit = (data: any) => {
    onLeadCreate({
      ...data,
      stage: "New",
      assignedTo: "John Doe",
    });
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Lead</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create New Lead</DialogTitle>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input {...form.register("name")} required />
            </div>
            <div>
              <Label>Contact Method</Label>
              <select 
                {...form.register("contactMethod")} 
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div>
              <Label>Contact Info</Label>
              <Input {...form.register("contactInfo")} required />
            </div>
            <div>
              <Label>Service</Label>
              <Input {...form.register("service")} required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox {...form.register("isHot")} id="isHot" />
              <Label htmlFor="isHot">Hot Lead</Label>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Create Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}