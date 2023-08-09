import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ formBtn = '', submitText = 'Submit' }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button
      type="submit"
      className={`btn btn-block form-btn ${formBtn}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : submitText}
    </button>
  );
};

export default SubmitBtn;
