import React from 'react'
import { Card, CardContent } from "../../components/ui/card"
import { DollarSign, Users, Calendar } from "lucide-react"

interface StatisticsProps {
  totalRevenueUSD: number;
  totalRevenueMX: number;
  totalCustomers: number;
  eventAttendees: {
    [key: string]: number;
  };
}

export default function Statistics({ totalRevenueUSD, totalRevenueMX, totalCustomers, eventAttendees }: StatisticsProps) {
  console.log(eventAttendees)
  const stats = [
    {
      title: "Total Revenue USD",
      value: `$${totalRevenueUSD.toFixed(2)}`,
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Revenue MX",
      value: `$${totalRevenueMX.toFixed(2)}`,
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Customers",
      value: totalCustomers.toString(),
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    ...Object.entries(eventAttendees).map(([eventTitle, attendees]) => ({
      title: eventTitle, // Use the event title from the object
      value: attendees.toString(), // Use the attendees count
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    })),
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              {stat.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}