import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./DateTimePicker.scss";

type DateTimePickerProps = {
  onChange: (date: Date) => void;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onChange: (selectedDates: Date[]) => {
        onChange(selectedDates[0]);
      },
    };


    if (inputRef.current) {
      flatpickr(inputRef.current, options);
    }

    return () => {
      if (inputRef.current) {
        const flatpickrInstance = (inputRef.current as any)._flatpickr;
        if (flatpickrInstance) {
          flatpickrInstance.destroy();
        }
      }
    };
  }, [onChange]);

  return (
    <div className="baseInput">
    <label>Due Date</label>
    <input
      ref={inputRef}
      className="flatpickr-input"
      type="text"
      placeholder="Select Date"
    />
    </div>
  );
};

export default DateTimePicker;
