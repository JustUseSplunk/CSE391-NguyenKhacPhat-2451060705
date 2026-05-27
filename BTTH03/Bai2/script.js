
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const btnOpenForm = document.getElementById('btnOpenForm');
const btnCancelForm = document.getElementById('btnCancelForm');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const toastNotification = document.getElementById('toastNotification');

const modalTitle = document.getElementById('modalTitle');
const editIndexInput = document.getElementById('editIndex');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescInput = document.getElementById('taskDesc');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskPriorityInput = document.getElementById('taskPriority');


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.isCompleted).length;
    const pending = total - completed;

    document.getElementById('totalTasks').innerText = total;
    document.getElementById('completedTasks').innerText = completed;
    document.getElementById('pendingTasks').innerText = pending;
}

function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-msg">Chưa có công việc nào. Hãy thêm công việc mới!</div>';
        return;
    }

    tasks.forEach((task, index) => {
        const completedClass = task.isCompleted ? 'completed' : '';
        const statusText = task.isCompleted ? 'Hoàn tác' : 'Hoàn thành';
        const priorityClass = `priority-${task.priority.split(' ')[0]}`; // Lấy chữ đầu cho class màu

        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${completedClass}`;
        taskCard.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p>${task.desc}</p>
                <div class="task-meta">
                    Hạn: ${formatDate(task.dueDate)} | 
                    Ưu tiên: <span class="${priorityClass}">${task.priority}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn btn-toggle" onclick="toggleStatus(${index})">${statusText}</button>
                <button class="btn btn-edit" onclick="openEditMode(${index})">Sửa</button>
                <button class="btn btn-delete" onclick="deleteTask(${index})">Xóa</button>
            </div>
        `;
        taskList.appendChild(taskCard);
    });
}

function showMessage(msg) {
    toastNotification.innerText = msg;
    toastNotification.classList.remove('hidden');
    setTimeout(() => {
        toastNotification.classList.add('hidden');
    }, 3000);
}

function resetForm() {
    taskForm.reset();
    editIndexInput.value = '';
    modalTitle.innerText = 'Thêm công việc mới';
}

function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
btnOpenForm.addEventListener('click', () => {
    resetForm();
    taskModal.classList.remove('hidden');
});

btnCancelForm.addEventListener('click', () => {
    taskModal.classList.add('hidden');
    resetForm();
});
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskData = {
        title: taskTitleInput.value.trim(),
        desc: taskDescInput.value.trim(),
        dueDate: taskDueDateInput.value,
        priority: taskPriorityInput.value,
        isCompleted: false 
    };

    const editIndex = editIndexInput.value;

    if (editIndex === '') {
        tasks.push(taskData);
        showMessage('Đã thêm công việc mới!');
    } else {
        const index = parseInt(editIndex);
        taskData.isCompleted = tasks[index].isCompleted; 
        tasks[index] = taskData;
        showMessage('Đã cập nhật công việc!');
    }

    saveTasks();
    renderTasks();
    updateTaskSummary();
    
    taskModal.classList.add('hidden');
    resetForm();
});
window.deleteTask = function(index) {
    if (confirm(`Bạn có chắc chắn muốn xóa công việc "${tasks[index].title}"?`)) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        updateTaskSummary();
        showMessage('Đã xóa công việc!');
    }
};
window.toggleStatus = function(index) {
    tasks[index].isCompleted = !tasks[index].isCompleted;
    saveTasks();
    renderTasks();
    updateTaskSummary();
};
window.openEditMode = function(index) {
    const task = tasks[index];
    
    taskTitleInput.value = task.title;
    taskDescInput.value = task.desc;
    taskDueDateInput.value = task.dueDate;
    taskPriorityInput.value = task.priority;
    editIndexInput.value = index;

    modalTitle.innerText = 'Sửa công việc';
    taskModal.classList.remove('hidden');
};
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateTaskSummary();
});