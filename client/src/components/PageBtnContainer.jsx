import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const {
    data: { currentPage: currentRaw, numberOfPages },
  } = useAllJobsContext();
   const currentPage = Number(currentRaw);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const pages = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1;
  });

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageBtn = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first btn
    pageButtons.push(
      addPageBtn({ pageNumber: 1, activeClass: currentPage === 1 }),
      );
      //    Add the dots before the current page if there are more than 3 pages
      if (currentPage > 3) {
          pageButtons.push(<span className='page-btn dots' key='dots-1'>...</span>)
      }
    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageBtn({ pageNumber: currentPage - 1, activeClass: false }),
      );
    }

    /* current  button */
    if (currentPage !== 1 && currentPage !== numberOfPages) {
      pageButtons.push(
        addPageBtn({ pageNumber: currentPage, activeClass: true }),
      );
      }
      //one after current
      if (currentPage !== numberOfPages && currentPage !== numberOfPages -1) {
          pageButtons.push(
              addPageBtn({ pageNumber: currentPage + 1, activeClass: false }),
          );
      }
if (currentPage < numberOfPages-2) {
  pageButtons.push(
    <span className='page-btn dots' key='dots+1'>
      ...
    </span>,
  );
}
    // last btn
    pageButtons.push(
      addPageBtn({
        pageNumber: numberOfPages,
        activeClass: currentPage === numberOfPages,
      }),
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numberOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft /> prev
      </button>
      <div className='btn-container'>{renderPageButtons()}</div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numberOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
