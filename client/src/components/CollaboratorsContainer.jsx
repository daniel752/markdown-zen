import { useState } from 'react';
import MultipleInput from '../components/MultipleInput';
import customRequest from '../../../utils/customRequest';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/CollaboratoesContainer';
import { useOutletContext } from 'react-router-dom';

const CollaboratorsContainer = ({ defaultValues = [] }) => {
  const { user } = useOutletContext();
  const [collaborators, setCollaborators] = useState(defaultValues);

  const userExists = async email => {
    try {
      const data = { collabEmail: email };
      await customRequest.post('/users/get-user', data);
      return true;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
      return false;
    }
  };

  const handleOnChange = async event => {
    const email = event.currentTarget.value.trim().toLowerCase();
    if (email === user.email) {
      toast.error(`you can't add yourself to collaborators`);
      return;
    }
    if (collaborators.includes(email)) {
      toast.error(`user ${email} is listed in collaborators already`);
      return;
    }
    const isUserExists = await userExists(email);
    const collaborator = { email: email, hasEditPermission: false };
    if (isUserExists) setCollaborators([...collaborators, collaborator]);
  };

  const handleCheckboxChange = collaborator => {
    collaborator.hasEditPermission = !collaborator.hasEditPermission;
  };

  const onValueRemove = valueToRemove => {
    const updatedValues = collaborators.filter(
      collaborator => collaborator.email != valueToRemove,
    );
    setCollaborators(updatedValues);
  };

  return (
    <Wrapper>
      <div className="collabs-container">
        <MultipleInput
          label="Collaborators"
          placeholder="enter user's email"
          name="collaborators"
          onChange={handleOnChange}
          inputVerifier={userExists}
          showValues={false}
          isRemoveOnBlur={false}
        />

        <div className="collabs-table">
          <div className="collabs-titles">
            <h6>email</h6>
            <h6>edit permission</h6>
            <h6>remove</h6>
          </div>
          <div className="collab-rows">
            {collaborators?.length > 0
              ? collaborators.map((collaborator, index) => (
                  <div key={index} className="row">
                    <span className="collab-email">{collaborator.email}</span>
                    <input
                      type="checkbox"
                      onChange={handleCheckboxChange(collaborator)}
                    />
                    <button
                      type="button"
                      onClick={() => onValueRemove(collaborator.email)}
                      className="tag-remove-btn"
                    >
                      X
                    </button>
                  </div>
                ))
              : null}
          </div>
          <input
            type="hidden"
            name="collaborators"
            value={JSON.stringify(collaborators)}
          />
        </div>
      </div>
    </Wrapper>
  );
};
export default CollaboratorsContainer;
