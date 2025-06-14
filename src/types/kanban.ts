
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pendente' | 'realizando' | 'concluida';
  priority: 'alta' | 'media' | 'baixa';
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface KanbanState {
  columns: {
    pendente: Column;
    realizando: Column;
    concluida: Column;
  };
}
