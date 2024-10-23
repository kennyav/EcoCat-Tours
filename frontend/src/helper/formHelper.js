import httpClient from "../httpClient";

function formatPhoneNumber(input) {
   // Remove all non-digit characters from the input string
   const cleaned = input.replace(/\D/g, '');
   // Format the cleaned input into a phone number format
   const formatted = cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '+52 ($1) $2-$3');
   return formatted;
}
 

export function handlePhoneNumberChange(event, setPhoneNumber) {
   // Format the input value and update the state
   const formattedValue = formatPhoneNumber(event.target.value);
   setPhoneNumber(formattedValue);
}


export const creatingNewBooking = async ({formData, bookerId, salesmanId, scheduledEventId, paymentSource, paymentStatus, commissionReceived, foodOptions, url, totalPrice, fiatValue}) => {
   let passengerId = ''
   console.log(formData)
   const fiat = fiatValue === 'USD' ? true : false
   try {
      const resp = await httpClient.post(`${url}/bookings/create-booking`, {
         scheduledEventId,
         salesmanId,
         bookerId,
         firstName: formData.firstName,
         lastName: formData.lastName,
         email: "",
         phoneNumber: 0,
         notes: formData.notes,
         paymentSource,
         paymentStatus,
         commissionReceived,
         shirts: formData.t_shirt,
         adultNumber: formData.adultNumber,
         childrenNumber: formData.childrenNumber,
         infantNumber: formData.infantNumber,
         adultPrice: formData.adultPrice,
         childrenPrice: formData.childrenPrice,
         infantPrice: formData.infantPrice,
         partialPayment: formData.partialPayment,
         foodOptions,
         totalPrice,
         fiat
      });
      passengerId = resp.data.id

   } catch (error) {
      alert("error", error)
   } finally {

      try {
         const capacity = parseInt(formData.adultNumber) + parseInt(formData.childrenNumber) + parseInt(formData.infantNumber)
         const changeCapacity = await httpClient.put(`${url}/events/edit-capacity/${scheduledEventId}`, {
            capacity,
            adult: parseInt(formData.adultNumber),
            children: parseInt(formData.childrenNumber),
            infant: parseInt(formData.infantNumber)
         });
         console.log(changeCapacity.data)
      } catch (error) {
         console.log("Error", error)
      }

      try {
         const transaction = await httpClient.post(`${url}/transactions/create-transaction`, {
            passengerId
         })
         console.log(transaction.data)
      } catch (error) {
         console.log("Error", error)
      }
   }
}
