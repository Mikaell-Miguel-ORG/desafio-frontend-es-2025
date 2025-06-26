import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types/kanban';
import { Edit, X } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete, onClick }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-500';
      case 'media':
        return 'bg-yellow-500';
      case 'baixa':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-red-500';
      case 'realizando':
        return 'bg-blue-500';
      case 'concluida':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
    setShowConfirm(false);
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
            getStatusColor(task.status)
          } ${
            snapshot.isDragging ? 'shadow-lg scale-105' : 'hover:shadow-md'
          }`}
          onClick={() => onClick(task)}
        >
          {/* Modal de confirmação de exclusão */}
          {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs flex flex-col items-center">
                <p className="text-white mb-4 text-center">Tem certeza que deseja excluir esta tarefa?</p>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-medium text-sm line-clamp-2">
              {task.title}
            </h3>
            <div className="flex gap-1 ml-2">
              <button
                onClick={handleEdit}
                className="text-white/70 hover:text-white transition-colors p-1"
                title="Editar tarefa"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={handleDelete}
                className="text-white/70 hover:text-white transition-colors p-1"
                title="Excluir tarefa"
              >
                <X size={14} />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-white/80 text-xs mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex justify-between items-center">
            <span className={`px-2 py-1 rounded text-xs text-white font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className="text-white/60 text-xs">
              {new Date(task.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
