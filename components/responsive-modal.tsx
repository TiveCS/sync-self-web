'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';

export type ResponsiveModalProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  header?: React.ReactNode;
  description?: string;
  preventClose?: boolean;
  className?: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const ResponsiveModal = ({
  isOpen,
  setOpen,
  ...props
}: ResponsiveModalProps) => {
  const isMobile = useIsMobile();

  const handleOpenChange = (open: boolean) => {
    if (props.preventClose) return;

    setOpen(open);
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>{props.trigger}</DrawerTrigger>
        <DrawerContent className={cn('px-6', props.className)}>
          <>
            <DrawerHeader>
              <DrawerTitle>{props.title}</DrawerTitle>

              {props.description && (
                <DrawerDescription>{props.description}</DrawerDescription>
              )}

              {props.header}
            </DrawerHeader>

            {props.children}
          </>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className={props.className}>
        <>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>

            {props.description && (
              <DialogDescription>{props.description}</DialogDescription>
            )}

            {props.header}
          </DialogHeader>

          {props.children}
        </>
      </DialogContent>
    </Dialog>
  );
};

ResponsiveModal.displayName = 'ResponsiveModal';
