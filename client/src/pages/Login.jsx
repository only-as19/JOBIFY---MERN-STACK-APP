import { Link, Form, redirect, useNavigate} from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { Logo, FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { toast } from 'react-toastify';

export const action = (queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    queryClient.invalidateQueries()
    toast.success('Login Successful');
    return redirect('/dashboard');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  
  const navigate = useNavigate()
  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };
    try {
      await customFetch.post('/auth/login', data)
      toast.success('take a test drive')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  }

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow
          type='email'
          name='email'
          labelText='Email'
        />
        <FormRow
          type='password'
          name='password'
          labelText='Password'
        />
        <SubmitBtn formBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Don't have an account?{' '}
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
