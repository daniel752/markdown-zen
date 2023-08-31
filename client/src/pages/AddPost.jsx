import { Form } from 'react-router-dom';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { STATUS } from '../../../utils/constants';
// import MarkdownContainer from '../components/MarkdownContainer';
import TextareaContainer from '../components/TextareaContainer';
import MultipleInput from '../components/MultipleInput';
import customRequest from '../../../utils/customRequest';
import { toast } from 'react-toastify';
import CollaboratorsContainer from '../components/CollaboratorsContainer';

const AddPost = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h5 className="form-title">add markdown</h5>
        <div className="form-center">
          <FormRow type="text" name="title" />
          <FormRowSelect
            name="status"
            labelText="Status"
            list={Object.values(STATUS)}
          />
          <MultipleInput
            label="categories (1-3)"
            placeholder="enter..."
            name="categories"
          />
          <MultipleInput
            label="tags (0-20)"
            placeholder="enter..."
            name="tags"
          />
          <CollaboratorsContainer defaultValues={[]} />
        </div>
        <TextareaContainer />
        <SubmitBtn formBtn="form-btn center" />
      </Form>
    </Wrapper>
  );
};
export default AddPost;
