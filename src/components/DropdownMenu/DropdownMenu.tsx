import styled from "styled-components";
import { DropdownProps } from "./DropdownProps";

const StyledContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.background_1};
  position: absolute;
  min-width: 10rem;
  border-radius: 0.75rem;
  padding: 0.5rem;
  top: 82px;
  right: 4rem;
`;

const StyledDropdownItem = styled.div`
  display: flex;
  flex-basis: content;
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  &:hover {
    background-color: ${({ theme }) => theme.background_2};
    cursor: pointer;
  }
`;

export default function DropdownMenu({ menus }: DropdownProps) {
  const handleRenderItem = menus.map((menu) => {
    return (
      <StyledDropdownItem className="body2" onClick={menu.onClick}>
        {menu.title}
      </StyledDropdownItem>
    );
  });

  return <StyledContainer>{handleRenderItem}</StyledContainer>;
}
