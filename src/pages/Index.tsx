import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PipelineHeader } from "@/components/PipelineHeader";
import { PipelineGrid } from "@/components/PipelineGrid";
import { LostLeadModal } from "@/components/LostLeadModal";
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
      phone: "555-0123",
      email: "john.smith@email.com",
      service: "Kitchen Remodeling",
      estimatedValue: 35000,
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
      phone: "555-0124",
      email: "sarah.j@email.com",
      service: "Bathroom Renovation",
      estimatedValue: 15000,
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
      phone: "555-0456",
      email: "mike.w@email.com",
      service: "Roof Repair",
      estimatedValue: 8500,
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
      phone: "555-0457",
      email: "emily.b@email.com",
      service: "Window Installation",
      estimatedValue: 12000,
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
      phone: "555-0789",
      email: "david.l@email.com",
      service: "HVAC Installation",
      estimatedValue: 25000,
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
      phone: "555-0790",
      email: "lisa.a@email.com",
      service: "Solar Panel Installation",
      estimatedValue: 45000,
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
      phone: "555-9012",
      email: "robert.t@email.com",
      service: "Basement Waterproofing",
      estimatedValue: 18500,
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
      phone: "555-9013",
      email: "jen.w@email.com",
      service: "Landscaping Project",
      estimatedValue: 22000,
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
    },
    {
      id: "9",
      name: "Corporate Office Renovation",
      phone: "555-9876",
      email: "corporate@email.com",
      service: "Commercial Renovation",
      estimatedValue: 75000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
      stage: "won",
      stageEnteredAt: new Date(),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: null,
      assignedTo: "Sarah Williams",
      location: {
        address: "789 Market St, San Francisco, CA 94103",
        lat: 37.7857,
        lng: -122.4057
      }
    },
    {
      id: "10",
      name: "Luxury Home Theater",
      phone: "555-5432",
      email: "luxury@email.com",
      service: "Home Entertainment",
      estimatedValue: 35000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      stage: "won",
      stageEnteredAt: new Date(),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: null,
      assignedTo: "Mike Johnson",
      location: {
        address: "456 Pine St, San Francisco, CA 94108",
        lat: 37.7891,
        lng: -122.4089
      }
    },
    {
      id: "11",
      name: "Smart Home Installation",
      phone: "555-8765",
      email: "smart@email.com",
      service: "Home Automation",
      estimatedValue: 25000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
      stage: "won",
      stageEnteredAt: new Date(),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: null,
      assignedTo: "John Doe",
      location: {
        address: "123 California St, San Francisco, CA 94111",
        lat: 37.7936,
        lng: -122.3990
      }
    },
    {
      id: "12",
      name: "Restaurant Remodel",
      phone: "555-2345",
      email: "restaurant@email.com",
      service: "Commercial Renovation",
      estimatedValue: 120000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
      stage: "lost",
      stageEnteredAt: new Date(),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: null,
      assignedTo: "Jane Smith",
      location: {
        address: "567 Mission St, San Francisco, CA 94105",
        lat: 37.7877,
        lng: -122.3992
      },
      lostReason: "Budget constraints",
      lostNotes: "Client decided to postpone due to budget limitations"
    },
    {
      id: "13",
      name: "Office Security System",
      phone: "555-3456",
      email: "security@email.com",
      service: "Security Systems",
      estimatedValue: 45000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40),
      stage: "lost",
      stageEnteredAt: new Date(),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: null,
      assignedTo: "David Brown",
      location: {
        address: "890 Howard St, San Francisco, CA 94103",
        lat: 37.7821,
        lng: -122.4058
      },
      lostReason: "Competitor selected",
      lostNotes: "Client went with a lower-priced competitor"
    },
    {
      id: "14",
      name: "Residential Pool",
      phone: "555-4567",
      email: "pool@email.com",
      service: "Pool Construction",
      estimatedValue: 65000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35),
      stage: "lost",
      stageEnteredAt: new Date(),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: null,
      assignedTo: "Sarah Williams",
      location: {
        address: "234 Green St, San Francisco, CA 94133",
        lat: 37.7991,
        lng: -122.4033
      },
      lostReason: "Project delayed",
      lostNotes: "Client decided to postpone project until next year"
    },
    {
      id: "15",
      name: "Solar Installation",
      phone: "555-5678",
      email: "solar@email.com",
      service: "Solar Systems",
      estimatedValue: 35000,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25),
      stage: "lost",
      stageEnteredAt: new Date(),
      lastContacted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      nextFollowUp: null,
      assignedTo: "Mike Johnson",
      location: {
        address: "345 Union St, San Francisco, CA 94133",
        lat: 37.7998,
        lng: -122.4037
      },
      lostReason: "Changed requirements",
      lostNotes: "Client changed project scope significantly"
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
                stages={pipelineSettings.stages}
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
      <LostLeadModal
        open={!!movingLead}
        onOpenChange={(open) => !open && handleCancelLost()}
        onConfirm={handleMarkAsLost}
        leadName={movingLead?.lead.name || ""}
      />
    </SidebarProvider>
  );
};

export default Index;