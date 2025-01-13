import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { PipelineStageSettings } from "./PipelineStageSettings";
import { useState, useRef, useEffect } from "react";

interface PipelineStage {
  id: string;
  name: string;
}

interface PipelineStageListProps {
  stages: PipelineStage[];
  onStagesChange: (stages: PipelineStage[]) => void;
  onStageNameChange: (id: string, name: string) => void;
  onStageDelete: (id: string) => void;
  onAddStageAtPosition: (index: number) => void;
}

export function PipelineStageList({
  stages,
  onStagesChange,
  onStageNameChange,
  onStageDelete,
  onAddStageAtPosition,
}: PipelineStageListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onStagesChange(items);
  };

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftScroll(container.scrollLeft > 0);
      setShowRightScroll(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      
      // Initial check
      const observer = new ResizeObserver(checkScroll);
      observer.observe(container);

      return () => {
        container.removeEventListener('scroll', checkScroll);
        observer.disconnect();
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {showLeftScroll && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      
      {showRightScroll && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="stages" direction="horizontal">
          {(provided) => (
            <div
              ref={(el) => {
                provided.innerRef(el);
                if (scrollContainerRef) {
                  scrollContainerRef.current = el;
                }
              }}
              {...provided.droppableProps}
              className="flex gap-2 overflow-x-auto pb-4 min-h-[200px] w-full px-8 scroll-smooth"
              style={{ whiteSpace: 'nowrap' }}
            >
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex items-center">
                  <div className="flex-none w-[210px]">
                    <PipelineStageSettings
                      id={stage.id}
                      name={stage.name}
                      index={index}
                      onNameChange={onStageNameChange}
                      onDelete={onStageDelete}
                    />
                  </div>
                  {index < stages.length - 1 && (
                    <button
                      onClick={() => onAddStageAtPosition(index)}
                      className="flex-none mx-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
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
  );
}