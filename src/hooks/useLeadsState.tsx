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
    setLeads(prev => [...prev, newLead]);
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

    // Find the lead being moved
    const leadIndex = leads.findIndex(l => l.id === draggableId);
    if (leadIndex === -1) return;
    
    const lead = leads[leadIndex];

    // If moving to lost column
    if (destination.droppableId === "lost" && source.droppableId !== "lost") {
      // Store the original lead state
      const originalLead = { ...lead };
      
      // Immediately move to lost column
      const updatedLeads = [...leads];
      updatedLeads[leadIndex] = {
        ...lead,
        stage: "lost",
        stageEnteredAt: new Date()
      };
      
      setLeads(updatedLeads);
      setMovingLead({
        lead: originalLead,
        sourceStage: source.droppableId
      });
      return;
    }

    // Handle all other moves
    const updatedLeads = [...leads];
    updatedLeads[leadIndex] = {
      ...lead,
      stage: destination.droppableId,
      stageEnteredAt: new Date()
    };
    setLeads(updatedLeads);
  };

  const handleMarkAsLost = (reason: string, notes: string) => {
    if (!movingLead) return;

    const leadIndex = leads.findIndex(l => l.id === movingLead.lead.id);
    if (leadIndex === -1) return;

    const updatedLeads = [...leads];
    updatedLeads[leadIndex] = {
      ...leads[leadIndex],
      lostReason: reason,
      lostNotes: notes,
      stage: "lost",
      stageEnteredAt: new Date()
    };

    setLeads(updatedLeads);
    setMovingLead(null);
  };

  const handleCancelLost = () => {
    if (!movingLead) return;

    const leadIndex = leads.findIndex(l => l.id === movingLead.lead.id);
    if (leadIndex === -1) return;

    const updatedLeads = [...leads];
    updatedLeads[leadIndex] = {
      ...movingLead.lead,
      stage: movingLead.sourceStage
    };

    setLeads(updatedLeads);
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