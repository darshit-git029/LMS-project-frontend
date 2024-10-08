/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../apiSlice";
import { userLoggedIn, userregistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                  const result = await queryFulfilled;
                  dispatch(
                    userregistration({
                      token: result.data.activationToken,
                    })
                  );
                } catch (error: any) {
                  console.log(error);
                }
              },
        }),
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
              url: "activate-user",
              method: "POST",
              body: {
                activation_token,
                activation_code,
              },
            }),
          }),

          login: builder.mutation({
            query: ({ email, password }) => ({
              url: "login",
              method: "POST",
              body: {
                email,
                password,
              },
              credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
              try {
                const result = await queryFulfilled;
                dispatch(
                  userLoggedIn({
                    accessToken: result.data.accessToken,
                    user: result.data.user,
                  })
                );
              } catch (error: any) {
                console.log(error);
              }
            },
          }), 
    })
})

export const {useRegisterMutation,useActivationMutation,useLoginMutation} = authApi