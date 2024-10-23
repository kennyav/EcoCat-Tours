import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import httpClient from '../../httpClient'
import { quantum } from 'ldrs'
import { Card, CardContent } from "../../components/ui/card"

export default function SingleTransaction({ history }) {
  const url = useSelector((state) => state.development.value)
  const [event, setEvent] = useState({ title: '' })
  const [salesman, setSalesman] = useState({ first_name: '', last_name: '' })
  const [passenger, setPassenger] = useState({ total_price: 0 })
  const [loading, setLoading] = useState(false)

  quantum.register()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [eventResp, passengerResp, salesmanResp] = await Promise.all([
          httpClient.get(`${url}/events/get-event/${history.scheduled_event_id}`),
          httpClient.get(`${url}/bookings/get_passenger/${history.id}`),
          httpClient.get(`${url}/salesmen/${history.salesman_id}`)
        ])
        setEvent(eventResp.data)
        setPassenger(passengerResp.data)
        setSalesman(salesmanResp.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [history.id, history.scheduled_event_id, history.salesman_id, url])

  const priceColor = passenger.total_price >= 0 ? 'text-green-600' : 'text-red-700'
  const symbol = passenger.fiat !== "0" ? 'USD' : 'MX'

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-20">
            <l-quantum size="40" speed="1.75" color="black" />
          </div>
        ) : (
          <div className="flex flex-wrap justify-between items-center gap-4">
            <TransactionItem title="Passenger" value={`${history.first_name} ${history.last_name}`} />
            <TransactionItem title="Salesman" value={`${salesman.first_name} ${salesman.last_name}`} />
            <TransactionItem title="Price" value={`${symbol}$${passenger.total_price}`} valueClassName={priceColor} />
            <TransactionItem title="Event" value={event.title} valueClassName="text-xs" />
            <TransactionItem title="Recipient" value="EcoCat" valueClassName="text-xs" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TransactionItem({ title, value, valueClassName = '' }) {
  return (
    <div className="flex flex-col space-y-1 min-w-[120px]">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <div className={`text-sm font-semibold ${valueClassName}`}>{value}</div>
    </div>
  )
}

