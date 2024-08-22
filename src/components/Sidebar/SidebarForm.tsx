import styled from "styled-components";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { SidebarFormProps } from "./SidebarProps";
import Textarea from "../Textarea/Textarea";
import { AxiosInstance } from "../../api";
import { useState } from "react";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 0.75rem;
`;

export default function SidebarForm({
  defaultValue,
  variant,
  onClickCancel,
  onCreate,
  toggleSidebar,
}: SidebarFormProps) {
  const [title, setTitle] = useState(defaultValue?.title || "");
  const [description, setDescription] = useState(
    defaultValue?.description || ""
  );
  const handleCreateTodo = () => {
    AxiosInstance.post("/todos", { title, description }).then(({ data }) => {
      onCreate((todos) => [...todos, data]);
    });
  };

  const handleEditTodo = () => {
    if (defaultValue)
      AxiosInstance.request({
        url: `/todos/${defaultValue.id}`,
        method: "patch",
        data: {
          title,
          description,
        },
      }).then(({ data }) =>
        onCreate((todos) =>
          todos.map((todo) => (todo.id === data.id ? data : todo))
        )
      );
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
      <Button onClick={handleOnlickCreate}>Add Task</Button>
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
      <Button onClick={handleOnClickSave}>Save Changes</Button>
      <Button onClick={() => onClickCancel && onClickCancel("read")}>
        Cancel
      </Button>
    </StyledContainer>
  );
}
