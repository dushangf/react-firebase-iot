import React, { useState, useEffect } from 'react';
import { set, ref, onValue } from 'firebase/database';
import db from './config/db';
import logo from './images/keellslogo.png';
import Switch from 'react-switch';
import TimeModal from './components/TimeModal';
import FrequencyModal from './components/FrequencyModal';

const App = () => {
  const outlet_name = 'Gampaha';
  const [ac_list, setac_list] = useState({});
  const [time_modalstatus, settime_modalstatus] = useState(false);
  const [current_ac, setcurrent_ac] = useState({});
  const [change, setchange] = useState('');
  const [time, settime] = useState('');
  const [temperatures, settemperatures] = useState([]);
  const [ir_frequency, setir_frequency] = useState(0);
  const [temp_frequency, settemp_frequency] = useState(0);
  const [ir_frequency_modal, setir_frequency_modal] = useState(false);
  const [temp_frequency_modal, settemp_frequency_modal] = useState(false);

  const getOutletData = async () => {
    const dbRef = ref(db, '/Gampaha');
    onValue(dbRef, (snapshot) => {
      console.log(snapshot.val());
      setac_list(snapshot.val().ac_list);
      settemperatures(snapshot.val().temperatures);
      setir_frequency(snapshot.val().ir_signal_frequency);
      settemp_frequency(snapshot.val().temperature_signal_frequency);
    });
  };

  useEffect(() => {
    getOutletData();
  }, []);

  const triggerSwitch = (id, status, man_on, man_off) => {
    const manual_data = {
      status: status,
      man_on: man_on,
      man_off: man_off,
    };
    const dbRef = ref(db, `Gampaha/ac_list/ac_${id}/manual`);
    set(dbRef, manual_data);
  };

  const updateTime = (id, prop) => {
    const dbRef = ref(db, `Gampaha/ac_list/ac_${id}/${prop}`);
    set(dbRef, time);
  };

  const updateFrequencyIR = () => {
    const dbRef = ref(db, `Gampaha/ir_signal_frequency`);
    set(dbRef, ir_frequency);
  };

  const updateFrequencyTemp = () => {
    const dbRef = ref(db, `Gampaha/temperature_signal_frequency`);
    set(dbRef, ir_frequency);
  };

  const changeTemperature = (id, temp) => {
    if (temp > 26 || temp < 20) {
      return;
    }
    const dbRef = ref(db, `Gampaha/ac_list/ac_${id}/web_temperature`);
    set(dbRef, temp);
  };

  return (
    <div className='w-full bg-green-500 min-h-screen h-max pb-6'>
      <div className='bg-black text-gray-500 h-max px-4 sm:px-10 flex items-center py-1'>
        <img className='h-14 sm:h-20' src={logo} alt='' />
        <h1 className='sm:text-2xl text-lg font-bold text-white sm:px-10 text-center px-2'>
          Smart AC Controlling System
        </h1>
      </div>
      <div className='flex flex-col items-center sm:px-16 py-5'>
        <div className='w-full sm:flex sm:flex-row flex-col sm:items-center wd-gray-500 px-1'>
          <h1 className='text-xl font-bold bg-green-200 px-2 py-1 rounded shadow-xl sm:mr-5 w-max'>
            Outlet - {outlet_name}
          </h1>
          <div className='flex py-4 font-semibold sm:w-2/3 text-xs sm:text-base text-center w-full'>
            {Object.values(temperatures).map((temperature, idx) => (
              <div
                className='min-w-max mr-2 bg-green-200 rounded px-2 py-1 sm:px-2 sm:flex items-center'
                key={idx}
              >
                <p className='sm:mr-1'>Temperature {idx + 1}: </p>
                <p>{Number(temperature).toFixed(1)}°C</p>
              </div>
            ))}
            <div
              className='max-w-max bg-green-200 rounded px-2 py-1 sm:px-2 sm:flex items-center cursor-pointer transition duration-150 hover:ease-out hover:bg-green-300 hover:scale-105 mx-2 w-64'
              onClick={() => setir_frequency_modal(true)}
            >
              <p className='sm:mr-1'>IR Signal Frequency: </p>
              <p>{ir_frequency} mins</p>
            </div>
            <div
              className='max-w-max bg-green-200 rounded px-2 py-1 sm:px-2 sm:flex items-center cursor-pointer transition duration-150 hover:ease-out hover:bg-green-300 hover:scale-105 mx-2 w-64'
              onClick={() => settemp_frequency_modal(true)}
            >
              <p className='sm:mr-1'>Temperature Signal Frequency: </p>
              <p>{temp_frequency} mins</p>
            </div>
            {ir_frequency_modal && (
              <FrequencyModal
                setfrequency_modal={setir_frequency_modal}
                setfrequency={setir_frequency}
                updateFrequency={updateFrequencyIR}
              />
            )}
            {temp_frequency_modal && (
              <FrequencyModal
                setfrequency_modal={settemp_frequency_modal}
                setfrequency={settemp_frequency}
                updateFrequency={updateFrequencyTemp}
              />
            )}
          </div>
        </div>
        <div className='w-full'>
          <div className='flex justify-around bg-black rounded m-1 p-2 font-bold text-center bg-black text-gray-300'>
            <p className='w-full flex flex-col sm:flex-row justify-center items-center'>
              <span className='sm:mx-1'>AC</span>
              <span className='sm:mx-1'>No</span>
            </p>
            <p className='w-screen'>Switch</p>
            <p className='w-full px-1 sm:px-0'>Temperature</p>
            <p className='w-full px-1 sm:px-0'>Auto ON</p>
            <p className='w-full px-1 sm:px-0'>Auto OFF</p>
            <p className='w-full px-1 sm:px-0'>Manual ON</p>
            <p className='w-full px-1 sm:px-0'>Manual OFF</p>
          </div>
          {Object.values(ac_list).map((ac, idx) => {
            return (
              <div
                className='flex justify-around bg-black rounded-md m-1 p-2 items-center text-center bg-black text-gray-300 shadow-xl'
                key={idx}
              >
                {time_modalstatus && (
                  <TimeModal
                    ac={current_ac}
                    setmodalstatus={settime_modalstatus}
                    updateTime={updateTime}
                    settime={settime}
                    time={time}
                    change={change}
                  />
                )}
                <p className='font-semibold w-max text-center text-sm w-14 text-left px-1'>
                  {ac.name.toUpperCase()}
                </p>
                <div className='sm:w-24'>
                  <Switch
                    checked={
                      Number(ac.manual.status) === 1 ||
                      Number(ac.manual.status) === 2
                        ? true
                        : false
                    }
                    onChange={() => {
                      const date = new Date();
                      const time = `${
                        date.getHours() < 10
                          ? '0' + String(date.getHours())
                          : date.getHours()
                      }:${
                        date.getMinutes() < 10
                          ? '0' + String(date.getMinutes())
                          : date.getMinutes()
                      }`;
                      const id = idx;
                      const status =
                        Number(ac.manual.status) === 1 ||
                        Number(ac.manual.status) === 2
                          ? 0
                          : 1;
                      const man_on = status ? time : ac.manual.man_on;
                      const man_off = !status ? time : ac.manual.man_off;
                      triggerSwitch(id, status, man_on, man_off);
                    }}
                    handleDiameter={18}
                    width={30}
                    height={15}
                    checkedIcon={false}
                    uncheckedIcon={false}
                  />
                </div>
                <div className='flex'>
                  <button
                    onClick={() =>
                      changeTemperature(idx, ac.web_temperature + 2)
                    }
                    className='px-1 w-6 flex justify-center items-center hover:bg-white/25 duration-200 rounded border border-white'
                  >
                    +
                  </button>
                  <p className='px-3'>{ac.web_temperature}</p>
                  <button
                    onClick={() =>
                      changeTemperature(idx, ac.web_temperature - 2)
                    }
                    className='px-1 w-6 flex justify-center items-center hover:bg-white/25 duration-200 rounded border border-white'
                  >
                    -
                  </button>
                </div>
                <p
                  className='font-semibold hover:bg-green-400 px-2 rounded-full cursor-pointer transition duration-150 hover:ease-out hover:text-black'
                  onClick={() => {
                    setchange({ id: idx, name: 'auto_on' });
                    setcurrent_ac(ac);
                    settime_modalstatus(true);
                  }}
                >
                  {ac.auto_on.length === 1
                    ? `0${ac.auto_on}:00`
                    : `${ac.auto_on}:00`}
                </p>
                <p
                  className='font-semibold hover:bg-green-400 px-2 rounded-full cursor-pointer transition duration-150 hover:ease-out hover:text-black'
                  onClick={() => {
                    setchange({ id: idx, name: 'auto_off' });
                    setcurrent_ac(ac);
                    settime_modalstatus(true);
                  }}
                >
                  {ac.auto_off.length === 1
                    ? `0${ac.auto_off}:00`
                    : `${ac.auto_off}:00`}
                </p>
                <p className='font-semibold px-3'>{ac.manual.man_on}</p>
                <p className='font-semibold px-3'>{ac.manual.man_off}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
