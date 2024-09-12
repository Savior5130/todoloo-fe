import styled from "styled-components";
import { TextareaProps } from "./TextareaProps";

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledSpan = styled.span`
  text-align: left;
  margin-left: 0.25rem;
`;

const StyledInput = styled.textarea`
  border-radius: 0.75rem;
  border: solid 1px ${({ theme }) => theme.background_4};
  background-color: ${({ theme }) => theme.background_2};
  color: ${({ theme }) => theme.text_muted};
  padding: 0.75rem 1.25rem;
  min-width: 10rem;
  min-height: 15rem;
  font-family: "SF Pro Display";
  resize: none;

  &:focus {
    outline: solid 2px ${({ theme }) => theme.primary_1};
    color: ${({ theme }) => theme.text_default};
  }

  &:valid {
    color: ${({ theme }) => theme.text_default};
  }
`;

export default function Textarea({
  label,
  style,
  children,
  ...props
}: TextareaProps) {
  return label && label.length > 0 ? (
    <StyledLabel className="label3" style={style}>
      <StyledSpan>{label}</StyledSpan>
      <StyledInput className="body2" {...props}>
        {children}
      </StyledInput>
    </StyledLabel>
  ) : (
    <StyledInput className="body2" style={style} {...props}>
      {children}
    </StyledInput>
  );
}
