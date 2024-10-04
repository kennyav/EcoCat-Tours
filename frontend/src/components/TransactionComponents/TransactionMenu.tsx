import { useState } from "react"
import { CalendarDays, ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import React from "react"

export default function TransactionMenu({selectedRange, dateRanges, setSelectedRange}: {selectedRange: string, setSelectedRange: React.Dispatch<React.SetStateAction<string>>,  dateRanges: string[]}) {

  return (
    <div className="flex items-center space-x-2 rounded-lg bg-blue-100 p-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full pl-3 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {selectedRange}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          {/* <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
          /> */}
        </PopoverContent>
      </Popover>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full pr-3 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
          >
            <ChevronDown className="mr-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          {dateRanges && dateRanges.map((range) => (
            <DropdownMenuItem
              className="hover:bg-slate-300 cursor-pointer"
              key={range}
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}