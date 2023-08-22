import {
  FormRow,
  FormRowSelect,
  SubmitBtn,
  MultipleInput,
} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { STATUS } from '../../../utils/constants';
import { Form } from 'react-router-dom';
import TextareaContainer from '../components/TextareaContainer';
import CollaboratorsContainer from '../components/CollaboratorsContainer';

const checkEmptyArray = array => {
  if (array[0] === '') return undefined;
  return array;
};

const EditPost = () => {
  const { post } = useLoaderData();
  const { title, categories, tags, content, status, collaborators } = post;

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit post</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="title"
            labelText="title"
            defaultValue={title}
          />
          <FormRowSelect
            name="status"
            labelText="status"
            list={Object.values(STATUS)}
            defaultValue={status}
          />
          <MultipleInput
            label="categories (1-3)"
            placeholder="enter..."
            name="categories"
            defaultValues={checkEmptyArray(categories)}
          />
          <MultipleInput
            label="tags (0-20)"
            placeholder="enter..."
            name="tags"
            defaultValues={checkEmptyArray(tags)}
          />
          <CollaboratorsContainer defaultValues={collaborators} />
          <TextareaContainer defaultValue={content} />
          <SubmitBtn formBtn="form-btn" submitText="submit" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditPost;
