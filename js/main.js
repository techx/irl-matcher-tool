const IRLMatcher = (() => {
  function initIRLMatcher() {
    document.getElementById('load').addEventListener('click', () => {
      const text = document.getElementById('data').value;
      const parsed = parseData(text);
      const grouped = groupByAvailability(parsed);
      render(grouped);
    });
  }

  function getIdFromName(name) {
    return name.toLowerCase().replace(/ /g, '-');
  }

  function render(groups) {
    const container = document.getElementById('container');
    for (let date in groups) {
      const row = document.createElement('div');
      const h3 = document.createElement('h3');
      h3.innerHTML = date;
      const ul = document.createElement('ul');
      groups[date].forEach(person => {
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
      row.appendChild(h3);
      row.appendChild(ul);
      container.appendChild(row);
    }
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
    return data.split('\n').map(r => parseRecord(r));
  }

  function parseRecord(record) {
    const components = record.split('\t');
    return {
      name: components[1],
      availability: components[3].split(',')
    };
  }

  return {
    init: initIRLMatcher
  };
})();

window.addEventListener('DOMContentLoaded', IRLMatcher.init);
