import { useState, useContext } from 'react';
import { Br, Cut, Line, Printer, render, Row, Text, Barcode } from 'react-thermal-printer';
import { EventContext } from '../Calendar/SideMenuEventInfo';

// redux
import { useSelector } from 'react-redux'

// axios request
import httpClient from '../../httpClient';

export default function PrintReceipt({ passenger }) {
   // redux
   const url = useSelector((state) => state.development.value)

   // event info
   const { event, eventTimeInfo } = useContext(EventContext);
   const quantity = passenger.adult_passengers + passenger.children_passengers + passenger.infant_passengers



   const checkIn = async () => {
      const checkedIn = true
      try {
         const resp = await httpClient.put(`${url}/bookings/update-checkedin/${passenger.id}`, {
            checkedIn
         })
         console.log(resp.data)
      } catch (error) {
         console.log("Error", error)
      }
   }

   const receipt = (
      <Printer type="star" width={42} debug={true}>
         <Text size={{ width: 2, height: 2 }}>{`${passenger.total_price} $ USD`}</Text>
         <Text bold={true}>EcoTours</Text>
         <Br />
         <Line />
         <Row left="Rerservation" right={event.title} />
         <Row left="Date & Time" right={eventTimeInfo} />
         <Row left="Dock" right="P" />
         <Row left="Passenger" right={passenger.first_name} />
         <Row left="--------" right={passenger.last_name} />
         <Row left="Adult" right={passenger.adult_passengers.toString()} />
         <Row left="Children" right={passenger.children_passengers.toString()} />
         <Row left="Infant" right={passenger.infant_passengers.toString()} />
         <Row left="Quantity" right={quantity.toString()} />
         <Row left="Vip Food Option" right={passenger.food.toString()} />
         <Line />
         <Row left={<Text bold={true}>Charges</Text>} right={`${passenger.total_price}$ USD`} />
         <Row left={`Adult(s) x(${passenger.adult_passengers})`} right={`${passenger.adult_price}$/adult`} />
         <Row left={`Children x(${passenger.children_passengers})`} right={`${passenger.children_price}$/child`} />
         <Row left={`Infant(s) x(${passenger.infant_passengers})`} right={`${passenger.infant_price}$/infant`} />
         <Br />
         <Text align="center">Thank you for choosing EcoCat! ☺</Text>
         <Barcode align="center" type="UPC-A" content="EcoCat Verified √" />
         <Cut />
      </Printer>
   );

   const [port, setPort] = useState();
   const [isPrinting, setIsPrinting] = useState(false)
   const printReceipt = async () => {
      setIsPrinting(true)
      let _port = port;
      if (_port == null) {
         try {
            _port = await navigator.serial.requestPort();
            await _port.open({ baudRate: 9600 });
            setPort(_port);

            const writer = _port.writable?.getWriter();
            if (writer != null) {
               // const data = await render(receipt);

               // await writer.write(data);
               for (let i = 0; i < quantity; i++) {
                  const data = await render(receipt);
                  await writer.write(data);
               }
               writer.releaseLock();
            }
         } catch (error) {
            console.log(error)
            setIsPrinting(false)
         }
      }
      setIsPrinting(false)
   };

   return (
      <main>
         <div style={{ marginTop: 24 }}>
            <button
               className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5BB5] focus-visible:ring-offset-2"
               disabled={isPrinting}
               onClick={() => {
                  checkIn()
                  //printReceipt()
                  }}>
               {/* {isPrinting ? 'Printing...' : 'Print Pass'} */}
               Confirm Check In
            </button>
         </div>
      </main>
   );
}