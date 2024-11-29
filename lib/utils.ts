import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDate } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(
  num: number,
  style?: Intl.NumberFormatOptions['style']
): string {
  const formatter = new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    maximumFractionDigits: 0,
    style: style || 'decimal',
  });

  return formatter.format(num);
}

export function revertFormatNumber(numStr: string): number {
  return Number(numStr.replace(/\D/g, ''));
}

export function formatReadableDate(date: Date): string {
  return formatDate(date, 'dd MMMM yyyy');
}
