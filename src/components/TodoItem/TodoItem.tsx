import { AiOutlineEdit } from "react-icons/ai";
import styled, { useTheme } from "styled-components";
import { TodoItemProps } from "./TodoItemProps";

const StyledTodoContainer = styled.div`
  display: flex;
  flex: 0 1;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
  background-color: ${({ theme }) => theme.background_1};
  border-radius: 1rem;

  &:hover {
    cursor: pointer;
  }

  &:hover .edit-icon {
    opacity: 1;
    transition: 0.4s;
  }
`;

const StyledHeading = styled.h6`
  &:hover {
    color: ${({ theme }) => theme.primary_1};
    transition: 0.4s;
  }
`;

const StyledTodoHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.75rem;
`;

const StyledTodoInnerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

const StyledIcon = styled(AiOutlineEdit)`
  opacity: 0;
`;

const StyledMutedText = styled.p`
  color: ${({ theme }) => theme.text_muted};
`;

export default function TodoItem({
  assignee,
  title,
  description,
  onClick,
  onClickIcon,
}: TodoItemProps) {
  const theme = useTheme();
  return (
    <StyledTodoContainer draggable>
      <StyledTodoInnerContainer>
        <StyledTodoHeader>
          <StyledHeading className="heading7" onClick={onClick}>
            {title}
          </StyledHeading>
          <StyledIcon
            className="edit-icon"
            color={theme.text_muted}
            onClick={onClickIcon}
          />
        </StyledTodoHeader>
        <StyledMutedText className="muted body4">{description}</StyledMutedText>
      </StyledTodoInnerContainer>
      {assignee && (
        <StyledMutedText className="label4">Assigned to Mahdy</StyledMutedText>
      )}
    </StyledTodoContainer>
  );
}
