
import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';

interface HeaderProps {
  filter: string;
  setFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onAddTask: () => void;
  tasksInProgress: number;
}

const Header: React.FC<HeaderProps> = ({ 
  filter, 
  setFilter, 
  statusFilter, 
  setStatusFilter, 
  onAddTask,
  tasksInProgress 
}) => {
  return (
    <div className="bg-gray-900 p-4 border-b border-gray-700">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-white text-2xl font-bold">Kanban</h1>
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {tasksInProgress} em progresso
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="">Todos status</option>
              <option value="pendente">Pendente</option>
              <option value="realizando">Realizando</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>

          <button
            onClick={onAddTask}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus size={18} />
            Nova atividade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
