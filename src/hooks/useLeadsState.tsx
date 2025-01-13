import { useState } from "react";
import type { Lead } from "@/components/LeadCard";
import { DropResult } from "react-beautiful-dnd";

export function useLeadsState(initialLeads: Lead[]) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [movingLead, setMovingLead] = useState<{
    lead: Lead;
    sourceStage: string;
  } | null>(null);

  const handleNewLead = (leadData: Omit<Lead, "id" | "createdAt" | "stageEnteredAt">) => {
    const newLead: Lead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      stageEnteredAt: new Date(),
      lastContacted: undefined,
      nextFollowUp: undefined,
      assignedTo: "John Doe",
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

    // Handle moving to lost column
    if (destination.droppableId === "lost" && source.droppableId !== "lost") {
      // Store original state before moving
      setMovingLead({ 
        lead: { ...lead }, // Create a copy of the lead
        sourceStage: source.droppableId 
      });
      
      // Move to lost immediately
      setLeads(prevLeads => {
        const newLeads = prevLeads.filter(l => l.id !== draggableId);
        return [...newLeads, {
          ...lead,
          stage: "lost",
          stageEnteredAt: new Date()
        }];
      });
      return;
    }

    // Handle all other moves
    setLeads(prevLeads => {
      const newLeads = prevLeads.filter(l => l.id !== draggableId);
      return [...newLeads, {
        ...lead,
        stage: destination.droppableId,
        stageEnteredAt: new Date()
      }];
    });
  };

  const handleMarkAsLost = (reason: string, notes: string) => {
    if (!movingLead) return;

    setLeads(prevLeads => {
      const newLeads = prevLeads.filter(l => l.id !== movingLead.lead.id);
      return [...newLeads, {
        ...movingLead.lead,
        stage: "lost",
        stageEnteredAt: new Date(),
        lostReason: reason,
        lostNotes: notes
      }];
    });
    
    setMovingLead(null);
  };

  const handleCancelLost = () => {
    if (!movingLead) return;

    setLeads(prevLeads => {
      const newLeads = prevLeads.filter(l => l.id !== movingLead.lead.id);
      return [...newLeads, {
        ...movingLead.lead,
        stage: movingLead.sourceStage
      }];
    });
    
    setMovingLead(null);
  };

  return {
    leads,
    movingLead,
    handleNewLead,
    onDragEnd,
    handleMarkAsLost,
    handleCancelLost,
  };
}