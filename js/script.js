document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weeksDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const monthsAbbrev = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
  var date;
  let year, month, prevMonth, nextMonth, today, day, endDayCount, startDay, dayCount, calendarHtml;
  var startDate, endDate;
  
  
  // init
  setCalendar(1, 0, 0, 0);
  // set to today
  document.getElementById("today").addEventListener('click', () => {
    setCalendar(1, 0, 0, 0);
  });
  // set to previous day
  document.getElementById("yesterday").addEventListener('click', () => {
    setCalendar(0, -1, 0, 0);
  });
  // set to next day
  document.getElementById("tommorow").addEventListener('click', () => {
    setCalendar(0, 1, 0, 0);
  });
  // set to previous month
  document.getElementById("previousMonth").addEventListener('click', () => {
    setCalendar(0, 0, -1, 0);
  });
  // set to nect month
  document.getElementById("nextMonth").addEventListener('click', () => {
    setCalendar(0, 0, 1, 0);
  });
  

  // print
  document.getElementById("printBtn").addEventListener('click', () => {
    window.print();
  });
  
    
  function setCalendar(init, dateTransfer, monthTransfer, numDate) {
    if(init) {
      date = new Date();
    }else {
      if(numDate !== 0) {
        dateTransfer = numDate - date.getDate();
      }
      if(monthTransfer) {
        const cmpEndDate = new Date(date.getFullYear(), date.getMonth() + monthTransfer + 1, 0);
        const cmp = cmpEndDate.getDate();
        const now = date.getDate();

        // check if date goes beyong previous or next month's last day
        if(now > cmp) {
            date.setFullYear(date.getFullYear(), date.getMonth() + monthTransfer + 1, 0);
        }else {
          date.setMonth(date.getMonth() + monthTransfer);
        }
      }
      date.setDate(date.getDate() + dateTransfer);
    }
    today = date.getDate();
    day = date.getDay();
    month = date.getMonth();
    prevMonth = (month - 1 + 12) % 12
    nextMonth = (month + 1 + 12) % 12
    year = date.getFullYear()
    startDate = new Date(year, month, 1)
    endDate = new Date(year, month + 1,  0)
    endDayCount = endDate.getDate()
    startDay = startDate.getDay() // day of the first day of month (0~6)
    dayCount = 1
    calendarHtml = ''

    // make start day monday
    if(startDay == 0) {
      startDay = 6;
    }else {
      startDay--;
    }
    
    document.getElementById("year").textContent = year;
    document.getElementById("month-num").textContent = month + 1;
    document.getElementById("month").textContent = months[month];
    document.getElementById("date").textContent = today;
    
    document.getElementById("day").classList.remove("sun", "sat");
    document.getElementById("date").classList.remove("sun", "sat");

    if(day === 0) {
      document.getElementById("day").textContent = weeksDay[6];

      document.getElementById("day").classList.add("sun");
      document.getElementById("date").classList.add("sun");
    }else {
      document.getElementById("day").textContent = weeksDay[day - 1];
      
      if(day == 6) {
        document.getElementById("day").classList.add("sat");
        document.getElementById("date").classList.add("sat");
      }
    }
    
    document.getElementById("prev").textContent = `${prevMonth + 1} ${monthsAbbrev[prevMonth]}`;
    document.getElementById("next").textContent = `${nextMonth + 1} ${monthsAbbrev[nextMonth]}`;
    
    calendarHtml += '<table>'
    
    // create row for day of week
    calendarHtml += '<thead>'
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += '<td>' + weeks[i] + '</td>'
    }
    calendarHtml += '</thead>'
    
    for (let w = 0; w < 6; w++) {
      calendarHtml += '<tr>'
      
      for (let d = 0; d < 7; d++) {
        if (w == 0 && d < startDay) {
          // empty columns before the first day
          calendarHtml += '<td class="empty"></td>'
        } else if (dayCount > endDayCount) {
          // empty columns after the last day
          calendarHtml += '<td></td>'
        } else {
          if(dayCount === today) {
            calendarHtml += '<td class="selectCalendar" id="target">' + dayCount + '</td>'
          }else {
            calendarHtml += '<td class="selectCalendar">' + dayCount + '</td>'
          }
          dayCount++
        }
      }
      calendarHtml += '</tr>'
    }
    calendarHtml += '</table>'
    
    document.querySelector('#info-calendar').innerHTML = calendarHtml

    // set to selected date from top-right calendar
    document.querySelectorAll('.selectCalendar').forEach(function(item, index) {
      item.onclick = function() {
        setCalendar(0, 0, 0, index + 1);
      }
    })
  }
});