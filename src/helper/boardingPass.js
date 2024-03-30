export const printBoardingPass = ({
   firstName,
   lastName,
   date,
   time,
   numberOfPassengers,
   pricePerPassenger,
   foodOption,
   tShirtOption,
   otherDetails,
 }) => {
   const css = `
     @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";
 
     body {
       text-align: center;
     }
 
     .ticket {
       display: inline-block;
       width: 350px;
       margin: 20px;
       background-color: #273138;
       border-radius: 10px;
       color: #fff;
       font-family: Helvetica Neue;
       font-weight: 300;
       letter-spacing: 1px;
       box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
     }
 
     .ticket header {
       position: relative;
       height: 35px;
       background-color: #1b252e;
       padding: 10px;
       border-radius: 10px;
     }
 
     .ticket header .company-name {
       line-height: 35px;
       text-align: left;
     }
 
     .ticket header .gate {
       position: absolute;
       right: 15px;
       top: 10px;
       font-weight: 400;
       line-height: 18px;
       text-align: center;
       font-size: 12px;
     }
 
     .ticket header:after,
     .ticket header:before {
       content: '';
       width: 16px;
       height: 16px;
       background-color: #fff;
       position: absolute;
       bottom: -8px;
       border-radius: 50%;
       box-shadow: inset 12px 0px 18px -11px rgba(0, 0, 0, 0.5);
     }
 
     .ticket header:after {
       right: -8px;
     }
 
     .ticket header:before {
       left: -8px;
     }
 
     .ticket .airports {
       padding: 5px 10px 10px 10px;
       height: 100px;
       text-align: center;
       position: relative;
       border-bottom: 2px dashed #000;
     }
 
     .ticket .airports .airport {
       position: relative;
       margin: 10px;
       text-align: center;
       display: inline-block;
     }
 
     .ticket .airports .airport .airport-name {
       color: #29a8eb;
       font-size: 12px;
       font-weight: 400;
     }
 
     .ticket .airports .airport .airport-code {
       font-size: 32px;
       font-weight: 400;
       margin: 5px 0;
     }
 
     .ticket .airports .airport .dep-arr-label {
       color: #9299a0;
       font-size: 12px;
       font-weight: 500;
     }
 
     .ticket .airports .airport .time {
       font-size: 10px;
       color: #9299a0;
     }
 
     .ticket .airports .airport:first-child {
       margin-right: 40%;
     }
 
     .ticket .airports .airport:first-child:after {
       font-family: FontAwesome;
       color: #353e48;
       content: "\\f072";
       position: absolute;
       font-size: 55px;
       top: calc(50% - 25px);
       right: -150%;
     }
 
     .ticket .airports:after,
     .ticket .airports:before {
       content: '';
       width: 16px;
       height: 16px;
       background-color: #fff;
       position: absolute;
       bottom: -8px;
       border-radius: 50%;
       box-shadow: inset 12px 0px 18px -11px rgba(0, 0, 0, 0.5);
     }
 
     .ticket .airports:after {
       right: -8px;
     }
 
     .ticket .airports:before {
       left: -8px;
     }
 
     .ticket .place {
       padding: 10px;
       text-align: center;
       height: 330px;
     }
 
     .ticket .place-block {
       display: inline-block;
       margin: 10px 30px;
     }
 
     .ticket .place-block .place-label {
       color: #29a8eb;
       text-transform: uppercase;
       font-weight: 400;
       font-size: 14px;
       margin-bottom: 10px;
     }
 
     .ticket .place-block .place-value {
       color: #9299a0;
       font-size: 12px;
       font-weight: 500;
     }
 
     .ticket .qr {
       width: 220px;
       height: 220px;
       margin: 20px auto;
       border-radius: 10px;
       overflow: hidden;
     }
 
     .ticket .qr img {
       width: 100%;
       height: 100%;
     }
 
     .ticket.inverse {
       background-color: #f8f8f8;
     }
 
     .ticket.inverse header {
       background-color: #29a8eb;
     }
 
     .ticket.inverse .airports {
       border-bottom-color: #d3d6da;
     }
 
     .ticket.inverse .airport:first-child:after {
       color: #d3d6da;
     }
 
     .ticket.inverse .airport .airport-code {
       color: #707884;
       font-weight: 500;
     }
   `;
 
   const boardingPassHTML = `
     <style>${css}</style>
     <div class="ticket">
       <header>
         <div class="company-name">EcoCat Tours</div>
         <div class="gate">
           <div>Gate</div>
           <div>B4</div>
         </div>
       </header>
       <section class="airports">
         <div class="airport">
           <div class="airport-name">Charlotte</div>
           <div class="airport-code">CLT</div>
           <div class="dep-arr-label">Departing</div>
           <div class="time">${time}</div>
         </div>
         <div class="airport">
           <div class="airport-name">Tampa</div>
           <div class="airport-code">TPA</div>
           <div class="dep-arr-label">Arriving</div>
           <div class="time">${time}</div>
         </div>
       </section>
       <section class="place">
         <div class="place-block">
           <div class="place-label">Group</div>
           <div class="place-value">${numberOfPassengers}</div>
         </div>
         <div class="place-block">
           <div class="place-label">Seat</div>
           <div class="place-value">2A</div>
         </div>
         <div class="place-block">
           <div class="place-label">Term</div>
           <div class="place-value">B</div>
         </div>
         <div class="qr">
           <img src="http://www.classtools.net/QR/pics/qr.png" alt="QR Code" />
         </div>
       </section>
     </div>
   `;
 
   // Print the boarding pass HTML
   const printWindow = window.open('', '_blank');
   printWindow.document.open();
   printWindow.document.write(boardingPassHTML);
   printWindow.document.close();

    // Print the boarding pass
    printWindow.print();
 };
 