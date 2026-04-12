// ============================================================
// HOLLYWOOD ATL — SEED DATA (from Hollywood_ATL_Master_COPY2026.xlsx)
// All dates: March 2026. Excel serial → ISO date.
// Excel time fractions → HH:MM AM/PM
// ============================================================

// ── HELPERS ─────────────────────────────────────────────────
export function excelTimeToStr(frac: number): string {
  if (!frac) return "—";
  const nextDay = frac >= 1;
  const f = frac % 1;
  const totalMins = Math.round(f * 24 * 60);
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12}:${mins.toString().padStart(2, "0")} ${period}${nextDay ? " (+1)" : ""}`;
}

// ── EMPLOYEES (Empolyees sheet + Staffing_Weekly roles) ─────
export const EMPLOYEES = [
  { id: "E01", name: "John",      phone: "",            instagram: "", role: "Bar Manager",      payType: "Salary",  rate: 0,  status: "Active" },
  { id: "E02", name: "Fe",        phone: "",            instagram: "", role: "Barback",           payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E03", name: "Mike",      phone: "",            instagram: "", role: "Barback",           payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E04", name: "Mike",      phone: "",            instagram: "", role: "Barback",           payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E05", name: "Toe",       phone: "",            instagram: "", role: "Barback",           payType: "Hourly",  rate: 15, status: "Active" },
  { id: "E06", name: "Brandy",    phone: "",            instagram: "", role: "Bartender",         payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E07", name: "Nae",       phone: "",            instagram: "", role: "Bartender",         payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E08", name: "Rea",       phone: "",            instagram: "", role: "Bartender",         payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E09", name: "Jasmine A", phone: "",            instagram: "", role: "Bartender",         payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E10", name: "Chantel",   phone: "",            instagram: "", role: "Bartender",         payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E11", name: "Bones",     phone: "",            instagram: "", role: "BoH Manager",       payType: "Hourly",  rate: 22, status: "Active" },
  { id: "E12", name: "Ruby",      phone: "",            instagram: "", role: "FoH Manager",       payType: "Salary",  rate: 0,  status: "Active" },
  { id: "E13", name: "KB",        phone: "",            instagram: "", role: "Hookah",            payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E14", name: "Kaylin",    phone: "",            instagram: "", role: "Hostess",           payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E15", name: "Tay",       phone: "",            instagram: "", role: "Line Cook",         payType: "Hourly",  rate: 0,  status: "Active" },
  { id: "E16", name: "Jazz",      phone: "",            instagram: "", role: "MIT",               payType: "Hourly",  rate: 0,  status: "Training" },
  { id: "E17", name: "Deon",      phone: "",            instagram: "", role: "Security",          payType: "Hourly",  rate: 20, status: "Active" },
  { id: "E18", name: "Pal",       phone: "",            instagram: "", role: "Security",          payType: "Hourly",  rate: 20, status: "Active" },
  { id: "E19", name: "Mac",       phone: "",            instagram: "", role: "SIT",               payType: "Hourly",  rate: 15, status: "Training" },
  { id: "E20", name: "Ashley",    phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
  { id: "E21", name: "Angel",     phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
  { id: "E22", name: "Kay",       phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
  { id: "E23", name: "Mimi",      phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
  { id: "E24", name: "Mexico",    phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
  { id: "E25", name: "Dolly",     phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
  { id: "E26", name: "Nikki",     phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
  { id: "E27", name: "Hunny",     phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
  { id: "E28", name: "Jamaica",   phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
  { id: "E29", name: "Remy",      phone: "",            instagram: "", role: "Waiter/Bottle Girl", payType: "Hourly", rate: 0,  status: "Active" },
];

// ── PROMOTERS ─────────────────────────────────────────────
export const PROMOTERS = [
  { id: "P01", name: "James",  phone: "404-433-3777", instagram: "", dealType: "Door + Bar %", doorPct: 100, barPct: 10, flatFee: 0 },
  { id: "P02", name: "Tim",    phone: "",            instagram: "", dealType: "TBD",            doorPct: 0,   barPct: 0,  flatFee: 0 },
  { id: "P03", name: "Kelly",  phone: "",            instagram: "", dealType: "TBD",            doorPct: 0,   barPct: 0,  flatFee: 0 },
  { id: "P04", name: "Lamont", phone: "",            instagram: "", dealType: "TBD",            doorPct: 0,   barPct: 0,  flatFee: 0 },
  { id: "P05", name: "Rob",    phone: "",            instagram: "", dealType: "TBD",            doorPct: 0,   barPct: 0,  flatFee: 0 },
  { id: "P06", name: "John",   phone: "404-111-3333", instagram: "", dealType: "Door + Bar %", doorPct: 100, barPct: 10, flatFee: 0 },
];

// ── EVENTS (Promoters_Events sheet) ───────────────────────
export const EVENTS = [
  {
    id: "EV01", date: "2026-03-01", theme: "", startTime: "7:00 PM", endTime: "",
    promoterId: "", promoterName: "",
    deals: "High Risk Event — Limited confirmation or weak indicators of attendance.",
    flyerUrl: "", notes: "High Risk", staffRequired: "", status: "Completed",
    revenue: { door: 0, hookah: 55, food: 435, bar: 451, total: 941 },
  },
  {
    id: "EV02", date: "2026-03-02", theme: "", startTime: "", endTime: "",
    promoterId: "", promoterName: "",
    deals: "", flyerUrl: "", notes: "", staffRequired: "", status: "Completed",
    revenue: { door: 0, hookah: 0, food: 0, bar: 0, total: 0 },
  },
  {
    id: "EV03", date: "2026-03-03", theme: "Taco Tuesday", startTime: "2:00 PM", endTime: "9:00 PM",
    promoterId: "P01", promoterName: "James",
    deals: "100% their Door / 10% bar sale", flyerUrl: "", notes: "", staffRequired: "", status: "Active",
    revenue: { door: 1798, hookah: 115, food: 537, bar: 3145.5, total: 5595.5 },
  },
  {
    id: "EV04", date: "2026-03-04", theme: "Day Event", startTime: "3:45 AM", endTime: "",
    promoterId: "P02", promoterName: "Tim",
    deals: "", flyerUrl: "", notes: "", staffRequired: "", status: "Upcoming",
    revenue: { door: 0, hookah: 0, food: 57.5, bar: 0, total: 57.5 },
  },
  {
    id: "EV05", date: "2026-03-05", theme: "Night Event", startTime: "11:30 PM", endTime: "",
    promoterId: "P03", promoterName: "Kelly",
    deals: "", flyerUrl: "", notes: "", staffRequired: "", status: "Upcoming",
    revenue: { door: 0, hookah: 90, food: 102, bar: 133, total: 325 },
  },
  {
    id: "EV06", date: "2026-03-06", theme: "Movie Night", startTime: "10:00 PM", endTime: "",
    promoterId: "P04", promoterName: "Lamont",
    deals: "", flyerUrl: "", notes: "", staffRequired: "", status: "Upcoming",
    revenue: { door: 0, hookah: 90, food: 252.42, bar: 296, total: 638.42 },
  },
  {
    id: "EV07", date: "2026-03-07", theme: "Pretty Girl Playground", startTime: "8:00 PM", endTime: "3:00 AM (+1)",
    promoterId: "P05", promoterName: "Rob",
    deals: "", flyerUrl: "", notes: "", staffRequired: "", status: "Upcoming",
    revenue: { door: 0, hookah: 80, food: 440.44, bar: 865, total: 1385.44 },
  },
  {
    id: "EV08", date: "2026-03-08", theme: "", startTime: "", endTime: "",
    promoterId: "", promoterName: "",
    deals: "", flyerUrl: "", notes: "", staffRequired: "", status: "Upcoming",
    revenue: { door: 0, hookah: 30, food: 138, bar: 361.98, total: 529.98 },
  },
];

// ── FINANCIAL DAILY (Financial_Daily sheet) ───────────────
export const FINANCIAL_DAILY = [
  {
    id: "FD01", date: "2026-03-01", dayOfWeek: "Sunday",
    eventName: "", promoterName: "",
    revDoor: 0, revHookah: 55, revFood: 435, revBar: 451, cashOnHand: 0,
    totalIncome: 941,
    expAds: 0, expBooking: 0, expDJ: 0, expPromoterPay: 0, expBusBoy: 0, expTips: 0, expTax: 79.21,
    totalExpenses: 0, netProfit: 941, profitPct: 1,
  },
  {
    id: "FD02", date: "2026-03-02", dayOfWeek: "Monday",
    eventName: "", promoterName: "",
    revDoor: 0, revHookah: 0, revFood: 0, revBar: 0, cashOnHand: 0,
    totalIncome: 0,
    expAds: 0, expBooking: 0, expDJ: 0, expPromoterPay: 0, expBusBoy: 0, expTips: 0, expTax: 0,
    totalExpenses: 0, netProfit: 0, profitPct: 0,
  },
  {
    id: "FD03", date: "2026-03-03", dayOfWeek: "Tuesday",
    eventName: "Taco Tuesday", promoterName: "James",
    revDoor: 1798, revHookah: 115, revFood: 537, revBar: 3145.5, cashOnHand: 411,
    totalIncome: 5595.5,
    expAds: 0, expBooking: 300, expDJ: 200, expPromoterPay: 0, expBusBoy: 90, expTips: 0, expTax: 7.87,
    totalExpenses: 590, netProfit: 5005.5, profitPct: 0.8946,
  },
  {
    id: "FD04", date: "2026-03-04", dayOfWeek: "Wednesday",
    eventName: "Day Event", promoterName: "Tim",
    revDoor: 0, revHookah: 0, revFood: 57.5, revBar: 0, cashOnHand: 0,
    totalIncome: 57.5,
    expAds: 0, expBooking: 0, expDJ: 0, expPromoterPay: 0, expBusBoy: 0, expTips: 0, expTax: 5.12,
    totalExpenses: 0, netProfit: 57.5, profitPct: 1,
  },
  {
    id: "FD05", date: "2026-03-05", dayOfWeek: "Thursday",
    eventName: "Night Event", promoterName: "Kelly",
    revDoor: 0, revHookah: 90, revFood: 102, revBar: 133, cashOnHand: 0,
    totalIncome: 325,
    expAds: 0, expBooking: 0, expDJ: 0, expPromoterPay: 0, expBusBoy: 0, expTips: 0, expTax: 24.75,
    totalExpenses: 0, netProfit: 325, profitPct: 1,
  },
  {
    id: "FD06", date: "2026-03-06", dayOfWeek: "Friday",
    eventName: "Movie Night", promoterName: "Lamont",
    revDoor: 0, revHookah: 90, revFood: 252.42, revBar: 296, cashOnHand: 0,
    totalIncome: 638.42,
    expAds: 0, expBooking: 0, expDJ: 0, expPromoterPay: 0, expBusBoy: 0, expTips: 0, expTax: 56.86,
    totalExpenses: 0, netProfit: 638.42, profitPct: 1,
  },
  {
    id: "FD07", date: "2026-03-07", dayOfWeek: "Saturday",
    eventName: "Pretty Girl Playground", promoterName: "Rob",
    revDoor: 0, revHookah: 80, revFood: 440.44, revBar: 865, cashOnHand: 0,
    totalIncome: 1385.44,
    expAds: 0, expBooking: 0, expDJ: 0, expPromoterPay: 0, expBusBoy: 0, expTips: 0, expTax: 112.87,
    totalExpenses: 0, netProfit: 1385.44, profitPct: 1,
  },
  {
    id: "FD08", date: "2026-03-08", dayOfWeek: "Sunday",
    eventName: "", promoterName: "",
    revDoor: 0, revHookah: 30, revFood: 138, revBar: 361.98, cashOnHand: 0,
    totalIncome: 529.98,
    expAds: 0, expBooking: 0, expDJ: 0, expPromoterPay: 0, expBusBoy: 0, expTips: 0, expTax: 46.34,
    totalExpenses: 0, netProfit: 529.98, profitPct: 1,
  },
];

// ── WEEKLY FINANCIAL SUMMARY (Financial_Weekly) ───────────
export const FINANCIAL_WEEKLY = [
  {
    weekStart: "2026-03-02", weekEnd: "2026-03-08",
    cashRevenue: 411, barRevenue: 5252.48, hookahRevenue: 460,
    doorRevenue: 1798, foodRevenue: 1962.36,
    totalIncome: 9472.84, laborCost: 1650.50,
    totalExpenses: 2240.50, netProfit: 5581.84,
  },
];

// ── MONTHLY FINANCIAL SUMMARY (Financial_Monthly) ─────────
export const FINANCIAL_MONTHLY = [
  {
    month: "March 2026",
    cashRevenue: 411, barRevenue: 5252.48, hookahRevenue: 460,
    doorRevenue: 1798, foodRevenue: 1962.36,
    totalIncome: 9472.84, totalExpenses: 7841.00,
    totalTax: 333.02, netProfit: 1298.82,
  },
];

// ── PROFIT SHARING (Profit Sharing sheet) ─────────────────
export const PARTNERS = [
  { id: "PT01", name: "Partner 1", pct: 0.67, netProfitShare: 870.21 },
  { id: "PT02", name: "Partner 2", pct: 0.28, netProfitShare: 363.67 },
  { id: "PT03", name: "Partner 3", pct: 0.05, netProfitShare: 64.94  },
];

// ── BOH SCHEDULE (BOH_Scheduling sheet, week of Mar 2–8) ──
export const BOH_SCHEDULE = [
  {
    employeeId: "E11", name: "Bones", role: "BoH Manager", payPerHour: 22,
    shifts: [
      { date: "2026-03-02", start: "", end: "", hours: 0 },
      { date: "2026-03-03", start: "8:00 PM", end: "3:00 AM (+1)", hours: 7.0 },
      { date: "2026-03-04", start: "7:00 PM", end: "1:00 AM (+1)", hours: 5.0 },
      { date: "2026-03-05", start: "7:00 PM", end: "1:30 AM (+1)", hours: 5.5 },
      { date: "2026-03-06", start: "8:00 PM", end: "2:30 AM (+1)", hours: 6.5 },
      { date: "2026-03-07", start: "8:30 PM", end: "3:30 AM (+1)", hours: 7.0 },
      { date: "2026-03-08", start: "4:00 PM", end: "1:00 AM (+1)", hours: 8.0 },
    ],
    totalHours: 39.0, totalPay: 858.00,
  },
  {
    employeeId: "E05", name: "Toe", role: "Barback", payPerHour: 15,
    shifts: [
      { date: "2026-03-02", start: "", end: "", hours: 0 },
      { date: "2026-03-03", start: "10:00 PM", end: "2:00 AM (+1)", hours: 4.0 },
      { date: "2026-03-04", start: "9:00 PM", end: "1:30 AM (+1)", hours: 3.5 },
      { date: "2026-03-05", start: "", end: "", hours: 0 },
      { date: "2026-03-06", start: "", end: "", hours: 0 },
      { date: "2026-03-07", start: "10:00 PM", end: "2:48 AM (+1)", hours: 6.0 },
      { date: "2026-03-08", start: "5:00 PM", end: "1:00 AM (+1)", hours: 7.0 },
    ],
    totalHours: 20.5, totalPay: 307.50,
  },
  {
    employeeId: "E17", name: "Deon", role: "Security", payPerHour: 20,
    shifts: [
      { date: "2026-03-02", start: "", end: "", hours: 0 },
      { date: "2026-03-03", start: "", end: "", hours: 0 },
      { date: "2026-03-04", start: "", end: "", hours: 0 },
      { date: "2026-03-05", start: "", end: "", hours: 0 },
      { date: "2026-03-06", start: "10:00 PM", end: "2:00 AM (+1)", hours: 4.0 },
      { date: "2026-03-07", start: "9:00 PM", end: "3:00 AM (+1)", hours: 6.0 },
      { date: "2026-03-08", start: "", end: "", hours: 0 },
    ],
    totalHours: 10.0, totalPay: 200.00,
  },
  {
    employeeId: "E18", name: "Pal", role: "Security", payPerHour: 20,
    shifts: [
      { date: "2026-03-02", start: "", end: "", hours: 0 },
      { date: "2026-03-03", start: "", end: "", hours: 0 },
      { date: "2026-03-04", start: "", end: "", hours: 0 },
      { date: "2026-03-05", start: "", end: "", hours: 0 },
      { date: "2026-03-06", start: "10:00 PM", end: "2:00 AM (+1)", hours: 4.0 },
      { date: "2026-03-07", start: "10:00 PM", end: "3:00 AM (+1)", hours: 5.0 },
      { date: "2026-03-08", start: "", end: "", hours: 0 },
    ],
    totalHours: 9.0, totalPay: 180.00,
  },
  {
    employeeId: "E19", name: "Mac", role: "SIT", payPerHour: 15,
    shifts: [
      { date: "2026-03-02", start: "", end: "", hours: 0 },
      { date: "2026-03-03", start: "", end: "", hours: 0 },
      { date: "2026-03-04", start: "", end: "", hours: 0 },
      { date: "2026-03-05", start: "", end: "", hours: 0 },
      { date: "2026-03-06", start: "", end: "", hours: 0 },
      { date: "2026-03-07", start: "", end: "", hours: 0 },
      { date: "2026-03-08", start: "5:00 PM", end: "1:00 AM (+1)", hours: 7.0 },
    ],
    totalHours: 7.0, totalPay: 105.00,
  },
];

// ── FOH SCHEDULE (Staffing_Weekly sheet) ──────────────────
export const FOH_SCHEDULE = [
  {
    name: "Rea", role: "Bartender",
    shifts: [
      { date: "2026-03-03", start: "10:00 PM", end: "3:00 AM (+1)" },
      { date: "2026-03-07", start: "11:00 PM", end: "2:30 AM (+1)" },
    ],
  },
  {
    name: "Ashley", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-03", start: "8:00 PM", end: "2:00 AM (+1)" },
      { date: "2026-03-07", start: "9:00 PM", end: "2:30 AM (+1)" },
      { date: "2026-03-08", start: "9:00 PM", end: "1:00 AM (+1)" },
    ],
  },
  {
    name: "Angel", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-03", start: "9:00 PM", end: "3:00 AM (+1)" },
      { date: "2026-03-04", start: "8:00 PM", end: "1:00 AM (+1)" },
      { date: "2026-03-06", start: "9:00 PM", end: "2:00 AM (+1)" },
      { date: "2026-03-07", start: "8:00 PM", end: "1:00 AM (+1)" },
    ],
  },
  {
    name: "Kay", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-05", start: "8:00 PM", end: "1:00 AM (+1)" },
      { date: "2026-03-07", start: "8:00 PM", end: "2:30 AM (+1)" },
      { date: "2026-03-08", start: "7:00 PM", end: "1:00 AM (+1)" },
    ],
  },
  {
    name: "Mimi", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-04", start: "8:00 PM", end: "1:00 AM (+1)" },
      { date: "2026-03-06", start: "9:00 PM", end: "1:00 AM (+1)" },
      { date: "2026-03-08", start: "6:00 PM", end: "1:00 AM (+1)" },
    ],
  },
  {
    name: "Mexico", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-05", start: "8:00 PM", end: "12:00 PM" },
    ],
  },
  {
    name: "Dolly", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-03", start: "9:00 PM", end: "2:00 AM (+1)" },
      { date: "2026-03-06", start: "8:00 PM", end: "11:00 PM" },
    ],
  },
  {
    name: "KB", role: "Hookah",
    shifts: [
      { date: "2026-03-03", start: "10:00 PM", end: "3:00 AM (+1)" },
      { date: "2026-03-08", start: "7:00 PM", end: "1:00 AM (+1)" },
    ],
  },
  {
    name: "Ruby", role: "FoH Manager",
    shifts: [
      { date: "2026-03-03", start: "9:00 PM", end: "3:00 AM (+1)" },
    ],
  },
  {
    name: "Nikki", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-07", start: "9:00 PM", end: "2:30 AM (+1)" },
    ],
  },
  {
    name: "Nae", role: "Bartender",
    shifts: [
      { date: "2026-03-08", start: "5:00 PM", end: "1:00 AM (+1)" },
    ],
  },
  {
    name: "Brandy", role: "Bartender",
    shifts: [
      { date: "2026-03-04", start: "7:00 PM", end: "1:00 AM (+1)" },
    ],
  },
  {
    name: "Hunny", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-06", start: "9:00 PM", end: "2:30 AM (+1)" },
    ],
  },
  {
    name: "Jamaica", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-05", start: "7:00 PM", end: "1:00 AM (+1)" },
    ],
  },
  {
    name: "Remy", role: "Waiter/Bottle Girl",
    shifts: [
      { date: "2026-03-03", start: "8:00 PM", end: "3:00 AM (+1)" },
    ],
  },
];

// ── PENDING DISTRIBUTIONS (Pending_Distribution sheet) ────
export const DISTRIBUTIONS = [
  { id: "D01", name: "Rea",          cashapp: "",  date: "2026-01-28", totalOwed: 114,  totalPaid: 114,  balance: 0,   status: "Settled" },
  { id: "D02", name: "Kay",          cashapp: "",  date: "2026-01-29", totalOwed: 100,  totalPaid: 100,  balance: 0,   status: "Settled" },
  { id: "D03", name: "Dot Com",      cashapp: "",  date: "2026-01-24", totalOwed: 250,  totalPaid: 75,   balance: 175, status: "Outstanding" },
  { id: "D04", name: "Ash",          cashapp: "",  date: "2026-01-29", totalOwed: 142,  totalPaid: 50,   balance: 92,  status: "Outstanding" },
  { id: "D05", name: "Dj Nickes",    cashapp: "",  date: "2026-01-29", totalOwed: 230,  totalPaid: 230,  balance: 0,   status: "Settled" },
  { id: "D06", name: "Angel",        cashapp: "",  date: "2026-01-29", totalOwed: 262,  totalPaid: 262,  balance: 0,   status: "Settled" },
  { id: "D07", name: "KB",           cashapp: "",  date: "2026-01-28", totalOwed: 50,   totalPaid: 50,   balance: 0,   status: "Settled" },
  { id: "D08", name: "DJ Keesh",     cashapp: "",  date: "2026-02-02", totalOwed: 100,  totalPaid: 100,  balance: 0,   status: "Settled" },
  { id: "D09", name: "Shadow",       cashapp: "",  date: "2026-01-30", totalOwed: 162,  totalPaid: 0,    balance: 162, status: "Outstanding" },
  { id: "D10", name: "Casky",        cashapp: "",  date: "",           totalOwed: 150,  totalPaid: 0,    balance: 150, status: "Outstanding" },
  { id: "D11", name: "Angel",        cashapp: "",  date: "2026-02-14", totalOwed: 23,   totalPaid: 9,    balance: 14,  status: "Outstanding" },
  { id: "D12", name: "Bones",        cashapp: "",  date: "2026-02-02", totalOwed: 298,  totalPaid: 298,  balance: 0,   status: "Settled" },
  { id: "D13", name: "dj Outt Space",cashapp: "",  date: "2026-02-09", totalOwed: 150,  totalPaid: 0,    balance: 150, status: "Outstanding" },
  { id: "D14", name: "Nae",          cashapp: "",  date: "2026-02-22", totalOwed: 20,   totalPaid: 0,    balance: 20,  status: "Outstanding" },
  { id: "D15", name: "Angel",        cashapp: "",  date: "2026-03-02", totalOwed: 28,   totalPaid: 0,    balance: 28,  status: "Outstanding" },
];

// ── MONTHLY EXPENSES (Monthly_Expenses sheet) ─────────────
export const EXPENSES = [
  { id: "X01", vendor: "Rent",                    notes: "",                             dueDesc: "Monthly",               amount: 6500,    paid: 0,    balance: 6500,    status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X02", vendor: "GA Power",                notes: "",                             dueDesc: "20th of every month",   amount: 1315.79, paid: 0,    balance: 1315.79, status: "Outstanding", contact: "",   accountNo: "23-3664",  website: "https://customerservice2.southerncompany.com/Billing/Home" },
  { id: "X03", vendor: "Talent / Hookah",         notes: "3 DJs a week at $150",         dueDesc: "Weekly",                amount: 2000,    paid: 0,    balance: 2000,    status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X04", vendor: "Gas",                     notes: "",                             dueDesc: "20th of every month",   amount: 460.51,  paid: 0,    balance: 460.51,  status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X05", vendor: "Trash",                   notes: "",                             dueDesc: "14th of every month",   amount: 336,     paid: 4000, balance: 0,       status: "Outstanding", contact: "",   accountNo: "27774898776332", website: "https://www.republicservices.com/pay-bill" },
  { id: "X06", vendor: "Cake POS",                notes: "",                             dueDesc: "5th of every month",    amount: 473,     paid: 0,    balance: 473,     status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X07", vendor: "VZ (Verizon)",            notes: "",                             dueDesc: "Monthly",               amount: 274,     paid: 0,    balance: 274,     status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X08", vendor: "Easy Ice",                notes: "",                             dueDesc: "15th of every month",   amount: 233,     paid: 0,    balance: 233,     status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X09", vendor: "Otter",                   notes: "",                             dueDesc: "14th of every month",   amount: 188,     paid: 0,    balance: 188,     status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X10", vendor: "Grease Hoods",            notes: "",                             dueDesc: "30th every 60 days",    amount: 300,     paid: 0,    balance: 300,     status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X11", vendor: "Flyers",                  notes: "",                             dueDesc: "Per event",             amount: 375,     paid: 0,    balance: 375,     status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X12", vendor: "Marketing",               notes: "",                             dueDesc: "Monthly",               amount: 150,     paid: 0,    balance: 150,     status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X13", vendor: "Tax — Georgia",           notes: "",                             dueDesc: "20th of every month",   amount: 143.13,  paid: 0,    balance: 143.13,  status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X14", vendor: "Grease Trap / Aplex",     notes: "When Called monthly",          dueDesc: "Monthly",               amount: 115,     paid: 0,    balance: 115,     status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X15", vendor: "Wix",                     notes: "",                             dueDesc: "27th of every month",   amount: 36,      paid: 0,    balance: 36,      status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X16", vendor: "Coke Cola",               notes: "",                             dueDesc: "Monthly",               amount: 45,      paid: 0,    balance: 45,      status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X17", vendor: "Water",                   notes: "",                             dueDesc: "8th of every month",    amount: 13.12,   paid: 0,    balance: 13.12,   status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X18", vendor: "Go Daddy",                notes: "",                             dueDesc: "Annual",                amount: 0,       paid: 0,    balance: 0,       status: "Outstanding", contact: "",   accountNo: "",         website: "" },
  { id: "X19", vendor: "Vestia",                  notes: "",                             dueDesc: "Monthly",               amount: 0,       paid: 0,    balance: 0,       status: "Outstanding", contact: "",   accountNo: "",         website: "" },
];

// ── LEADS (PowerAutomate_Leads sheet — currently empty) ───
export const LEADS: {
  id: string; firstName: string; lastName: string; phone: string;
  email: string; source: string; dateReceived: string; eventType: string; status: string;
}[] = [];

// ── CAKE POS IMPORT SAMPLE (CakePoS_export.xlsx — Jan 17 night) ──
export const CAKE_POS_SAMPLE = {
  reportTitle: "Sales Category",
  restaurant: "Hollywood ATL",
  startDate: "January 17, 2026 03:00 AM",
  endDate: "January 18, 2026 03:00 AM",
  items: [
    { category: "All Drinks", subCategory: "Liquor",          item: "Don Julio Reposado",              qty: 7,  discount: 0, totalSales: 105,   orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Don Julio Repo Bottle",           qty: 1,  discount: 0, totalSales: 100,   orderType: "Dine In",  employee: "Inventory",    register: "Register-4", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Teremana Repo Bottle",            qty: 1,  discount: 0, totalSales: 100,   orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-1", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Teremana Repo Bottle",            qty: 1,  discount: 0, totalSales: 100,   orderType: "Dine In",  employee: "Rea B.",        register: "Register-1", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Teremana Repo Bottle",            qty: 1,  discount: 0, totalSales: 100,   orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Long Island",                     qty: 6,  discount: 0, totalSales: 90,    orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Teremana Repo",                   qty: 6,  discount: 0, totalSales: 79,    orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "Food",       subCategory: "-",               item: "(1) Late Nite - Chicken Wing & Fries", qty: 3, discount: 0, totalSales: 74.97, orderType: "Dine In", employee: "Rea B.", register: "Register-4", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Dussé",                           qty: 4,  discount: 0, totalSales: 64,    orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "Other",      subCategory: "-",               item: "Premium Bowl",                    qty: 1,  discount: 0, totalSales: 55,    orderType: "Dine In",  employee: "Rea B.",        register: "Register-4", zone: "Downstairs" },
    { category: "Other",      subCategory: "-",               item: "Premium Bowl",                    qty: 1,  discount: 0, totalSales: 39.97, orderType: "Dine In",  employee: "SB.",            register: "Register-4", zone: "Upstairs" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Don Julio Reposado",              qty: 2,  discount: 0, totalSales: 38,    orderType: "Dine In",  employee: "Rea B.",        register: "Register-1", zone: "Downstairs" },
    { category: "Food",       subCategory: "-",               item: "Fettucine Alfredro",              qty: 2,  discount: 0, totalSales: 38,    orderType: "Delivery", employee: "Online Order",  register: "Register-2", zone: "No Zone" },
    { category: "Food",       subCategory: "-",               item: "(3) Late Nite - Burger Sliders",  qty: 2,  discount: 0, totalSales: 37.98, orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "Food",       subCategory: "-",               item: "Hollywood Wings & Fries",         qty: 2,  discount: 0, totalSales: 32,    orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Don Julio Reposado",              qty: 2,  discount: 0, totalSales: 30,    orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "BarTop" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Titos",                           qty: 2,  discount: 0, totalSales: 30,    orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Beer",            item: "Modelo",                          qty: 5,  discount: 0, totalSales: 25,    orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "Food",       subCategory: "-",               item: "(1) Late Nite - Chicken Wing & Fries", qty: 1, discount: 0, totalSales: 24.99, orderType: "Dine In", employee: "Jahmela M.", register: "Register-2", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Soft Beverages",  item: "Red Bull",                        qty: 4,  discount: 0, totalSales: 20,    orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "Food",       subCategory: "-",               item: "Fettucine Alfredro",              qty: 1,  discount: 0, totalSales: 19,    orderType: "Dine In",  employee: "Jahmela M.",   register: "Register-2", zone: "No Zone" },
    { category: "All Drinks", subCategory: "Liquor",          item: "Gran Cormino Reposado",           qty: 1,  discount: 0, totalSales: 17,    orderType: "Dine In",  employee: "Rea B.",        register: "Register-3", zone: "Downstairs" },
    { category: "Food",       subCategory: "-",               item: "Hollywood Wings & Fries",         qty: 1,  discount: 0, totalSales: 17,    orderType: "Dine In",  employee: "Rea B.",        register: "Register-1", zone: "Downstairs" },
    { category: "Food",       subCategory: "-",               item: "(8) Late Nite - Fried Shrimp & Fries", qty: 1, discount: 0, totalSales: 15.99, orderType: "Dine In", employee: "Rea B.", register: "Register-1", zone: "Downstairs" },
  ],
};

// ── COMPUTED AGGREGATES ───────────────────────────────────
export const TOTALS = {
  totalIncome: FINANCIAL_MONTHLY[0].totalIncome,
  totalExpenses: FINANCIAL_MONTHLY[0].totalExpenses,
  netProfit: FINANCIAL_MONTHLY[0].netProfit,
  totalTax: FINANCIAL_MONTHLY[0].totalTax,
  laborCost: FINANCIAL_WEEKLY[0].laborCost,
  outstandingDistributions: DISTRIBUTIONS.filter(d => d.status === "Outstanding").reduce((s, d) => s + d.balance, 0),
  totalMonthlyExpenses: EXPENSES.reduce((s, e) => s + e.amount, 0),
  activeEmployees: EMPLOYEES.filter(e => e.status === "Active").length,
  totalEmployees: EMPLOYEES.length,
  upcomingEvents: EVENTS.filter(e => e.status === "Upcoming").length,
};
