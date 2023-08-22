import { FormRow, FormRowSelect, SubmitBtn, MultipleInput } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { STATUS, POST_SORT_BY } from '../../../utils/constants';
import { useAllPostsContext } from '../pages/AllPosts';

const SearchContainer = () => {
  const { searchValues } = useAllPostsContext();
  const { title, categories, tags, status, sort } = searchValues;
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

  const handleMultipleInputChange = (name, updatedValue) => {
    const updatedSearchValues = { ...searchValues, [name]: updatedValue };
    submit(updatedSearchValues);
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
            name="status"
            labelText="status"
            list={['all', ...Object.values(STATUS)]}
            defaultValue={status}
            onChange={debounce(form => {
              submit(form);
            })}
          />
          <MultipleInput
            label="categories (1-3)"
            placeholder="enter..."
            name="categories"
            defaultValues={categories}
            onChange={debounce(form => {
              submit(form);
            })}
            onValueRemove={updatedValues =>
              handleMultipleInputChange('categories', updatedValues)
            }
          />
          <MultipleInput
            label="tags (0-20)"
            placeholder="enter..."
            name="tags"
            defaultValues={tags}
            onChange={debounce(form => {
              submit(form);
            })}
            onValueRemove={updatedValues =>
              handleMultipleInputChange('tags', updatedValues)
            }
          />
          <FormRowSelect
            name="sort"
            labelText="sort"
            list={['all', ...Object.keys(POST_SORT_BY)]}
            defaultValue={sort}
            onChange={debounce(form => {
              submit(form);
            })}
          />
          <SubmitBtn formBtn />
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
