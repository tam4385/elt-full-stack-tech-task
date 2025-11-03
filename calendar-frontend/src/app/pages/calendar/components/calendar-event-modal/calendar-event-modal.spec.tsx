import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { EventModal } from './calendar-event-modal';
import { EltEvent } from '../../../../common/types';

describe('EventModal', () => {
  let onOpenChange: (state: boolean) => void;
  const onSaveMock = jest.fn().mockResolvedValue(undefined);
  const patchEventMock = jest.fn().mockResolvedValue(undefined);

  const mockEvent: EltEvent = {
    id: 100,
    title: 'Mock event',
    start: new Date(Date.now()),
    end:   new Date(Date.now() + 2 * 60 * 60 * 1000),  // 2 hours later
  };

  beforeEach(() => {
    onOpenChange = jest.fn();
    onSaveMock.mockClear();
    patchEventMock.mockClear();
  });

  it('renders correctly when closed', () => {
    const { container } = render(
      <EventModal
        open={false}
        onOpenChange={onOpenChange}
        event={undefined}
        onSave={onSaveMock}
        patchEvent={patchEventMock}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('opens when open is true', () => {
    render(
      <EventModal
        open={true}
        onOpenChange={onOpenChange}
        event={undefined}
        onSave={onSaveMock}
        patchEvent={patchEventMock}
      />
    );
    expect(screen.getByText('Add event')).toBeInTheDocument();
  });

  it('closes when onOpenChange is called with false', () => {
    render(
      <EventModal
        open={true}
        onOpenChange={onOpenChange}
        event={undefined}
        onSave={onSaveMock}
        patchEvent={patchEventMock}
      />
    );
    userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  describe('“Add event” mode (event = undefined)', () => {
    it('shows title "Add event"', () => {
      render(
        <EventModal
          open={true}
          onOpenChange={onOpenChange}
          event={undefined}
          onSave={onSaveMock}
          patchEvent={patchEventMock}
        />
      );
      expect(screen.getByText('Add event')).toBeInTheDocument();
    });

    it('save button is disabled initially', async () => {
      render(
        <EventModal
          open={true}
          onOpenChange={onOpenChange}
          event={undefined}
          onSave={onSaveMock}
          patchEvent={patchEventMock}
        />
      );
      const saveBtn = screen.getByTestId('save-event-btn');
      expect(saveBtn).toBeDisabled();
    });

    it('enables save button when title entered and end > start', async () => {
      render(
        <EventModal
          open={true}
          onOpenChange={onOpenChange}
          event={undefined}
          onSave={onSaveMock}
          patchEvent={patchEventMock}
        />
      );
      const titleInput = screen.getByPlaceholderText('Title');
      await userEvent.type(titleInput, 'New Event Title');
      const saveBtn = screen.getByTestId('save-event-btn');
      expect(saveBtn).toBeEnabled();
    });

    it('calls onSave and onOpenChange(false) when save is clicked', async () => {
      render(
        <EventModal
          open={true}
          onOpenChange={onOpenChange}
          event={undefined}
          onSave={onSaveMock}
          patchEvent={patchEventMock}
        />
      );
      const titleInput = screen.getByPlaceholderText('Title');
      await userEvent.type(titleInput, 'New Event Title');

      const saveBtn = screen.getByTestId('save-event-btn');
      await userEvent.click(saveBtn);

      expect(onSaveMock).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Event Title',
        start: expect.any(Date),
        end:   expect.any(Date),
      }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('“Edit event” mode (event provided)', () => {
    it('shows title "Edit event: Mock event"', () => {
      render(
        <EventModal
          open={true}
          onOpenChange={onOpenChange}
          event={mockEvent}
          onSave={onSaveMock}
          patchEvent={patchEventMock}
        />
      );
      expect(screen.getByText(`Edit event: ${mockEvent.title}`)).toBeInTheDocument();
    });

    it('save button is enabled (given mock event has valid start/end and title)', async () => {
      render(
        <EventModal
          open={true}
          onOpenChange={onOpenChange}
          event={mockEvent}
          onSave={onSaveMock}
          patchEvent={patchEventMock}
        />
      );
      const saveBtn = screen.getByTestId('save-event-btn');
      expect(saveBtn).toBeEnabled();
    });

    it('calls patchEvent with id, updated title, start and end then onOpenChange(false) when save clicked', async () => {
      render(
        <EventModal
          open={true}
          onOpenChange={onOpenChange}
          event={mockEvent}
          onSave={onSaveMock}
          patchEvent={patchEventMock}
        />
      );
      const titleInput = screen.getByPlaceholderText('Title');
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, 'Updated Title');

      const saveBtn = screen.getByTestId('save-event-btn');
      await userEvent.click(saveBtn);

      expect(patchEventMock).toHaveBeenCalledWith(expect.objectContaining({
        id: mockEvent.id,
        title: 'Updated Title',
        start: expect.any(Date),
        end:   expect.any(Date),
      }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
