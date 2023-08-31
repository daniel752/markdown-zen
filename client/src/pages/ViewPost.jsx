import { FormRow, FormRowSelect, MultipleInput } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Link, useLoaderData } from 'react-router-dom';
import { STATUS } from '../../../utils/constants';
import { Form } from 'react-router-dom';
import CollaboratorsContainer from '../components/CollaboratorsContainer';
import MarkdownEditor from '@uiw/react-markdown-editor';

const checkEmptyArray = array => {
  if (array[0] === '') return undefined;
  return array;
};

const ViewPost = () => {
  const { post } = useLoaderData();
  const { title, categories, tags, content, status, collaborators } = post;

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">view post</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="title"
            labelText="title"
            defaultValue={title}
            isDisabled={true}
          />
          <FormRowSelect
            name="status"
            labelText="status"
            list={Object.values(STATUS)}
            defaultValue={status}
            isDisabled={true}
          />
          <MultipleInput
            label="categories (1-3)"
            placeholder="enter..."
            name="categories"
            defaultValues={checkEmptyArray(categories)}
            isDisabled={true}
          />
          <MultipleInput
            label="tags (0-20)"
            placeholder="enter..."
            name="tags"
            defaultValues={checkEmptyArray(tags)}
            isDisabled={true}
          />
          {collaborators?.length > 0 ? (
            <CollaboratorsContainer
              defaultValues={collaborators}
              isDisabled={true}
            />
          ) : null}
          <MarkdownEditor.Markdown source={content} height="300px" />
        </div>
      </Form>
      <Link
        to="/dashboard/all-posts"
        className="btn post-info-btn md-margin-top"
      >
        Back
      </Link>
    </Wrapper>
  );
};
export default ViewPost;
