// ===== CONFIG =====
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQMxpnrXHUQsf0Vo8Uos6hajXYXFIsfCaFiH8mGOgWwww7Gc5hFR54NczPaIs6EhPJ/exec';
const ACCOUNTS = {
    'TOYOTA': 'TMV-MAYA-2025',
    'YAMAHA': '0123456789',
    'MITSUBISHI': '0987654321',
    'SUMITOMO': 'SUMI2026',
    'HIS_USER': 'MAYAVIETNAM'
};

let currentUnit = null;
let currentStep = 1;
let rentalRequests = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkAuthentication();
});

function setupEventListeners() {
    // Login
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    
    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    
    // Form submission
    document.getElementById('rental-form')?.addEventListener('submit', handleFormSubmit);
    
    // Modal
    document.querySelector('.modal-close')?.addEventListener('click', closeRentalModal);
    document.getElementById('rental-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'rental-modal') closeRentalModal();
    });
}

// ===== LOGIN ===== 
async function handleLogin(e) {
    e.preventDefault();
    
    const unit = document.getElementById('unit-select').value;
    const password = document.getElementById('password-input').value;
    
    if (!unit || !password) {
        Swal.fire('Lỗi', 'Vui lòng chọn công ty và nhập mật khẩu', 'warning');
        return;
    }
    
    if (ACCOUNTS[unit] !== password) {
        Swal.fire('Lỗi', 'Mật khẩu không chính xác', 'error');
        return;
    }
    
    currentUnit = unit;
    Cookies.set('currentUnit', unit, { expires: 7 });
    Cookies.set('authTime', new Date().toISOString(), { expires: 7 });
    
    showFormPage();
}

function logout() {
    Swal.fire({
        title: 'Đăng xuất',
        text: 'Bạn chắc chắn muốn đăng xuất?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Đăng xuất',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            Cookies.remove('currentUnit');
            Cookies.remove('authTime');
            location.reload();
        }
    });
}

function checkAuthentication() {
    const unit = Cookies.get('currentUnit');
    if (unit) {
        currentUnit = unit;
        showFormPage();
    }
}

// ===== PAGE NAVIGATION =====
function showFormPage() {
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('form-page').classList.add('active');
    rentalRequests = [];
    addRentalRequest();
}

function nextStep() {
    if (validateStep(currentStep)) {
        currentStep++;
        updateProgress();
        scrollToTop();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgress();
        scrollToTop();
    }
}

function updateProgress() {
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`.form-step[data-step="${currentStep}"]`)?.classList.add('active');
    
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`.progress-step[data-step="${currentStep}"]`)?.classList.add('active');
    
    if (currentStep === 4) {
        generateConfirmation();
    }
}

function validateStep(step) {
    const form = document.getElementById('rental-form');
    const inputs = document.querySelectorAll(`.form-step[data-step="${step}"] input[required], .form-step[data-step="${step}"] select[required]`);
    
    for (let input of inputs) {
        if (!input.value.trim()) {
            Swal.fire('Lỗi', `Vui lòng điền: ${input.previousElementSibling?.textContent || 'trường này'}`, 'warning');
            input.focus();
            return false;
        }
    }
    
    return true;
}

function scrollToTop() {
    document.querySelector('.form-main').scrollTop = 0;
}

// ===== RENTAL REQUESTS =====
function addRentalRequest() {
    openRentalModal();
}

function openRentalModal() {
    document.getElementById('rental-modal').classList.add('active');
}

function closeRentalModal() {
    document.getElementById('rental-modal').classList.remove('active');
    document.querySelectorAll('#rental-modal input, #rental-modal select').forEach(el => el.value = '');
}

function saveRentalRequest() {
    const userName = document.getElementById('modal_userName').value.trim();
    const fromDate = document.getElementById('modal_fromDate').value;
    const toDate = document.getElementById('modal_toDate').value;
    const country = document.getElementById('modal_country').value;
    const dataPackage = document.getElementById('modal_dataPackage').value.trim();
    const unitPrice = parseFloat(document.getElementById('modal_unitPrice').value) || 0;
    
    if (!userName || !fromDate || !toDate || !country || !dataPackage || unitPrice <= 0) {
        Swal.fire('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc', 'warning');
        return;
    }
    
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (to <= from) {
        Swal.fire('Lỗi', 'Ngày kết thúc phải sau ngày bắt đầu', 'warning');
        return;
    }
    
    const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
    
    const request = {
        userName,
        imei: document.getElementById('modal_imei').value.trim(),
        fromDate,
        toDate,
        days,
        country,
        dataPackage,
        unitPrice,
        insurance: parseFloat(document.getElementById('modal_insurance').value) || 0,
        insuranceCost: parseFloat(document.getElementById('modal_insurance').value) || 0
    };
    
    rentalRequests.push(request);
    renderRentalCards();
    closeRentalModal();
}

function renderRentalCards() {
    const container = document.getElementById('rental-requests-container');
    
    if (rentalRequests.length === 0) {
        container.innerHTML = '<p style="color: var(--gray); text-align: center;">Chưa có đơn đặt nào</p>';
        return;
    }
    
    container.innerHTML = rentalRequests.map((req, idx) => `
        <div class="rental-card">
            <div class="rental-card-header">
                <span class="rental-card-title">Đơn ${idx + 1}: ${req.userName} ${req.imei ? '/ ' + req.imei : ''}</span>
                <div class="rental-card-actions">
                    <button type="button" class="btn-secondary" onclick="deleteRentalRequest(${idx})">🗑️ Xóa</button>
                </div>
            </div>
            <div class="rental-card-info">
                <div><strong>Ngày:</strong> ${req.fromDate} → ${req.toDate} (${req.days} ngày)</div>
                <div><strong>Quốc gia:</strong> ${req.country}</div>
                <div><strong>Gói:</strong> ${req.dataPackage}</div>
                <div><strong>Giá:</strong> ${formatCurrency(req.unitPrice)}/ngày</div>
                <div><strong>Bảo hiểm:</strong> ${formatCurrency(req.insurance)}</div>
                <div><strong>Tổng tiền:</strong> ${formatCurrency(req.unitPrice * req.days + req.insurance)}</div>
            </div>
        </div>
    `).join('');
}

function deleteRentalRequest(idx) {
    rentalRequests.splice(idx, 1);
    renderRentalCards();
}

// ===== CONFIRMATION =====
function generateConfirmation() {
    const formData = new FormData(document.getElementById('rental-form'));
    const discounts = Cookies.get('discounts') ? JSON.parse(Cookies.get('discounts')) : {};
    const taxCode = formData.get('sender_tax_code');
    const discountPercent = discounts[taxCode] || 0;
    
    let totalCost = 0;
    let requestsHTML = '';
    
    rentalRequests.forEach((req, idx) => {
        const dataCost = req.unitPrice * req.days;
        const insuranceCost = req.insurance || 0;
        const subtotal = dataCost + insuranceCost;
        const discount = Math.round(subtotal * discountPercent);
        const afterDiscount = subtotal - discount;
        const vat = Math.round(afterDiscount * 0.1);
        const total = afterDiscount + vat;
        
        totalCost += total;
        
        requestsHTML += `
            <div class="confirmation-section">
                <h3>📦 Đơn ${idx + 1}: ${req.userName}</h3>
                <div class="confirmation-item">
                    <span>Thời gian:</span>
                    <strong>${req.fromDate} → ${req.toDate} (${req.days} ngày)</strong>
                </div>
                <div class="confirmation-item">
                    <span>Quốc gia / Gói:</span>
                    <strong>${req.country} / ${req.dataPackage}</strong>
                </div>
                <div class="confirmation-item">
                    <span>Tiền thuê:</span>
                    <strong>${formatCurrency(req.unitPrice * req.days)}</strong>
                </div>
                <div class="confirmation-item">
                    <span>Bảo hiểm:</span>
                    <strong>${formatCurrency(insuranceCost)}</strong>
                </div>
                ${discountPercent > 0 ? `<div class="confirmation-item"><span>Giảm giá (${(discountPercent*100).toFixed(0)}%):</span><strong style="color: var(--green);">-${formatCurrency(discount)}</strong></div>` : ''}
                <div class="confirmation-item">
                    <span>VAT (10%):</span>
                    <strong>${formatCurrency(vat)}</strong>
                </div>
                <div class="confirmation-item" style="border-top: 2px solid var(--primary); padding-top: 8px; font-size: 14px; margin-top: 8px;">
                    <span><strong>Tổng cộng:</strong></span>
                    <strong style="color: var(--red); font-size: 16px;">${formatCurrency(total)}</strong>
                </div>
            </div>
        `;
    });
    
    const shippingMethod = formData.get('shipping_method');
    let shippingFee = 0;
    if (shippingMethod === 'Chuyển phát nhanh' && currentUnit !== 'SUMITOMO') {
        shippingFee = 50000;
    }
    
    const finalTotal = totalCost + shippingFee;
    
    const confirmationBox = document.getElementById('confirmation-summary');
    confirmationBox.innerHTML = `
        <div class="confirmation-section">
            <h3>👤 Thông tin người gửi</h3>
            <div class="confirmation-item">
                <span>Họ tên:</span>
                <strong>${formData.get('sender_name')}</strong>
            </div>
            <div class="confirmation-item">
                <span>Email:</span>
                <strong>${formData.get('sender_email')}</strong>
            </div>
            <div class="confirmation-item">
                <span>Công ty:</span>
                <strong>${formData.get('sender_company')}</strong>
            </div>
        </div>
        
        ${requestsHTML}
        
        ${shippingMethod ? `
            <div class="confirmation-section">
                <h3>🚚 Vận chuyển</h3>
                <div class="confirmation-item">
                    <span>Người nhận:</span>
                    <strong>${formData.get('shipping_recipient')}</strong>
                </div>
                <div class="confirmation-item">
                    <span>Địa chỉ:</span>
                    <strong>${formData.get('shipping_address')}</strong>
                </div>
                <div class="confirmation-item">
                    <span>Phương thức:</span>
                    <strong>${shippingMethod}</strong>
                </div>
                ${shippingFee > 0 ? `<div class="confirmation-item"><span>Phí vận chuyển:</span><strong>${formatCurrency(shippingFee)}</strong></div>` : ''}
            </div>
        ` : ''}
        
        <div class="confirmation-section" style="background: rgba(220, 38, 38, 0.1); padding: 15px; border-radius: 8px; margin-top: 15px;">
            <div style="font-size: 18px; color: var(--red); font-weight: 800;">
                💰 TỔNG THANH TOÁN: ${formatCurrency(finalTotal)}
            </div>
        </div>
    `;
}

// ===== FORM SUBMISSION =====
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (rentalRequests.length === 0) {
        Swal.fire('Lỗi', 'Vui lòng thêm ít nhất 1 đơn đặt', 'warning');
        return;
    }
    
    const formData = new FormData(document.getElementById('rental-form'));
    
    const submitData = {
        unit: currentUnit,
        submissionTime: new Date().toISOString(),
        globalSenderInfo: {
            name: formData.get('sender_name'),
            email: formData.get('sender_email'),
            phone: formData.get('sender_phone'),
            company: formData.get('sender_company'),
            region: formData.get('sender_region'),
            taxCode: formData.get('sender_tax_code')
        },
        shippingInfo: {
            recipient: formData.get('shipping_recipient'),
            phone: formData.get('shipping_phone'),
            address: formData.get('shipping_address'),
            date: formData.get('shipping_date'),
            method: formData.get('shipping_method')
        },
        rentalRequests: rentalRequests
    };
    
    try {
        const btn = document.getElementById('submit-btn');
        btn.disabled = true;
        btn.textContent = '⏳ Đang gửi...';
        
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(submitData)
        });
        
        const result = await response.json();
        
        if (result.status === 'OK') {
            Swal.fire({
                title: '✅ Thành công!',
                text: 'Đơn đặt của bạn đã được gửi. Vui lòng kiểm tra email để xác nhận.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                location.reload();
            });
        } else {
            Swal.fire('Lỗi', result.message || 'Có lỗi xảy ra', 'error');
            btn.disabled = false;
            btn.textContent = '📤 Gửi Đơn Đặt';
        }
    } catch (error) {
        Swal.fire('Lỗi', 'Không thể kết nối đến server', 'error');
        btn.disabled = false;
        btn.textContent = '📤 Gửi Đơn Đặt';
    }
}

// ===== UTILITIES =====
function formatCurrency(value) {
    if (typeof value !== 'number' || isNaN(value)) return '-';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
}