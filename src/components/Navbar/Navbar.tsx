import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import styled, { useTheme } from "styled-components";
import { NavbarProps } from "./NavbarProps";
import DropdownMenu from "../DropdownMenu";
import Input from "../Input/Input";
import { useAuth } from "../../hooks";
import { debounce } from "../../utils";
import { AiOutlineLogout } from "react-icons/ai";

interface toggleMenuProps {
  showmenu: boolean;
}

const StyledContainer = styled.div`
  display: flex;
  padding: 1rem 4rem;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background_1};
`;

const StyledAvatar = styled.div`
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.primary_2};
`;

const StyledProfileContainer = styled.div`
  display: flex;
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

export default function Navbar({ onSearch }: NavbarProps) {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const [menu, setMenu] = useState(false);

  return (
    <StyledContainer>
      <StyledHeading className="heading5">ToDoloo</StyledHeading>
      <Input
        type="text"
        placeholder="Search task"
        onChange={debounce(onSearch, 750)}
      />
      <StyledProfileContainer>
        <h6 className="heading8">{user?.name}</h6>
        <StyledAvatar />
        <StyledIconContainer
          showmenu={menu}
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
