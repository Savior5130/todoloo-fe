import styled from "styled-components";
import { ButtonProps } from "./ButtonProps";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.primary_1};
  color: ${({ theme }) => theme.background_1};
  padding: 0.75rem 1.25rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  &:hover {
    background-color: "#4275DF";
  }
  &:focus {
    background-color: "#2757BB";
  }
`;

const StyledLink = styled.span`
  &:hover {
    color: "#4275DF";
  }
  &:focus {
    background-color: "#2757BB";
  }
`;

export default function Button({
  variant = "primary",
  handleOnClick,
  ...props
}: ButtonProps) {
  return variant == "primary" ? (
    <StyledButton className="heading8" onClick={handleOnClick} {...props} />
  ) : (
    <StyledLink className="body2" onClick={handleOnClick} {...props} />
  );
}
