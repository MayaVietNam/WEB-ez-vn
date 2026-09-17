/* === FILE: login.js (GIAO DIỆN 3 TAB - 2 APPS SCRIPT RIÊNG BIỆT) === */

// 1. Link Apps Script dành cho ĐỐI TÁC (Tạo đơn Wifi)
const SCRIPT_URL_PARTNER = 'https://script.google.com/macros/s/AKfycbzr2if7QLKh5ApiCzFUR9_4wvNa7qXvbzceSLGlVg4R99tYMmGT1HSEoRp8vsICc4xl/exec'; 

// 2. Link Apps Script dành riêng cho NHÂN VIÊN (Quản lý eSIM)
const SCRIPT_URL_STAFF = 'https://script.google.com/macros/s/AKfycbwA6FwKH9eQzzfzmnu5r7I_5XrJ19bhhAnew2H_qOg8Yiw9Q4Wou-f-fyYQwpT54T6o/exec'; 

let currentRole = 'partner';
let currentLanguage = localStorage.getItem('selectedLanguage') || 'vi';

// --- TỪ ĐIỂN ĐA NGÔN NGỮ ---
const translations = {
    vi: {
        'main-title': 'Hệ sinh thái<br>Wifi & eSIM',
        'main-desc': 'Nền tảng quản lý và phân phối thông minh. Tối ưu hóa trải nghiệm cho cá nhân và tối đa hiệu suất cho đối tác.',
        'tab-partner': 'Đối Tác',
        'tab-staff': 'Nhân viên',
        'tab-corp': 'Doanh nghiệp',
        'form-subtitle': 'Vui lòng đăng nhập để truy cập cổng thông tin.',
        'password-label': 'Mật khẩu',
        'guide-btn': '❓ Hướng dẫn sử dụng hệ thống',
        'guide-title': '📄 Hướng dẫn Đăng ký Thuê thiết bị',
        'guide-link': 'Truy cập trang chủ:',
        'guide-part1': '🧑‍💼 Phần 1: Đăng nhập',
        'guide-part1-desc': 'Sử dụng tài khoản và mật khẩu được cấp để truy cập hệ thống EZ.',
        'guide-note': '✨ Sau khi gửi biểu mẫu, bạn sẽ nhận được email xác nhận trong vòng 24 giờ.',
        'title-partner': 'Đối Tác Đăng Nhập',
        'title-staff': 'Portal Quản trị eSIM',
        'title-corp': 'Khách Hàng Doanh Nghiệp',
        'lbl-user-partner': 'Tên tài khoản (Đối tác)',
        'lbl-user-staff': 'Mã nhân viên (Staff ID)',
        'lbl-user-corp': 'Mã số thuế',
        'btn-partner': 'Vào form tạo đơn Wifi',
        'btn-staff': 'Đăng nhập',
        'btn-corp': 'Tiếp tục vào Cổng doanh nghiệp',
        'ph-partner': 'Nhập tài khoản...',
        'ph-staff': 'Nhập mã nhân viên...',
        'ph-corp': 'Nhập mã số thuế doanh nghiệp...',
        'auth-title': 'Đang xác thực...',
        'missing-info': 'Thiếu thông tin',
        'missing-desc': 'Vui lòng điền đầy đủ thông tin.',
        'success': 'Thành công!',
        'success-desc': 'Đang chuyển hướng...',
        'success-tax': 'Đã lưu MST, đang chuyển hướng...',
        'error-auth': 'Sai tài khoản hoặc mật khẩu.',
        'error-conn': 'Không kết nối được máy chủ Apps Script.',
        'error-tax': 'Mã số thuế không hợp lệ.'
    },
    en: {
        'main-title': 'Wifi & eSIM<br>Ecosystem',
        'main-desc': 'Smart management and distribution platform. Optimizing personal experience and maximizing partner performance.',
        'tab-partner': 'Partner',
        'tab-staff': 'Staff',
        'tab-corp': 'Enterprise',
        'form-subtitle': 'Please log in to access the portal.',
        'password-label': 'Password',
        'guide-btn': '❓ System Usage Guide',
        'guide-title': '📄 Equipment Rental Registration Guide',
        'guide-link': 'Visit homepage:',
        'guide-part1': '🧑‍💼 Part 1: Login',
        'guide-part1-desc': 'Use your provided account and password to access the EZ system.',
        'guide-note': '✨ After submitting the form, you will receive a confirmation email within 24 hours.',
        'title-partner': 'Partner Login',
        'title-staff': 'eSIM Management Portal',
        'title-corp': 'Enterprise Customer',
        'lbl-user-partner': 'Account Username',
        'lbl-user-staff': 'Staff ID',
        'lbl-user-corp': 'Tax ID',
        'btn-partner': 'Go to Wifi Order Form',
        'btn-staff': 'Login',
        'btn-corp': 'Continue to Enterprise Portal',
        'ph-partner': 'Enter account...',
        'ph-staff': 'Enter staff ID...',
        'ph-corp': 'Enter business tax ID...',
        'auth-title': 'Authenticating...',
        'missing-info': 'Missing Information',
        'missing-desc': 'Please fill in all required fields.',
        'success': 'Success!',
        'success-desc': 'Redirecting...',
        'success-tax': 'Tax ID saved, redirecting...',
        'error-auth': 'Invalid account or password.',
        'error-conn': 'Unable to connect to Apps Script server.',
        'error-tax': 'Invalid Tax ID format.'
    }
};

// --- LOGIC ĐỔI TAB GIAO DIỆN ---
function switchRole(role) {
    currentRole = role;
    const trans = translations[currentLanguage];
    
    ['partner', 'staff', 'corp'].forEach(r => {
        document.getElementById('tab-' + r).className = "lang-tab-" + r + " w-full py-2.5 text-sm font-semibold rounded-lg text-gray-500 hover:text-gray-800 transition";
    });
    
    const activeBtn = document.getElementById('tab-' + role);
    if (role === 'corp') {
        activeBtn.className = "lang-tab-corp w-full py-2.5 text-sm font-bold rounded-lg text-white bg-[#f01f2f] shadow transition";
    } else {
        activeBtn.className = "lang-tab-" + role + " w-full py-2.5 text-sm font-bold rounded-lg text-white bg-[#002c5c] shadow transition";
    }

    const passwordGroup = document.getElementById('password-group');
    const usernameLabel = document.getElementById('username-label');
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-btn');
    const formTitle = document.getElementById('form-title');

    if (role === 'partner') {
        formTitle.innerText = trans['title-partner'];
        passwordGroup.style.display = 'block';
        passwordInput.required = true;
        usernameLabel.innerText = trans['lbl-user-partner'];
        usernameInput.placeholder = trans['ph-partner'];
        submitBtn.innerText = trans['btn-partner'];
        submitBtn.className = "w-full bg-[#002c5c] hover:bg-blue-900 text-white font-bold py-3.5 px-4 rounded-lg shadow-md mt-4 transition";
    } 
    else if (role === 'staff') {
        formTitle.innerText = trans['title-staff'];
        passwordGroup.style.display = 'block';
        passwordInput.required = true;
        usernameLabel.innerText = trans['lbl-user-staff'];
        usernameInput.placeholder = trans['ph-staff'];
        submitBtn.innerText = trans['btn-staff'];
        submitBtn.className = "w-full bg-gray-800 hover:bg-black text-white font-bold py-3.5 px-4 rounded-lg shadow-md mt-4 transition";
    } 
    else if (role === 'corp') {
        formTitle.innerText = trans['title-corp'];
        passwordGroup.style.display = 'none';
        passwordInput.required = false;
        usernameLabel.innerText = trans['lbl-user-corp'];
        usernameInput.placeholder = trans['ph-corp'];
        submitBtn.innerText = trans['btn-corp'];
        submitBtn.className = "w-full bg-[#f01f2f] hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-md mt-4 transition";
    }
}

// --- LOGIC NGÔN NGỮ ---
function updateTranslations(lang) {
    const trans = translations[lang];
    document.querySelectorAll('[class*="lang-"]').forEach(el => {
        const key = Array.from(el.classList).find(c => c.startsWith('lang-')).replace('lang-', '');
        if (trans[key]) {
            if (el.tagName === 'INPUT') el.placeholder = trans[key];
            else el.innerHTML = trans[key];
        }
    });
    switchRole(currentRole);
}

function initLanguage() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        if(btn.dataset.lang === currentLanguage) {
            btn.classList.add('bg-blue-100', 'text-blue-900');
            btn.classList.remove('text-gray-500');
        } else {
            btn.classList.remove('bg-blue-100', 'text-blue-900');
            btn.classList.add('text-gray-500');
        }

        btn.addEventListener('click', (e) => {
            currentLanguage = e.currentTarget.dataset.lang;
            localStorage.setItem('selectedLanguage', currentLanguage);
            initLanguage(); 
            updateTranslations(currentLanguage); 
        });
    });
    updateTranslations(currentLanguage);
}

// --- KHỞI TẠO & XỬ LÝ SUBMIT ---
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    switchRole(currentRole);

    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const inputValue = document.getElementById('username-input').value.trim();
        const passValue = document.getElementById('password-input').value.trim();
        const submitBtn = document.getElementById('submit-btn');
        const trans = translations[currentLanguage];

        // 1. LUỒNG DOANH NGHIỆP (Chuyển vào ./Corporate/Index.html)
        if (currentRole === 'corp') {
            if (!/^[\d\-\.\s]+$/.test(inputValue)) {
                return Swal.fire('Lỗi', trans['error-tax'], 'warning');
            }
            sessionStorage.setItem('corpTaxCode', inputValue);
            Swal.fire({ icon: 'success', title: trans['success'], text: trans['success-tax'], timer: 1500, showConfirmButton: false })
                .then(() => window.location.href = './Corporate/Index.html'); 
            return;
        }

        // Kiểm tra thông tin nhập cho Đối Tác & Nhân Viên
        if (!inputValue || !passValue) return Swal.fire(trans['missing-info'], trans['missing-desc'], 'warning');

        submitBtn.disabled = true;
        Swal.fire({ title: trans['auth-title'], allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        // 2. LUỒNG ĐỐI TÁC (GỌI APPS SCRIPT 1 - WIFI)
        if (currentRole === 'partner') {
            try {
                const params = new URLSearchParams({ action: 'login', username: inputValue.toUpperCase(), password: passValue });
                const response = await fetch(SCRIPT_URL_PARTNER, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: params
                });
                const result = await response.json();

                if (result.status === 'OK') {
                    Swal.fire({ icon: 'success', title: trans['success'], text: trans['success-desc'], timer: 1500, showConfirmButton: false })
                        .then(() => window.location.href = result.redirect);
                } else {
                    Swal.fire('Lỗi', result.message || trans['error-auth'], 'error');
                }
            } catch (error) {
                Swal.fire('Lỗi', trans['error-conn'], 'error');
            } finally {
                submitBtn.disabled = false;
            }
        } 
        
        // 3. LUỒNG NHÂN VIÊN (GỌI APPS SCRIPT 2 - eSIM)
        else if (currentRole === 'staff') {
            try {
                const params = new URLSearchParams({ action: 'login', username: inputValue.toUpperCase(), password: passValue });
                const response = await fetch(SCRIPT_URL_STAFF, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: params
                });
                const result = await response.json();

                if (result.status === 'OK') {
                    Swal.fire({ icon: 'success', title: trans['success'], text: trans['success-desc'], timer: 1500, showConfirmButton: false })
                        .then(() => window.location.href = './eSim/index.html'); // Chuyển vào thư mục eSim
                } else {
                    Swal.fire('Lỗi', result.message || trans['error-auth'], 'error');
                }
            } catch (error) {
                Swal.fire('Lỗi', trans['error-conn'], 'error');
            } finally {
                submitBtn.disabled = false;
            }
        }
    });

    // Modal
    const guideModal = document.getElementById('guide-modal');
    document.getElementById('guide-btn').addEventListener('click', (e) => { e.preventDefault(); guideModal.classList.add('active'); });
    document.getElementById('modal-close-btn').addEventListener('click', () => guideModal.classList.remove('active'));
    guideModal.addEventListener('click', (e) => { if(e.target === guideModal) guideModal.classList.remove('active'); });
});
