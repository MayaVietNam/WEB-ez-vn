/* === FILE: login.js (BẢN HOÀN THIỆN THEO CẤU TRÚC GITHUB) === */

// ⚠️ NHỚ THAY BẰNG LINK DEPLOY MỚI NHẤT CỦA BẠN VÀO ĐÂY SAU KHI SỬA GOOGLE SCRIPT BÊN DƯỚI
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzr2if7QLKh5ApiCzFUR9_4wvNa7qXvbzceSLGlVg4R99tYMmGT1HSEoRp8vsICc4xl/exec';

const translations = {
    vi: {
        'partner-user-placeholder': 'Tài khoản đăng nhập',
        'partner-pass-placeholder': 'Mật khẩu',
        'partner-login-btn': 'Đăng Nhập',
        'partner-title': 'Đối Tác',
        'corp-tax-placeholder': 'Mã số thuế doanh nghiệp',
        'corp-submit-btn': 'Tiếp Tục',
        'corp-title': 'Doanh Nghiệp',
        'welcome-partner': 'Chào mừng trở lại, Đối Tác!',
        'welcome-partner-desc': 'Nếu bạn là đối tác, vui lòng đăng nhập bằng tài khoản của bạn tại đây.',
        'partner-btn': 'Đăng nhập Đối Tác',
        'welcome-corp': 'Chào mừng, Doanh Nghiệp!',
        'welcome-corp-desc': 'Nhập mã số thuế của bạn để truy cập cổng thông tin dành cho doanh nghiệp.',
        'corp-btn': 'Chuyển sang Doanh Nghiệp',
        'guide-btn': '❓ Hướng dẫn',
        'guide-title': '📄 Hướng dẫn Đăng ký Thuê thiết bị',
        'homepage': 'Trang chủ: https://ez-vn.com/',
        'authenticating': 'Đang xác thực...',
        'authenticating-desc': 'Vui lòng chờ hệ thống kiểm tra.',
        'success': 'Thành công!',
        'success-login': 'Đăng nhập thành công, đang chuyển hướng...',
        'success-tax': 'Đã lưu mã số thuế, đang chuyển hướng...',
        'auth-error': 'Lỗi xác thực',
        'invalid-credentials': 'Tài khoản hoặc mật khẩu không đúng.',
        'connection-error': 'Lỗi kết nối',
        'connection-error-msg': 'Không thể kết nối đến máy chủ. Hãy đảm bảo bạn đã Deploy Google Script đúng cách.',
        'missing-info': 'Thiếu thông tin',
        'login-required': 'Vui lòng nhập đầy đủ thông tin.',
        'invalid-tax': 'Lỗi định dạng',
        'invalid-tax-msg': 'Mã số thuế chỉ được chứa số.'
    },
    en: {
        'partner-user-placeholder': 'Username',
        'partner-pass-placeholder': 'Password',
        'partner-login-btn': 'Sign In',
        'partner-title': 'Partner',
        'corp-tax-placeholder': 'Tax ID',
        'corp-submit-btn': 'Continue',
        'corp-title': 'Enterprise',
        'welcome-partner': 'Welcome back, Partner!',
        'welcome-partner-desc': 'If you are a partner, please log in with your account here.',
        'partner-btn': 'Partner Sign In',
        'welcome-corp': 'Welcome, Enterprise!',
        'welcome-corp-desc': 'Enter your tax ID to access the enterprise portal.',
        'corp-btn': 'Switch to Enterprise',
        'guide-btn': '❓ Guide',
        'guide-title': '📄 Equipment Rental Registration Guide',
        'homepage': 'Homepage: https://ez-vn.com/',
        'authenticating': 'Authenticating...',
        'authenticating-desc': 'Please wait...',
        'success': 'Success!',
        'success-login': 'Login successful, redirecting...',
        'success-tax': 'Tax ID saved, redirecting...',
        'auth-error': 'Authentication Error',
        'invalid-credentials': 'Invalid username or password.',
        'connection-error': 'Connection Error',
        'connection-error-msg': 'Unable to connect to server. Check your Script Deployment.',
        'missing-info': 'Missing Info',
        'login-required': 'Please enter all fields.',
        'invalid-tax': 'Invalid Format',
        'invalid-tax-msg': 'Tax ID must contain only numbers.'
    }
};

let currentLanguage = localStorage.getItem('selectedLanguage') || 'vi';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const partnerForm = document.getElementById('partner-form');
    const corpForm = document.getElementById('corp-form');
    const guideModal = document.getElementById('guide-modal');
    const langBtns = document.querySelectorAll('.lang-btn');

    const updatePageTranslations = (lang) => {
        const trans = translations[lang];
        document.querySelectorAll('[class^="lang-"]').forEach(el => {
            const key = el.className.split(' ').find(c => c.startsWith('lang-')).replace('lang-', '');
            if (trans[key]) {
                if (el.tagName === 'INPUT') el.placeholder = trans[key];
                else el.innerHTML = trans[key];
            }
        });
    };

    const switchLanguage = (lang) => {
        currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);
        langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
        updatePageTranslations(lang);
    };

    langBtns.forEach(btn => btn.addEventListener('click', () => switchLanguage(btn.dataset.lang)));
    switchLanguage(currentLanguage);

    document.getElementById('corp-btn')?.addEventListener('click', () => container.classList.add('right-panel-active'));
    document.getElementById('partner-btn')?.addEventListener('click', () => container.classList.remove('right-panel-active'));

    // --- XỬ LÝ ĐĂNG NHẬP ĐỐI TÁC ---
    partnerForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = document.getElementById('partner-user').value.trim().toUpperCase();
        const pass = document.getElementById('partner-pass').value.trim();
        const submitBtn = partnerForm.querySelector('button[type="submit"]');
        const trans = translations[currentLanguage];

        if (!user || !pass) return Swal.fire(trans['missing-info'], trans['login-required'], 'warning');

        submitBtn.disabled = true;
        Swal.fire({ title: trans['authenticating'], allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        try {
            const params = new URLSearchParams({ action: 'login', username: user, password: pass });
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params
            });
            const result = await response.json();

            if (result.status === 'OK') {
                Swal.fire({ icon: 'success', title: trans['success'], text: trans['success-login'], timer: 1500, showConfirmButton: false })
                    .then(() => window.location.href = result.redirect);
            } else {
                Swal.fire(trans['auth-error'], result.message || trans['invalid-credentials'], 'error');
            }
        } catch (error) {
            Swal.fire(trans['connection-error'], trans['connection-error-msg'], 'error');
        } finally {
            submitBtn.disabled = false;
        }
    });

    // --- XỬ LÝ DOANH NGHIỆP ---
    corpForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('corp-tax-code').value.trim();
        const trans = translations[currentLanguage];

        if (!/^\d+$/.test(code)) return Swal.fire(trans['invalid-tax'], trans['invalid-tax-msg'], 'warning');

        sessionStorage.setItem('corpTaxCode', code);
        Swal.fire({ icon: 'success', title: trans['success'], text: trans['success-tax'], timer: 1500, showConfirmButton: false })
            .then(() => window.location.href = './Corporate/Index.html'); // KHỚP 100% VỚI ẢNH GITHUB CỦA BẠN
    });

    // --- MODAL HƯỚNG DẪN ---
    const toggleModal = (show) => {
        guideModal.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : 'auto';
    };

    document.getElementById('guide-btn-left')?.addEventListener('click', () => toggleModal(true));
    document.getElementById('guide-btn-right')?.addEventListener('click', () => toggleModal(true));
    document.getElementById('modal-close-btn')?.addEventListener('click', () => toggleModal(false));
    guideModal?.addEventListener('click', (e) => e.target === guideModal && toggleModal(false));
});