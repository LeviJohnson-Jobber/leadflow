import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PipelineStageList } from "@/components/PipelineStageList";
import { PipelineNameInput } from "@/components/PipelineNameInput";
import { PipelineSettingsHeader } from "@/components/PipelineSettingsHeader";

interface PipelineStage {
  id: string;
  name: string;
}

const getPipelineSettings = () => {
  const stored = localStorage.getItem('pipelineSettings');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    name: "Leads Pipeline",
    stages: [
      { id: "new", name: "New" },
      { id: "contacted", name: "Contacted" },
      { id: "follow-up", name: "Follow-Up" },
      { id: "quoted", name: "Quoted" },
      { id: "negotiation", name: "Negotiation" },
      { id: "won", name: "Won" },
      { id: "lost", name: "Lost" },
    ]
  };
};

const PipelineSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pipelineName, setPipelineName] = useState(getPipelineSettings().name);
  const [stages, setStages] = useState<PipelineStage[]>(getPipelineSettings().stages);

  const handleSave = () => {
    const settings = {
      name: pipelineName,
      stages: stages
    };
    localStorage.setItem('pipelineSettings', JSON.stringify(settings));
    toast({
      title: "Success",
      description: "Pipeline settings saved successfully",
    });
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleStageNameChange = (id: string, newName: string) => {
    setStages(stages.map(stage => 
      stage.id === id ? { ...stage, name: newName } : stage
    ));
  };

  const handleStageDelete = (id: string) => {
    setStages(stages.filter(stage => stage.id !== id));
  };

  const handleAddStage = () => {
    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      name: "New Stage",
    };
    setStages([newStage, ...stages]);
  };

  const handleAddStageAtPosition = (index: number) => {
    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      name: "New Stage",
    };
    const updatedStages = [...stages];
    updatedStages.splice(index + 1, 0, newStage);
    setStages(updatedStages);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <div className="flex-1 bg-gradient-to-b from-slate-100 to-white p-6 overflow-y-auto">
            <div className="max-w-[1200px] mx-auto space-y-6">
              <PipelineSettingsHeader onSave={handleSave} onCancel={handleCancel} />
              <PipelineNameInput value={pipelineName} onChange={setPipelineName} />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Stages</h2>
                  <Button variant="outline" onClick={handleAddStage}>
                    + New stage
                  </Button>
                </div>

                <PipelineStageList
                  stages={stages}
                  onStagesChange={setStages}
                  onStageNameChange={handleStageNameChange}
                  onStageDelete={handleStageDelete}
                  onAddStageAtPosition={handleAddStageAtPosition}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PipelineSettings;