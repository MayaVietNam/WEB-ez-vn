/* === FILE: login.js (Phiên bản ĐÃ BẢO MẬT & TỐI ƯU) === */

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

      // Validation cơ bản client-side
      if (!user || !pass) {
        Swal.fire('Thiếu thông tin', 'Vui lòng nhập tài khoản và mật khẩu.', 'warning');
        return;
      }

      // Khóa nút để tránh spam
      if (submitBtn) submitBtn.disabled = true;

      // Hiển thị loading
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
          timeout: 10000 // Timeout 10 giây
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
            title: 'Thành công!',
            text: 'Đăng nhập thành công, đang chuyển hướng...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            // Redirect an toàn
            const redirectUrl = result.redirect;
            if (isValidUrl(redirectUrl)) {
              window.location.href = redirectUrl;
            } else {
              console.error('Invalid redirect URL');
              Swal.fire('Lỗi', 'Đường dẫn chuyển hướng không hợp lệ.', 'error');
            }
          });
        } else {
          // Lỗi xác thực
          const errorMsg = result.message || 'Tài khoản hoặc mật khẩu không đúng.';
          Swal.fire('Lỗi xác thực', errorMsg, 'error');
        }
      } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        
        // Phân loại lỗi
        let errorMsg = 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.';
        
        if (error.name === 'TypeError') {
          errorMsg = 'Lỗi mạng. Kiểm tra kết nối internet.';
        } else if (error.message.includes('timeout')) {
          errorMsg = 'Kết nối timeout. Vui lòng thử lại.';
        }
        
        Swal.fire('Lỗi kết nối', errorMsg, 'error');
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

      // Validation
      if (!code) {
        Swal.fire('Thiếu thông tin', 'Vui lòng nhập mã số thuế doanh nghiệp.', 'warning');
        return;
      }

      // Format MST (chỉ số)
      if (!/^\d+$/.test(code)) {
        Swal.fire('Lỗi định dạng', 'Mã số thuế chỉ được chứa số.', 'warning');
        return;
      }

      if (submitBtn) submitBtn.disabled = true;

      // Lưu MST vào sessionStorage
      sessionStorage.setItem('corpTaxCode', code);

      Swal.fire({
        title: 'Xác nhận!',
        text: 'Đã lưu mã số thuế, đang chuyển hướng...',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // Redirect an toàn
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
      document.body.style.overflow = 'hidden'; // Ngăn scroll
    }
  };

  const closeModal = () => {
    if (guideModal) {
      guideModal.classList.remove('active');
      document.body.style.overflow = 'auto'; // Cho phép scroll lại
    }
  };

  // Event listeners cho modal
  if (guideBtnLeft) guideBtnLeft.addEventListener('click', openModal);
  if (guideBtnRight) guideBtnRight.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Đóng modal khi click ngoài
  if (guideModal) {
    guideModal.addEventListener('click', (event) => {
      if (event.target === guideModal) closeModal();
    });
  }

  // Đóng modal khi bấm ESC
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

  /**
   * Kiểm tra URL có hợp lệ không (bảo vệ chống Open Redirect)
   */
  function isValidUrl(url) {
    try {
      const urlObj = new URL(url, window.location.origin);
      // Chỉ cho phép relative URLs hoặc same-origin URLs
      return urlObj.origin === window.location.origin || url.startsWith('./') || url.startsWith('/');
    } catch {
      return false;
    }
  }

  /**
   * Clear sensitive data khi user rời khỏi trang
   */
  window.addEventListener('beforeunload', () => {
    if (partnerForm) {
      document.getElementById('partner-user').value = '';
      document.getElementById('partner-pass').value = '';
    }
  });

}); // End DOMContentLoaded