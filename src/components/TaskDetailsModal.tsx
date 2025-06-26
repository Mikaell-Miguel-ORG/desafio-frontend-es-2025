import React from 'react';
import { X, Edit } from 'lucide-react';
import { Task } from '../types/kanban';

interface TaskDetailsModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ isOpen, task, onClose, onEdit, onDelete }) => {
  if (!isOpen || !task) return null;

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'realizando':
        return 'Realizando';
      case 'concluida':
        return 'Concluída';
      default:
        return status;
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-white text-xl font-semibold pr-4">
            {task.title}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              title="Editar tarefa"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-white text-sm font-medium mb-2">Descrição</h3>
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-gray-300 text-sm leading-relaxed">
                {task.description || 'Nenhuma descrição fornecida.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-white text-sm font-medium mb-2">Status</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs text-white font-medium ${getStatusColor(task.status)}`}>
                {getStatusLabel(task.status)}
              </span>
            </div>

            <div>
              <h3 className="text-white text-sm font-medium mb-2">Prioridade</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs text-white font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-white text-sm font-medium mb-2">Criado em</h3>
              <p className="text-gray-400 text-sm">
                {new Date(task.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div>
              <h3 className="text-white text-sm font-medium mb-2">Atualizado em</h3>
              <p className="text-gray-400 text-sm">
                {new Date(task.updatedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
