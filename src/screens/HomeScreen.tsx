import styled from "styled-components";

import Navbar from "../components/Navbar/Navbar";
import TodoItem from "../components/TodoItem/TodoItem";
import Button from "../components/Button/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.background_2};
  display: flex;
  padding: 2.5rem 4rem;
  align-items: flex-start;
  gap: 2rem;
  flex: 1;
  align-self: stretch;
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  flex: 1;
  align-self: stretch;
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const StyledStatusContainer = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background_1};
`;

const StyledEllipse = styled.div`
  border-radius: 100%;
  width: 0.875rem;
  height: 0.875rem;
`;

const StyledEllipse1 = styled(StyledEllipse)`
  background-color: ${({ theme }) => theme.primary_1};
`;

const StyledEllipse2 = styled(StyledEllipse)`
  background-color: ${({ theme }) => theme.warning_1};
`;

const StyledEllipse3 = styled(StyledEllipse)`
  background-color: ${({ theme }) => theme.success_1};
`;

export default function HomeScreen() {
  return (
    <>
      <Navbar />
      <StyledContainer>
        <StyledCardContainer>
          <StyledStatusContainer>
            <StyledEllipse1 />
            <h6 className="heading7">To Do (1)</h6>
          </StyledStatusContainer>
          <StyledInnerContainer>
            <TodoItem />
            <TodoItem />
            <Button variant="primary">
              <AiOutlinePlusCircle size={"1rem"} />
              New Task
            </Button>
          </StyledInnerContainer>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledStatusContainer>
            <StyledEllipse2 />
            <h6 className="heading7">On Progress (1)</h6>
          </StyledStatusContainer>
          <StyledInnerContainer>
            <TodoItem />
          </StyledInnerContainer>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledStatusContainer>
            <StyledEllipse3 />
            <h6 className="heading7">Done (1)</h6>
          </StyledStatusContainer>
          <StyledInnerContainer>
            <TodoItem />
          </StyledInnerContainer>
        </StyledCardContainer>
      </StyledContainer>
    </>
  );
}
