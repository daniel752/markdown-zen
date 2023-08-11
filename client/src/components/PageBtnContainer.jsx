import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import {
  useLocation,
  Link,
  useNavigate,
  useLoaderData,
} from 'react-router-dom';
import { useAllPostsContext } from '../pages/AllPosts';

const PageBtnContainer = () => {
  const {
    data: { numPages, currentPage },
  } = useAllPostsContext();
  const pages = Array.from({ length: numPages }, (_, i) => {
    return i + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = page => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', page);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageBtn = ({ page, isActive }) => {
    return (
      <button
        className={`btn page-btn ${isActive && 'active'}`}
        key={page}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // Add the first page button
    pageButtons.push(addPageBtn({ page: 1, isActive: currentPage === 1 }));
    // Add the dots before the current page if there are more than 3 pages
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ....
        </span>,
      );
    }
    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(addPageBtn({ page: currentPage - 1, isActive: false }));
    }

    // Add the current page button
    if (currentPage !== 1 && currentPage !== numPages) {
      pageButtons.push(addPageBtn({ page: currentPage, isActive: true }));
    }

    // one after current page
    if (currentPage !== numPages && currentPage !== numPages - 1) {
      pageButtons.push(addPageBtn({ page: currentPage + 1, isActive: false }));
    }
    if (currentPage < numPages - 2) {
      pageButtons.push(
        <span className=" page-btn dots" key="dots+1">
          ....
        </span>,
      );
    }

    // Add the last page button
    pageButtons.push(
      addPageBtn({
        page: numPages,
        isActive: currentPage === numPages,
      }),
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          if (currentPage - 1 >= 1) {
            var prevPage = currentPage - 1;
          }
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          if (currentPage + 1 <= numPages) {
            var nextPage = currentPage + 1;
          }
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
