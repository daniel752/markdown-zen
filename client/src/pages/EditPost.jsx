import {
  FormRow,
  FormRowMultiSelect,
  FormRowSelect,
  MarkdownContainer,
  SubmitBtn,
} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { STATUS, CATEGORY, TAG } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { convertListToMultiSelectFormat } from '../utils/formatsUtils';
import TextareaContainer from '../components/TextareaContainer';

const EditPost = () => {
  const { post } = useLoaderData();
  const { title, categories, tags, content, status } = post;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

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
          <FormRowMultiSelect
            name="categories"
            labelText="categories"
            list={CATEGORY}
          />
          <FormRowMultiSelect
            name="tags"
            labelText="tags"
            list={TAG}
            defaultValue={tags.map(item => {
              return {
                label: item,
                value: item,
              };
            })}
            isMultipleSelect={true}
          />
          <FormRowSelect
            name="status"
            labelText="status"
            list={Object.values(STATUS)}
            defaultValue={status}
          />
          <TextareaContainer defaultValue={content} />
          <SubmitBtn formBtn="form-btn" submitText="submit" />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditPost;
