const images = Array.from({ length: 9 }, (_, i) => `https://picsum.photos/seed/${i + 10}/800/600`);
let isGalleryOpen = false;
let currentImgIndex = 0;
let slideshowInterval = null;

const commands = [
    { id: 1, name: "Chuyển giao diện Tối (Dark Theme)", action: () => document.body.classList.add("dark-theme") },
    { id: 2, name: "Chuyển giao diện Sáng (Light Theme)", action: () => document.body.classList.remove("dark-theme") },
    { id: 3, name: "Mở ảnh đầu tiên", action: () => openGallery(0) },
    { id: 4, name: "Đăng xuất (Giả lập)", action: () => alert("Đã đăng xuất!") }
];
let isCmdOpen = false;
let filteredCommands = [...commands];
let activeCmdIndex = 0;

const galleryGrid = document.getElementById("galleryGrid");
const galleryModal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const imageCounter = document.getElementById("imageCounter");
const slideshowIndicator = document.getElementById("slideshowIndicator");
const closeGalleryBtn = document.getElementById("closeGalleryBtn");

const cmdPalette = document.getElementById("cmdPalette");
const cmdInput = document.getElementById("cmdInput");
const cmdList = document.getElementById("cmdList");
const openCmdBtn = document.getElementById("openCmdBtn");

images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src.replace("800/600", "150/150"); 
    img.alt = `Thumbnail ${index + 1}`;
    img.tabIndex = 0; 
    img.addEventListener("click", () => openGallery(index));
    img.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openGallery(index); 
    });
    galleryGrid.appendChild(img);
});

function openGallery(index) {
    if (isCmdOpen) closeCmdPalette(); 
    currentImgIndex = index;
    isGalleryOpen = true;
    updateGalleryView();
    galleryModal.classList.remove("hidden");
    

    closeGalleryBtn.focus();
}

function closeGallery() {
    isGalleryOpen = false;
    galleryModal.classList.add("hidden");
    stopSlideshow();
}

function updateGalleryView() {
    modalImage.src = images[currentImgIndex];
    imageCounter.textContent = `${currentImgIndex + 1} / ${images.length}`;
}

function nextImage() {
    currentImgIndex = (currentImgIndex + 1) % images.length;
    updateGalleryView();
}

function prevImage() {
    currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
    updateGalleryView();
}

function toggleSlideshow() {
    if (slideshowInterval) {
        stopSlideshow();
    } else {
        slideshowIndicator.classList.remove("hidden");
        slideshowInterval = setInterval(nextImage, 1500); 
    }
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    slideshowIndicator.classList.add("hidden");
}

closeGalleryBtn.addEventListener("click", closeGallery);

openCmdBtn.addEventListener("click", openCmdPalette);

function openCmdPalette() {
    isCmdOpen = true;
    cmdPalette.classList.remove("hidden");
    cmdInput.value = "";
    filterCommands();
    cmdInput.focus();
}

function closeCmdPalette() {
    isCmdOpen = false;
    cmdPalette.classList.add("hidden");
    openCmdBtn.focus();
}

function renderCommands() {
    cmdList.innerHTML = "";
    filteredCommands.forEach((cmd, index) => {
        const li = document.createElement("li");
        li.textContent = cmd.name;
        li.role = "option";
        
        if (index === activeCmdIndex) {
            li.classList.add("active");
            li.ariaSelected = "true";
            li.scrollIntoView({ block: "nearest" });
        } else {
            li.ariaSelected = "false";
        }
        li.addEventListener("click", () => {
            cmd.action();
            closeCmdPalette();
        });
        
        cmdList.appendChild(li);
    });
}

function filterCommands() {
    const keyword = cmdInput.value.toLowerCase();
    filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(keyword));
    activeCmdIndex = 0;
    renderCommands();
}

cmdInput.addEventListener("input", filterCommands);
window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault(); 
        if (isCmdOpen) closeCmdPalette();
        else openCmdPalette();
        return;
    }

    if (isGalleryOpen) {
        if (e.key === "Escape") {
            closeGallery();
        } else if (e.key === "ArrowRight") {
            nextImage();
            stopSlideshow(); 
        } else if (e.key === "ArrowLeft") {
            prevImage();
            stopSlideshow();
        } else if (e.key === " ") {
            e.preventDefault(); 
            toggleSlideshow();
        } else if (e.key >= "1" && e.key <= "9") {
            const index = parseInt(e.key) - 1;
            if (index < images.length) {
                currentImgIndex = index;
                updateGalleryView();
                stopSlideshow();
            }
        }
        return;
    }

    if (isCmdOpen) {
        if (e.key === "Escape") {
            closeCmdPalette();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (activeCmdIndex < filteredCommands.length - 1) {
                activeCmdIndex++;
                renderCommands();
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (activeCmdIndex > 0) {
                activeCmdIndex--;
                renderCommands();
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredCommands.length > 0) {
                filteredCommands[activeCmdIndex].action();
                closeCmdPalette();
            }
        }
        return;
    }
});