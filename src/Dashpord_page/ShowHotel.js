import Hotel from './HotelData';
import {data}from './data';
export default function ShowHotel(){
    const dataShaw = data.map((el, index) => (<Hotel key= { index } img = { el.img } titel = { el.titel } des = { el.des } pr = { el.price } re = { el.review } > </Hotel>));
    return (

        <div className='parent-hotel' style= {{
        display: 'flex',
            justifyContent: 'center',
                alignItems: 'center',
                    gap: '20px',
                        flexWrap: 'wrap' }}>
     { dataShaw }
    </div>
    );
}