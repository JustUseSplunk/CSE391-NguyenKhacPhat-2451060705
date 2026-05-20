
let students = JSON.parse(localStorage.getItem('students')) || [];

const btnOpenForm = document.getElementById('btnOpenForm'); 
const btnCancelForm = document.getElementById('btnCancelForm');
const formModal = document.getElementById('formModal');
const studentForm = document.getElementById('studentForm'); 
const studentTableBody = document.getElementById('studentTableBody');
const toastNotification = document.getElementById('toastNotification');

const modalTitle = document.getElementById('modalTitle');
const btnSubmitForm = document.getElementById('btnSubmitForm');
const editIndexInput = document.getElementById('editIndex');
const studentIdInput = document.getElementById('studentId');
const fullNameInput = document.getElementById('fullName');
const dobInput = document.getElementById('dob');
const classNameInput = document.getElementById('className');
const avgGradeInput = document.getElementById('avgGrade');
const emailInput = document.getElementById('email');
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}
function updateStatistics() {
    const total = students.length; 
    let average = 0;

    if (total > 0) {
        const totalSum = students.reduce((sum, item) => sum + parseFloat(item.avgGrade), 0);
        average = totalSum / total; 
    }

    document.getElementById('totalStudents').innerText = total; 
    document.getElementById('avgClassGrade').innerText = average.toFixed(2); 
}
function renderStudents() {
    studentTableBody.innerHTML = ''; 
    if (students.length === 0) {
        studentTableBody.innerHTML = `<tr><td colspan="7" class="empty-message">Chưa có dữ liệu sinh viên nào trong danh sách.</td></tr>`;
        return;
    }
    students.forEach((student, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${student.studentId}</td>
            <td>${student.fullName}</td>
            <td>${formatDate(student.dob)}</td>
            <td>${student.className}</td>
            <td>${parseFloat(student.avgGrade).toFixed(2)}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn-edit" onclick="openEditMode(${index})">Sửa</button>
                <button class="btn-delete" onclick="deleteStudent(${index})">Xóa</button>
            </td>
        `; 
        
        studentTableBody.appendChild(tr); 
    });
}
function resetForm() {
    studentForm.reset();
    editIndexInput.value = '';
    modalTitle.innerText = 'Thêm sinh viên'; 
    btnSubmitForm.innerText = 'Lưu lại'; 
}
function showToast(message) {
    toastNotification.innerText = message; 
    toastNotification.classList.remove('hidden'); 
    setTimeout(() => {
        toastNotification.classList.add('hidden');
    }, 3000);
}
function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
btnOpenForm.addEventListener('click', () => { 
    resetForm();
    formModal.classList.remove('hidden'); 
});
btnCancelForm.addEventListener('click', () => { 
    formModal.classList.add('hidden'); 
    resetForm();
});


studentForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const studentData = {
        studentId: studentIdInput.value.trim(), 
        fullName: fullNameInput.value.trim(),
        dob: dobInput.value, 
        className: classNameInput.value.trim(), 
        avgGrade: avgGradeInput.value, 
        email: emailInput.value.trim() 
    }; 

    const editIndex = editIndexInput.value; 

    if (editIndex === '') {
        const isDuplicate = students.some(st => st.studentId === studentData.studentId);
        if (isDuplicate) {
            alert('Mã sinh viên này đã tồn tại trong hệ thống!');
            return;
        }

        students.push(studentData); 
        showToast('Thêm mới sinh viên thành công!');
    } else {
        const index = parseInt(editIndex);
        students[index] = studentData;
        showToast('Cập nhật thông tin sinh viên thành công!');
    }
    saveStudents(); 
    renderStudents(); 
    updateStatistics(); 
    formModal.classList.add('hidden');
    resetForm(); 
});
window.openEditMode = function(index) { 
    const student = students[index]; 
    if (!student) return;
    studentIdInput.value = student.studentId; 
    fullNameInput.value = student.fullName; 
    dobInput.value = student.dob; 
    classNameInput.value = student.className; 
    avgGradeInput.value = student.avgGrade; 
    emailInput.value = student.email; 
    
    editIndexInput.value = index; 
    modalTitle.innerText = 'Cập nhật thông tin sinh viên'; 
    btnSubmitForm.innerText = 'Cập nhật'; 
    formModal.classList.remove('hidden');
};
window.deleteStudent = function(index) { 
    const student = students[index];
    if (!student) return;
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa sinh viên "${student.fullName}" (Mã SV: ${student.studentId}) không?`);
    
    if (confirmDelete) {
        students.splice(index, 1); 
        saveStudents(); 
        renderStudents(); 
        updateStatistics(); 
        
        showToast('Đã xóa sinh viên khỏi danh sách!');
    }
};
document.addEventListener('DOMContentLoaded', () => {
    renderStudents(); 
    updateStatistics(); 
});