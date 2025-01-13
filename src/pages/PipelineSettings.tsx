import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PipelineStageSettings } from "@/components/PipelineStageSettings";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStages(items);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <div className="flex-1 bg-gradient-to-b from-slate-100 to-white p-6 overflow-y-auto">
            <div className="max-w-[1200px] mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Customize Pipeline</h1>
                <div className="space-x-2">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Save
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Pipeline name</label>
                <Input
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                  className="max-w-xs"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Stages</h2>
                  <Button variant="outline" onClick={handleAddStage}>
                    + New stage
                  </Button>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="stages" direction="horizontal">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex gap-4 overflow-x-auto pb-4 min-h-[200px] w-full"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        {stages.map((stage, index) => (
                          <div key={stage.id} className="flex items-center">
                            <div className="flex-none w-[300px]">
                              <PipelineStageSettings
                                id={stage.id}
                                name={stage.name}
                                index={index}
                                onNameChange={handleStageNameChange}
                                onDelete={handleStageDelete}
                              />
                            </div>
                            {index < stages.length - 1 && (
                              <button
                                onClick={() => handleAddStageAtPosition(index)}
                                className="flex-none mx-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                              </button>
                            )}
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PipelineSettings;