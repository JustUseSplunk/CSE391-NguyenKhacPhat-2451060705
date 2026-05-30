const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let rankCounts = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
let maxStudent = null;
let minStudent = null;

let sumMath = 0, sumPhysics = 0, sumCs = 0;
let sumMaleAvg = 0, countMale = 0;
let sumFemaleAvg = 0, countFemale = 0;

for (let i = 0; i < students.length; i++) {
    let s = students[i];

    let rawAvg = (s.math * 0.4) + (s.physics * 0.3) + (s.cs * 0.3);
    s.avg = Math.round(rawAvg * 10) / 10;

    if (s.avg >= 8.0) {
        s.rank = "Giỏi";
    } else if (s.avg >= 6.5) {
        s.rank = "Khá";
    } else if (s.avg >= 5.0) {
        s.rank = "Trung bình";
    } else {
        s.rank = "Yếu";
    }
    rankCounts[s.rank]++;
    if (i === 0) {
        maxStudent = s;
        minStudent = s;
    } else {
        if (s.avg > maxStudent.avg) maxStudent = s;
        if (s.avg < minStudent.avg) minStudent = s;
    }
    sumMath += s.math;
    sumPhysics += s.physics;
    sumCs += s.cs;
    if (s.gender === "M") {
        sumMaleAvg += s.avg;
        countMale++;
    } else if (s.gender === "F") {
        sumFemaleAvg += s.avg;
        countFemale++;
    }
}

console.log("| STT | Tên      | TB   | Xếp loại    |");
console.log("|-----|----------|------|-------------|");
for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let stt = String(i + 1).padEnd(3, ' ');
    let name = s.name.padEnd(8, ' ');
    let avg = s.avg.toFixed(1).padEnd(4, ' ');
    let rank = s.rank.padEnd(11, ' ');
    
    console.log(`| ${stt} | ${name} | ${avg} | ${rank} |`);
}

console.log("\n--- THỐNG KÊ XẾP LOẠI ---");
console.log(`Giỏi: ${rankCounts["Giỏi"]} | Khá: ${rankCounts["Khá"]} | Trung bình: ${rankCounts["Trung bình"]} | Yếu: ${rankCounts["Yếu"]}`);

console.log("\n--- ĐIỂM CAO NHẤT / THẤP NHẤT ---");
console.log(`Cao nhất: ${maxStudent.name} (${maxStudent.avg}đ)`);
console.log(`Thấp nhất: ${minStudent.name} (${minStudent.avg}đ)`);

let totalStudents = students.length;
console.log("\n--- ĐIỂM TRUNG BÌNH TỪNG MÔN TOÀN LỚP ---");
console.log(`Toán: ${(sumMath / totalStudents).toFixed(1)}`);
console.log(`Lý: ${(sumPhysics / totalStudents).toFixed(1)}`);
console.log(`CS: ${(sumCs / totalStudents).toFixed(1)}`);

console.log("\n--- ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH (BONUS) ---");
console.log(`Nam (M): ${(sumMaleAvg / countMale).toFixed(1)}`);
console.log(`Nữ (F): ${(sumFemaleAvg / countFemale).toFixed(1)}`);