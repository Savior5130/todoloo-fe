import { useMemo } from "react";
import styled from "styled-components";
import { CommentDataProps } from "./SidebarProps";
import Input from "../Input/Input";
import Button from "../Button/Button";

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 1rem 0.75rem;
  grid-row-gap: 0.75rem;
`;

const StyledCommentContainer = styled.div`
  display: block;
  overflow: hidden;
`;

const StyledCommentItem = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  padding: 1rem 0.75rem;
  padding-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.background_3};
  max-width: 20rem;
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex: 0 1 auto;
  gap: 0.5rem;
`;

const StyledTimeContainer = styled.div`
  width: 100%;
  text-align: right;
`;

export default function SidebarCommentSection({ data }: CommentDataProps) {
  const handleRenderCommentItem = useMemo(
    () =>
      data?.map((item) => (
        <StyledCommentItem>
          <h6 className="heading8">{item.author}</h6>
          <p className="body3 ">{item.message}</p>
          <StyledTimeContainer>
            <p className="label3 muted">{item.time}</p>
          </StyledTimeContainer>
        </StyledCommentItem>
      )),
    [data]
  );

  return (
    <StyledContainer>
      <h6 className="heading8">Comment</h6>
      <StyledCommentContainer>{handleRenderCommentItem}</StyledCommentContainer>
      <StyledInputContainer>
        <Input style={{ flex: "1" }} placeholder="Message here" />
        <Button>Send</Button>
      </StyledInputContainer>
    </StyledContainer>
  );
}
