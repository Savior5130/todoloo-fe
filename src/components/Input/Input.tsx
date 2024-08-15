import styled from "styled-components";
import { InputProps } from "./InputProps";

const StyledInput = styled.input`
  border-radius: 0.75rem;
  border: solid 1px ${({ theme }) => theme.background_4};
  background-color: ${({ theme }) => theme.background_3};
  color: ${({ theme }) => theme.text_muted};
  padding: 0.75rem 1.25rem;
  min-width: 20rem;

  &:focus {
    outline: solid 2px ${({ theme }) => theme.primary_1};
    color: ${({ theme }) => theme.text_default};
  }
`;

export default function Input({ label, ...props }: InputProps) {
  return label && label.length > 0 ? (
    <label>
      {label}
      <StyledInput className="body2" {...props} />
    </label>
  ) : (
    <StyledInput className="body2" {...props} />
  );
}
