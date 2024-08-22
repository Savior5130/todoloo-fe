import styled from "styled-components";
import Input from "../Input/Input";
import { NavbarProps } from "./NavbarProps";
import { useAuth } from "../../hooks";

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
  gap: 0.75rem;
`;

const StyledHeading = styled.h5`
  color: ${({ theme }) => theme.primary_1};
`;

export default function Navbar({ onSearch }: NavbarProps) {
  const { user } = useAuth();
  return (
    <StyledContainer>
      <StyledHeading className="heading5">ToDoloo</StyledHeading>
      <Input type="text" placeholder="Search task" onChange={onSearch} />
      <StyledProfileContainer>
        <h6 className="heading8">{user?.name}</h6>
        <StyledAvatar />
      </StyledProfileContainer>
    </StyledContainer>
  );
}
