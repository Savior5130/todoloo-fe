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
  border: none;

  &:hover {
    background-color: "#4275DF";
  }
  &:focus {
    background-color: "#2757BB";
  }
  &:disabled {
    background-color: ${({ theme }) => theme.background_4};
  }
`;

const StyledLink = styled.span`
  color: ${({ theme }) => theme.primary_1};
  width: fit-content;

  & > :first-child {
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.primary_2};
    cursor: pointer;
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
    <StyledLink className="heading8" onClick={handleOnClick} {...props} />
  );
}
