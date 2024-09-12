import styled from "styled-components";
import { InputProps } from "./InputProps";

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledSpan = styled.span`
  text-align: left;
  margin-left: 0.25rem;
`;

const StyledInput = styled.input`
  border-radius: 0.75rem;
  border: solid 1px ${({ theme }) => theme.background_4};
  background-color: ${({ theme }) => theme.background_2};
  color: ${({ theme }) => theme.text_muted};
  padding: 0.75rem 1.25rem;
  min-width: 10rem;

  &:focus {
    outline: solid 2px ${({ theme }) => theme.primary_1};
    color: ${({ theme }) => theme.text_default};
  }

  &:valid {
    color: ${({ theme }) => theme.text_default};
  }
`;

export default function Input({ label, style, ...props }: InputProps) {
  return label && label.length > 0 ? (
    <StyledLabel className="label3" style={style}>
      <StyledSpan>{label}</StyledSpan>
      <StyledInput className="body2" {...props} />
    </StyledLabel>
  ) : (
    <StyledInput className="body2" style={style} {...props} />
  );
}
