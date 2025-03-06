import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { useUser } from '../../hooks/UserContext';
import { Button } from '../../components/Button';
import {
  Container,
  LeftContainer,
  RightContainer,
  Title,
  Form,
  InputContainer,
  Link,
} from './styles';

export function Login() {
  const navegate = useNavigate();
  const { putUserData } = useUser();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um e-mail válido.')
        .required('O e-mail é obrigatorio.'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Digite sua senha'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = async (data) => {
    const { data: userData } = await toast.promise(
      api.post('/sessions', {
        email: data.email,
        password: data.password,
      }),

      {
        pending: 'Verificando seus dados',
        success: {
          render() {
            setTimeout(() => {
              navegate('/');
            }, 2000);
            return 'Seja Bem-vindo(a) 👌';
          },
        },
        error: 'Email ou Senha Incorretos 🤯',
      },
    );
    putUserData(userData);

  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburger" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span> Dev Burguer!</span>
          <br />
          Acesse com seu<span> Login e senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">ENTRAR</Button>
        </Form>
        <p>
          Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
