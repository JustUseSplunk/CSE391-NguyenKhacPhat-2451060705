const form = document.getElementById("registerForm");
const inputs = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirm: document.getElementById("confirmPassword"),
    phone: document.getElementById("phone")
};
const submitBtn = document.getElementById("submitBtn");

const formState = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

function updateUI(field, isValid, errorMsg = "") {
    const errorEl = document.getElementById(`${field}Error`);
    const iconEl = document.getElementById(`${field}Icon`);
    
    formState[field] = isValid;
    
    if (isValid) {
        if (errorEl) errorEl.textContent = "";
        if (iconEl) iconEl.textContent = "✅";
        inputs[field].style.borderColor = "#28a745"; 
    } else {
        if (errorEl) errorEl.textContent = errorMsg;
        if (iconEl) iconEl.textContent = "❌";
        inputs[field].style.borderColor = "#dc3545";
    }
    
    checkFormValidity();
}

function checkFormValidity() {
    const isAllValid = Object.values(formState).every(state => state === true);
    submitBtn.disabled = !isAllValid;
}
inputs.name.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        updateUI("name", true);
    } else {
        updateUI("name", false, "Tên phải từ 2 đến 50 ký tự.");
    }
});

inputs.email.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(val)) {
        updateUI("email", true);
    } else {
        updateUI("email", false, "Email không hợp lệ (vd: abc@gmail.com).");
    }
});

inputs.password.addEventListener("input", (e) => {
    const val = e.target.value;
    const bar = document.getElementById("strengthBar");
    const text = document.getElementById("strengthText");
    let strength = 0;
    if (val.length > 0 && val.length < 8) strength = 1;
    if (val.length >= 8) {
        const hasLetter = /[a-zA-Z]/.test(val);
        const hasNum = /\d/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasLower = /[a-z]/.test(val);
        const hasSpecial = /[^A-Za-z0-9]/.test(val);
        
        if (hasUpper && hasLower && hasNum && hasSpecial) {
            strength = 3; 
        } else if (hasLetter && hasNum) {
            strength = 2; 
        } else {
            strength = 1; 
        }
    }
    if (strength === 0) {
        bar.style.width = "0%";
        text.textContent = "";
        formState.password = false;
    } else if (strength === 1) {
        bar.style.width = "33%";
        bar.style.backgroundColor = "#dc3545"; 
        text.textContent = "Yếu (Cần ít nhất 8 ký tự)";
        text.style.color = "#dc3545";
        formState.password = false;
    } else if (strength === 2) {
        bar.style.width = "66%";
        bar.style.backgroundColor = "#ffc107"; 
        text.textContent = "Trung bình (Nên thêm ký tự hoa & đặc biệt)";
        text.style.color = "#d39e00";
        formState.password = true; 
    } else if (strength === 3) {
        bar.style.width = "100%";
        bar.style.backgroundColor = "#28a745"; 
        text.textContent = "Mạnh";
        text.style.color = "#28a745";
        formState.password = true; 
    }
    if (inputs.confirm.value) {
        inputs.confirm.dispatchEvent(new Event("input"));
    }
    
    checkFormValidity();
});
inputs.confirm.addEventListener("input", (e) => {
    const val = e.target.value;
    const passVal = inputs.password.value;
    
    if (val === "") {
        updateUI("confirm", false, "");
    } else if (val === passVal) {
        updateUI("confirm", true);
    } else {
        updateUI("confirm", false, "Mật khẩu xác nhận không khớp.");
    }
});

inputs.phone.addEventListener("input", (e) => {
    let rawNumbers = e.target.value.replace(/\D/g, "");
    let formatted = "";
    if (rawNumbers.length > 0) {
        formatted = rawNumbers.substring(0, 4);
    }
    if (rawNumbers.length > 4) {
        formatted += "-" + rawNumbers.substring(4, 7);
    }
    if (rawNumbers.length > 7) {
        formatted += "-" + rawNumbers.substring(7, 10);
    }
    
    e.target.value = formatted;
    
    if (rawNumbers.length === 10) {
        updateUI("phone", true);
    } else {
        updateUI("phone", false, "Số điện thoại phải bao gồm 10 chữ số.");
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const modalData = document.getElementById("modalData");
    modalData.innerHTML = `
        <strong>Tên:</strong> ${inputs.name.value} <br>
        <strong>Email:</strong> ${inputs.email.value} <br>
        <strong>SĐT:</strong> ${inputs.phone.value}
    `;
    
    document.getElementById("successModal").classList.remove("hidden");
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("successModal").classList.add("hidden");
    form.reset();
    Object.keys(inputs).forEach(key => updateUI(key, false, ""));
    document.getElementById("strengthBar").style.width = "0%";
    document.getElementById("strengthText").textContent = "";
});