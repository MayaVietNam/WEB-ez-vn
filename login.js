/* === FILE: login.js (TRÊN WEBSITE CỦA BẠN) === */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const corpBtn = document.getElementById('corp-btn');
  const partnerBtn = document.getElementById('partner-btn');
  const partnerForm = document.getElementById('partner-form');
  const corpForm = document.getElementById('corp-form');

  // [QUAN TRỌNG] Dán URL ứng dụng web bạn nhận được ở Bước 1 vào đây
  const LOGIN_SCRIPT_URL = 'https://script.google.com/macros/s/xxxxxxxxxxxx/exec';

  /**
   * =========================
   * 1. Chuyển qua lại form
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
   * 2. Đăng nhập Đối tác (ĐÃ SỬA BẢO MẬT)
   * =========================
   */
  if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = document.getElementById('partner-user').value;
      const pass = document.getElementById('partner-pass').value;

      // Hiển thị thông báo "Đang tải"
      Swal.fire({
        title: 'Đang đăng nhập...',
        text: 'Vui lòng chờ trong giây lát.',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        // Gửi thông tin đến Google Apps Script
        const response = await fetch(LOGIN_SCRIPT_URL, {
          method: 'POST',
          mode: 'cors', 
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify({ user: user, pass: pass })
        });

        const result = await response.json();

        // Xử lý kết quả trả về từ Google Apps Script
        if (result.success) {
          // Thành công!
          Swal.fire({
            title: 'Thành công!',
            text: 'Đăng nhập thành công, đang chuyển hướng...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            window.location.href = result.url; // Chuyển hướng đến URL mà server trả về
          });
        } else {
          // Thất bại (sai pass, sai user)
          Swal.fire('Lỗi', result.message, 'error');
        }

      } catch (err) {
        // Lỗi mạng hoặc lỗi server
        Swal.fire('Lỗi nghiêm trọng', 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.', 'error');
      }
    });
  }

  /**
   * =========================
   * 3. Đăng nhập Doanh nghiệp (Giữ nguyên)
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