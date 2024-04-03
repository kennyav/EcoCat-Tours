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


export const creatingNewBooking = async ({formData, bookerId, salesmanId, scheduledEventId, paymentSource, paymentStatus, commissionReceived, foodOptions, url}) => {
   let passengerId = ''
   const totalPrice = (formData.adultNumber * formData.adultPrice) + (formData.childrenNumber * formData.childrenPrice) + (formData.infantNumber * formData.infantPrice)
   try {
      const resp = await httpClient.post(`${url}:8000/bookings/create-booking`, {
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
         adultNumber: formData.adultNumber,
         childrenNumber: formData.childrenNumber,
         infantNumber: formData.infantNumber,
         adultPrice: formData.adultPrice,
         childrenPrice: formData.childrenPrice,
         infantPrice: formData.infantPrice,
         foodOptions,
         totalPrice
      });
      passengerId = resp.data.id

   } catch (error) {
      alert("error", error)
   } finally {

      try {
         const capacity = formData.adultNumber + formData.childrenNumber + formData.infantNumber
         const changeCapacity = await httpClient.put(`${url}:8000/events/edit-capacity/${scheduledEventId}`, {
            capacity
         });
         console.log(changeCapacity.data)
      } catch (error) {

      }

      try {
         const transaction = await httpClient.post(`${url}:8000/transactions/create-transaction`, {
            passengerId
         })
         console.log(transaction.data)
      } catch (error) {
         console.log("Error", error)
      }
   }
}
