import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import styled, { useTheme } from "styled-components";
import { NavbarProps } from "./NavbarProps";
import DropdownMenu from "../DropdownMenu";
import Input from "../Input/Input";
import { useAppSelector, useAuth } from "../../hooks";
import { debounce } from "../../utils";
import { AiOutlineLogout, AiOutlinePlusCircle } from "react-icons/ai";
import Button from "../Button";
import { selectUser } from "../../redux/authSlice";

interface toggleMenuProps {
  showmenu: boolean;
}

const StyledContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 1rem 4rem;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background_1};

  @media screen and (max-width: 768px) {
    padding: 0.75rem 2rem;
  }

  @media screen and (max-width: 600px) {
    padding: 0.75rem 1rem;
  }
`;

const StyledAvatar = styled.div`
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.primary_2};
`;

const StyledProfileContainer = styled.div`
  display: flex;
  flex: 0 1;
  align-items: center;
  position: relative;
  gap: 0.75rem;
`;

const StyledHeading = styled.h5`
  color: ${({ theme }) => theme.primary_1};
`;

const StyledIcon = styled(FaAngleDown)`
  cursor: pointer;
`;

const StyledIconContainer = styled.div<toggleMenuProps>`
  height: 2.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${({ theme, showmenu }) =>
    showmenu ? theme.primary_3 : theme.background_1};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme, showmenu }) =>
      showmenu ? theme.primary_3 : theme.background_2};
  }
`;

const StyledHeadingContainer = styled.div`
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

const StyledInput = styled(Input)`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export default function Navbar({ onSearch, onAddTask }: NavbarProps) {
  const { logout } = useAuth();
  const theme = useTheme();
  const [menu, setMenu] = useState(false);
  const user = useAppSelector(selectUser);

  return (
    <StyledContainer>
      <StyledHeading className="heading5">ToDoloo</StyledHeading>
      <StyledInput
        type="text"
        placeholder="Search task"
        onChange={debounce(onSearch, 750)}
      />
      <StyledProfileContainer>
        <StyledHeadingContainer>
          <h6 className="heading8">{user?.name}</h6>
        </StyledHeadingContainer>
        <StyledButton variant="primary" onClick={onAddTask}>
          <AiOutlinePlusCircle size={16} />
          New Task
        </StyledButton>
        <StyledAvatar />
        <StyledIconContainer
          showmenu={menu ? true : false}
          onClick={() => setMenu((menu) => !menu)}
        >
          <StyledIcon size={14} color={theme.text_muted} />
        </StyledIconContainer>
        {menu && (
          <DropdownMenu
            containerStyle={{ top: "3.75rem" }}
            menus={[
              {
                title: "Logout",
                onClick: logout,
                children: (
                  <AiOutlineLogout size={"1rem"} color={theme.text_muted} />
                ),
              },
            ]}
          />
        )}
      </StyledProfileContainer>
    </StyledContainer>
  );
}
