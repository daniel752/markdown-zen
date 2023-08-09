import { Form, useNavigation, useOutletContext } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const { user } = useOutletContext();
  const { firstName, lastName, email } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          {/* <div className="grid-row"> */}
          {/* <div> */}
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (0.5 max)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
            {/* </div> */}
            <FormRow type="text" name="firstName" defaultValue={firstName} />
            <FormRow type="text" name="lastName" defaultValue={lastName} />
          </div>
          {/* <div className="profile-img"> */}
          {user.avatar ? (
            <img className="avatar" src={user.avatar} alt="avatar"></img>
          ) : (
            <FaUserCircle className="avatar" />
          )}
          {/* </div> */}
        </div>
        {/* <FormRow type="text" name="email" defaultValue={email} /> */}
        <SubmitBtn
          formBtn="form-btn edit-profile-btn"
          submitText="save changes"
        />
        {/* </div> */}
      </Form>
    </Wrapper>
  );
};
export default Profile;
