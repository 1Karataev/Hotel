import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Hotel } from '../redux/Hotels'







export const hotelsApi = createApi({
  reducerPath: 'hotelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://engine.hotellook.com/api/v2' }),
  endpoints: (builder) => ({
    GetHotelsByName: builder.query<Hotel[],{local: string, datein: string, dateout: string}>({
      query: ({local, datein, dateout}) =>  `cache.json?location=${local}&currency=rub&checkIn=${datein}&checkOut=${dateout}&limit=20`
    }),
     
  }),
})


export const {  useGetHotelsByNameQuery, useLazyGetHotelsByNameQuery } = hotelsApi