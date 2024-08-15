import { AiOutlineEdit } from "react-icons/ai";
import styled, { useTheme } from "styled-components";

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

  &:hover .heading7 {
    color: ${({ theme }) => theme.primary_1};
    transition: 0.4s;
  }

  &:hover .edit-icon {
    opacity: 1;
    transition: 0.4s;
  }
`;

const StyledTodoHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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

export default function TodoItem() {
  const theme = useTheme();
  return (
    <StyledTodoContainer draggable>
      <StyledTodoInnerContainer>
        <StyledTodoHeader>
          <h6 className="heading7">Update Database Web</h6>
          <StyledIcon className="edit-icon" color={theme.muted} />
        </StyledTodoHeader>
        <StyledMutedText className="muted body4">
          Update database dan Unit Testing untuk web Pemda
        </StyledMutedText>
      </StyledTodoInnerContainer>
      <StyledMutedText className="label4">Assigned to Mahdy</StyledMutedText>
    </StyledTodoContainer>
  );
}
