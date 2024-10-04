import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import httpClient from '../../httpClient'
import moment from 'moment'
import SingleTransaction from './SingleTransaction'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function TransactionDetails(props) {
  const url = useSelector((state) => state.development.value)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      setHistory([])
      try {
        const formattedDate = moment(props.date, 'MMMM DD, YYYY').format('MM/DD/YYYY')
        const resp = await httpClient.get(`${url}/transactions/get-transactions/${formattedDate}`)
        setHistory(resp.data)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [url, props.date])

  return (
    <div className="p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{props.date}</CardTitle>
        </CardHeader>
        <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-20">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : history.length > 0 ? (
              history.map(data => (
                <div key={data.id} className="mb-4">
                  <SingleTransaction history={data} />
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No transactions found for this date.</p>
            )}
        </CardContent>
      </Card>
    </div>
  )
}