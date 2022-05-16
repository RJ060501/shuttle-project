import { useCallback, useEffect, useState } from "react";

import {
  httpGetBookings,
  httpSubmitBooking,
  httpAbortBooking,
} from './requests';

function useBookings(onSuccessSound, onAbortSound, onFailureSound) {
  const [bookings, saveBookings] = useState([]);
  const [isPendingBooking, setPendingBooking] = useState(false);

  const getBookings = useCallback(async () => {
    const fetchedBookings = await httpGetBookings();
    saveBookings(fetchedBookings);
  }, []);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  const submitBooking = useCallback(async (e) => {
    e.preventDefault();
    // setPendingBooking(true);
    const data = new FormData(e.target);
    const bookingDate = new Date(data.get("booking-day"));
    const mission = data.get("mission-name");
    const rider = data.get("rider-name");
    const trail = data.get("trail-selector");
    const response = await httpSubmitBooking({
      bookingDate,
      mission,
      rider,
      trail,
    });

    // TODO: Set success based on response.
    const success = false;
    if (success) {
      getBookings();
      setTimeout(() => {
        setPendingBooking(false);
        onSuccessSound();
      }, 800);
    } else {
      onFailureSound();
    }
  }, [getBookings, onSuccessSound, onFailureSound]);

  const abortBooking = useCallback(async (id) => {
    const response = await httpAbortBooking(id);

    // TODO: Set success based on response.
    const success = false;
    if (success) {
      getBookings();
      onAbortSound();
    } else {
      onFailureSound();
    }
  }, [getBookings, onAbortSound, onFailureSound]);

  return {
    bookings,
    isPendingBooking,
    submitBooking,
    abortBooking,
  };
}

export default useBookings;