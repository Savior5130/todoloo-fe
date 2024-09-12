import styled from "styled-components";
import { ButtonProps } from "./ButtonProps";

const StyledPrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.primary_1};
  color: ${({ theme }) => theme.background_1};
  padding: 0.75rem 1.25rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: auto;

  &:hover:enabled {
    box-shadow: 0px 0.5rem 1rem 0px rgba(80, 136, 255, 0.39);
  }
  &:focus {
    background-color: "#2757BB";
    outline: none;
  }
  &:disabled {
    background-color: ${({ theme }) => theme.background_4};
    cursor: auto;
  }
`;

const StyledSecondaryButton = styled(StyledPrimaryButton)`
  background-color: ${({ theme }) => theme.primary_3};
  color: ${({ theme }) => theme.primary_1};

  &:hover:enabled {
    box-shadow: 0px 0.25rem 0.75rem 0px rgba(179, 192, 219, 0.39);
  }

  &:focus {
    background-color: "#2757BB";
  }
  &:disabled {
    background-color: ${({ theme }) => theme.background_4};
  }
`;

const StyledGhostButton = styled(StyledPrimaryButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.primary_1};

  &:hover:enabled {
    color: ${({ theme }) => theme.primary_2};
    box-shadow: none;
  }

  &:focus {
    color: "#2757BB";
    outline: none;
  }
  &:disabled {
    color: ${({ theme }) => theme.background_4};
  }
`;

const StyledLink = styled.span`
  display: flex;
  align-items: center;
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
  switch (variant) {
    case "primary":
      return (
        <StyledPrimaryButton
          className="heading8"
          onClick={handleOnClick}
          {...props}
        />
      );
    case "secondary":
      return (
        <StyledSecondaryButton
          className="heading8"
          onClick={handleOnClick}
          {...props}
        />
      );
    case "ghost":
      return (
        <StyledGhostButton
          className="heading8"
          onClick={handleOnClick}
          {...props}
        />
      );
    case "link":
      return (
        <StyledLink className="heading8" onClick={handleOnClick} {...props} />
      );
    default:
      break;
  }
}
