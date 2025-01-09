import { useState } from "react";
import { NewLeadDialog } from "@/components/NewLeadDialog";
import { PipelineColumn } from "@/components/PipelineColumn";
import type { Lead } from "@/components/LeadCard";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const PIPELINE_STAGES = [
  "New",
  "Contacted",
  "Follow-Up",
  "Quoted",
  "Negotiation",
  "Won",
  "Lost",
];

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "John Smith",
      contactMethod: "phone",
      contactInfo: "555-0123",
      service: "Kitchen Remodeling",
      isHot: true,
      createdAt: new Date(),
      stage: "New",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "2",
      name: "Sarah Johnson",
      contactMethod: "email",
      contactInfo: "sarah.j@email.com",
      service: "Bathroom Renovation",
      isHot: false,
      createdAt: new Date(),
      stage: "Contacted",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    },
    {
      id: "3",
      name: "Mike Wilson",
      contactMethod: "phone",
      contactInfo: "555-0456",
      service: "Roof Repair",
      isHot: true,
      createdAt: new Date(),
      stage: "Follow-Up",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    },
    {
      id: "4",
      name: "Emily Brown",
      contactMethod: "email",
      contactInfo: "emily.b@email.com",
      service: "Window Installation",
      isHot: false,
      createdAt: new Date(),
      stage: "Quoted",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
    },
    {
      id: "5",
      name: "David Lee",
      contactMethod: "phone",
      contactInfo: "555-0789",
      service: "HVAC Installation",
      isHot: true,
      createdAt: new Date(),
      stage: "Negotiation",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    },
  ]);

  const handleNewLead = (leadData: Omit<Lead, "id" | "createdAt" | "stageEnteredAt">) => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      stageEnteredAt: new Date(),
    };
    setLeads((prev) => [...prev, newLead]);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const lead = leads.find((l) => l.id === draggableId);
    if (!lead) return;

    const newLeads = leads.filter((l) => l.id !== draggableId);
    const updatedLead = {
      ...lead,
      stage: destination.droppableId,
      stageEnteredAt: new Date(),
    };

    setLeads([...newLeads, updatedLead]);
  };

  return (
    <div className="h-screen bg-gray-50 p-4">
      <div className="h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Leads Pipeline</h1>
          <NewLeadDialog onLeadCreate={handleNewLead} />
        </div>
        
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-7 gap-4 h-[calc(100vh-120px)]">
            {PIPELINE_STAGES.map((stage) => (
              <PipelineColumn
                key={stage}
                title={stage}
                leads={leads.filter((lead) => lead.stage === stage)}
                droppableId={stage}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Index;