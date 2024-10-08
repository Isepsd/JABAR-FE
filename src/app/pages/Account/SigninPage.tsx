import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Captcha from '@app/components/Captcha';
import * as yup from 'yup';

import {
  LoginForm,
  LoginFormContainer,
  LoginIntroText,
  LoginWrapper,
  WelcomeText,
  InputIcon,
  LabelForm,
  AppName
} from '@app/styled/signIn.styled';

import { AuthLoginService, AuthUserDetailService } from '@app/services/auth.service';
import { loginUser, setLoggedInUserDetail, setRoleAccess, setSessionLifetime } from '@app/store/reducers/auth';
import { setNavigation } from '@app/store/reducers/ui';
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAllByPath, getByIdPath } from '@app/services/main.service';
import { stringToJSON } from '@app/helper/data.helper';
import { initNestedMenu } from '@app/helper/menu.helper';
import { setItem } from '@app/helper/localstorage.helper';
import { Button, LazyImage } from '@app/components';
import { cdnUrl } from '@app/helper/cdn.helper';
import { get } from 'lodash';

const schema = yup.object().shape({
  username: yup.string().required("Username wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

const alertErrorMessage = {
  'User tidak ada': 'Maaf, User tidak terdaftar',
  'User tidak mempunyai akses.': 'Maaf, User tidak mempunyai hak akses',
  'Password tidak sama.': 'Password tidak sesuai'
}

function SigninPage({ isLoggedIn }: any) {
  const source = axios.CancelToken.source();
  const { application } = useSelector((state: any) => state.ui);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [isShowForm, setShowForm] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [validationCaptcha, setValidationCaptcha] = useState(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formModel] = useState<any>({
    username: '',
    password: '',
    remember_me: false,
  });
  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formModel,
  });

  const { errors }: any = formState || {};

  const onSubmitHandler = (params: any) => {
    postSignin(params)
  };

  /** HANDLE ACTION LOGIN */
  const postSignin = async ({ username, password, rememberMe }: any) => {
    try {
      setLoading(true);
      const params = {
        username: username,
        password: password,
      };

      if (!validationCaptcha) {
        setErrorMessage("Captcha yang anda isi salah!");
        setLoading(false);
      } else {
        /** SIGNING IN GET ACCESS TOKEN*/
        const reqToken = await AuthLoginService({ params: params, cancelToken: source.token });
        dispatch(loginUser(reqToken));

        /** GET USER DETAIL */
        const reqUserDetail = await AuthUserDetailService(source.token)

        dispatch(setLoggedInUserDetail(reqUserDetail?.data));

        /** GET ROLE */
        const reqRole: any = await getByIdPath('roles', reqUserDetail?.data?.roleId, source.token)
        dispatch(setRoleAccess(reqRole?.results))

        /** GET MENU */
        const reqMenu: any = await getAllByPath('menu', { page: -1, limit: -1, }, source.token);

        const { results } = reqMenu;
        const dataResults = results ? results : [];
        const MENU = dataResults.map((d: any) => {
          return {
            ...d,
            idParent: d.idParent ? d.idParent : '',
            privileges: stringToJSON(d.privileges),
          };
        });

        const menus = initNestedMenu('', MENU, null);
        dispatch(setNavigation(menus));

        setItem('themeMode', 'light')

        /** REQUEST ROLE USER */
        dispatch(setSessionLifetime({ rememberMe: rememberMe }));
        setLoading(false);

        let path = "/"
        if (menus.length > 0) {
          path = menus[0]?.path ? menus[0]?.path : "/"
          if (menus[0]?.children?.length > 0) {
            path = menus[0]?.children[0]?.path ? menus[0]?.children[0]?.path : "/"
          }
        }

        navigate(path);
      }
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.data?.message) {
        let errMsgApi = get(alertErrorMessage, error.response.data.message)
        errMsgApi = errMsgApi === errMsgApi ? errMsgApi : 'Login tidak berhasil, silahkan kontak administrator'
        setErrorMessage(errMsgApi);
      }
    }
  };


  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/dashboard/dash-fasop/kinerja-scada';
    } else {
      setShowForm(true);
    }
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      {isShowForm && (
        <LoginFormContainer>
          <LoginWrapper className='signin-container animate__animated animate__fadeIn'>
            <div className='d-flex justify-content-center'>
              <LazyImage className='mt-2'
                src={cdnUrl(application?.logo)}
                alt=''
                style={{ height: '7.15rem' }}
                defaultImage={'/static/no-image.png'}
              />
              <div className='ps-3'>

                <h4 className='text-left font-weight-light mt-2 mb-0 fw-bold'><AppName>{application?.app_name}</AppName></h4>
                <h6 className='text-left font-weight-light mt-0 mb-0 fw-bold'>
                  {application?.company}
                </h6>
              </div>
            </div>
            <LoginForm className='signin-form'>
              <WelcomeText>Selamat datang kembali, </WelcomeText>
              <LoginIntroText>
                Masuk ke aplikasi dengan akun anda
              </LoginIntroText>
              <hr className='w-100 mt-2 mb-3' />

              {/* ERROR MESSAGE  */}
              {errMessage && (
                <Alert className='w-100' variant={`danger`}>
                  {errMessage}
                </Alert>
              )}
              {/* !END ERROR MESSAGE  */}
              <Form
                onSubmit={handleSubmit(onSubmitHandler)}
                className='w-100 mt-2'
              >
                <Form.Group controlId='formEmail' className='mb-3'>
                  <LabelForm>Username</LabelForm>
                  <InputGroup className='mb-3 mt-2'>
                    <InputIcon>
                      <i className='fas fa-user' />
                    </InputIcon>
                    <Form.Control
                      {...register('username')}
                      isInvalid={errors.username}
                      type='text'
                      placeholder='Masukan Username'
                      className='ps-5'
                      style={{ borderRadius: '5px !important' }}
                    />
                    <Form.Control.Feedback
                      className='text-capitalize'
                      type='invalid'
                    >
                      {errors?.username?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId='formPassword'>
                  <LabelForm>Kata Sandi</LabelForm>
                  <InputGroup className='mb-3 mt-2'>
                    <InputIcon>
                      <i className='fas fa-key' />
                    </InputIcon>
                    <Form.Control
                      {...register('password')}
                      isInvalid={errors.password}
                      type={showPassword ? 'text' : 'password'}
                      placeholder='******'
                      className='ps-5'
                      style={{ borderRadius: '5px !important' }}
                    />
                    <InputIcon
                      className='cursor-pointer'
                      style={{ right: '0', cursor: 'pointer' }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `<i class='fa-regular fa-eye${!showPassword ? '-slash' : ''
                            }'></i>`,
                        }}
                      ></span>
                    </InputIcon>
                    <Form.Control.Feedback
                      className='text-capitalize'
                      type='invalid'
                    >
                      {errors?.password?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <div className='mt-2'>
                  <Captcha
                    setValidation={(x: any) => {
                      setValidationCaptcha(x);
                    }}
                  />
                </div>
                <Button
                  variant='primary'
                  type='submit'
                  className='w-100 font-weight-bold mt-4 text-white'
                  isLoading={isLoading}
                >
                  {isLoading ? 'Masuk...' : 'Masuk'}
                </Button>
              </Form>
            </LoginForm>
          </LoginWrapper>
        </LoginFormContainer>
      )}
    </>
  );
}



const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth?.isLoggedIn,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);