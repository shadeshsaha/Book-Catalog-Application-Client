import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),

    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),

    postBook: builder.mutation({
      query: ({ data }) => ({
        url: `/books/create-book`,
        method: "POST",
        body: data,
      }),
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),

    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useEditBookMutation,
  usePostReviewMutation,
  usePostBookMutation,
  useDeleteBookMutation,
  useSingleBookQuery,
} = productApi;
