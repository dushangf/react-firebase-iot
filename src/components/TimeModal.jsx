import React from 'react';
import { FaTimes } from 'react-icons/fa';

const TimeModal = ({
  ac,
  setmodalstatus,
  updateTime,
  settime,
  time,
  change,
}) => {
  const id = change.id;
  const times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  return (
    <div className='bg-black/10 absolute top-0 left-0 w-full h-full flex justify-center items-center z-10'>
      <button
        onClick={() => setmodalstatus(false)}
        className='text-2xl text-red-500 absolute top-10 right-16'
      >
        <FaTimes />
      </button>
      <div className='w-max p-7 bg-black rounded'>
        <h3 className='mb-4'>
          {ac.name} Auto {change.name.split('_')[1].toUpperCase()}
        </h3>
        <div className='h-max'>
          <select
            required
            onChange={(e) => settime(e.target.value)}
            className='border rounded-l p-2 border-green-700 text-gray-500 h-full bg-black text-gray-300'
            type='time'
          >
            <option className='text-gray-600' value=''>
              --Set Time--
            </option>
            {times.map((time, idx) => (
              <option key={idx} value={idx}>
                {time}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setmodalstatus(false);
              updateTime(id, change.name);
            }}
            className='bg-green-600 border border-green-700 text-black p-2 rounded-r'
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeModal;
