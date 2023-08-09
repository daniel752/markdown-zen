import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { CATEGORY, STATUS, POST_SORT_BY } from '../../../utils/constants';
import { useAllPostsContext } from '../pages/AllPosts';
import { makeUnderscoreSpace } from '../utils/formatsUtils';

const SearchContainer = () => {
  const { searchValues } = useAllPostsContext();
  const { title, categories, status, sort } = searchValues;
  const submit = useSubmit();

  const debounce = onChange => {
    let timeout;
    return e => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1500);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="title"
            defaultValue={title}
            onChange={debounce(form => {
              submit(form);
            })}
          />
          <FormRowSelect
            name="category"
            labelText="category"
            list={[
              'all',
              ...Object.values(CATEGORY).map(category => {
                return makeUnderscoreSpace(category);
              }),
            ]}
            defaultValue={categories}
            onChange={event => {
              submit(event.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="status"
            labelText="status"
            list={['all', ...Object.values(STATUS)]}
            defaultValue={status}
            onChange={event => {
              submit(event.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            labelText="sort"
            list={['all', ...Object.keys(POST_SORT_BY)]}
            defaultValue={sort}
            onChange={event => {
              submit(event.currentTarget.form);
            }}
          />
          {/* <SubmitBtn formBtn /> */}
        </div>
        <Link
          to="/dashboard/all-posts"
          className="btn btn-block form-btn delete-btn"
        >
          Reset Filters
        </Link>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
