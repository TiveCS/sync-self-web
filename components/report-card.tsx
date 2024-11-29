import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Skeleton } from './ui/skeleton';

export type ReportCardProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
  isLoading?: boolean;
};

export function ReportCard({
  content,
  description,
  title,
  isLoading,
}: ReportCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isLoading ? <Skeleton className="h-4 w-1/3" /> : title}
        </CardTitle>

        {description && (
          <CardDescription>
            {isLoading ? <Skeleton className="h-4 w-full" /> : description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {isLoading ? <Skeleton className="h-6 w-1/2" /> : content}
      </CardContent>
    </Card>
  );
}
