import { Form, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import SubmitBtn from '../components/SubmitBtn';

const Register = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo src={isDarkTheme ? '/logo_white.png' : '/logo_black.png'} />
        <h4>Register Page</h4>
        <FormRow type="text" name="firstName" labelText="First Name"></FormRow>
        <FormRow type="text" name="lastName" labelText="Last Name"></FormRow>
        <FormRow type="text" name="location"></FormRow>
        <FormRow type="email" name="email"></FormRow>
        <FormRow type="password" name="password"></FormRow>
        <FormRow
          type="password"
          name="passwordConfirm"
          labelText="password confirm"
        ></FormRow>
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
