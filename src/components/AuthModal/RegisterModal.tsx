import styled from "styled-components";
import { AuthModalProps } from "./AuthModalProps";
import { AiOutlineClose } from "react-icons/ai";
import GoogleButton from "react-google-button";
import { useCallback, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { UserRole } from "../../types";
import { useAuth } from "../../hooks";

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

export default function RegisterModal({
  showIcon = false,
  showModal,
}: AuthModalProps) {
  const [visible, setVisible] = useState(showModal);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const role = useState<UserRole>("admin")[0];

  const toggleModal = useCallback(() => setVisible(!visible), [visible]);

  const { register } = useAuth();

  const handleSubmitButton = async (e: React.FormEvent) => {
    e.preventDefault();
    register({ role, username, name, password });
  };

  return (
    <form
      onSubmit={handleSubmitButton}
      encType="multipart/form-data"
      method="post"
    >
      <StyledDialog>
        {showIcon && <StyledIcon onClick={() => toggleModal()} />}
        <h6 className="heading6">Sign Up</h6>
        <StyledContainer>
          <GoogleButton style={{ width: "100%" }} />
          <StyledRowContainer>
            <hr />
            <span className="label1">or</span>
            <hr />
          </StyledRowContainer>
          <StyledInputContainer>
            <Input
              label="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            Sign Up
          </Button>
        </StyledContainer>
        <StyledBottomContainer>
          <p className="label1">Already have an account?</p>
          <Button
            variant="link"
            onClick={() => (window.location.href = "/login")}
          >
            {" "}
            Sign in now
          </Button>
        </StyledBottomContainer>
      </StyledDialog>
    </form>
  );
}
