function startGame() {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    const maxGuesses = 7;
    let attempts = 0;
    let guessedHistory = [];
    while (attempts < maxGuesses) {
        let remaining = maxGuesses - attempts;
        let input = prompt(`Lượt ${attempts + 1}/${maxGuesses} (Còn ${remaining} lượt)\nNhập một số từ 1 đến 100:`);
        if (input === null) {
            alert("Bạn đã thoát game!");
            return;
        }

        let guess = parseInt(input);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Lỗi: Vui lòng chỉ nhập số nguyên hợp lệ từ 1 đến 100!");
            continue; 
        }


        if (guessedHistory.includes(guess)) {
            alert(`Cảnh báo: Bạn đã đoán số ${guess} này rồi! Hãy chọn số khác.`);
            continue; 
        }
        guessedHistory.push(guess);
        attempts++;

        if (guess === targetNumber) {
            alert(`🎉 CHÚC MỪNG! Bạn đoán đúng số ${targetNumber} sau ${attempts} lần!`);
            return; 
        } else if (guess < targetNumber) {
            alert(`📉 Số ${guess} quá THẤP. Thử số cao hơn nhé!`);
        } else {
            alert(`📈 Số ${guess} quá CAO. Thử số thấp hơn nhé!`);
        }
    }

    alert(`💥 GAME OVER! Bạn đã hết 7 lượt.\nĐáp án đúng là: ${targetNumber}`);
}