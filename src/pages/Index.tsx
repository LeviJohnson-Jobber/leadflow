import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PipelineHeader } from "@/components/PipelineHeader";
import { PipelineGrid } from "@/components/PipelineGrid";
import { MarkAsLostModal } from "@/components/MarkAsLostModal";
import { useLeadsState } from "@/hooks/useLeadsState";
import { useState } from "react";
import type { Lead } from "@/components/LeadCard";

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

const initialLeads: Lead[] = [
    {
      id: "1",
      name: "John Smith",
      contactMethod: "phone" as const,
      contactInfo: "555-0123",
      service: "Kitchen Remodeling",
      isHot: true,
      createdAt: new Date(),
      stage: "new",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      assignedTo: "John Doe",
      location: {
        address: "123 Main St, San Francisco, CA 94105",
        lat: 37.7749,
        lng: -122.4194
      }
    },
    {
      id: "2",
      name: "Sarah Johnson",
      contactMethod: "email" as const,
      contactInfo: "sarah.j@email.com",
      service: "Bathroom Renovation",
      isHot: false,
      createdAt: new Date(),
      stage: "contacted",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      nextFollowUp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      assignedTo: "Jane Smith",
      location: {
        address: "456 Market St, San Francisco, CA 94105",
        lat: 37.7897,
        lng: -122.4000
      }
    },
    {
      id: "3",
      name: "Mike Wilson",
      contactMethod: "phone",
      contactInfo: "555-0456",
      service: "Roof Repair",
      isHot: true,
      createdAt: new Date(),
      stage: "follow-up",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
      assignedTo: "Mike Johnson",
      location: {
        address: "789 Howard St, San Francisco, CA 94103",
        lat: 37.7825,
        lng: -122.4037
      }
    },
    {
      id: "4",
      name: "Emily Brown",
      contactMethod: "email",
      contactInfo: "emily.b@email.com",
      service: "Window Installation",
      isHot: false,
      createdAt: new Date(),
      stage: "quoted",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      nextFollowUp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      assignedTo: "Sarah Williams",
      location: {
        address: "321 Mission St, San Francisco, CA 94105",
        lat: 37.7909,
        lng: -122.3925
      }
    },
    {
      id: "5",
      name: "David Lee",
      contactMethod: "phone",
      contactInfo: "555-0789",
      service: "HVAC Installation",
      isHot: true,
      createdAt: new Date(),
      stage: "negotiation",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      nextFollowUp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
      assignedTo: "David Brown",
      location: {
        address: "555 California St, San Francisco, CA 94104",
        lat: 37.7929,
        lng: -122.4037
      }
    },
    {
      id: "6",
      name: "Lisa Anderson",
      contactMethod: "email",
      contactInfo: "lisa.a@email.com",
      service: "Solar Panel Installation",
      isHot: true,
      createdAt: new Date(),
      stage: "new",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      assignedTo: "John Doe",
      location: {
        address: "1 Telegraph Hill Blvd, San Francisco, CA 94133",
        lat: 37.8024,
        lng: -122.4058
      }
    },
    {
      id: "7",
      name: "Robert Taylor",
      contactMethod: "phone",
      contactInfo: "555-9012",
      service: "Basement Waterproofing",
      isHot: false,
      createdAt: new Date(),
      stage: "follow-up",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      nextFollowUp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      assignedTo: "Jane Smith",
      location: {
        address: "900 North Point St, San Francisco, CA 94109",
        lat: 37.8058,
        lng: -122.4222
      }
    },
    {
      id: "8",
      name: "Jennifer White",
      contactMethod: "email",
      contactInfo: "jen.w@email.com",
      service: "Landscaping Project",
      isHot: true,
      createdAt: new Date(),
      stage: "quoted",
      stageEnteredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      nextFollowUp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
      assignedTo: "David Brown",
      location: {
        address: "101 California St, San Francisco, CA 94111",
        lat: 37.7932,
        lng: -122.3984
      }
    }
];

const Index = () => {
  const [pipelineSettings] = useState(getPipelineSettings());
  const {
    leads,
    movingLead,
    handleNewLead,
    onDragEnd,
    handleMarkAsLost,
    handleCancelLost,
  } = useLeadsState(initialLeads);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          <div className="bg-gradient-to-b from-slate-100 to-white p-4">
            <div className="h-full">
              <PipelineHeader 
                pipelineName={pipelineSettings.name}
                onLeadCreate={handleNewLead}
              />
              <PipelineGrid 
                stages={pipelineSettings.stages}
                leads={leads}
                onDragEnd={onDragEnd}
              />
            </div>
          </div>
        </div>
      </div>
      <MarkAsLostModal
        open={!!movingLead}
        onOpenChange={(open) => !open && handleCancelLost()}
        onConfirm={handleMarkAsLost}
        leadName={movingLead?.lead.name || ""}
      />
    </SidebarProvider>
  );
};

export default Index;
