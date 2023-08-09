import { useNavigation, useOutletContext, Form } from 'react-router-dom';
import { useState } from 'react';
import {
  FormRow,
  FormRowSelect,
  FormRowMultiSelect,
  SubmitBtn,
} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { CATEGORY, TAG, STATUS } from '../../../utils/constants';
// import MarkdownContainer from '../components/MarkdownContainer';
import TextareaContainer from '../components/TextareaContainer';

const AddPost = () => {
  // const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add markdown</h4>
        <div className="form-center">
          <FormRow type="text" name="title" />
          <FormRowSelect
            name="status"
            labelText="Post Status"
            list={Object.values(STATUS)}
          />
          <FormRowMultiSelect
            name="categories"
            labelText="Categories"
            list={CATEGORY}
          />
          <FormRowMultiSelect name="tags" labelText="Tags" list={TAG} />
        </div>
        <TextareaContainer />
        <SubmitBtn formBtn="form-btn center" />
      </Form>
    </Wrapper>
  );
};
export default AddPost;
