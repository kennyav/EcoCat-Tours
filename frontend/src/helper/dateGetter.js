import moment from 'moment';

export function getDatesForRange(range) {
   const dates = [];
   const today = moment();
 
   switch (range) {
     case "Custom":
       // Handle custom range logic if needed
       break;
 
     case "Today":
       dates.push(today.format('MMMM DD, YYYY'));
       break;
 
     case "Yesterday":
       dates.push(today.subtract(1, 'day').format('MMMM DD, YYYY'));
       break;
 
     case "This Week":
       const startOfWeek = today.clone().startOf('week');
       for (let date = startOfWeek; date <= today; date.add(1, 'day')) {
         dates.push(date.format('MMMM DD, YYYY'));
       }
       break;
 
     case "Last Week":
       const lastWeekStart = today.clone().subtract(1, 'week').startOf('week');
       const lastWeekEnd = lastWeekStart.clone().endOf('week');
       for (let date = lastWeekStart; date <= lastWeekEnd; date.add(1, 'day')) {
         dates.push(date.format('MMMM DD, YYYY'));
       }
       break;
 
     case "This Month":
       const startOfMonth = today.clone().startOf('month');
       for (let date = startOfMonth; date <= today; date.add(1, 'day')) {
         dates.push(date.format('MMMM DD, YYYY'));
       }
       break;
 
     case "Last Month":
       const lastMonthStart = today.clone().subtract(1, 'month').startOf('month');
       const lastMonthEnd = lastMonthStart.clone().endOf('month');
       for (let date = lastMonthStart; date <= lastMonthEnd; date.add(1, 'day')) {
         dates.push(date.format('MMMM DD, YYYY'));
       }
       break;
 
     case "This Quarter":
       const startOfQuarter = today.clone().startOf('quarter');
       for (let date = startOfQuarter; date <= today; date.add(1, 'day')) {
         dates.push(date.format('MMMM DD, YYYY'));
       }
       break;
 
     case "Last Quarter":
       const lastQuarterStart = today.clone().subtract(1, 'quarter').startOf('quarter');
       const lastQuarterEnd = lastQuarterStart.clone().endOf('quarter');
       for (let date = lastQuarterStart; date <= lastQuarterEnd; date.add(1, 'day')) {
         dates.push(date.format('MMMM DD, YYYY'));
       }
       break;
 
     case "This Year":
       const startOfYear = today.clone().startOf('year');
       for (let date = startOfYear; date <= today; date.add(1, 'day')) {
         dates.push(date.format('MMMM DD, YYYY'));
       }
       break;
 
     case "Last Year":
       const lastYearStart = today.clone().subtract(1, 'year').startOf('year');
       const lastYearEnd = lastYearStart.clone().endOf('year');
       for (let date = lastYearStart; date <= lastYearEnd; date.add(1, 'day')) {
         dates.push(date.format('MMMM DD, YYYY'));
       }
       break;
 
     default:
       console.error('Unknown date range');
   }
 
   return dates.reverse();
 }