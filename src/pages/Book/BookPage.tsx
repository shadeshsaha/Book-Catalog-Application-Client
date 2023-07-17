import Fuse from "fuse.js";
import React, { useState } from "react";
import BookCard from "../../components/BookCard";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { setPriceRange } from "../../redux/features/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IBook } from "../../types/bookTypes";
import Footer from "../shared/Footer";
import Loading from "../shared/Loading";
import BookFilter from "./BookFilter";

const BookPage = () => {
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 40000,
  });

  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [value, setValue] = useState(50);
  const dispatch = useAppDispatch();
  const { priceRange, status } = useAppSelector((state) => state.book);

  const booksData = data?.data?.data;
  let filteredData = booksData;

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    handleSlider([newValue]);
  };

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };



  filteredData = data?.data?.data.filter((item: { status: boolean; price: number }) => {
    if (status) {
      return item.status === true && item.price < priceRange;
    }
    return priceRange > 0 ? item.price < priceRange : true;
  });
  


  
  const handleGenreFilter = () => {
    let updatedData = booksData;

    if (selectedGenre !== "") {
      updatedData = updatedData.filter((book: IBook) =>
        book.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    if (selectedYear !== "") {
      const year = selectedYear;
      updatedData = updatedData.filter((book: IBook) => book.year === year);
    }

    filteredData = updatedData;
  };

  handleGenreFilter();

  if (filteredData) {
    const options: Fuse.IFuseOptions<IBook> = {
      keys: ["title", "author", "genre", "year"],
      threshold: 0.4,
    };

    const fuse = new Fuse(filteredData, options);
    const searchResults = fuse.search(searchText);
    filteredData =
      searchResults.length > 0
        ? searchResults.map((result) => result.item)
        : filteredData;

    if (status) {
      filteredData = filteredData.filter(
        (item: { status: boolean; price: number }) =>
          item.status === true && item.price < priceRange
      );
    } else if (priceRange > 0) {
      filteredData = filteredData.filter(
        (item: { price: number }) => item.price < priceRange
      );
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex static   py-24  ">
        <div className="w-1/4 z-0  py-24 bg-base-200 fixed top-0 right-0 bottom-0 ">
          {" "}
          <div className="">
            <BookFilter
              value={value}
              handleRangeChange={handleRangeChange}
              priceRange={priceRange}
              searchText={searchText}
              selectedGenre={selectedGenre}
              selectedYear={selectedYear}
              setSearchText={setSearchText}
              setSelectedGenre={setSelectedGenre}
              setSelectedYear={setSelectedYear}
            />
          </div>
        </div>
        <div className="w-3/4 flex justify-end">
          <div className="flex justify-end mx-auto px-4">
            <div className="flex justify-end px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {filteredData?.map((CardData: IBook) => (
                  <BookCard book={CardData} key={CardData.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-20 bg-red-500 ">
        <Footer />
      </div>
    </>
  );
};

export default BookPage;
