import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styled from "styled-components";
import Navbar, {
  Button,
  Sidebar,
  SidebarVariant,
  TodoItem,
} from "../components";
import { Todo, TodoStatus } from "../types";
import { AxiosInstance } from "../api";

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.background_2};
  display: flex;
  padding: 2.5rem 4rem;
  align-items: flex-start;
  gap: 2rem;
  flex: 1;
  align-self: stretch;
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  flex: 1;
  align-self: stretch;
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const StyledStatusContainer = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background_1};
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

export default function HomeScreen() {
  const [sidebar, setSidebar] = useState(false);
  const [variant, setVariant] = useState<SidebarVariant>("read");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);

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

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(todos.filter((todo) => todo.title.startsWith(e.target.value)));
  };

  const handleRenderSidebar = useMemo(
    () =>
      sidebar && (
        <Sidebar
          variant={variant}
          todo={selectedTodo}
          onClose={handleCloseSidebar}
          onChangeVariant={handleChangeVariant}
          onCreate={setTodos}
        />
      ),
    [selectedTodo, sidebar, variant]
  );

  const handleRenderItem = useCallback(
    (todoStatus: TodoStatus) =>
      todos
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
            />
          );
        }),
    [handleClickTodo, handleClickTodoIcon, todos]
  );

  const fetchData = async () => {
    await AxiosInstance.request({ url: "/todos", method: "GET" }).then(
      ({ data }) => setTodos(data)
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar onSearch={handleChangeSearch} />
      {handleRenderSidebar}
      <StyledContainer>
        <StyledCardContainer>
          <StyledStatusContainer>
            <StyledEllipse1 />
            <h6 className="heading7">To Do (1)</h6>
          </StyledStatusContainer>
          <StyledInnerContainer>
            {handleRenderItem("TODO")}
            <Button variant="primary" onClick={handleClickAddTask}>
              <AiOutlinePlusCircle size={"1rem"} />
              New Task
            </Button>
          </StyledInnerContainer>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledStatusContainer>
            <StyledEllipse2 />
            <h6 className="heading7">In Progress (1)</h6>
          </StyledStatusContainer>
          <StyledInnerContainer>
            {handleRenderItem("IN_PROGRESS")}
          </StyledInnerContainer>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledStatusContainer>
            <StyledEllipse3 />
            <h6 className="heading7">Done (1)</h6>
          </StyledStatusContainer>
          <StyledInnerContainer>
            {handleRenderItem("DONE")}
          </StyledInnerContainer>
        </StyledCardContainer>
      </StyledContainer>
    </>
  );
}
