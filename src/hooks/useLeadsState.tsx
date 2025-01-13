import { useState } from "react";
import type { Lead } from "@/components/LeadCard";
import { DropResult } from "react-beautiful-dnd";

export function useLeadsState(initialLeads: Lead[]) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

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

    const leadToMove = leads.find(l => l.id === draggableId);
    if (!leadToMove) return;

    // Create a new array without the moved lead
    const newLeads = leads.filter(l => l.id !== draggableId);

    // If moving to lost column, mark as lost immediately
    if (destination.droppableId === "lost") {
      setLeads([
        ...newLeads,
        {
          ...leadToMove,
          stage: "lost",
          stageEnteredAt: new Date(),
          lostReason: "Marked as lost",
          lostNotes: "Automatically marked as lost when moved to Lost column"
        }
      ]);
      return;
    }

    // Handle all other moves
    setLeads([
      ...newLeads,
      {
        ...leadToMove,
        stage: destination.droppableId,
        stageEnteredAt: new Date()
      }
    ]);
  };

  return {
    leads,
    handleNewLead,
    onDragEnd,
  };
}