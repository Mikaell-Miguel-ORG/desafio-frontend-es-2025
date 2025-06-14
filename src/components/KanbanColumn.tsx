
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Column, Task } from '../types/kanban';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  column: Column;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onTaskClick: (task: Task) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  column, 
  onEditTask, 
  onDeleteTask, 
  onTaskClick 
}) => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-lg p-4 min-h-[600px]">
      <h2 className="text-white text-lg font-semibold mb-4 text-center">
        {column.title}
      </h2>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-3 transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-700/50 rounded-lg' : ''
            }`}
          >
            {column.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onClick={onTaskClick}
              />
            ))}
            {provided.placeholder}
            
            {column.tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="text-gray-500 text-center py-8 text-sm">
                Nenhuma tarefa
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
