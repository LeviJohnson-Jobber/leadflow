import { useState } from "react";
import { NewLeadDialog } from "@/components/NewLeadDialog";
import { PipelineColumn } from "@/components/PipelineColumn";
import type { Lead } from "@/components/LeadCard";

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
      stageEnteredAt: new Date(),
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Leads Pipeline</h1>
          <NewLeadDialog onLeadCreate={handleNewLead} />
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-min pb-4">
            {PIPELINE_STAGES.map((stage) => (
              <PipelineColumn
                key={stage}
                title={stage}
                leads={leads.filter((lead) => lead.stage === stage)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;