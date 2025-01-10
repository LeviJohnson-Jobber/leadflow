import { useForm } from "react-hook-form";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
      assignedTo: "John Doe", // Add default assignedTo
    });
    form.reset();
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">New Lead</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create New Lead</Dialog.Title>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Label>Name</Label>
            <Input {...form.register("name")} required />
          </div>
          <div>
            <Label>Contact Method</Label>
            <select {...form.register("contactMethod")} required>
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
          <div>
            <Label>
              <Checkbox {...form.register("isHot")} />
              Hot Lead
            </Label>
          </div>
          <Dialog.Footer>
            <Button type="submit">Create Lead</Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}