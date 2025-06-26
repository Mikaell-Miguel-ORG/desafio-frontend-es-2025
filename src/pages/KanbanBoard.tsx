import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useKanban } from '../hooks/useKanban';
import { Task } from '../types/kanban';
import Header from '../components/Header';
import KanbanColumn from '../components/KanbanColumn';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';

const KanbanBoard: React.FC = () => {
  const {
    state,
    filter,
    setFilter,
    statusFilter,
    setStatusFilter,
    addTask,
    updateTask,
    moveTask,
    deleteTask,
    reorderTasks,
    getTasksInProgress
  } = useKanban();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      // Reordenar dentro da mesma coluna
      reorderTasks(source.droppableId, source.index, destination.index);
    } else {
      // Mover para coluna diferente
      moveTask(draggableId, destination.droppableId as 'pendente' | 'realizando' | 'concluida');
    }
  };

  const handleAddTask = (title: string, description: string, priority: 'alta' | 'media' | 'baixa') => {
    addTask(title, description, priority);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    updateTask(taskId, updates);
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDetailsModalOpen(false);
    setSelectedTask(null);
  };

  // Filtrar tarefas se houver filtros ativos
  const getFilteredColumns = () => {
    if (!filter && !statusFilter && !priorityFilter) return state.columns;

    // Deep copy das colunas e das tasks
    const filteredColumns = Object.keys(state.columns).reduce((acc, columnKey) => {
      const column = state.columns[columnKey as keyof typeof state.columns];
      acc[columnKey as keyof typeof state.columns] = {
        ...column,
        tasks: column.tasks.filter(task => {
          const matchesText = !filter || 
            task.title.toLowerCase().includes(filter.toLowerCase()) ||
            task.description.toLowerCase().includes(filter.toLowerCase());
          const matchesStatus = !statusFilter || task.status === statusFilter;
          const matchesPriority = !priorityFilter || task.priority === priorityFilter;
          return matchesText && matchesStatus && matchesPriority;
        })
      };
      return acc;
    }, {} as typeof state.columns);

    return filteredColumns;
  };

  const filteredColumns = getFilteredColumns();
  const tasksInProgress = getTasksInProgress();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        filter={filter}
        setFilter={setFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        onAddTask={() => setIsAddModalOpen(true)}
        tasksInProgress={tasksInProgress.length}
      />

      <div className="p-4 lg:p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <KanbanColumn
              column={filteredColumns.pendente}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
              onTaskClick={handleTaskClick}
            />
            <KanbanColumn
              column={filteredColumns.realizando}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
              onTaskClick={handleTaskClick}
            />
            <KanbanColumn
              column={filteredColumns.concluida}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
              onTaskClick={handleTaskClick}
            />
          </div>
        </DragDropContext>
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        onAdd={handleAddTask}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        task={selectedTask}
        onClose={handleCloseModals}
        onUpdate={handleUpdateTask}
      />

      <TaskDetailsModal
        isOpen={isDetailsModalOpen}
        task={selectedTask}
        onClose={handleCloseModals}
        onEdit={handleEditTask}
        onDelete={(taskId) => {
          deleteTask(taskId);
          handleCloseModals();
        }}
      />
    </div>
  );
};

export default KanbanBoard;
