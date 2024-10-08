import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styled from "styled-components";
import Navbar, {
  Button,
  Sidebar,
  SidebarVariant,
  TodoItem,
} from "../components";
import { Todo, TodoState, TodoStatus } from "../types";
import { transformTodos } from "../utils";
import { api } from "../services";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.background_3};
  display: flex;
  padding: 2.5rem 4rem;
  align-items: flex-start;
  gap: 2rem;
  flex: 1;
  align-self: stretch;
  @media screen and (max-width: 768px) {
    padding: 1rem 2rem;
    gap: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    padding: 1rem 0;
    padding-bottom: 2rem;
    flex-direction: column;
    background-color: ${({ theme }) => theme.background_2};
  }
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  flex: 1;
  align-self: stretch;

  @media screen and (max-width: 600px) {
    gap: 0.5rem;
  }
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  flex: 1;
  border-radius: 1rem;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    padding: 0.25rem 1rem;
  }
`;

const StyledStatusContainer = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background_1};

  @media screen and (max-width: 600px) {
    border-radius: 0;
    background-color: transparent;
    padding: 0.5rem 1.25rem;
  }
`;

const StyledEllipse = styled.div`
  border-radius: 100%;
  width: 0.875rem;
  height: 0.875rem;
`;

const StyledEllipse1 = styled(StyledEllipse)`
  background-color: ${({ theme }) => theme.primary_1};
`;

const StyledEllipse2 = styled(StyledEllipse)`
  background-color: ${({ theme }) => theme.warning_1};
`;

const StyledEllipse3 = styled(StyledEllipse)`
  background-color: ${({ theme }) => theme.success_1};
`;

const StyledButton = styled(Button)`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export default function HomeScreen() {
  const [sidebar, setSidebar] = useState(false);
  const [variant, setVariant] = useState<SidebarVariant>("read");
  const todosState = useState<TodoState>({
    DONE: [],
    IN_PROGRESS: [],
    TODO: [],
  });
  const [todos, setTodos] = todosState;
  const [filteredTodos, setFilteredTodos] = useState<TodoState | undefined>(
    undefined
  );
  const selectedTodoState = useState<Todo | undefined>(undefined);
  const setSelectedTodo = selectedTodoState[1];

  const handleOpenSidebar = () => setSidebar(true);
  const handleCloseSidebar = () => setSidebar(false);
  const handleChangeVariant = (variant: SidebarVariant) => setVariant(variant);

  const handleClickAddTask = () => {
    setVariant(() => "create");
    handleOpenSidebar();
  };

  const handleClickTodo = useCallback(
    (todo: Todo) => {
      setSelectedTodo(() => todo);
      setVariant(() => "read");
      handleOpenSidebar();
    },
    [setSelectedTodo]
  );

  const handleClickTodoIcon = useCallback(
    (todo: Todo) => {
      setSelectedTodo(() => todo);
      setVariant(() => "edit");
      handleOpenSidebar();
    },
    [setSelectedTodo]
  );

  const handleOnDrag = (e: React.DragEvent, todo: Todo) => {
    e.dataTransfer.setData("todo_id", todo.id.toString());
    e.dataTransfer.setData("todo_status", todo.status.toString());
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLDivElement;
    if (!target.classList.contains("dropzone"))
      target.classList.add("dropzone");
  };

  const handleOnDragOut = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    target.classList.remove("dropzone");
  };

  const handleOnDrop = (e: React.DragEvent, target_status: TodoStatus) => {
    const target = e.currentTarget as HTMLDivElement;
    const todo_id = e.dataTransfer.getData("todo_id");
    const todo_status = e.dataTransfer.getData("todo_status");
    target.classList.remove("dropzone");

    if (todo_status !== target_status)
      api
        .request<Todo>({
          url: `/todos/${todo_id}`,
          method: "patch",
          data: {
            status: target_status,
          },
        })
        .then(({ data }) => {
          const todo_values = Object.values(todos).flat();
          const newTodos = todo_values.map((todo) =>
            todo.id === data.id ? data : todo
          );
          toast.success(`Status changed to ${target_status}`);
          setTodos(transformTodos(newTodos));
        });
  };

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const todos_value = Object.values(todos);
      const temp_filtered_todo = todos_value
        .flat()
        .filter((todo) =>
          todo.title.toLowerCase().startsWith(e.target.value.toLowerCase())
        );
      setFilteredTodos(transformTodos(temp_filtered_todo));
    },
    [todos]
  );

  const handleRenderSidebar = useMemo(
    () =>
      sidebar && (
        <Sidebar
          variant={variant}
          selectedTodoState={selectedTodoState}
          onClose={handleCloseSidebar}
          onChangeVariant={handleChangeVariant}
          todosState={todosState}
        />
      ),
    [selectedTodoState, sidebar, todosState, variant]
  );

  const handleRenderItem = useCallback(
    (todoStatus: TodoStatus, data: Todo[]) => {
      return data
        .filter((todo) => todo.status === todoStatus)
        .map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              assignee={todo.assignee}
              title={todo.title}
              description={todo.description}
              onClick={() => handleClickTodo(todo)}
              onClickIcon={() => handleClickTodoIcon(todo)}
              onDrag={(e: React.DragEvent) => handleOnDrag(e, todo)}
            />
          );
        });
    },
    [handleClickTodo, handleClickTodoIcon]
  );

  useEffect(() => {
    const fetchData = async () => {
      await api.request({ url: "/todos", method: "GET" }).then(({ data }) => {
        setTodos(transformTodos(data));
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar onSearch={handleChangeSearch} onAddTask={handleClickAddTask} />
      {handleRenderSidebar}
      <StyledContainer>
        <StyledCardContainer>
          <StyledStatusContainer>
            <StyledEllipse1 />
            <h6 className="heading7">
              To Do (
              {filteredTodos ? filteredTodos.TODO.length : todos.TODO.length})
            </h6>
          </StyledStatusContainer>
          <StyledInnerContainer
            onDragExit={(e) => handleOnDragOut(e)}
            onDragLeave={(e) => handleOnDragOut(e)}
            onDragOver={handleOnDragOver}
            onDrop={(e) => handleOnDrop(e, "TODO")}
          >
            {handleRenderItem(
              "TODO",
              filteredTodos ? filteredTodos.TODO : todos.TODO
            )}
            <StyledButton variant="primary" onClick={handleClickAddTask}>
              <AiOutlinePlusCircle size={16} />
              New Task
            </StyledButton>
          </StyledInnerContainer>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledStatusContainer>
            <StyledEllipse2 />
            <h6 className="heading7">
              In Progress (
              {filteredTodos
                ? filteredTodos.IN_PROGRESS.length
                : todos.IN_PROGRESS.length}
              )
            </h6>
          </StyledStatusContainer>
          <StyledInnerContainer
            onDragExit={(e) => handleOnDragOut(e)}
            onDragLeave={(e) => handleOnDragOut(e)}
            onDragOver={handleOnDragOver}
            onDrop={(e) => handleOnDrop(e, "IN_PROGRESS")}
          >
            {handleRenderItem(
              "IN_PROGRESS",
              filteredTodos ? filteredTodos.IN_PROGRESS : todos.IN_PROGRESS
            )}
          </StyledInnerContainer>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledStatusContainer>
            <StyledEllipse3 />
            <h6 className="heading7">
              Done (
              {filteredTodos ? filteredTodos.DONE.length : todos.DONE.length})
            </h6>
          </StyledStatusContainer>
          <StyledInnerContainer
            onDragExit={(e) => handleOnDragOut(e)}
            onDragLeave={(e) => handleOnDragOut(e)}
            onDragOver={handleOnDragOver}
            onDrop={(e) => handleOnDrop(e, "DONE")}
          >
            {handleRenderItem(
              "DONE",
              filteredTodos ? filteredTodos.DONE : todos.DONE
            )}
          </StyledInnerContainer>
        </StyledCardContainer>
      </StyledContainer>
    </>
  );
}
