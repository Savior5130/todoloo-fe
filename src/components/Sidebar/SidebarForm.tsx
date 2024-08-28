import { useMemo, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styled from "styled-components";
import { SidebarFormProps } from "./SidebarProps";
import Textarea from "../Textarea";
import Input from "../Input";
import Button from "../Button";
import { AxiosInstance } from "../../api";

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

  const handleSaveChangesDisabled = useMemo(() => {
    return (
      title === defaultValue!.title && description === defaultValue!.description
    );
  }, [defaultValue, description, title]);

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
      <Button onClick={handleOnlickCreate}>
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
