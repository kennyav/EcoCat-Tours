import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TransactionMenu from './TransactionComponents/TransactionMenu'
import TransactionDetails from './TransactionComponents/TransactionDetails'
import Statistics from './TransactionComponents/Statistics';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../reducers/loginSlice';

// helper function
import { getDatesForRange } from '../helper/dateGetter';
import moment from 'moment';
import httpClient from '../httpClient';

interface StatisticsData {
  totalRevenue: number;
  totalCustomers: number;
  eventAttendees: {
    [key: string]: number;
  };
}

export default function Transactions() {
  const url = useSelector((state: any) => state.development.value)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRange, setSelectedRange] = useState("Today")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [transactions, setTransactions] = useState<string[]>([])
  const [statistics, setStatistics] = useState<StatisticsData>({
    totalRevenue: 0,
    totalCustomers: 0,
    eventAttendees: {},
  });

  const dateRanges = [
    "Custom",
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "This Quarter",
    "Last Quarter",
    "This Year",
    "Last Year",
  ]

  useLayoutEffect(() => {
    setTransactions(getDatesForRange(selectedRange))
  }, [selectedRange])

  useEffect(() => {
    dispatch(update("Transactions"))
  }, [dispatch]);


  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const startDate = moment(transactions[transactions.length - 1], 'MMMM DD, YYYY').format('YYYY-MM-DD');
        const endDate = moment(transactions[0], 'MMMM DD, YYYY').format('YYYY-MM-DD');

        const response = await httpClient.get(`${url}/transactions/statistics?startDate=${startDate}&endDate=${endDate}`);
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    if (transactions.length > 0) {
      fetchStatistics();
    }
  }, [url, transactions]);

  return (
    <div className='px-[41px]'>
      <div className='flex flex-col w-full h-full rounded-lg bg-white gap-2'>
        <Statistics
          totalRevenue={statistics.totalRevenue}
          totalCustomers={statistics.totalCustomers}
          eventAttendees={statistics.eventAttendees}
        />
        <TransactionMenu selectedRange={selectedRange} dateRanges={dateRanges} setSelectedRange={setSelectedRange} />
        <div className='w-full h-auto overflow-scroll'>
          {
            transactions.map((date, index) => (
              <TransactionDetails key={index} date={date} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
