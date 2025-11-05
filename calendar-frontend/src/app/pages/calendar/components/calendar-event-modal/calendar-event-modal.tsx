/** @jsxImportSource @emotion/react */
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import { EltEvent } from '../../../../common/types';
import {
  overlay,
  content,
  heading,
  desc,
  label,
  input,
  row,
  btn,
  primary,
  closeX,
} from './styles/calendar-modal-style';
import { toLocalInput } from '../../calendar.utils';

export function EventModal({
  open,
  onOpenChange,
  event,
  onAdd,
  patchEvent,
}: {
  open: boolean;
  event: EltEvent | undefined;
  onAdd: (event: Omit<EltEvent, 'id'>) => Promise<void>;
  patchEvent: (event: EltEvent) => Promise<void>;
  onOpenChange: (state: boolean) => void;
}) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(() => new Date());
  const [end, setEnd] = useState(() => new Date(Date.now() + 60 * 60 * 1000));

  const resetForm = () => {
    setTitle('');
    setStart(() => new Date());
    setEnd(() => new Date(Date.now() + 60 * 60 * 1000));
  };

  useEffect(() => {
    if (!open) return;

    if (event) {
      setTitle(event.title ?? '');
      setStart(
        event.start instanceof Date
          ? event.start
          : new Date(event.start as string),
      );
      setEnd(
        event.end instanceof Date ? event.end : new Date(event.end as string),
      );
    }
  }, [open, event]);

  const canSave = !!title.trim() && end > start;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay css={overlay} />
        <Dialog.Content css={content}>
          <Dialog.Title css={heading}>
            {event ? `Edit event: ${event.title}` : 'Add event'}
          </Dialog.Title>
          <Dialog.Description css={desc}>
            Create a new calendar entry
          </Dialog.Description>

          <input
            css={input}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label css={label}>Start</label>
          <input
            css={input}
            type="datetime-local"
            value={toLocalInput(start)}
            onChange={(e) => setStart(new Date(e.target.value))}
          />

          <label css={label}>End</label>
          <input
            css={input}
            type="datetime-local"
            value={toLocalInput(end)}
            onChange={(e) => setEnd(new Date(e.target.value))}
          />

          <div css={row}>
            <Dialog.Close asChild>
              <button css={btn}>Cancel</button>
            </Dialog.Close>
            <button
              css={primary}
              data-testid="save-event-btn"
              disabled={!canSave}
              onClick={() => {
                if (event?.id) {
                  patchEvent({ id: event.id, start, end, title: title.trim() });
                } else {
                  onAdd({ title: title.trim(), start, end });
                }

                resetForm();
                return onOpenChange(false);
              }}
            >
              Save
            </button>
          </div>

          <Dialog.Close asChild>
            <button css={closeX} aria-label="Close">
              ×
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
