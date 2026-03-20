/* === FILE: login.js (Phiên bản ĐÃ BẢO MẬT BẰNG GOOGLE SCRIPT) === */

document.addEventListener('DOMContentLoaded', () => {
  // [BẢO MẬT] URL của Google Apps Script để xác thực (Thay bằng URL Deploy mới nhất của bạn nếu cần)
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQMxpnrXHUQsf0Vo8Uos6hajXYXFIsfCaFiH8mGOgWwww7Gc5hFR54NczPaIs6EhPJ/exec';

  const container = document.getElementById('container');
  const corpBtn = document.getElementById('corp-btn');
  const partnerBtn = document.getElementById('partner-btn');
  const partnerForm = document.getElementById('partner-form');
  const corpForm = document.getElementById('corp-form');

  /**
   * =========================
   * 1. Chuyển qua lại form (Giữ nguyên)
   * =========================
   */
  if (corpBtn) {
    corpBtn.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });
  }

  if (partnerBtn) {
    partnerBtn.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  /**
   * =========================
   * 2. Đăng nhập Đối tác (ĐÃ BẢO MẬT - KHÔNG CÒN LỘ MẬT KHẨU)
   * =========================
   */
  if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = document.getElementById('partner-user').value.trim().toUpperCase(); // Tự động in hoa để khớp Backend
      const pass = document.getElementById('partner-pass').value.trim();
      const submitBtn = partnerForm.querySelector('button[type="submit"]');

      // Khóa nút đăng nhập để tránh khách bấm nhiều lần
      if(submitBtn) submitBtn.disabled = true;

      // Hiển thị thông báo "Đang tải"
      Swal.fire({
        title: 'Đang xác thực...',
        text: 'Vui lòng chờ hệ thống kiểm tra.',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        // Gửi thông tin sang Google Script để kiểm tra chéo
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ 
                action: 'login', 
                username: user, 
                password: pass 
            })
        });

        const result = await response.json();

        if (result.status === 'OK') {
          // ĐĂNG NHẬP ĐÚNG -> Backend trả về đường dẫn chính xác
          Swal.fire({
            title: 'Thành công!',
            text: 'Đăng nhập thành công, đang chuyển hướng...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            window.location.href = result.redirect; // Link an toàn do Google cấp (vd: HIS/index.html)
          });
        } else {
          // ĐĂNG NHẬP SAI
          Swal.fire('Lỗi', result.message || 'Tài khoản hoặc mật khẩu không đúng.', 'error');
        }
      } catch (error) {
          console.error("Lỗi đăng nhập:", error);
          Swal.fire('Lỗi kết nối', 'Không thể kết nối đến máy chủ xác thực. Vui lòng thử lại sau.', 'error');
      } finally {
          if(submitBtn) submitBtn.disabled = false; // Mở lại nút
      }
    });
  }

  /**
   * =========================
   * 3. Đăng nhập Doanh nghiệp (Trả về nguyên bản theo code của bạn)
   * =========================
   */
  if (corpForm) {
    corpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('corp-tax-code').value.trim();
      if (!code) {
        Swal.fire('Thiếu thông tin', 'Vui lòng nhập mã số thuế doanh nghiệp.', 'warning');
        return;
      }
      
      // Lưu lại MST để form bên trong thư mục Corporate có thể gọi ra dùng
      sessionStorage.setItem('corpTaxCode', code);
      
      Swal.fire({
        title: 'Xác nhận!',
        text: 'Đã lưu mã số thuế, đang chuyển hướng...',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.href = './Corporate/Index.html';
      });
    });
  }
  
  // --- PHẦN JS CỦA POP-UP HƯỚNG DẪN (GIỮ NGUYÊN) ---
  const guideModal = document.getElementById('guide-modal');
  const guideBtnLeft = document.getElementById('guide-btn-left');
  const guideBtnRight = document.getElementById('guide-btn-right');
  const closeModalBtn = document.getElementById('modal-close-btn');

  const openModal = () => {
    if (guideModal) guideModal.style.display = 'flex';
  };
  const closeModal = () => {
    if (guideModal) guideModal.style.display = 'none';
  };

  if (guideBtnLeft && guideBtnRight && closeModalBtn) {
    guideBtnLeft.addEventListener('click', openModal);
    guideBtnRight.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
  }
  if (guideModal) {
    guideModal.addEventListener('click', (event) => {
      if (event.target === guideModal) closeModal();
    });
  }
  
}); // Kết thúc 'DOMContentLoaded'