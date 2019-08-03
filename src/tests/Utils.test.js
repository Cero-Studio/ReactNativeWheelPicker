import mockdate from "mockdate";
import {
  computeDatePosition,
  getDateFromPosition,
  computeHourPosition,
  getHoursArray
} from "../Utils";

mockdate.set("2019-08-01T02:12:00");

describe("Utils", () => {
  describe(computeDatePosition.name, () => {
    const startDate = new Date();
    test.each`
      date                               | result
      ${new Date("2019-08-04T18:00:00")} | ${3}
      ${new Date()}                      | ${0}
      ${new Date("2019-07-27T18:00:00")} | ${-1}
      ${new Date("2019-09-01T18:00:00")} | ${31}
      ${new Date("2020-08-07T18:00:00")} | ${-1}
    `("returns $result if the date is $date", ({ date, result }) => {
      expect(computeDatePosition(date, startDate, 365)).toEqual(result);
    });
  });

  describe(getDateFromPosition.name, () => {
    const startDate = new Date();
    test.each`
      position | result
      ${3}     | ${new Date("2019-08-04T02:12:00")}
      ${0}     | ${new Date("2019-08-01T02:12:00")}
      ${-1}    | ${new Date("2019-07-31T02:12:00")}
      ${366}   | ${new Date("2020-08-01T02:12:00")}
    `(
      "returns the date $result if the position is $position",
      ({ position, result }) => {
        expect(getDateFromPosition(position, startDate)).toEqual(result);
      }
    );
  });

  describe(computeHourPosition.name, () => {
    const hours = getHoursArray(true);
    const restrictedHours = [16, 17, 18, 19, 20, 21, 22];
    const amPmHours = getHoursArray(false);
    test.each`
      date                               | hours              | hoursText                  | format24 | result
      ${new Date("2019-08-04T18:00:00")} | ${hours}           | ${"with normal hours"}     | ${true}  | ${18}
      ${new Date("2019-08-04T00:00:00")} | ${hours}           | ${"with normal hours"}     | ${true}  | ${0}
      ${new Date("2019-08-04T18:00:00")} | ${hours}           | ${"with AM/PM"}            | ${false} | ${6}
      ${new Date("2019-08-04T05:00:00")} | ${hours}           | ${"with AM/PM"}            | ${false} | ${5}
      ${new Date("2019-08-04T18:00:00")} | ${restrictedHours} | ${"with restricted hours"} | ${true}  | ${2}
      ${new Date("2019-08-04T07:00:00")} | ${restrictedHours} | ${"with restricted hours"} | ${true}  | ${0}
      ${new Date("2019-08-04T07:00:00")} | ${restrictedHours} | ${"with edge case"}        | ${false} | ${0}
      ${new Date("2019-08-04T18:00:00")} | ${restrictedHours} | ${"with edge case"}        | ${false} | ${0}
    `(
      "returns $result if the date is $date $hoursText",
      ({ date, hours, format24, result }) => {
        expect(computeHourPosition(date, hours, format24)).toEqual(result);
      }
    );
  });
});
