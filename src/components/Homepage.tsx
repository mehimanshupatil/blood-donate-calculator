import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import * as styles from './Homepage.module.scss';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import enLocale from 'date-fns/locale/en-IN';
import DatePicker from '@mui/lab/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import classNames from 'classnames/bind';
import dayjs from 'dayjs'; // @ts-ignore
import logo from '../images/icon.png';

export const Homepage = () => {
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);
  const [gender, setGender] = React.useState<'male' | 'female' | null>(null);
  const [newDate, setNewDate] = React.useState<dayjs.Dayjs | null>(null);
  const [isFuture, setIsFuture] = React.useState<boolean | null>(null);

  const clear = () => {
    setDate(null);
    setGender(null);
    setNewDate(null);
    setIsFuture(null);
  };

  const submit = () => {
    const monthToAdd = gender === 'male' ? 3 : 4;
    const _date = date?.add(monthToAdd, 'month');
    if (!_date) return;
    setNewDate(_date);
    setIsFuture(dayjs().isAfter(_date));
    setTimeout(() => {
      window.scroll({ behavior: 'smooth', top: document.body.scrollHeight });
    }, 0);
  };

  const sendNotify = async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    console.log(`reg`, reg);
    if (!reg) return;
    Notification.requestPermission().then((permission) => {
      if (permission !== 'granted') {
        alert('you need to allow push notifications');
      } else {
        const timestamp = new Date().getTime() + 20000; // now plus 5000ms
        reg.showNotification('Demo Push Notification', {
          tag: timestamp.toString(), // a unique ID
          body: 'horray', // content of the push notification
          timestamp: timestamp, // set the time for the push notification
          data: {
            url: window.location.href, // pass the current url to the notification
          },
          badge: logo,
          icon: logo,
        });
      }
    });
  };

  return (
    <main>
      <StaticImage className={styles.logo} src='../images/icon.png' alt='logo' />
      <div>
        <h3>Enter date of previous donation</h3>
        <LocalizationProvider dateAdapter={DateAdapter} locale={enLocale}>
          <DatePicker
            label='MM/DD/YYYY'
            disableFuture
            value={date}
            minDate={dayjs().subtract(6, 'month')}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.genderContainer}>
        <div className={styles.genderLabel}>Gender</div>
        <RadioGroup
          value={gender}
          onChange={(e) => setGender(e.target.value as 'male' | 'female')}
          row
          aria-label='gender'
          name='row-radio-buttons-group'
        >
          <FormControlLabel value='female' control={<Radio />} label='Female' />
          <FormControlLabel value='male' control={<Radio />} label='Male' />
        </RadioGroup>
      </div>
      <div className={styles.btnContainer}>
        <Button variant='outlined' className={styles.clearbtn} onClick={clear}>
          clear
        </Button>
        <Button
          disabled={!gender || !date}
          variant='contained'
          className={styles.submitbtn}
          onClick={submit}
        >
          Calculate next date
        </Button>
      </div>
      <Grow
        in={Boolean(newDate)}
        style={{ transformOrigin: '0 0 0' }}
        {...(newDate ? { timeout: 1000 } : {})}
        className={styles.resultContainer}
      >
        <div>
          {newDate && (
            <>
              <div
                className={classNames(
                  styles.commonResult,
                  isFuture ? styles.success : styles.error
                )}
              >
                {isFuture
                  ? `You are Safe to Donate Blood after ${newDate.format(
                      'DD MMM YYYY'
                    )} as your body has replenish blood.*`
                  : `Oops! your body is replenishing blood, you are safe to donate blood after ${newDate.format(
                      'DD MMM YYYY'
                    )}.*`}
              </div>
              <div className={styles.moreInfo}>
                * as per{' '}
                <a href='https://www.mohfw.gov.in/' target='_blank'>
                  MoHFW
                </a>{' '}
                Men can donate whole blood safely once in every three months while women can donate
                every four months.{' '}
                <a href='http://nbtc.naco.gov.in/page/eligibility/' target='_blank'>
                  more info
                </a>
              </div>
              {isFuture && (
                <Button variant='contained' onClick={sendNotify} className={styles.remainderBtn}>
                  send remainder or{' '}
                </Button>
              )}
            </>
          )}
        </div>
      </Grow>
    </main>
  );
};
