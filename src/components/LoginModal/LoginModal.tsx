import { useCallback, useState } from "react";
import GoogleButton from "react-google-button";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { LoginModalProps } from "./LoginModalProps";

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

export default function LoginModal({ showModal, variant }: LoginModalProps) {
  const [visible, setVisible] = useState(showModal);
  const [type, setType] = useState(variant);

  const toggleModal = useCallback(() => setVisible(!visible), [visible]);

  const renderSignInModal = () => (
    <>
      <h6 className="heading6">Sign In</h6>
      <StyledContainer>
        <GoogleButton style={{ width: "100%" }} />
        <StyledRowContainer>
          <hr />
          <span className="label1">or</span>
          <hr />
        </StyledRowContainer>
        <StyledInputContainer>
          <Input label="Username" placeholder="Username" />
          <Input type="password" label="Password" placeholder="Password" />
        </StyledInputContainer>
        <Button variant="primary">Sign In</Button>
      </StyledContainer>
      <p className="label1">
        Not a member yet?
        <Button variant="link" onClick={() => setType("sign_up")}>
          {" "}
          Sign up now
        </Button>
      </p>
    </>
  );

  const renderSignUpModal = () => (
    <>
      <h6 className="heading6">Sign Up</h6>
      <StyledContainer>
        <GoogleButton style={{ width: "100%" }} />
        <StyledRowContainer>
          <hr />
          <span className="label1">or</span>
          <hr />
        </StyledRowContainer>
        <StyledInputContainer>
          <Input label="Username" placeholder="Username" />
          <Input type="password" label="Password" placeholder="Password" />
        </StyledInputContainer>
        <Button variant="primary">Sign Up</Button>
      </StyledContainer>
      <p className="label1">
        Already have an account?
        <Button variant="link" onClick={() => setType("sign_in")}>
          {" "}
          Sign in now
        </Button>
      </p>
    </>
  );

  return (
    <StyledDialog>
      <StyledIcon onClick={() => toggleModal()} />
      {type == "sign_up" ? renderSignUpModal() : renderSignInModal()}
    </StyledDialog>
  );
}
