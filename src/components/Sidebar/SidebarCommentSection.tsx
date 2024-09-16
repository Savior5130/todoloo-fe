import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CommentDataProps } from "./SidebarProps";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Comment } from "../../types";
import { fetchLocalTimefromISO, fetchPathParam } from "../../utils";
import { AiOutlineSend } from "react-icons/ai";
import { useAppSelector } from "../../hooks";
import axios from "axios";

interface StyledCommentItemProps {
  selfauthored: boolean;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  min-height: 0;
  padding: 1rem 0.75rem;
  grid-row-gap: 0.75rem;
`;

const StyledCommentContainer = styled.div`
  display: flex;
  overflow-y: auto;
  flex: 1;
  flex-direction: column;
`;

const StyledCommentItem = styled.div<StyledCommentItemProps>`
  display: block;
  margin-left: ${({ selfauthored }) => (selfauthored ? "auto" : "unset")};
  text-align: ${({ selfauthored }) => (selfauthored ? "right" : "left")};
  width: fit-content;
  flex-direction: column;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  padding: 1rem 0.75rem;
  padding-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.background_2};
  max-width: 20rem;

  &:hover {
    cursor: default;
  }
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

export default function SidebarCommentSection({ todo }: CommentDataProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState("");
  const { user } = useAppSelector((state) => state.auth);

  const handleRenderCommentItem = useMemo(
    () =>
      comments.map((item) => {
        return (
          <StyledCommentItem selfauthored={user?.name === item.creator.name}>
            <h6 className="heading8">{item.creator.name}</h6>
            <p className="body3 ">{item.message}</p>
            <StyledTimeContainer>
              <p className="label3 muted">
                {fetchLocalTimefromISO(item.datetime)}
              </p>
            </StyledTimeContainer>
          </StyledCommentItem>
        );
      }),
    [comments, user?.name]
  );

  const handleSendComment = () => {
    axios
      .request({
        url: "/comments",
        method: "post",
        data: {
          message,
          todo_id: todo.id,
        },
      })
      .then(({ data }) => {
        setMessage("");
        setComments((curr) => [...curr, data]);
      });
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .request({
          url: fetchPathParam("/comments", todo.id),
          method: "get",
        })
        .then(({ data }) => setComments(data));
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer>
      <h6 className="heading8">Comment</h6>
      <StyledCommentContainer>{handleRenderCommentItem}</StyledCommentContainer>
      <StyledInputContainer>
        <Input
          style={{ flex: "1" }}
          value={message}
          placeholder="Message here"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendComment} disabled={message === ""}>
          <AiOutlineSend size={16} />
          Send
        </Button>
      </StyledInputContainer>
    </StyledContainer>
  );
}
