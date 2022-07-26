import React from 'react';
import { FaTimes } from 'react-icons/fa';

const FrequencyModal = ({
  updateFrequency,
  setfrequency_modal,
  setfrequency,
}) => {
  return (
    <div className='bg-black/25 absolute top-0 left-0 w-full h-full flex justify-center items-center z-10'>
      <button
        onClick={() => setfrequency_modal(false)}
        className='text-2xl text-red-500 absolute top-10 right-16'
      >
        <FaTimes />
      </button>
      <div className='bg-black p-6'>
        <input
          className='border rounded-l p-2 border-green-700 text-gray-500 h-full bg-black text-gray-300 w-20'
          onChange={(e) => setfrequency(e.target.value)}
          type='number'
        />
        <button
          onClick={() => {
            updateFrequency();
            setfrequency_modal(false);
          }}
          className='bg-green-600 border border-green-700 text-black p-2 rounded-r'
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default FrequencyModal;
