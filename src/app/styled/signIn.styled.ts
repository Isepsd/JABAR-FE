import styled from 'styled-components';

const LoginFormContainer = styled.div`
  height: 100vh;
  background-image: url(/static/wave.svg);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  input {
    border-radius: 5px !important;
  }
`;

const LoginWrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 380px;
`;

const LoginForm = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
  // background: var(--white);
  border-radius: 16px;
  // box-shadow: 0 5px 20px rgb(0,0,0,.075);
`;

const WelcomeText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: normal;
  font-size: 0.85rem;
  line-height: 22px;
  margin-bottom: 0;
  color: #666666;
`;

const LoginIntroText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 1.15rem;
  line-height: 20px;
  color: var(--black);
`;

const LabelForm = styled.span`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  color: var(--black);

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0px;
`;

const InputIcon = styled.span`
  position: absolute;
  padding: 8px 10px;
  font-size: 16px;
  z-index: 99;
`;

const AppName = styled.p`
  font-weight: 600;
  color: var(--primary);
`;

export {
  LoginForm,
  LoginFormContainer,
  LoginIntroText,
  LoginWrapper,
  WelcomeText,
  InputIcon,
  LabelForm,
  AppName,
};
