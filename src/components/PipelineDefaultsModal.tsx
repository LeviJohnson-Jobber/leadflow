import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface PipelineStage {
  id: string;
  name: string;
  maxDays?: number;
}

interface PipelineDefaultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stages: PipelineStage[];
}

export function PipelineDefaultsModal({
  open,
  onOpenChange,
  stages,
}: PipelineDefaultsModalProps) {
  const [hotLeadValue, setHotLeadValue] = useState(20000);
  const [stageMaxDays, setStageMaxDays] = useState<Record<string, number>>({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const savedHotLeadValue = localStorage.getItem('hotLeadValue');
      if (savedHotLeadValue) {
        setHotLeadValue(Number(savedHotLeadValue));
      }

      const savedStageMaxDays = localStorage.getItem('stageMaxDays');
      if (savedStageMaxDays) {
        setStageMaxDays(JSON.parse(savedStageMaxDays));
      } else {
        const defaults: Record<string, number> = {};
        stages.forEach(stage => {
          if (stage.name.toLowerCase() !== 'won' && stage.name.toLowerCase() !== 'lost') {
            switch (stage.name.toLowerCase()) {
              case 'new':
                defaults[stage.id] = 2;
                break;
              case 'contacted':
                defaults[stage.id] = 5;
                break;
              case 'follow-up':
                defaults[stage.id] = 7;
                break;
              case 'quoted':
                defaults[stage.id] = 14;
                break;
              case 'negotiation':
                defaults[stage.id] = 10;
                break;
              default:
                defaults[stage.id] = 7;
            }
          }
        });
        setStageMaxDays(defaults);
      }
    }
  }, [open, stages]);

  const handleSave = () => {
    localStorage.setItem('hotLeadValue', hotLeadValue.toString());
    localStorage.setItem('stageMaxDays', JSON.stringify(stageMaxDays));
    
    queryClient.invalidateQueries({ queryKey: ['pipelineDefaults'] });
    queryClient.refetchQueries({ queryKey: ['pipelineDefaults'] });
    
    toast.success("Pipeline defaults saved successfully");
    onOpenChange(false);
    navigate(0); // This will refresh the page
  };

  const handleClose = () => {
    onOpenChange(false);
    navigate(0); // This will refresh the page
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pipeline Defaults</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="hotLeadValue">Hot Lead Value ($)</Label>
            <Input
              id="hotLeadValue"
              type="number"
              value={hotLeadValue}
              onChange={(e) => setHotLeadValue(Number(e.target.value))}
            />
            <p className="text-sm text-gray-500">
              Leads with estimated value above this amount will be marked as hot
            </p>
          </div>

          <div className="space-y-4">
            <Label>Maximum Days in Stage</Label>
            {stages.map((stage) => {
              if (stage.name.toLowerCase() === 'won' || stage.name.toLowerCase() === 'lost') {
                return null;
              }
              
              return (
                <div key={stage.id} className="flex items-center gap-4">
                  <Label htmlFor={stage.id} className="w-24 flex-shrink-0">
                    {stage.name}
                  </Label>
                  <Input
                    id={stage.id}
                    type="number"
                    value={stageMaxDays[stage.id] || 0}
                    onChange={(e) =>
                      setStageMaxDays((prev) => ({
                        ...prev,
                        [stage.id]: Number(e.target.value),
                      }))
                    }
                    className="w-24"
                  />
                  <span className="text-sm text-gray-500">days</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}