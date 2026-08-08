// module-01/log-summary.js
// The day's raw log. Pretend past-you dutifully recorded this. Present-you is skeptical.
const entries = [
  { time: "09:15", category: "deep-work", note: "curriculum review", minutes: 45 },
  { time: "10:00", category: "meeting",   note: "standup",           minutes: 20 },
  { time: "10:30", category: "deep-work", note: "log summarizer",    minutes: 90 },
  { time: "12:00", category: "break",     note: "lunch, allegedly",  minutes: 40 },
  { time: "13:00", category: "admin",     note: "email swamp",       minutes: 35 },
  { time: "14:00", category: "deep-work", note: "log summarizer",    minutes: 75 },
  { time: "15:30", category: "meeting",   note: "1:1",               minutes: 30 },
];

function totalMinutes(entries) {
  let total = 0;
  for (const entry of entries) {
    total += entry.minutes;
  }
  return total;
}
console.log(totalMinutes(entries));

function minutesByCategory(entries) {
  let categoryTotals = {};
  for (const entry of entries) {
    if (!categoryTotals[entry.category]) {
      categoryTotals[entry.category] = entry.minutes;
    }
    else {
      categoryTotals[entry.category] += entry.minutes;
    }
  }
  return categoryTotals;
}
console.log(minutesByCategory(entries));

function longerThan(entries, minutes) {
  return entries.filter(entry => entry.minutes > minutes);
}
console.log(longerThan(entries, 30));

function printSummary(entries) {
  let categoryTotals = minutesByCategory(entries);
  let categoryNames = Object.keys(categoryTotals); 
  for (const category of categoryNames) {
    let categoryCount = entries.filter(entry => entry.category === category).length; 
    console.log(`Total minutes for ${category}: ${categoryTotals[category]}, with ${categoryCount} entries.`);  
  }
    console.log(`Total minutes for all categories: ${totalMinutes(entries)}`);
}

printSummary(entries);