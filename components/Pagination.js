import Link from 'next/link';

const Pagination = ({ currPage, numPages }) => {
  const isFirst = currPage === 1;
  const isLast = currPage === numPages;
  const prevPage = `/blog/page/${currPage - 1}`;
  const nextPage = `/blog/page/${currPage + 1}`;

  if (numPages === 1) return <></>;

  return (
    <div className="mt-6">
      <ul className="flex pl-0 my-2 list-none">
        {!isFirst && (
          <Link href={prevPage}>
            <li className="relative block px-3 py-2 mr-1 leading-tight text-gray-800 bg-white border border-gray-300 cursor-pointer hover:bg-gray-200">
              Previous
            </li>
          </Link>
        )}

        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`}>
            <li className="relative block px-3 py-2 mr-1 leading-tight text-gray-800 bg-white border border-gray-300 cursor-pointer hover:bg-gray-200">
              {i + 1}
            </li>
          </Link>
        ))}
        {!isLast && (
          <Link href={nextPage}>
            <li className="relative block px-3 py-2 mr-1 leading-tight text-gray-800 bg-white border border-gray-300 cursor-pointer hover:bg-gray-200">
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
