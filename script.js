function generateTasks() {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const daysOfWeek = document.querySelectorAll('input[name="day"]:checked');

  if (startDate === '' || endDate === '' || daysOfWeek.length === 0) {
    alert('開始日、終了日、および曜日を選択してください。');
    return;
  }

  const taskCalendar = document.getElementById('task-calendar');
  taskCalendar.innerHTML = ''; // Clear previous content

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calculate the number of days

  let tasks = [];
  let currentDay = start.getDay(); // Starting day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)

  daysOfWeek.forEach(day => {
    const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day.value);
    tasks[dayIndex] = { count: 0 }; // Initialize tasks for each selected day
  });

  for (let i = 0; i < diffDays; i++) {
    const currentDate = new Date(start.getTime() + (i * 24 * 60 * 60 * 1000));
    const currentDayIndex = currentDate.getDay();

    if (tasks[currentDayIndex]) {
      tasks[currentDayIndex].count++;
    }
  }

  const taskList = document.createElement('ul');
  tasks.forEach((task, index) => {
    if (task) {
      const listItem = document.createElement('li');
      listItem.textContent = `${['日', '月', '火', '水', '木', '金', '土'][index]}曜日: ${task.count}件`;
      taskList.appendChild(listItem);
    }
  });

  taskCalendar.appendChild(taskList);
}
