import axios from 'axios';
import { Hotel } from '../redux/Hotels';

export default class Servis {
  static async fetch(dispatch: any, setHotels: any, setPhotos:any, local: string, datein: string, dateout: string) {
    const response = await axios.get(
      `http://engine.hotellook.com/api/v2/cache.json?location=${local}&currency=rub&checkIn=${datein}&checkOut=${dateout}&limit=10`,
    );
     dispatch(setHotels(response.data));

     dispatch(
       setPhotos(
         response.data.map(
           (a:Hotel) => `https://photo.hotellook.com/image_v2/limit/h${a.hotelId}/164/149.auto`,
         ),
       ),
     );
  }
}
