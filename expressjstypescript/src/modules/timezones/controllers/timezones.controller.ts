// we import express to add types to the request/response objects from our controller functions
import express from 'express';
// we import our newly created user services
import timezonesService from '../services/timezones.service';
// we import the argon2 library for password hashing
import argon2 from 'argon2';
// we use debug with a custom context as described in Part 1
import debug from 'debug';
import {LocationWithTimezone} from "../models/LocationWithTimezone";

// import { PatchUserDto } from '../dto/patch.user.dto';

const log: debug.IDebugger = debug('app:timezones-controller');

let locations: LocationWithTimezone[] = [
  {
    location: 'Germany',
    timezoneName: 'Central European Time',
    timezoneAbbr: 'CET',
    utcOffset: 1
  },
  {
    location: 'China',
    timezoneName: 'China Standard Time',
    timezoneAbbr: 'CST',
    utcOffset: 8
  },
  {
    location: 'Argentina',
    timezoneName: 'Argentina Time',
    timezoneAbbr: 'ART',
    utcOffset: -3
  },
  {
    location: 'Japan',
    timezoneName: 'Japan Standard Time',
    timezoneAbbr: 'JST',
    utcOffset: 9
  }
];

class TimezonesController {

  async listTimezones(req: express.Request, res: express.Response) {
    // const locations = await timezonesService.list(100,0);
    // res.status(200).send(locations);
    // res.status(200).json([
    res.status(200).send([
      {
        location: 'Germany',
        timezoneName: 'Central European Time',
        timezoneAbbr: 'CET',
        utcOffset: 1
      },
      {
        location: 'China',
        timezoneName: 'China Standard Time',
        timezoneAbbr: 'CST',
        utcOffset: 8
      },
      {
        location: 'Argentina',
        timezoneName: 'Argentina Time',
        timezoneAbbr: 'ART',
        utcOffset: -3
      },
      {
        location: 'Japan',
        timezoneName: 'Japan Standard Time',
        timezoneAbbr: 'JST',
        utcOffset: 9
      }
    ]);
  }

  listTimezones2(req: express.Request, res: express.Response) {
    // const locations = await timezonesService.list(100,0);
    // res.status(200).send(locations);
    // res.status(200).json([
    res.status(200).send([
      {
        location: 'Germany',
        timezoneName: 'Central European Time',
        timezoneAbbr: 'CET',
        utcOffset: 1
      },
      {
        location: 'China',
        timezoneName: 'China Standard Time',
        timezoneAbbr: 'CST',
        utcOffset: 8
      },
      {
        location: 'Argentina',
        timezoneName: 'Argentina Time',
        timezoneAbbr: 'ART',
        utcOffset: -3
      },
      {
        location: 'Japan',
        timezoneName: 'Japan Standard Time',
        timezoneAbbr: 'JST',
        utcOffset: 9
      }
    ]);
  }

}

export default new TimezonesController();
