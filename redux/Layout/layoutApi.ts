import { apiSlice } from "../features/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `get/layout/${type}`,
        method: "GET",  
        credentials: "include" as const,
      }),
    }),
    editLayout: builder.mutation({
<<<<<<< HEAD
      query: ({ type, image, title, subTitle, faq, category }) => ({
=======
      query: ({ type, image, title, subTitle, faq, categories }) => ({
>>>>>>> 0d6789fdb81da322022f56d1d51c9e2b3214d47c
        url: `edit/layout`,
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
<<<<<<< HEAD
          category,
=======
          categories,
>>>>>>> 0d6789fdb81da322022f56d1d51c9e2b3214d47c
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery,useEditLayoutMutation } = layoutApi;