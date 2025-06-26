
'use server';

import ICAL from 'node-ical';
import { z } from 'zod';

const InputSchema = z.string().url();

export type BookedDateRangeStrings = { from: string; to: string };

export async function getBookedDates(icsUrl: string): Promise<BookedDateRangeStrings[]> {
  const validatedUrl = InputSchema.safeParse(icsUrl);
  if (!validatedUrl.success) {
    console.error('Invalid URL for getBookedDates:', validatedUrl.error);
    return [];
  }

  try {
    // Use node-ical's async/await functionality to fetch and parse the URL
    const events = await ICAL.async.fromURL(validatedUrl.data);
    const bookedRanges: BookedDateRangeStrings[] = [];

    for (const event of Object.values(events)) {
      if (event.type === 'VEVENT' && event.start && event.end) {
        // DTEND in iCal is exclusive. For react-day-picker, the range is inclusive.
        // We subtract one day from the end date to make it inclusive for the calendar.
        const endDate = new Date(event.end.getTime());
        endDate.setDate(endDate.getDate() - 1);

        // Return ISO strings for safe serialization across the server/client boundary
        bookedRanges.push({ from: event.start.toISOString(), to: endDate.toISOString() });
      }
    }
    return bookedRanges;
  } catch (error) {
    // Log the error for debugging, but return an empty array to the client
    // to prevent the app from crashing.
    console.error(`Failed to fetch or parse ICS from ${validatedUrl.data}`, error);
    return [];
  }
}
