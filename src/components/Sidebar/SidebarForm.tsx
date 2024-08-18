import styled from "styled-components";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { SidebarFormProps } from "./SidebarProps";
import Textarea from "../Textarea/Textarea";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 0.75rem;
`;

export default function SidebarForm({
  variant,
  onClickCancel,
}: SidebarFormProps) {
  return variant == "create" ? (
    <StyledContainer>
      <Input label="Title" placeholder="Task title" />
      <Textarea label="Description" placeholder="Description" />
      <Button>Add Task</Button>
    </StyledContainer>
  ) : (
    <StyledContainer>
      <Input label="Title" />
      <Textarea label="Description" />
      <Button>Save Changes</Button>
      <Button onClick={() => onClickCancel && onClickCancel("read")}>
        Cancel
      </Button>
    </StyledContainer>
  );
}
