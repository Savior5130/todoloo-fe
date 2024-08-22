import styled, { useTheme } from "styled-components";
import { SidebarProps } from "./SidebarProps";
import SidebarCommentSection from "./SidebarCommentSection";
import SidebarForm from "./SidebarForm";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";

const StyledSidebar = styled.div`
  padding: 0.5rem;
  padding-top: 2.5rem;
  background-color: ${({ theme }) => theme.background_1};
  z-index: 9;
  display: grid;
  grid-template-rows: auto 1fr;
  width: 30rem;
  box-sizing: border-box;
  min-height: 100vh;
  gap: 2.5rem;
  position: fixed;
  right: 0;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1.25rem;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  flex: 0 1;
  gap: 0.75rem;
  align-items: end;
`;

const StyledCloseIcon = styled(AiOutlineClose)`
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

const StyledEditIcon = styled(AiOutlineEdit)`
  cursor: pointer;
`;

export default function Sidebar({
  onClose,
  onCreate,
  onChangeVariant,
  todo,
  variant,
}: SidebarProps) {
  const theme = useTheme();

  if (variant == "read")
    return (
      <StyledSidebar>
        <StyledCloseIcon onClick={onClose} />
        <StyledHeaderContainer>
          <p className="label1">Assigned to</p>
          <StyledTitleContainer>
            <h6 className="heading6">{todo?.title}</h6>{" "}
            <StyledEditIcon
              size={"1.25rem"}
              className="edit-icon"
              onClick={() => onChangeVariant("edit")}
              color={theme.text_muted}
            />
          </StyledTitleContainer>
          <p className="body2">{todo?.description}</p>
        </StyledHeaderContainer>
        {todo && <SidebarCommentSection todo={todo} />}
      </StyledSidebar>
    );
  else if (variant == "create")
    return (
      <StyledSidebar>
        <StyledCloseIcon onClick={onClose} />
        <StyledHeaderContainer>
          <h6 className="heading6">Create Task</h6>
        </StyledHeaderContainer>
        <SidebarForm
          defaultValue={todo}
          variant="create"
          toggleSidebar={onClose}
          onCreate={onCreate}
        />
      </StyledSidebar>
    );
  else
    return (
      <StyledSidebar>
        <StyledCloseIcon onClick={onClose} />
        <StyledHeaderContainer>
          <StyledTitleContainer>
            <h6 className="heading6">Edit Task</h6>
          </StyledTitleContainer>
        </StyledHeaderContainer>
        <SidebarForm
          defaultValue={todo}
          onClickCancel={onChangeVariant}
          variant="edit"
          toggleSidebar={onClose}
          onCreate={onCreate}
        />
      </StyledSidebar>
    );
}
