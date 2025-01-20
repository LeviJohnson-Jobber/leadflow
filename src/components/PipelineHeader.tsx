import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { NewLeadDialog } from "./NewLeadDialog";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { PipelineDefaultsModal } from "./PipelineDefaultsModal";

interface PipelineHeaderProps {
  pipelineName: string;
  onLeadCreate: (leadData: any) => void;
  stages: Array<{ id: string; name: string; }>;
}

export function PipelineHeader({ pipelineName, onLeadCreate, stages }: PipelineHeaderProps) {
  const navigate = useNavigate();
  const [showDefaults, setShowDefaults] = useState(false);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{pipelineName}</h1>
      <div className="flex gap-2">
        <NewLeadDialog onLeadCreate={onLeadCreate} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/pipeline-settings")}>
              Customize Pipeline
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowDefaults(true)}>
              Set Defaults
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <PipelineDefaultsModal
        open={showDefaults}
        onOpenChange={setShowDefaults}
        stages={stages}
      />
    </div>
  );
}