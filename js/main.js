const IRLMatcher = (() => {
  function initIRLMatcher() {
    document.getElementById('load').addEventListener('click', () => {
      const text = document.getElementById('data').value;
      const parsed = parseData(text);
      console.log(parsed);
    });
  }

  function parseData(data) {
    return data.split('\n').map(r => parseRecord(r));
  }

  function parseRecord(record) {
    return record.split('\t');
  }

  return {
    init: initIRLMatcher
  };
})();

window.addEventListener('DOMContentLoaded', IRLMatcher.init);
