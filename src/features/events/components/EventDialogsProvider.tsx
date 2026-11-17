"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DeleteEventDialog } from "@/features/events/components/DeleteEventDialog";
import { EventFormDialog } from "@/features/events/components/EventFormDialog";
import type { EventDto } from "@/features/events/types";
import { getNextFullHour } from "@/lib/date";

interface FormDialogState {
  event: EventDto | null;
  initialStartsAt: Date;
}

interface EventDialogsValue {
  openCreate: (date?: Date) => void;
  openEdit: (event: EventDto) => void;
  openDelete: (event: EventDto) => void;
}

const EventDialogsContext = createContext<EventDialogsValue | null>(null);

function getActiveElement(): HTMLElement | null {
  const active = document.activeElement;
  return active instanceof HTMLElement ? active : null;
}

export function EventDialogsProvider({ children }: { children: ReactNode }) {
  const [formState, setFormState] = useState<FormDialogState | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventDto | null>(null);
  const initiatorRef = useRef<HTMLElement | null>(null);

  // Діалоги відкриваються програмно, без Radix Trigger, тому повертаємо фокус вручну
  function handleCloseAutoFocus(event: Event) {
    event.preventDefault();
    initiatorRef.current?.focus();
  }

  const value = useMemo<EventDialogsValue>(
    () => ({
      openCreate: (date) => {
        initiatorRef.current = getActiveElement();
        setFormState({
          event: null,
          initialStartsAt: date ?? getNextFullHour(),
        });
      },
      openEdit: (event) => {
        initiatorRef.current = getActiveElement();
        setFormState({ event, initialStartsAt: event.startsAt });
      },
      openDelete: (event) => {
        setFormState(null);
        setDeleteTarget(event);
      },
    }),
    [],
  );

  return (
    <EventDialogsContext value={value}>
      {children}
      {formState && (
        <EventFormDialog
          event={formState.event}
          initialStartsAt={formState.initialStartsAt}
          onClose={() => setFormState(null)}
          onDelete={value.openDelete}
          onCloseAutoFocus={handleCloseAutoFocus}
        />
      )}
      {deleteTarget && (
        <DeleteEventDialog
          event={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onCloseAutoFocus={handleCloseAutoFocus}
        />
      )}
    </EventDialogsContext>
  );
}

export function useEventDialogs(): EventDialogsValue {
  const value = useContext(EventDialogsContext);
  if (!value) {
    throw new Error("useEventDialogs must be used within EventDialogsProvider");
  }
  return value;
}
