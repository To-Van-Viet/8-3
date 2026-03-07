// 1. KHAI BÁO BIẾN
const btnSubmit = document.getElementById('btnSubmit');
const btnContinue = document.getElementById('btnContinue');
const nameInput = document.getElementById('nameInput');
const bgMusic = document.getElementById('bgMusic');

const specialGreetings = {
    "pham thi huyen trang": "Chúc Hai ngày 8/3 vui vẻ hạnh phúc,nhận được nhiều lời chúc , luôn thành công trong công việc và đặc biệt kiếm được thật nhiều tiền bao tui (hẹ hẹ hẹ hẹ)",
    "co be bat ca": "Chúc em có một ngày 8/3 thật vui vẻ, tràn đầy năng lượng và hạnh phúc. Mong em luôn xinh đẹp, tự tin, thành công trong mọi việc và được yêu thương thật nhiều mỗi ngày! Chúc em cố gắng học tập tốt để đủ điểm để vào trường đại học em mong muốn (cảm ơn anh thì cho xin tấm ảnh e đẹp nhất ik hẹ hẹ hẹ)",
    "me":"Mẹ yêu ơi, nhân ngày 8/3 con chúc mẹ luôn mạnh khỏe, hạnh phúc và lúc nào cũng nở nụ cười thật tươi. Cảm ơn mẹ vì đã luôn yêu thương, hy sinh và chăm sóc cho con từng ngày. Con mong mẹ luôn bình an, vui vẻ và mãi là người phụ nữ tuyệt vời nhất trong lòng con 💐❤️",
    "van anh":"Chúc em gái của anh có một ngày 8/3 thật vui vẻ, tràn đầy hạnh phúc và luôn rạng rỡ như những bông hoa mùa xuân. Mong em luôn xinh đẹp, học giỏi, thành công và gặp nhiều may mắn .(Xong rồi cho xin 20k kkkk))",
    "chim canh cut":"Chúc 'em bé' có một ngày 8/3 thật vui vẻ, đáng nhớ và tràn ngập tiếng cười. Mong em luôn hồn nhiên, xinh xắn, học giỏi và ngày càng tự tin hơn nhé! 🌷💐(Chúc em ăn mau chóng lớn sớm cao hơn hẹ hẹ )(Muốn cảm ơn anh cho xin tấm ảnh của e ik :)))",
    "kim dung":"Chúc chị có một ngày 8/3 thật ý nghĩa, luôn xinh đẹp, thành công và hạnh phúc trong công việc cũng như cuộc sống. Mong chị luôn giữ được nụ cười rạng rỡ, tinh thần lạc quan và gặp nhiều may mắn trên con đường mình chọn 💐💖(Lời chúc của chị hết 500k chuyển khoản hay tiền mặt ạ:)))",
};
const defaultGreeting = "Chúc bạn có một ngày 8/3 thật rực rỡ, tràn đầy niềm vui và tiếng cười, nhận được thật nhiều hoa, quà và những lời chúc yêu thương từ mọi người xung quanh. Mong mọi điều tốt đẹp nhất sẽ đến với bạn hôm nay và mãi mãi.";
function removeVietnameseTones(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d").replace(/Đ/g, "D")
              .toLowerCase().trim();
}

// 2. GIAI ĐOẠN 1: BẮT ĐẦU (THIỆP & HOA)
btnSubmit.addEventListener('click', function() {
    const rawName = nameInput.value.trim();
    if (!rawName) return alert("Vui lòng nhập tên!");

    const inputContainer = document.getElementById('input-container');
    const messageContainer = document.getElementById('message-container');
    const cardLeft = document.getElementById('card-left');
    const cardRight = document.getElementById('card-right');
    const flowerPortal = document.getElementById('flower-portal');
    const flowerBloom = document.querySelector('.flower-bloom');

    // --- GIAI ĐOẠN 1: KHỞI ĐỘNG (T = 0ms) ---
    // Khung nhập bắt đầu mờ dần
    inputContainer.classList.add('fade-out');

    // --- GIAI ĐOẠN 2: KHÉP THIỆP (T = 500ms) ---
    // Đợi khung nhập mờ bớt rồi mới bắt đầu khép thiệp
    setTimeout(() => {
        cardLeft.classList.add('close');
        cardRight.classList.add('close');
    }, 500);

    // --- GIAI ĐOẠN 3: HIỆN NỤ HOA (T = 1500ms) ---
    // Lúc này thiệp đã khép kín hoàn toàn. Hiện nụ hoa và bắt đầu phóng to (Animation 2s)
    setTimeout(() => {
        flowerPortal.classList.remove('hidden');
        flowerPortal.style.opacity = '1'; // Đảm bảo hoa hiện rõ
        flowerPortal.classList.add('show-bloom');
    }, 1500);

    // --- GIAI ĐOẠN 4: HOA NỞ RỘ & CHUẨN BỊ LỜI CHÚC (T = 3500ms) ---
    // Sau khi nụ hoa đã to hết cỡ, bắt đầu xòe cánh (Transition 1s)
    setTimeout(() => {
        if (flowerBloom) flowerBloom.classList.add('opened');
        
        // Ẩn hẳn khung nhập cũ để giải phóng không gian
        inputContainer.classList.add('hidden');
        
        // Xử lý tên và hiển thị lời chúc phía dưới lớp thiệp
        const processedName = removeVietnameseTones(rawName);
        document.getElementById('displayName').innerText = "Chào " + rawName + "!";
        document.getElementById('greetingText').innerText = specialGreetings[processedName] || defaultGreeting;
        
        // Hiện khung lời chúc (vẫn đang nằm dưới thiệp)
        messageContainer.classList.remove('hidden');
        
        // Phát nhạc nền
        if (bgMusic) bgMusic.play();
    }, 3500);

    // --- GIAI ĐOẠN 5: MỞ THIỆP & ẨN HOA (T = 4500ms) ---
    // Hoa đã nở đẹp nhất -> Mở thiệp để lộ lời chúc và làm mờ hoa cùng lúc
    setTimeout(() => {
        // Mở thiệp
        cardLeft.classList.remove('close');
        cardRight.classList.remove('close');
        
        // Hiệu ứng làm mờ hoa dần dần (Fade out)
        flowerPortal.style.transition = 'opacity 1s ease';
        flowerPortal.style.opacity = '0';
        
        // Sau khi hoa mờ hẳn và thiệp mở xong (1s sau), xóa hoa khỏi màn hình
        setTimeout(() => {
            flowerPortal.classList.add('hidden');
        }, 1000);
    }, 4500);
});

// 3. GIAI ĐOẠN 2: PHÁO HOA (10 GIÂY)
// Tìm đến đoạn code xử lý nút Tiếp tục này:
btnContinue.addEventListener('click', function() {
    // 1. Làm mờ khung lời chúc hiện tại
    const messageContainer = document.getElementById('message-container');
    messageContainer.classList.add('fade-out');
    
    // Ẩn lá rơi để tập trung vào pháo hoa (như bạn đã yêu cầu)
    const leafContainer = document.getElementById('leaf-container');
    if (leafContainer) leafContainer.classList.add('hidden');

    setTimeout(() => {
        // 2. Ẩn hẳn khung lời chúc
        messageContainer.classList.add('hidden');

        // 3. Hiện lớp nền đen của pháo hoa lên
        const overlay = document.getElementById('fireworks-overlay');
        overlay.classList.remove('hidden');
        overlay.style.opacity = '1'; // Đảm bảo nó hiện rõ

        // --- ĐÂY LÀ NƠI GỌI HÀM CHUẨN NHẤT ---
        initFireworks(); 
        // -------------------------------------

        // 4. Đặt thời gian 10 giây sau thì dừng pháo hoa
        setTimeout(() => {
            stopFireworks();
        }, 10000); // 10 giây "mãn nhãn"

    }, 500); // Đợi 0.5s cho hiệu ứng fade-out của lời chúc chạy xong
});
// --- LOGIC CANVAS PHÁO HOA ---
// LOGIC PHÁO HOA NÂNG CẤP
// 3. GIAI ĐOẠN 2: PHÁO HOA (10 GIÂY)
// Tìm đến đoạn code xử lý nút Tiếp tục này:
btnContinue.addEventListener('click', function() {
    // 1. Làm mờ khung lời chúc hiện tại
    const messageContainer = document.getElementById('message-container');
    messageContainer.classList.add('fade-out');
    
    // Ẩn lá rơi để tập trung vào pháo hoa (như bạn đã yêu cầu)
    const leafContainer = document.getElementById('leaf-container');
    if (leafContainer) leafContainer.classList.add('hidden');

    setTimeout(() => {
        // 2. Ẩn hẳn khung lời chúc
        messageContainer.classList.add('hidden');

        // 3. Hiện lớp nền đen của pháo hoa lên
        const overlay = document.getElementById('fireworks-overlay');
        overlay.classList.remove('hidden');
        overlay.style.opacity = '1'; // Đảm bảo nó hiện rõ

        // --- ĐÂY LÀ NƠI GỌI HÀM CHUẨN NHẤT ---
        initFireworks(); 
        // -------------------------------------

        // 4. Đặt thời gian 10 giây sau thì dừng pháo hoa
        setTimeout(() => {
            stopFireworks();
        }, 15000); // 10 giây "mãn nhãn"

    }, 500); // Đợi 0.5s cho hiệu ứng fade-out của lời chúc chạy xong
});
// --- LOGIC CANVAS PHÁO HOA ---
// LOGIC PHÁO HOA NÂNG CẤP
// --- HỆ THỐNG PHÁO HOA NÂNG CẤP ĐA DẠNG ---
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [], rockets = [], animationId;

const EXPLOSION_TYPES = ['circle', 'willow', 'recursive', 'heart'];

function initFireworks() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = []; rockets = [];
    render();
}

class Rocket {
    constructor() {
        this.x = Math.random() * (canvas.width * 0.8) + (canvas.width * 0.1);
        this.y = canvas.height;
        this.vy = -(Math.random() * 3 + 7);
        this.vx = (Math.random() - 0.5) * 1.5;
        this.targetY = Math.random() * (canvas.height / 3) + 80;
        this.hue = Math.random() * 360;
        this.type = EXPLOSION_TYPES[Math.floor(Math.random() * EXPLOSION_TYPES.length)];
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.04; 

        // Đuôi lửa khi bay lên
        if (Math.random() < 0.2) {
            particles.push(new Particle(this.x, this.y, this.hue, Math.random() * 2, Math.random() * Math.PI * 2, 0.9, 0.1, 0.05));
        }

        if (this.vy >= 0 || this.y <= this.targetY) {
            createExplosion(this.x, this.y, this.hue, this.type);
            return false;
        }
        return true;
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
        ctx.fill();
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, hue, speed, angle, friction, gravity, decay, secondStage = false) {
        this.x = x; this.y = y; this.hue = hue;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.friction = friction;
        this.gravity = gravity;
        this.decay = decay;
        this.secondStage = secondStage;
    }
    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;

        if (this.secondStage && this.alpha < 0.5) {
            this.secondStage = false;
            // Khi nổ lần 2: Đổi sang màu ngẫu nhiên khác (+120 độ trên vòng màu)
            createExplosion(this.x, this.y, this.hue + 120, 'circle', 12, 1.2);
        }
        return this.alpha > 0;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
        ctx.fill();
        ctx.restore();
    }
}

function createExplosion(x, y, hue, type) {
    let count, friction, gravity, decay, speedBase;

    if (type === 'heart') {
        count = 100;
        for (let i = 0; i < count; i++) {
            let t = (i / count) * Math.PI * 2;
            // Công thức hình trái tim
            let xHeart = 16 * Math.pow(Math.sin(t), 3);
            let yHeart = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            let angle = Math.atan2(yHeart, xHeart);
            let speed = Math.sqrt(xHeart * xHeart + yHeart * yHeart) / 3;
            particles.push(new Particle(x, y, hue, speed, angle, 0.95, 0.1, 0.015));
        }
    } else {
        count = type === 'willow' ? 120 : 80;
        for (let i = 0; i < count; i++) {
            let angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
            let speed = Math.random() * 7 + 2;
            let friction = 0.94, gravity = 0.14, decay = 0.02, secondStage = false;

            if (type === 'willow') {
                speed = Math.random() * 4 + 1;
                gravity = 0.05; // Rơi rất chậm
                decay = 0.007;  // Tồn tại lâu
                friction = 0.98;
            } else if (type === 'recursive') {
                secondStage = true;
                decay = 0.012;
            }
            particles.push(new Particle(x, y, hue, speed, angle, friction, gravity, decay, secondStage));
        }
    }
}

function render() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
if (!isStoppingFireworks && Math.random() < 0.025) {
        rockets.push(new Rocket());
    }
    // CHỈNH TỐC ĐỘ BẮN TẠI ĐÂY: 0.025 = bắn chậm và thong thả hơn
    if (Math.random() < 0.025) rockets.push(new Rocket());

    rockets = rockets.filter(r => {
        if (r.update()) { r.draw(); return true; }
        return false;
    });

    particles = particles.filter(p => {
        if (p.update()) { p.draw(); return true; }
        return false;
    });

    animationId = requestAnimationFrame(render);
}

let isStoppingFireworks = false; // Biến kiểm soát trạng thái dừng

function stopFireworks() {
    isStoppingFireworks = true; // 1. Ra lệnh ngừng bắn pháo mới (check trong hàm render)
    
    // 2. Để pháo cũ nổ nốt trong 2 giây cho đẹp, sau đó bắt đầu mờ nền
    setTimeout(() => {
        const overlay = document.getElementById('fireworks-overlay');
        overlay.style.transition = 'opacity 2s ease'; // Mờ nền đen thật chậm
        overlay.style.opacity = '0';

        setTimeout(() => {
            // 3. Khi nền đen đã mờ hẳn, mới dừng hoàn toàn vòng lặp render
            cancelAnimationFrame(animationId);
            overlay.classList.add('hidden');

            // 4. Hiện màn hình cuối với hiệu ứng fade-in đã thêm ở CSS
            const finalScreen = document.getElementById('final-screen');
            finalScreen.classList.remove('hidden');
            finalScreen.classList.add('fade-in-final');

            // 5. Hiện lại lá rơi cho lãng mạn
            const leafContainer = document.getElementById('leaf-container');
            if (leafContainer) leafContainer.classList.remove('hidden');
        }, 2000); // Đợi 2s cho hiệu ứng mờ nền hoàn tất
    }, 1000);
}

// LÁ RƠI NỀN
function createLeaf() {
    const container = document.getElementById('leaf-container');
    // Nếu container đang bị ẩn (trang pháo hoa), không tạo thêm hoa mới để tiết kiệm tài nguyên
    if (container.classList.contains('hidden')) return;

    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.innerText = ['🌸', '🌹', '❤️', '🌺', '🌷','🌻','🌺','💐'][Math.floor(Math.random() * 8)];
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.fontSize = Math.random() * 20 + 10 + 'px';
    leaf.style.animationDuration = (Math.random() * 2 + 3) + 's';
    leaf.style.opacity = Math.random() * 0.5 + 0.5;

    container.appendChild(leaf);

    // Xóa hoa sau khi rơi xong
    // setTimeout(() => {
    //     leaf.remove();
    // }, 5000);
}

// Giữ nguyên setInterval này ở cuối file
setInterval(createLeaf, 50);
