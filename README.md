
# Kanban Board - Aplicação Frontend

Uma aplicação Kanban moderna e responsiva desenvolvida em React com TypeScript, oferecendo uma interface intuitiva para gerenciamento de tarefas com funcionalidades completas de drag-and-drop.

## 🚀 Funcionalidades

### Gerenciamento de Tarefas
- ✅ **Adicionar tarefas**: Crie novas tarefas com título, descrição e prioridade
- ✅ **Editar tarefas**: Modifique informações de tarefas existentes
- ✅ **Excluir tarefas**: Remova tarefas com confirmação de segurança
- ✅ **Visualizar detalhes**: Veja informações completas de cada tarefa

### Organização e Status
- ✅ **Três colunas**: Pendente, Realizando e Concluída
- ✅ **Drag and Drop**: Arraste tarefas entre colunas e reordene dentro da mesma coluna
- ✅ **Prioridades**: Defina e visualize prioridades (Alta, Média, Baixa) com cores distintas
- ✅ **Data de criação/atualização**: Controle temporal automático

### Filtros e Busca
- ✅ **Busca por texto**: Filtre tarefas por título ou descrição
- ✅ **Filtro por status**: Visualize tarefas de um status específico
- ✅ **Contador de progresso**: Veja quantas tarefas estão em andamento

### Persistência e Performance
- ✅ **localStorage**: Todos os dados são salvos localmente no navegador
- ✅ **Sincronização automática**: Estado persistido automaticamente
- ✅ **Interface responsiva**: Funciona perfeitamente em desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **React Beautiful DND** para drag and drop
- **React Router Dom** para roteamento
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **UUID** para geração de IDs únicos
- **localStorage** para persistência de dados

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para executar

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd kanban-app
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute a aplicação**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Header.tsx       # Cabeçalho com busca e filtros
│   ├── KanbanColumn.tsx # Coluna do quadro Kanban
│   ├── TaskCard.tsx     # Cartão individual de tarefa
│   ├── AddTaskModal.tsx # Modal para adicionar tarefa
│   ├── EditTaskModal.tsx # Modal para editar tarefa
│   └── TaskDetailsModal.tsx # Modal de detalhes da tarefa
├── hooks/               # Hooks customizados
│   └── useKanban.ts    # Hook principal para gerenciamento do estado
├── pages/               # Páginas da aplicação
│   └── KanbanBoard.tsx # Página principal do quadro
├── types/               # Definições de tipos TypeScript
│   └── kanban.ts       # Interfaces e tipos do domínio
└── App.tsx             # Componente raiz da aplicação
```

## 🎨 Design e Interface

A aplicação segue um design moderno com:
- **Tema escuro** para reduzir fadiga visual
- **Cores organizadas por status**: Vermelho (Pendente), Azul (Realizando), Verde (Concluída)
- **Indicadores de prioridade** com cores distintas
- **Animações suaves** para interações drag-and-drop
- **Layout responsivo** que se adapta a diferentes tamanhos de tela

## 💾 Persistência de Dados

Todos os dados são armazenados no `localStorage` do navegador, incluindo:
- Lista completa de tarefas
- Estados das colunas
- Timestamps de criação e atualização
- Configurações de filtros (temporárias)

Os dados persistem entre sessões do navegador e são sincronizados automaticamente.

## 🔧 Funcionalidades Técnicas

### Drag and Drop
- Implementado com `react-beautiful-dnd`
- Suporte a reordenação dentro da mesma coluna
- Movimentação entre colunas diferentes
- Feedback visual durante o arraste

### Gerenciamento de Estado
- Hook customizado `useKanban` centraliza toda lógica
- Estado reativo com `useState`
- Sincronização automática com `useEffect`
- Operações CRUD completas

### Responsividade
- Grid system adaptativo
- Layout mobile-first
- Componentes flexíveis
- Navegação otimizada para touch

## 🚀 Próximas Funcionalidades (Roadmap)

- [ ] Categorias/Tags para tarefas
- [ ] Anexos de arquivos
- [ ] Histórico de alterações
- [ ] Exportação de dados
- [ ] Temas personalizáveis
- [ ] Atalhos de teclado
- [ ] Notificações de prazo

## 📱 Compatibilidade

- ✅ Chrome/Edge (versões recentes)
- ✅ Firefox (versões recentes)
- ✅ Safari (versões recentes)
- ✅ Dispositivos móveis (iOS/Android)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Desenvolvido por

Desenvolvido como uma aplicação de demonstração para gerenciamento de tarefas com interface moderna e intuitiva.

---

**Nota**: Esta é uma aplicação 100% frontend. Todos os dados são armazenados localmente no navegador e não há integração com backend ou APIs externas.
