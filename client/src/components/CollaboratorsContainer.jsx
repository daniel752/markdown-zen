import { useEffect, useState } from 'react';
import MultipleInput from '../components/MultipleInput';
import customRequest from '../../../utils/customRequest';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/CollaboratoesContainer';
import { useOutletContext } from 'react-router-dom';

const CollaborationsContainer = ({
  defaultValues = [],
  isDisabled = false,
}) => {
  const { user } = useOutletContext();
  const [collaborators, setCollaborators] = useState(defaultValues);

  useEffect(() => {
    const collabs = defaultValues.map(value => {
      return {
        _id: value._id,
        user: value.user._id,
        email: value.user.email,
        hasEditPermission: value.hasEditPermission,
      };
    });
    setCollaborators(collabs);
  }, [defaultValues]);

  const userExists = async email => {
    try {
      const data = { collabEmail: email };
      await customRequest.post('/users/get-user-email', data);
      return true;
    } catch (error) {
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

  const handleCheckboxChange = collaboratorToChange => {
    setCollaborators(prevCollaborators =>
      prevCollaborators.map(collaborator => {
        if (collaborator === collaboratorToChange) {
          return {
            ...collaborator,
            hasEditPermission: !collaborator.hasEditPermission,
          };
        }
        return collaborator;
      }),
    );
  };

  const onValueRemove = valueToRemove => {
    const updatedValues = collaborators.filter(
      collaborator => collaborator.email != valueToRemove,
    );
    setCollaborators(updatedValues);
  };

  return (
    <Wrapper>
      {isDisabled ? (
        <input
          type="hidden"
          name="collaborators"
          value={JSON.stringify(collaborators)}
        />
      ) : (
        <div className="collabs-container">
          <MultipleInput
            label="Collaborations"
            placeholder="enter user's email"
            name="collaborators"
            onChange={handleOnChange}
            inputVerifier={userExists}
            showValues={false}
            isRemoveOnBlur={false}
            isDisabled={isDisabled}
          />
          {collaborators?.length > 0 && (
            <div className="collabs-table">
              <div className="collabs-titles">
                <h6>email</h6>
                <h6>edit permission</h6>
                <h6>remove</h6>
              </div>
              <div className="collab-rows">
                {collaborators.map((collaborator, index) => (
                  <div key={index} className="row">
                    <span className="collab-email">{collaborator.email}</span>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(collaborator)}
                      checked={collaborator.hasEditPermission}
                    />
                    <button
                      type="button"
                      onClick={() => onValueRemove(collaborator.email)}
                      className="tag-remove-btn"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="hidden"
                name="collaborators"
                value={JSON.stringify(collaborators)}
              />
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};
export default CollaborationsContainer;
