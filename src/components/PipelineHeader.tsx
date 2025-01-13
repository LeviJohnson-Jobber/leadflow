import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { NewLeadDialog } from "./NewLeadDialog";
import { useNavigate } from "react-router-dom";

interface PipelineHeaderProps {
  pipelineName: string;
  onLeadCreate: (leadData: any) => void;
}

export function PipelineHeader({ pipelineName, onLeadCreate }: PipelineHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{pipelineName}</h1>
      <div className="flex gap-2">
        <NewLeadDialog onLeadCreate={onLeadCreate} />
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/pipeline-settings")}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}