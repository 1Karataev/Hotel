import axios from 'axios';
import { Hotel } from '../redux/Hotels';

export default class Service {
  static async fetch(
    dispatch: any,
    setHotels: any,
    setPhotos: any,
    local: string,
    datein: string,
    dateout: string,
  ) {
    const response = await axios.get(
      `http://engine.hotellook.com/api/v2/cache.json?location=${local}&currency=rub&checkIn=${datein}&checkOut=${dateout}&limit=20`,
    );
    dispatch(setHotels(response.data));

    dispatch(
      setPhotos(
        response.data.map(
          (a: Hotel) => `https://photo.hotellook.com/image_v2/limit/h${a.hotelId}/164/149.auto`,
        ),
      ),
    );
  }
  static photos(dispatch: any, setPhotos: any, data:Hotel[]|undefined) {
     dispatch(
       setPhotos(
         data?.map(
           (a: Hotel) => `https://photo.hotellook.com/image_v2/limit/h${a.hotelId}/164/149.auto`,
         ),
       ),
     );
  }
}
