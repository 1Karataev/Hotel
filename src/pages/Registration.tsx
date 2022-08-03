import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyInput from '../modules/Input/MyInput';
import MyButton from '../modules/MyButton';
import classes from './Registration.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Login, setAuth, setValid } from '../redux/Auth';
import { RootState, useAppDispatch } from '../redux/store';
const Registration:React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [pass, setPass] = useState<string>('');
  const [validLogin, setValidLogin] = useState<boolean>(true)
  const [validPass, setValidPass] = useState<boolean>(true);
  const { register, handleSubmit } = useForm<Login>();
  
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const hundlerLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
   const hundlerPass = (e: React.ChangeEvent<HTMLInputElement>) => {
     setPass(e.target.value);
   };

  const Sub: SubmitHandler<Login> = (data) => {
    const reglog= /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
    const regpass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

    if(!reglog.test(data.login)){
      setValidLogin(false)
      dispatch(setValid(false))
    } else if (!regpass.test(data.password)){
      setValidLogin(true);
      setValidPass(false)
      dispatch(setValid(false));
    } else {
      setValidLogin(true);
      setValidPass(true)
      dispatch(setValid(true))
      dispatch(setAuth(data));

      // return navigate('/main') можно еще так решить, но при деплое ведет себя не очень такая реализация;
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.fon}>
        <form action="" onSubmit={handleSubmit(Sub)}>
          <h2>Simple Hotel Check</h2>
          <MyInput
            children={'Логин'}
            value={login}
            placeholder={!validLogin ? 'login@mail.ru' : ''}
            valid={validLogin}
            ref={{ ...register('login', { required: true }) }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => hundlerLogin(e)}
          />
          {!validLogin && (
            <label
              style={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '12px',
                lineHeight: '14px',
                color: '#EB1717',
                alignSelf: 'flex-start',
                marginLeft: '5%',
              }}>
              Неверный логин{' '}
            </label>
          )}

          <MyInput
            children={'Пароль'}
            value={pass}
            placeholder={!validPass ? 'Aaaaaaa7' : ''}
            className={classes.input}
            valid={validPass}
            ref={{ ...register('password', { required: true }) }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => hundlerPass(e)}
          />
          {!validPass && (
            <label
              style={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '12px',
                lineHeight: '14px',
                color: '#EB1717',
                alignSelf: 'flex-start',
                marginLeft: '5%',
              }}>
              Не менее 8 символов с одной заглавной буквой и одной цифрой
            </label>
          )}
          <MyButton >Войти</MyButton>
        </form>
      </div>
    </div>
  );
}

export default Registration