import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, KanbanState } from '../types/kanban';

const STORAGE_KEY = 'kanban-data';

const initialState: KanbanState = {
  columns: {
    pendente: {
      id: 'pendente',
      title: 'Pendente',
      tasks: []
    },
    realizando: {
      id: 'realizando',
      title: 'Realizando',
      tasks: []
    },
    concluida: {
      id: 'concluida',
      title: 'Concluída',
      tasks: []
    }
  }
};

export const useKanban = () => {
  const [state, setState] = useState<KanbanState>(initialState);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setState(parsedData);
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const sortTasksByPriority = (tasks: Task[]) => {
    const priorityOrder = { alta: 0, media: 1, baixa: 2 };
    return tasks.slice().sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  const addTask = (title: string, description: string, priority: 'alta' | 'media' | 'baixa' = 'media') => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: 'pendente',
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        pendente: {
          ...prev.columns.pendente,
          tasks: sortTasksByPriority([...prev.columns.pendente.tasks, newTask])
        }
      }
    }));

    return newTask.id;
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setState(prev => {
      const newState = { ...prev };
      Object.keys(newState.columns).forEach(columnKey => {
        const column = newState.columns[columnKey as keyof typeof newState.columns];
        const taskIndex = column.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          column.tasks[taskIndex] = {
            ...column.tasks[taskIndex],
            ...updates,
            updatedAt: new Date().toISOString()
          };
          // Ordena após atualizar
          column.tasks = sortTasksByPriority(column.tasks);
        }
      });
      return newState;
    });
  };

  const moveTask = (taskId: string, newStatus: 'pendente' | 'realizando' | 'concluida') => {
    setState(prev => {
      const newState = { ...prev };
      let taskToMove: Task | null = null;
      Object.keys(newState.columns).forEach(columnKey => {
        const column = newState.columns[columnKey as keyof typeof newState.columns];
        const taskIndex = column.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          taskToMove = { ...column.tasks[taskIndex], status: newStatus, updatedAt: new Date().toISOString() };
          column.tasks.splice(taskIndex, 1);
          // Ordena após remover
          column.tasks = sortTasksByPriority(column.tasks);
        }
      });
      if (taskToMove) {
        newState.columns[newStatus].tasks = sortTasksByPriority([
          ...newState.columns[newStatus].tasks,
          taskToMove
        ]);
      }
      return newState;
    });
  };

  const deleteTask = (taskId: string) => {
    setState(prev => {
      const newState = { ...prev };
      
      Object.keys(newState.columns).forEach(columnKey => {
        const column = newState.columns[columnKey as keyof typeof newState.columns];
        column.tasks = column.tasks.filter(task => task.id !== taskId);
      });

      return newState;
    });
  };

  const reorderTasks = (columnId: string, startIndex: number, endIndex: number) => {
    setState(prev => {
      const newState = { ...prev };
      const column = newState.columns[columnId as keyof typeof newState.columns];
      const [removed] = column.tasks.splice(startIndex, 1);
      column.tasks.splice(endIndex, 0, removed);
      // Ordena por prioridade: alta > média > baixa
      column.tasks = sortTasksByPriority(column.tasks);
      return newState;
    });
  };

  const getFilteredTasks = () => {
    const allTasks = [
      ...state.columns.pendente.tasks,
      ...state.columns.realizando.tasks,
      ...state.columns.concluida.tasks
    ];

    return allTasks.filter(task => {
      const matchesText = !filter || 
        task.title.toLowerCase().includes(filter.toLowerCase()) ||
        task.description.toLowerCase().includes(filter.toLowerCase());
      
      const matchesStatus = !statusFilter || task.status === statusFilter;

      return matchesText && matchesStatus;
    });
  };

  const getTasksInProgress = () => {
    return state.columns.realizando.tasks;
  };

  return {
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
    getFilteredTasks,
    getTasksInProgress
  };
};
