'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import {
  DateRange,
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
} from 'react-day-picker';

export type DatePickerProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  triggerClassName?: string;
  calendarProps?: DayPickerSingleProps;
};

export function DatePicker({
  date,
  setDate,
  triggerClassName,
  calendarProps,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            triggerClassName
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...calendarProps}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export type DateRangePickerProps = {
  className?: string;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  triggerClassName?: string;
  calendarProps?: DayPickerRangeProps;
  placeholder?: string;
};

export function DateRangePicker({
  className,
  date,
  setDate,
  triggerClassName,
  calendarProps,
  placeholder = 'Pick a Date',
}: DateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              triggerClassName
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            {...calendarProps}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
