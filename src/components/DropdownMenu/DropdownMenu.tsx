import styled from "styled-components";
import { DropdownProps } from "./DropdownProps";

const StyledContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.background_1};
  flex-direction: column;
  position: absolute;
  min-width: 10rem;
  border-radius: 0.75rem;
  padding: 0.25rem;
  box-shadow: 0px 0.125rem 0.125rem 0px #d4d8db;
`;

const StyledDropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-basis: content;
  flex-grow: 1;
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  &:hover {
    background-color: ${({ theme }) => theme.background_2};
    cursor: pointer;
  }
`;

const StyledHeadingContainer = styled.div`
  padding: 0.6rem 1rem;
  padding-top: 0.75rem;
  color: ${({ theme }) => theme.text_muted};
`;

export default function DropdownMenu({
  containerStyle,
  header,
  menus,
}: DropdownProps) {
  const handleRenderItem = menus.map((menu, idx) => {
    return (
      <StyledDropdownItem className="heading8" onClick={menu.onClick} key={idx}>
        {menu.children}
        {menu.title}
      </StyledDropdownItem>
    );
  });

  return (
    <StyledContainer style={containerStyle}>
      {header && (
        <StyledHeadingContainer>
          <p className="label2">{header}</p>
        </StyledHeadingContainer>
      )}
      {handleRenderItem}
    </StyledContainer>
  );
}
