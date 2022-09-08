var moment = require("moment");

var needsSlack = false;
var weeksNeeded = {
  weds: [],
  thurs: [],
};
var todayDate = moment().format("dddd YYYY-MM-DD");
var currentDayOfWeek = moment().day();

if (currentDayOfWeek === 5) needsSlack = true;

switch (moment().month()) {
  case 6:
    weeksNeeded.thurs.push(4);
    break;
  case 7:
    weeksNeeded.weds.push(...[1, 3, 5]);
    weeksNeeded.thurs.push(...[2, 4]);
    break;
  case 8:
    weeksNeeded.thurs.push(...[2, 4]);
    weeksNeeded.weds.push(...[2, 4]);
    break;
  case 9:
    weeksNeeded.thurs.push(...[1, 3]);
    weeksNeeded.weds.push(...[2, 4]);
    break;
  case 10:
    weeksNeeded.thurs.push([1, 3]);
    weeksNeeded.weds.push([2, 4]);
    break;
  case 11:
    weeksNeeded.thurs.push(...[1, 3, 5]);
    weeksNeeded.weds.push(...[1, 3]);
    break;
}

var days = {
  Mon: 1,
  Tue: 2,
  weds: 3,
  thurs: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

var nthDayOfMonth = (monthMoment, day, weekNumber) => {
  let m = monthMoment.clone().startOf("month").day(day);
  if (m.month() !== monthMoment.month()) m.add(7, "d");
  return m.add(7 * (weekNumber - 1), "d").format("dddd YYYY-MM-DD");
};

for (let key in weeksNeeded) {
  weeksNeeded[key].map((weekNum) => {
    if (todayDate === nthDayOfMonth(moment(), days[key], weekNum))
      needsSlack = true;
  });
}

var kme = Application("Keyboard Maestro Engine");

if (needsSlack) {
  return kme.setvariable("standupFormat", { to: "slack" });
  // return console.log("slack");
}
return kme.setvariable("standupFormat", { to: "zoom" });
// return console.log("zoom");
