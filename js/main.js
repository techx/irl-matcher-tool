const IRLMatcher = (() => {
  function initIRLMatcher() {
    document.getElementById('data').addEventListener('change', () => {
      // document.getElementById('container').innerHTML = '';
      const text = document.getElementById('data').value;
      const parsed = parseData(text);
      const grouped = groupByAvailability(parsed);
      const days = groupByDay(grouped);
      console.log(days);
      render(days);
    });
  }

  function getIdFromName(name) {
    return name.toLowerCase().replace(/ /g, '-');
  }

  function render(days) {
    const container = document.getElementById('container');
    const colors = [
      '#ffdddd', '#ddffdd', '#ddddff',
      '#ddffff', '#ffddff', '#ffffdd',
      '#eeeeee'
    ];
    let i = 0;
    let first = false;
    for (let day in days) {
      const dayDiv = document.createElement('div');
      i = (i + 1) % colors.length;
      dayDiv.style.background = colors[i];
      dayDiv.style.width = (100.0 / Object.keys(days).length) + '%';
      dayDiv.className = 'day';
      if (!first) {
        dayDiv.className = 'first day';
        first = true;
      } else if (day.startsWith('None')) {
        dayDiv.className = 'last day';
      }

      for (let date in days[day]) {
        const row = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.innerHTML = date;
        const ul = document.createElement('ul');
        days[day][date].forEach(person => {
          const li = document.createElement('li');
          const id = getIdFromName(person);
          li.style.cursor = 'pointer';
          li.className = id;
          li.innerHTML = person;
          li.addEventListener('click', () => {
            Array.from(document.getElementsByClassName(id)).forEach(el => {
              if (el.className.indexOf(' ') !== -1) {
                el.className = el.className.split(' ')[0];
              } else {
                el.className = el.className + ' gray';
              }
            });
          });
          ul.appendChild(li);
        });
        row.appendChild(h4);
        row.appendChild(ul);
        dayDiv.appendChild(row);
      }
      container.appendChild(dayDiv)
    }
  }

  function groupByDay(data) {
    const days = {};
    for (let date in data) {
      const day = date.split(' ').slice(0, 2).join(' ');
      const smallDate = date.split(' ').slice(0, 3).join(' ');
      if (!days.hasOwnProperty(day)) days[day] = {};
      days[day][smallDate] = data[date];
    }
    return days;
  }


  function groupByAvailability(parsed) {
    const slots = {};
    parsed.forEach(r => {
      r.availability.forEach(date => {
        if (!slots.hasOwnProperty(date)) slots[date] = [];

        slots[date].push(r.name);
      });
    });
    return slots;
  }

  function parseData(data) {
    return data.split('\n').slice(1).map(r => parseRecord(r.trim()));
  }

  function parseRecord(record) {
    const components = record.split('\t');
    return {
      name: components[1],
      availability: components[3].split(',').map(a => a.trim())
    };
  }

  return {
    init: initIRLMatcher
  };
})();

window.addEventListener('DOMContentLoaded', IRLMatcher.init);
