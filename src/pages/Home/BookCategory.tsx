import { Link } from "react-router-dom";
import BookCard from "../../components/BookCard";
import { Button } from "../../components/Button";
import SectionTitle from "../../components/SectionTitle";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/bookTypes";
import Loading from "../shared/Loading";

const BooksCategory = () => {
  const { data, isLoading } = useGetBooksQuery(undefined, {
    // error
    refetchOnMountOrArgChange: true,
    pollingInterval: 40000,
  });

  const booksData = data?.data?.data;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mb-5 ">
      <SectionTitle
        subHeading=""
        heading={"recently added book   "}
      ></SectionTitle>
      <div className="flex justify-center  container mx-auto mb-5    px-4">
        <div className="flex justify-center px-4">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {booksData?.slice(0, 10).map((book: IBook) => (
              <BookCard book={book} key={book.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="btn-outline btn-sm mx-2">
          <Link to="/books">See All Books</Link>
        </Button>
        {/* <button className="btn  ml-5 btn-primary">
          <Link to="/books">See All Books</Link>
        </button> */}
      </div>
    </div>
  );
};

export default BooksCategory;
