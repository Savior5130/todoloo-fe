import styled, { useTheme } from "styled-components";
import { CommentData, SidebarProps } from "./SidebarProps";
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
  variant,
  onChangeVariant,
}: SidebarProps) {
  const theme = useTheme();

  const data: CommentData[] = [
    {
      author: "Mahdy",
      message:
        "Hi, do you need help? I figured you might be in trouble since it took you so long",
      time: "15:23",
    },
    { author: "Mahdy", message: "Hi, Respon pls?", time: "15:23" },
    { author: "Mahdy", message: "Ping", time: "15:23" },
    { author: "Mahdy", message: "Hi, do you need help?", time: "15:23" },
    // { author: "Mahdy", message: "Darling", time: "15:23" },
  ];

  if (variant == "read")
    return (
      <StyledSidebar>
        <StyledCloseIcon onClick={onClose} />
        <StyledHeaderContainer>
          <p className="label1">Assigned to</p>
          <StyledTitleContainer>
            <h6 className="heading6">Update database web</h6>{" "}
            <StyledEditIcon
              size={"1.25rem"}
              className="edit-icon"
              onClick={() => onChangeVariant("edit")}
              color={theme.text_muted}
            />
          </StyledTitleContainer>
          <p className="body2">
            Update databse dan Unit Testing untuk web Pemda
          </p>
        </StyledHeaderContainer>
        <SidebarCommentSection data={data} />
      </StyledSidebar>
    );
  else if (variant == "create")
    return (
      <StyledSidebar>
        <StyledCloseIcon onClick={onClose} />
        <StyledHeaderContainer>
          <h6 className="heading6">Create Task</h6>
        </StyledHeaderContainer>
        <SidebarForm variant="create" />
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
        <SidebarForm onClickCancel={onChangeVariant} variant="edit" />
      </StyledSidebar>
    );
}
