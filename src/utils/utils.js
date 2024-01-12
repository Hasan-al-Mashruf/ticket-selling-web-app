export const couchNumber = [
  {
    sit: "a1",
    isBooked: false,
  },
  {
    sit: "a2",
    isBooked: false,
  },
  {
    sit: "a3",
    isBooked: false,
  },
  {
    sit: "a4",
    isBooked: false,
  },
  {
    sit: "b1",
    isBooked: false,
  },
  {
    sit: "b2",
    isBooked: false,
  },
  {
    sit: "b3",
    isBooked: false,
  },
  {
    sit: "b4",
    isBooked: false,
  },
  {
    sit: "c1",
    isBooked: false,
  },
  {
    sit: "c2",
    isBooked: true,
  },
  {
    sit: "c3",
    isBooked: false,
  },
  {
    sit: "c4",
    isBooked: false,
  },
  {
    sit: "d1",
    isBooked: false,
  },
  {
    sit: "d2",
    isBooked: false,
  },
  {
    sit: "d3",
    isBooked: false,
  },
  {
    sit: "d4",
    isBooked: false,
  },
  {
    sit: "e1",
    isBooked: false,
  },
  {
    sit: "e2",
    isBooked: true,
  },
  {
    sit: "e3",
    isBooked: false,
  },
  {
    sit: "e4",
    isBooked: false,
  },
  {
    sit: "f1",
    isBooked: false,
  },
  {
    sit: "f2",
    isBooked: false,
  },
  {
    sit: "f3",
    isBooked: false,
  },
  {
    sit: "f4",
    isBooked: true,
  },
  {
    sit: "g1",
    isBooked: false,
  },
  {
    sit: "g2",
    isBooked: false,
  },
  {
    sit: "g3",
    isBooked: false,
  },
  {
    sit: "g4",
    isBooked: true,
  },
];
export const locations = [
  { value: "Dhaka", label: "Dhaka" },
  { value: "Khulna", label: "Khulna" },
  { value: "Jessore", label: "Jessore" },
  { value: "Magura", label: "Magura" },
  { value: "Gopalgonj", label: "Gopalgonj" },
  { value: "Satkhira", label: "Satkhira" },
  { value: "Benapole", label: "Benapole" },
  { value: "Chittagong", label: "Chittagong" },
  { value: "Cox's Bazar", label: "Cox's Bazar" },
  { value: "Narayangonj", label: "Narayangonj" },
  { value: "Narail", label: "Narail" },
  { value: "Barishal", label: "Barishal" },
  { value: "Sylhet", label: "Sylhet" },
];

export const timePeriodOptions = [
  { value: "05:00AM - 11:59AM", label: "Morning (05:00AM-11:59AM)" },
  { value: "12:00PM - 05:59PM", label: "Afternoon (12:00PM-05:59PM)" },
  { value: "06:00PM - 11:59PM", label: "Night (06:00PM-11:59PM)" },
];

export const coachTypeOptions = [
  { value: "AC", label: "AC" },
  { value: "Non AC", label: "Non AC" },
];

export const isDateInCurrentMonth = (date) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison
  const fiveDaysLater = new Date(currentDate);
  fiveDaysLater.setDate(currentDate.getDate() + 5);
  return date >= currentDate && date <= fiveDaysLater;
};

// it will convert internatuonal time to 12 hour standard time
export function convertTo24HourFormat(time12, meridiem) {
  let [hours, minutes] = time12.split(":").map(Number);

  // Convert to 24-hour format
  if (meridiem.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  } else if (meridiem.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  // Ensure hours and minutes are two digits
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

// it will convert 12 hour standard time to internatuonal time
export function getReportingTimeFromInternationalStandard(internationalTime) {
  const [hours, minutes] = internationalTime.split(":").map(Number);

  let reportingHours = hours - 1;
  let reportingMeridiem = "PM"; // Default to PM

  if (reportingHours === 0 || reportingHours < 12) {
    reportingMeridiem = "AM";
  }

  reportingHours = reportingHours % 12 || 12;
  const reportingTime = `${reportingHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${reportingMeridiem}`;
  return reportingTime;
}

export const busSit = [
  {
    sit: "a1",
    isBooked: false,
  },
  {
    sit: "a2",
    isBooked: false,
  },
  {
    sit: "a3",
    isBooked: false,
  },
  {
    sit: "a4",
    isBooked: false,
  },
  {
    sit: "b1",
    isBooked: false,
  },
  {
    sit: "b2",
    isBooked: false,
  },
  {
    sit: "b3",
    isBooked: false,
  },
  {
    sit: "b4",
    isBooked: false,
  },
  {
    sit: "c1",
    isBooked: false,
  },
  {
    sit: "c2",
    isBooked: false,
  },
  {
    sit: "c3",
    isBooked: false,
  },
  {
    sit: "c4",
    isBooked: false,
  },
  {
    sit: "d1",
    isBooked: false,
  },
  {
    sit: "d2",
    isBooked: false,
  },
  {
    sit: "d3",
    isBooked: false,
  },
  {
    sit: "d4",
    isBooked: false,
  },
  {
    sit: "e1",
    isBooked: false,
  },
  {
    sit: "e2",
    isBooked: false,
  },
  {
    sit: "e3",
    isBooked: false,
  },
  {
    sit: "e4",
    isBooked: false,
  },
  {
    sit: "f1",
    isBooked: false,
  },
  {
    sit: "f2",
    isBooked: false,
  },
  {
    sit: "f3",
    isBooked: false,
  },
  {
    sit: "f4",
    isBooked: false,
  },
  {
    sit: "g1",
    isBooked: false,
  },
  {
    sit: "g2",
    isBooked: false,
  },
  {
    sit: "g3",
    isBooked: false,
  },
  {
    sit: "g4",
    isBooked: false,
  },
  {
    sit: "h1",
    isBooked: false,
  },
  {
    sit: "h2",
    isBooked: false,
  },
  {
    sit: "h3",
    isBooked: false,
  },
  {
    sit: "h4",
    isBooked: false,
  },
  {
    sit: "i1",
    isBooked: false,
  },
  {
    sit: "i2",
    isBooked: false,
  },
  {
    sit: "i3",
    isBooked: false,
  },
  {
    sit: "i4",
    isBooked: false,
  },
  {
    sit: "j1",
    isBooked: false,
  },
  {
    sit: "j2",
    isBooked: false,
  },
  {
    sit: "j3",
    isBooked: false,
  },
  {
    sit: "j4",
    isBooked: false,
  },
];

export const showDetailsData = (id) => {
  return id;
};
