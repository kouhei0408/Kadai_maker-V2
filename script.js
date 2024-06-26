function addSubjectInput() {
  const subjectSettings = document.getElementById('subject-settings');
  const subjectInput = document.createElement('div');
  subjectInput.classList.add('subject-input');
  subjectInput.innerHTML = `
    <label for="subject-name">教科名:</label>
    <input type="text" class="subject-name">
    <label for="pages">ページ数:</label>
    <input type="number" class="pages">
  `;
  subjectSettings.appendChild(subjectInput);
}

function generateTasks() {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const daysOfWeek = document.querySelectorAll('input[name="day"]:checked');
  const subjectInputs = document.querySelectorAll('.subject-input');

  if (startDate === '' || endDate === '' || daysOfWeek.length === 0 || subjectInputs.length === 0) {
    alert('開始日、終了日、曜日、および教科を入力してください。');
    return;
  }

  const taskCalendar = document.getElementById('task-calendar');
  taskCalendar.innerHTML = ''; // Clear previous content

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // Calculate the number of days including end date

  let tasks = [];

  daysOfWeek.forEach(day => {
    const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day.value);
    tasks[dayIndex] = { date: new Date(start), counts: {} }; // Initialize tasks for each selected day
    start.setDate(start.getDate() + 1); // Increment date for each selected day
  });

  subjectInputs.forEach(subjectInput => {
    const subjectName = subjectInput.querySelector('.subject-name').value;
    const pages = parseInt(subjectInput.querySelector('.pages').value);

    if (subjectName !== '' && !isNaN(pages) && pages > 0) {
      tasks.forEach(task => {
        if (task) {
          const dateString = task.date.toDateString();
          if (!task.counts[dateString]) {
            task.counts[dateString] = {};
          }
          task.counts[dateString][subjectName] = pages;
        }
      });
    }
  });

  const calendarGrid = document.createElement('div');
  calendarGrid.classList.add('calendar-grid');

  const headerRow = document.createElement('div');
  headerRow.classList.add('header-row');
  headerRow.textContent = '日付';
  tasks.forEach((task, index) => {
    if (task) {
      const cell = document.createElement('div');
      cell.classList.add('header-cell');
      cell.textContent = ['日', '月', '火', '水', '木', '金', '土'][index];
      headerRow.appendChild(cell);
    }
  });
  calendarGrid.appendChild(headerRow);

  for (let i = 0; i < diffDays; i++) {
    const currentDate = new Date(start.getTime() + (i * 24 * 60 * 60 * 1000));
    const currentDayIndex = currentDate.getDay();

    const row = document.createElement('div');
    row.classList.add('grid-row');
    const dateCell = document.createElement('div');
    dateCell.classList.add('date-cell');
    dateCell.textContent = currentDate.toDateString();
    row.appendChild(dateCell);
    tasks.forEach(task => {
      if (task) {
        const countObj = task.counts[currentDate.toDateString()] || {};
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        let cellContent = '';
        for (const [subject, pages] of Object.entries(countObj)) {
          cellContent += `${subject}: ${pages}ページ `;
        }
        cell.textContent = cellContent.trim();
        row.appendChild(cell);
      }
    });
    calendarGrid.appendChild(row);
  }

  taskCalendar.appendChild(calendarGrid);
}
