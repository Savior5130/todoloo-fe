import { useCallback, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { AuthModalProps } from "./AuthModalProps";
import { useAuth } from "../../hooks";
import GoogleButton from "react-google-button";

const StyledDialog = styled.dialog`
  min-width: 25rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background_1};
  color: ${({ theme }) => theme.text_default};
  border: none;
  border-radius: 1.25rem;
  padding: 2.5rem 1.5rem;
  margin: auto;
  gap: 2.5rem;
  text-align: center;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 11;
`;

const StyledRowContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem;
  color: ${({ theme }) => theme.text_muted};
  justify-content: center;
  align-items: center;
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
`;

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledIcon = styled(AiOutlineClose)`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
`;

const StyledBottomContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  align-items: center;
  margin: auto;
`;

export default function LoginModal({
  showIcon = false,
  showModal,
}: AuthModalProps) {
  const [visible, setVisible] = useState(showModal);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { googleLogin, login } = useAuth();

  const toggleModal = useCallback(() => setVisible(!visible), [visible]);

  const handleSubmitButton = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmitButton}>
      <StyledDialog>
        {showIcon && <StyledIcon onClick={() => toggleModal()} />}
        <h6 className="heading6">Sign In</h6>
        <StyledContainer>
          <GoogleButton style={{ width: "100%" }} onClick={googleLogin} />
          <StyledRowContainer>
            <hr />
            <span className="label1">or</span>
            <hr />
          </StyledRowContainer>
          <StyledInputContainer>
            <Input
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledInputContainer>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </StyledContainer>
        <StyledBottomContainer>
          <p className="label1">Not a member yet?</p>
          <Button
            variant="link"
            onClick={() => (window.location.href = "/register")}
          >
            {" "}
            Sign up now
          </Button>
        </StyledBottomContainer>
      </StyledDialog>
    </form>
  );
}
