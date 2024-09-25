import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import styled, { useTheme } from "styled-components";
import { SidebarProps } from "./SidebarProps";
import SidebarCommentSection from "./SidebarCommentSection";
import SidebarForm from "./SidebarForm";
import Button from "../Button";
import DropdownMenu, { menuItem } from "../DropdownMenu";
import { useAppSelector } from "../../hooks";
import { User } from "../../types";
import { transformTodos } from "../../utils";
import { selectUser } from "../../redux/authSlice";
import { api } from "../../services";
import { toast } from "react-toastify";

const StyledSidebar = styled.div`
  padding: 0.5rem;
  padding-top: 2.5rem;
  background-color: ${({ theme }) => theme.background_1};
  z-index: 9;
  display: grid;
  grid-template-rows: auto 1fr;
  width: 30rem;
  box-sizing: border-box;
  height: 100vh;
  gap: 2.5rem;
  position: fixed;
  right: 0;

  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1.25rem;
  position: relative;
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

const StyledAvatar = styled.div`
  border-radius: 100%;
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${({ theme }) => theme.primary_2};
`;

const StyledBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  color: ${({ theme }) => theme.text_muted};
  background-color: ${({ theme }) => theme.background_2};

  &:hover {
    background-color: ${({ theme }) => theme.primary_3};
    color: ${({ theme }) => theme.primary_1};
    transition: all 1s;
    cursor: pointer;
  }
`;

const StyledSpan = styled.span`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function Sidebar({
  onClose,
  todosState,
  onChangeVariant,
  selectedTodoState,
  variant,
}: SidebarProps) {
  const theme = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const user = useAppSelector(selectUser);
  const [menu, setMenu] = useState<menuItem[]>([]);
  const [todos, setTodos] = todosState;
  const [todo, setTodo] = selectedTodoState;

  useEffect(() => {
    if (showMenu) {
      api
        .get(user!.role === "user" ? "users/common" : "users")
        .then(({ data }) => {
          const tempMenu: menuItem[] = data.map((datum: User) => {
            return {
              title: datum.name,
              children: <StyledAvatar />,
              metadata: datum,
              onClick: () => {
                api
                  .request({
                    url: `/todos/${todo!.id}`,
                    method: "patch",
                    data: {
                      assignee: datum,
                    },
                  })
                  .then(({ data }) => {
                    const todos_values = Object.values(todos).flat();
                    const new_todos = todos_values.map((mappedTodo) =>
                      mappedTodo.id === data.id ? data : mappedTodo
                    );
                    setTodos(transformTodos(new_todos));
                    setTodo(data);
                    toast.success(
                      `Task assigned to ${datum.name} successfully`
                    );

                    setShowMenu(false);
                  });
              },
            };
          });
          if (todo!.assignee) {
            tempMenu.push({
              title: "Remove assignee",
              onClick: () => {
                api
                  .request({
                    url: `/todos/${todo!.id}`,
                    method: "patch",
                    data: {
                      assignee: null,
                    },
                  })
                  .then(() => {
                    setShowMenu(false);
                    toast.success("Assignee removed successfully");
                  });
              },
            });
          }
          setMenu(tempMenu);
        });
    }
  }, [setTodo, setTodos, showMenu, todo, todos, user]);

  if (variant == "read")
    return (
      <StyledSidebar>
        <StyledCloseIcon onClick={onClose} />
        <StyledHeaderContainer>
          {todo && todo.assignee ? (
            <StyledSpan className="label1">
              Assigned to{" "}
              <StyledBadge
                className="heading8"
                onClick={() => setShowMenu((showMenu) => !showMenu)}
              >
                {todo.assignee.name}
              </StyledBadge>
            </StyledSpan>
          ) : (
            <Button
              variant="link"
              onClick={() => setShowMenu((showMenu) => !showMenu)}
            >
              <AiOutlinePlus size={16} />
              Assign Task
            </Button>
          )}
          {showMenu && (
            <DropdownMenu
              header="Assign to"
              menus={menu}
              containerStyle={{ top: "1.5rem" }}
            />
          )}
          <StyledTitleContainer>
            <h6 className="heading6">{todo?.title}</h6>{" "}
            <StyledEditIcon
              size={"1.25rem"}
              className="edit-icon"
              onClick={() => onChangeVariant("edit")}
              color={theme.primary_1}
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
          defaultValue={undefined}
          variant="create"
          toggleSidebar={onClose}
          todoState={todosState}
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
          todoState={todosState}
        />
      </StyledSidebar>
    );
}
