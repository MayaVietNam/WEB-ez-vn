/* === FILE: login.js (Phiên bản ĐÃ BẢO MẬT & TỐI ƯU - CÓ HỖ TRỢ ĐA NGÔN NGỮ) === */

// Dữ liệu ngôn ngữ
const translations = {
    vi: {
        // Partner Form
        'partner-user-placeholder': 'Tài khoản đăng nhập',
        'partner-pass-placeholder': 'Mật khẩu',
        'partner-login-btn': 'Đăng Nhập',
        'partner-title': 'Đối Tác',
        
        // Corp Form
        'corp-tax-placeholder': 'Mã số thuế doanh nghiệp',
        'corp-submit-btn': 'Tiếp Tục',
        'corp-title': 'Doanh Nghiệp',
        
        // Overlay
        'welcome-partner': 'Chào mừng trở lại, Đối Tác!',
        'welcome-partner-desc': 'Nếu bạn là đối tác, vui lòng đăng nhập bằng tài khoản của bạn tại đây.',
        'partner-btn': 'Đăng nhập Đối Tác',
        'welcome-corp': 'Chào mừng, Doanh Nghiệp!',
        'welcome-corp-desc': 'Nhập mã số thuế của bạn để truy cập cổng thông tin dành cho doanh nghiệp.',
        'corp-btn': 'Chuyển sang Doanh Nghiệp',
        'guide-btn': '❓ Hướng dẫn',
        
        // Guide Modal
        'guide-title': '📄 Hướng dẫn Đăng ký Thuê thiết bị',
        'homepage': 'Trang chủ: https://ez-vn.com/',
        'guide-part1': '🧑‍💼 Phần 1: Đăng nhập Đối Tác',
        'guide-part1-desc': 'Sử dụng tài khoản và mật khẩu được cấp để truy cập.',
        'guide-part1-step1': '1. Mở trang đăng nhập, nhập <strong>Tài khoản</strong> và <strong>Mật khẩu</strong>.',
        'guide-part1-step2': '2. Nhấn nút <strong>"Đăng Nhập"</strong> để tiếp tục.',
        'guide-part2': '📝 Phần 2: Điền Biểu mẫu Đăng ký',
        'guide-part2-desc': 'Hoàn tất biểu mẫu đăng ký gồm 3 phần chính sau:',
        'guide-col1-title': '1. ℹ️ Thông tin người gửi',
        'guide-col1-name': 'Họ tên người gửi:',
        'guide-col1-name-desc': 'Nhập đầy đủ họ và tên của bạn.',
        'guide-col1-email': 'Email:',
        'guide-col1-email-desc': 'Nhập địa chỉ email chính xác.',
        'guide-col1-phone': 'Số điện thoại:',
        'guide-col1-phone-desc': 'Nhập số điện thoại di động.',
        'guide-col1-company': 'Công ty:',
        'guide-col1-company-desc': 'Nhập tên đầy đủ của công ty.',
        'guide-col1-company-note': 'Nếu là cá nhân, điền "Cá nhân".',
        'guide-col1-region': 'Khu vực:',
        'guide-col1-region-desc': 'Chọn Tỉnh/Thành phố.',
        'guide-col1-tax': 'Mã số thuế:',
        'guide-col1-tax-desc': 'Nhập Mã số thuế công ty.',
        'guide-col1-tax-note': 'Quan trọng để xuất hóa đơn VAT.',
        
        'guide-col2-title': '2. 📱 Chi tiết các đơn thuê',
        'guide-col2-user': 'Tên người dùng:',
        'guide-col2-user-desc': 'Nhập tên người sử dụng.',
        'guide-col2-imei': 'IMEI:',
        'guide-col2-imei-desc': 'Nhập số IMEI (nếu có).',
        'guide-col2-imei-note': 'Bỏ trống để hệ thống tự điền.',
        'guide-col2-from': 'Từ ngày:',
        'guide-col2-from-desc': 'Chọn ngày bắt đầu thuê.',
        'guide-col2-to': 'Đến ngày:',
        'guide-col2-to-desc': 'Chọn ngày kết thúc thuê.',
        'guide-col2-country': 'Quốc gia:',
        'guide-col2-country-desc': 'Chọn quốc gia sử dụng.',
        'guide-col2-plan': 'Gói data:',
        'guide-col2-plan-desc': 'Chọn gói cước phù hợp.',
        'guide-col2-multi': 'Thuê nhiều thiết bị?',
        'guide-col2-multi-desc': 'Nhấn nút <strong>"+ Thêm đơn đăng ký mới"</strong>.',
        
        'guide-col3-title': '3. 🚚 Thông tin Vận chuyển',
        'guide-col3-receiver': 'Tên người nhận:',
        'guide-col3-receiver-desc': 'Nhập họ tên người nhận.',
        'guide-col3-phone': 'SĐT người nhận:',
        'guide-col3-phone-desc': 'Nhập số điện thoại người nhận.',
        'guide-col3-address': 'Địa chỉ nhận hàng:',
        'guide-col3-address-desc': 'Nhập chi tiết địa chỉ giao.',
        'guide-col3-date': 'Ngày nhận mong muốn:',
        'guide-col3-date-desc': 'Chọn ngày muốn nhận.',
        'guide-col3-method': 'Hình thức vận chuyển:',
        'guide-col3-method-desc': 'Chọn phương thức.',
        
        'guide-part3': '✅ Phần 3: Gửi Yêu Cầu',
        'guide-part3-step1': '1.',
        'guide-part3-step1-desc': 'Kiểm tra lại toàn bộ thông tin ở cả 3 phần.',
        'guide-part3-step2': '2.',
        'guide-part3-step2-desc': 'Nhấn nút <strong>"Gửi Yêu Cầu (Submit Request)"</strong> màu đỏ ở cuối biểu mẫu để hoàn tất.',
        
        // Alerts
        'missing-info': 'Thiếu thông tin',
        'login-required': 'Vui lòng nhập tài khoản và mật khẩu.',
        'invalid-tax': 'Lỗi định dạng',
        'invalid-tax-msg': 'Mã số thuế chỉ được chứa số.',
        'authenticating': 'Đang xác thực...',
        'authenticating-desc': 'Vui lòng chờ hệ thống kiểm tra.',
        'success': 'Thành công!',
        'success-login': 'Đăng nhập thành công, đang chuyển hướng...',
        'success-tax': 'Đã lưu mã số thuế, đang chuyển hướng...',
        'error': 'Lỗi',
        'auth-error': 'Lỗi xác thực',
        'invalid-credentials': 'Tài khoản hoặc mật khẩu không đúng.',
        'connection-error': 'Lỗi kết nối',
        'connection-error-msg': 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
        'network-error': 'Lỗi mạng. Kiểm tra kết nối internet.',
        'timeout-error': 'Kết nối timeout. Vui lòng thử lại.',
        'invalid-redirect': 'Lỗi',
        'invalid-redirect-msg': 'Đường dẫn chuyển hướng không hợp lệ.',
    },
    en: {
        // Partner Form
        'partner-user-placeholder': 'Username',
        'partner-pass-placeholder': 'Password',
        'partner-login-btn': 'Sign In',
        'partner-title': 'Partner',
        
        // Corp Form
        'corp-tax-placeholder': 'Tax ID',
        'corp-submit-btn': 'Continue',
        'corp-title': 'Enterprise',
        
        // Overlay
        'welcome-partner': 'Welcome back, Partner!',
        'welcome-partner-desc': 'If you are a partner, please log in with your account here.',
        'partner-btn': 'Partner Sign In',
        'welcome-corp': 'Welcome, Enterprise!',
        'welcome-corp-desc': 'Enter your tax ID to access the enterprise portal.',
        'corp-btn': 'Switch to Enterprise',
        'guide-btn': '❓ Guide',
        
        // Guide Modal
        'guide-title': '📄 Equipment Rental Registration Guide',
        'homepage': 'Homepage: https://ez-vn.com/',
        'guide-part1': '🧑‍💼 Part 1: Partner Login',
        'guide-part1-desc': 'Use the provided account and password to access.',
        'guide-part1-step1': '1. Open the login page, enter <strong>Username</strong> and <strong>Password</strong>.',
        'guide-part1-step2': '2. Click <strong>"Sign In"</strong> button to continue.',
        'guide-part2': '📝 Part 2: Fill Registration Form',
        'guide-part2-desc': 'Complete the registration form with the following 3 sections:',
        'guide-col1-title': '1. ℹ️ Sender Information',
        'guide-col1-name': 'Full Name:',
        'guide-col1-name-desc': 'Enter your full name.',
        'guide-col1-email': 'Email:',
        'guide-col1-email-desc': 'Enter a valid email address.',
        'guide-col1-phone': 'Phone Number:',
        'guide-col1-phone-desc': 'Enter your mobile phone number.',
        'guide-col1-company': 'Company:',
        'guide-col1-company-desc': 'Enter your company name.',
        'guide-col1-company-note': 'If individual, enter "Individual".',
        'guide-col1-region': 'Region:',
        'guide-col1-region-desc': 'Select Province/City.',
        'guide-col1-tax': 'Tax ID:',
        'guide-col1-tax-desc': 'Enter company tax ID.',
        'guide-col1-tax-note': 'Important for VAT invoice generation.',
        
        'guide-col2-title': '2. 📱 Rental Details',
        'guide-col2-user': 'User Name:',
        'guide-col2-user-desc': 'Enter the end user name.',
        'guide-col2-imei': 'IMEI:',
        'guide-col2-imei-desc': 'Enter IMEI number (if available).',
        'guide-col2-imei-note': 'Leave blank for auto-fill.',
        'guide-col2-from': 'Start Date:',
        'guide-col2-from-desc': 'Select rental start date.',
        'guide-col2-to': 'End Date:',
        'guide-col2-to-desc': 'Select rental end date.',
        'guide-col2-country': 'Country:',
        'guide-col2-country-desc': 'Select usage country.',
        'guide-col2-plan': 'Data Plan:',
        'guide-col2-plan-desc': 'Choose suitable plan.',
        'guide-col2-multi': 'Renting multiple devices?',
        'guide-col2-multi-desc': 'Click <strong>"+ Add New Rental"</strong> button.',
        
        'guide-col3-title': '3. 🚚 Shipping Information',
        'guide-col3-receiver': 'Recipient Name:',
        'guide-col3-receiver-desc': 'Enter recipient name.',
        'guide-col3-phone': 'Recipient Phone:',
        'guide-col3-phone-desc': 'Enter recipient phone number.',
        'guide-col3-address': 'Delivery Address:',
        'guide-col3-address-desc': 'Enter detailed delivery address.',
        'guide-col3-date': 'Preferred Delivery Date:',
        'guide-col3-date-desc': 'Select preferred date.',
        'guide-col3-method': 'Shipping Method:',
        'guide-col3-method-desc': 'Choose shipping method.',
        
        'guide-part3': '✅ Part 3: Submit Request',
        'guide-part3-step1': '1.',
        'guide-part3-step1-desc': 'Review all information in all 3 sections.',
        'guide-part3-step2': '2.',
        'guide-part3-step2-desc': 'Click <strong>"Submit Request"</strong> button at the end of the form to complete.',
        
        // Alerts
        'missing-info': 'Missing Information',
        'login-required': 'Please enter username and password.',
        'invalid-tax': 'Invalid Format',
        'invalid-tax-msg': 'Tax ID must contain only numbers.',
        'authenticating': 'Authenticating...',
        'authenticating-desc': 'Please wait while system is checking.',
        'success': 'Success!',
        'success-login': 'Login successful, redirecting...',
        'success-tax': 'Tax ID saved, redirecting...',
        'error': 'Error',
        'auth-error': 'Authentication Error',
        'invalid-credentials': 'Invalid username or password.',
        'connection-error': 'Connection Error',
        'connection-error-msg': 'Unable to connect to server. Please try again later.',
        'network-error': 'Network error. Please check your internet connection.',
        'timeout-error': 'Connection timeout. Please try again.',
        'invalid-redirect': 'Error',
        'invalid-redirect-msg': 'Invalid redirect URL.',
    }
};

// Get current language
let currentLanguage = localStorage.getItem('selectedLanguage') || 'vi';

document.addEventListener('DOMContentLoaded', () => {
    // [BẢO MẬT] URL của Google Apps Script để xác thực
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQMxpnrXHUQsf0Vo8Uos6hajXYXFIsfCaFiH8mGOgWwww7Gc5hFR54NczPaIs6EhPJ/exec';

    // Lưu reference để tránh query DOM nhiều lần
    const container = document.getElementById('container');
    const corpBtn = document.getElementById('corp-btn');
    const partnerBtn = document.getElementById('partner-btn');
    const partnerForm = document.getElementById('partner-form');
    const corpForm = document.getElementById('corp-form');
    const guideModal = document.getElementById('guide-modal');
    const guideBtnLeft = document.getElementById('guide-btn-left');
    const guideBtnRight = document.getElementById('guide-btn-right');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const langBtns = document.querySelectorAll('.lang-btn');

    /**
     * =========================
     * LANGUAGE SWITCHER
     * =========================
     */
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    function switchLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);

        // Update active button
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Update all text elements
        updatePageTranslations(lang);
    }

    function updatePageTranslations(lang) {
        const trans = translations[lang];

        // Partner Form
        document.querySelector('.lang-partner-user-placeholder')?.setAttribute('placeholder', trans['partner-user-placeholder']);
        document.querySelector('.lang-partner-pass-placeholder')?.setAttribute('placeholder', trans['partner-pass-placeholder']);
        document.querySelector('.lang-partner-login-btn').textContent = trans['partner-login-btn'];
        document.querySelector('.lang-partner-title').textContent = trans['partner-title'];

        // Corp Form
        document.querySelector('.lang-corp-tax-placeholder')?.setAttribute('placeholder', trans['corp-tax-placeholder']);
        document.querySelector('.lang-corp-submit-btn').textContent = trans['corp-submit-btn'];
        document.querySelector('.lang-corp-title').textContent = trans['corp-title'];

        // Overlay
        document.querySelector('.lang-welcome-partner').textContent = trans['welcome-partner'];
        document.querySelector('.lang-welcome-partner-desc').textContent = trans['welcome-partner-desc'];
        document.querySelector('.lang-partner-btn').textContent = trans['partner-btn'];
        document.querySelector('.lang-welcome-corp').textContent = trans['welcome-corp'];
        document.querySelector('.lang-welcome-corp-desc').textContent = trans['welcome-corp-desc'];
        document.querySelector('.lang-corp-btn').textContent = trans['corp-btn'];
        document.querySelectorAll('.lang-guide-btn').forEach(el => {
            el.textContent = trans['guide-btn'];
        });

        // Guide Modal
        document.querySelector('.lang-guide-title').textContent = trans['guide-title'];
        document.querySelector('.lang-homepage').textContent = trans['homepage'];
        document.querySelector('.lang-guide-part1').textContent = trans['guide-part1'];
        document.querySelector('.lang-guide-part1-desc').textContent = trans['guide-part1-desc'];
        document.querySelector('.lang-guide-part1-step1').innerHTML = trans['guide-part1-step1'];
        document.querySelector('.lang-guide-part1-step2').innerHTML = trans['guide-part1-step2'];
        
        document.querySelector('.lang-guide-part2').textContent = trans['guide-part2'];
        document.querySelector('.lang-guide-part2-desc').textContent = trans['guide-part2-desc'];

        // Column 1
        document.querySelector('.lang-guide-col1-title').textContent = trans['guide-col1-title'];
        document.querySelector('.lang-guide-col1-name').textContent = trans['guide-col1-name'];
        document.querySelector('.lang-guide-col1-name-desc').textContent = trans['guide-col1-name-desc'];
        document.querySelector('.lang-guide-col1-email').textContent = trans['guide-col1-email'];
        document.querySelector('.lang-guide-col1-email-desc').textContent = trans['guide-col1-email-desc'];
        document.querySelector('.lang-guide-col1-phone').textContent = trans['guide-col1-phone'];
        document.querySelector('.lang-guide-col1-phone-desc').textContent = trans['guide-col1-phone-desc'];
        document.querySelector('.lang-guide-col1-company').textContent = trans['guide-col1-company'];
        document.querySelector('.lang-guide-col1-company-desc').textContent = trans['guide-col1-company-desc'];
        document.querySelector('.lang-guide-col1-company-note').textContent = trans['guide-col1-company-note'];
        document.querySelector('.lang-guide-col1-region').textContent = trans['guide-col1-region'];
        document.querySelector('.lang-guide-col1-region-desc').textContent = trans['guide-col1-region-desc'];
        document.querySelector('.lang-guide-col1-tax').textContent = trans['guide-col1-tax'];
        document.querySelector('.lang-guide-col1-tax-desc').textContent = trans['guide-col1-tax-desc'];
        document.querySelector('.lang-guide-col1-tax-note').textContent = trans['guide-col1-tax-note'];

        // Column 2
        document.querySelector('.lang-guide-col2-title').textContent = trans['guide-col2-title'];
        document.querySelector('.lang-guide-col2-user').textContent = trans['guide-col2-user'];
        document.querySelector('.lang-guide-col2-user-desc').textContent = trans['guide-col2-user-desc'];
        document.querySelector('.lang-guide-col2-imei').textContent = trans['guide-col2-imei'];
        document.querySelector('.lang-guide-col2-imei-desc').textContent = trans['guide-col2-imei-desc'];
        document.querySelector('.lang-guide-col2-imei-note').textContent = trans['guide-col2-imei-note'];
        document.querySelector('.lang-guide-col2-from').textContent = trans['guide-col2-from'];
        document.querySelector('.lang-guide-col2-from-desc').textContent = trans['guide-col2-from-desc'];
        document.querySelector('.lang-guide-col2-to').textContent = trans['guide-col2-to'];
        document.querySelector('.lang-guide-col2-to-desc').textContent = trans['guide-col2-to-desc'];
        document.querySelector('.lang-guide-col2-country').textContent = trans['guide-col2-country'];
        document.querySelector('.lang-guide-col2-country-desc').textContent = trans['guide-col2-country-desc'];
        document.querySelector('.lang-guide-col2-plan').textContent = trans['guide-col2-plan'];
        document.querySelector('.lang-guide-col2-plan-desc').textContent = trans['guide-col2-plan-desc'];
        document.querySelector('.lang-guide-col2-multi').textContent = trans['guide-col2-multi'];
        document.querySelector('.lang-guide-col2-multi-desc').innerHTML = trans['guide-col2-multi-desc'];

        // Column 3
        document.querySelector('.lang-guide-col3-title').textContent = trans['guide-col3-title'];
        document.querySelector('.lang-guide-col3-receiver').textContent = trans['guide-col3-receiver'];
        document.querySelector('.lang-guide-col3-receiver-desc').textContent = trans['guide-col3-receiver-desc'];
        document.querySelector('.lang-guide-col3-phone').textContent = trans['guide-col3-phone'];
        document.querySelector('.lang-guide-col3-phone-desc').textContent = trans['guide-col3-phone-desc'];
        document.querySelector('.lang-guide-col3-address').textContent = trans['guide-col3-address'];
        document.querySelector('.lang-guide-col3-address-desc').textContent = trans['guide-col3-address-desc'];
        document.querySelector('.lang-guide-col3-date').textContent = trans['guide-col3-date'];
        document.querySelector('.lang-guide-col3-date-desc').textContent = trans['guide-col3-date-desc'];
        document.querySelector('.lang-guide-col3-method').textContent = trans['guide-col3-method'];
        document.querySelector('.lang-guide-col3-method-desc').textContent = trans['guide-col3-method-desc'];

        // Part 3
        document.querySelector('.lang-guide-part3').textContent = trans['guide-part3'];
        document.querySelector('.lang-guide-part3-step1').textContent = trans['guide-part3-step1'];
        document.querySelector('.lang-guide-part3-step1-desc').textContent = trans['guide-part3-step1-desc'];
        document.querySelector('.lang-guide-part3-step2').textContent = trans['guide-part3-step2'];
        document.querySelector('.lang-guide-part3-step2-desc').innerHTML = trans['guide-part3-step2-desc'];
    }

    // Initialize language on load
    document.addEventListener('DOMContentLoaded', () => {
        switchLanguage(currentLanguage);
    });

    /**
     * =========================
     * 1. Chuyển qua lại form
     * =========================
     */
    const toggleForm = (isActive) => {
        if (isActive) {
            container.classList.add('right-panel-active');
        } else {
            container.classList.remove('right-panel-active');
        }
    };

    if (corpBtn) {
        corpBtn.addEventListener('click', () => toggleForm(true));
    }

    if (partnerBtn) {
        partnerBtn.addEventListener('click', () => toggleForm(false));
    }

    /**
     * =========================
     * 2. Đăng nhập Đối tác (BẢO MẬT)
     * =========================
     */
    if (partnerForm) {
        partnerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const userInput = document.getElementById('partner-user');
            const passInput = document.getElementById('partner-pass');
            const submitBtn = partnerForm.querySelector('button[type="submit"]');

            const user = userInput.value.trim().toUpperCase();
            const pass = passInput.value.trim();
            const trans = translations[currentLanguage];

            // Validation cơ bản client-side
            if (!user || !pass) {
                Swal.fire(trans['missing-info'], trans['login-required'], 'warning');
                return;
            }

            // Khóa nút để tránh spam
            if (submitBtn) submitBtn.disabled = true;

            // Hiển thị loading
            Swal.fire({
                title: trans['authenticating'],
                text: trans['authenticating-desc'],
                icon: 'info',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
                // Gửi request tới Google Script
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'text/plain;charset=utf-8',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({
                        action: 'login',
                        username: user,
                        password: pass
                    }),
                    timeout: 10000
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                // Xóa dữ liệu nhạy cảm
                userInput.value = '';
                passInput.value = '';

                if (result.status === 'OK' && result.redirect) {
                    // Thành công
                    Swal.fire({
                        title: trans['success'],
                        text: trans['success-login'],
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        const redirectUrl = result.redirect;
                        if (isValidUrl(redirectUrl)) {
                            window.location.href = redirectUrl;
                        } else {
                            console.error('Invalid redirect URL');
                            Swal.fire(trans['invalid-redirect'], trans['invalid-redirect-msg'], 'error');
                        }
                    });
                } else {
                    // Lỗi xác thực
                    const errorMsg = result.message || trans['invalid-credentials'];
                    Swal.fire(trans['auth-error'], errorMsg, 'error');
                }
            } catch (error) {
                console.error('Lỗi đăng nhập:', error);
                
                let errorMsg = trans['connection-error-msg'];
                
                if (error.name === 'TypeError') {
                    errorMsg = trans['network-error'];
                } else if (error.message.includes('timeout')) {
                    errorMsg = trans['timeout-error'];
                }
                
                Swal.fire(trans['connection-error'], errorMsg, 'error');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    /**
     * =========================
     * 3. Đăng nhập Doanh nghiệp
     * =========================
     */
    if (corpForm) {
        corpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const corpTaxInput = document.getElementById('corp-tax-code');
            const code = corpTaxInput.value.trim();
            const submitBtn = corpForm.querySelector('button[type="submit"]');
            const trans = translations[currentLanguage];

            // Validation
            if (!code) {
                Swal.fire(trans['missing-info'], trans['login-required'], 'warning');
                return;
            }

            // Format MST (chỉ số)
            if (!/^\d+$/.test(code)) {
                Swal.fire(trans['invalid-tax'], trans['invalid-tax-msg'], 'warning');
                return;
            }

            if (submitBtn) submitBtn.disabled = true;

            // Lưu MST vào sessionStorage
            sessionStorage.setItem('corpTaxCode', code);

            Swal.fire({
                title: trans['success'],
                text: trans['success-tax'],
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = './Corporate/Index.html';
            });
        });
    }

    /**
     * =========================
     * 4. Modal Hướng dẫn
     * =========================
     */
    const openModal = () => {
        if (guideModal) {
            guideModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (guideModal) {
            guideModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    if (guideBtnLeft) guideBtnLeft.addEventListener('click', openModal);
    if (guideBtnRight) guideBtnRight.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (guideModal) {
        guideModal.addEventListener('click', (event) => {
            if (event.target === guideModal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && guideModal && guideModal.classList.contains('active')) {
            closeModal();
        }
    });

    /**
     * =========================
     * 5. Utility Functions
     * =========================
     */
    function isValidUrl(url) {
        try {
            const urlObj = new URL(url, window.location.origin);
            return urlObj.origin === window.location.origin || url.startsWith('./') || url.startsWith('/');
        } catch {
            return false;
        }
    }

    window.addEventListener('beforeunload', () => {
        if (partnerForm) {
            document.getElementById('partner-user').value = '';
            document.getElementById('partner-pass').value = '';
        }
    });

}); // End DOMContentLoaded