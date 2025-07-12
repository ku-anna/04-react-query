import ReactPaginate from "react-paginate";
import css from "./ReactPaginate.module.css";

interface PaginationProps {
  total: number;
  page: number;
  onChange: (nextPage: number) => void;
}

export default function Pagination({ page, total, onChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={total}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
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
