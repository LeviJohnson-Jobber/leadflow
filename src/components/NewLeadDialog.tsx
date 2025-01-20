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
import { Label } from "@/components/ui/label";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  estimatedValue?: number;
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
    phone: string;
    email: string;
    service: string;
    estimatedValue?: number;
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
        <Button className="bg-green-600 hover:bg-green-700 text-white">New Lead</Button>
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
              <Label>Phone Number</Label>
              <Input {...form.register("phone")} type="tel" required />
            </div>
            <div>
              <Label>Email</Label>
              <Input {...form.register("email")} type="email" required />
            </div>
            <div>
              <Label>Service</Label>
              <Input {...form.register("service")} required />
            </div>
            <div>
              <Label>Estimated Value ($)</Label>
              <Input 
                {...form.register("estimatedValue", { 
                  valueAsNumber: true,
                  min: 0 
                })} 
                type="number" 
                placeholder="Optional"
              />
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