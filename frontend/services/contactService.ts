import { baseApi } from "./baseApi";

export type ContactStatus = "new" | "read" | "resolved";

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  userId: string | null;
  status: ContactStatus;
  createdAt: string;
}

export interface SubmitContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Public — works for both guests and logged-in users (OptionalJwtGuard on the API)
    submitContact: build.mutation<ContactMessage, SubmitContactPayload>({
      query: (body) => ({ url: "/contact", method: "POST", body }),
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),

    // Admin only
    getContactMessages: build.query<ContactMessage[], void>({
      query: () => "/contact",
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Contact" as const, id: _id })), { type: "Contact", id: "LIST" }]
          : [{ type: "Contact", id: "LIST" }],
    }),

    updateContactStatus: build.mutation<ContactMessage, { id: string; status: ContactStatus }>({
      query: ({ id, status }) => ({ url: `/contact/${id}/status`, method: "PATCH", body: { status } }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Contact", id }, { type: "Contact", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubmitContactMutation,
  useGetContactMessagesQuery,
  useUpdateContactStatusMutation,
} = contactService;
