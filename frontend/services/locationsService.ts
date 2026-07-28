import { baseApi } from "./baseApi";

export interface VisitorLocation {
  _id: string;
  userId: string | null;
  guestId: string | null;
  userName: string | null;
  userEmail: string | null;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  path: string | null;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReportLocationPayload {
  latitude: number;
  longitude: number;
  accuracy?: number;
  guestId?: string;
  path?: string;
}

export const locationsService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Public — works for guests and logged-in users (OptionalJwtGuard on the API)
    reportLocation: build.mutation<VisitorLocation, ReportLocationPayload>({
      query: (body) => ({ url: "/locations", method: "POST", body }),
      invalidatesTags: [{ type: "Location", id: "LIST" }],
    }),

    // Admin only
    getLocations: build.query<VisitorLocation[], void>({
      query: () => "/locations",
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Location" as const, id: _id })), { type: "Location", id: "LIST" }]
          : [{ type: "Location", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useReportLocationMutation, useGetLocationsQuery } = locationsService;
