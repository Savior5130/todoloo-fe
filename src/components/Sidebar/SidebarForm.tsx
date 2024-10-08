import { useMemo, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styled from "styled-components";
import { SidebarFormProps } from "./SidebarProps";
import Textarea from "../Textarea";
import Input from "../Input";
import Button from "../Button";
import { Todo } from "../../types";
import { transformTodos } from "../../utils";
import { api } from "../../services";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 0.75rem;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export default function SidebarForm({
  defaultValue,
  variant,
  onClickCancel,
  todoState,
  toggleSidebar,
}: SidebarFormProps) {
  const [title, setTitle] = useState(defaultValue?.title || "");
  const [todos, setTodos] = todoState;
  const [description, setDescription] = useState(
    defaultValue?.description || ""
  );
  const handleCreateTodo = () => {
    api
      .post<Todo>("/todos", { title, description }, { withCredentials: true })
      .then(({ data }) => {
        toast.success("Task created successfully");
        setTodos((todos) => {
          return { ...todos, [data.status]: [...todos[data.status], data] };
        });
      });
  };

  const handleSaveChangesDisabled = useMemo(() => {
    return defaultValue
      ? title === defaultValue!.title &&
          description === defaultValue!.description
      : false;
  }, [defaultValue, description, title]);

  const handleAddTaskDisabled = useMemo(() => {
    return title === "" && description === "";
  }, [description, title]);

  const handleEditTodo = () => {
    if (defaultValue)
      api
        .request({
          url: `/todos/${defaultValue.id}`,
          method: "patch",
          data: {
            title,
            description,
          },
        })
        .then(({ data }) => {
          const todos_values = Object.values(todos).flat();
          const new_todos = todos_values.map((todo) =>
            todo.id === data.id ? data : todo
          );
          setTodos(transformTodos(new_todos));
        });
  };

  const handleOnlickCreate = () => {
    handleCreateTodo();
    toggleSidebar();
  };

  const handleOnClickSave = () => {
    handleEditTodo();
    toggleSidebar();
  };

  return variant == "create" ? (
    <StyledContainer>
      <Input
        label="Title"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        label="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleOnlickCreate} disabled={handleAddTaskDisabled}>
        <AiOutlinePlusCircle size={16} />
        Add Task
      </Button>
    </StyledContainer>
  ) : (
    <StyledContainer>
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <StyledButtonContainer>
        <Button
          onClick={handleOnClickSave}
          disabled={handleSaveChangesDisabled}
        >
          Save Changes
        </Button>
        <Button
          variant="ghost"
          onClick={() => onClickCancel && onClickCancel("read")}
        >
          Cancel
        </Button>
      </StyledButtonContainer>
    </StyledContainer>
  );
}
