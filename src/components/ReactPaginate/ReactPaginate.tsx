import ReactPaginate from "react-paginate";
import css from "./ReactPaginate.module.css";

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({
  pageCount,
  forcePage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      forcePage={forcePage}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
      renderOnZeroPageCount={null}
    />
  );
}
