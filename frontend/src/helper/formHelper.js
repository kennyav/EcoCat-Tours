function formatPhoneNumber(input) {
   // Remove all non-digit characters from the input string
   const cleaned = input.replace(/\D/g, '');
   // Format the cleaned input into a phone number format
   const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
   return formatted;
}
 

export function handlePhoneNumberChange(event, setPhoneNumber) {
   // Format the input value and update the state
   const formattedValue = formatPhoneNumber(event.target.value);
   setPhoneNumber(formattedValue);
}
