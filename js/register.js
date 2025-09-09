document.addEventListener('DOMContentLoaded', () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
  const form = document.getElementById('registration-form');
  const taxCodeInput = document.getElementById('tax-code');
  const companyNameInput = document.getElementById('company-name');
  const companyAddressInput = document.getElementById('company-address');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const loadingSpinner = document.getElementById('loading-spinner');

  let lookupTimeout;
  taxCodeInput.addEventListener('input', () => {
    clearTimeout(lookupTimeout);
    const code = taxCodeInput.value.trim();
    if (code.length >= 10) {
      lookupTimeout = setTimeout(() => fetchCompanyInfo(code), 500);
    }
  });

  async function fetchCompanyInfo(taxCode) {
    Swal.fire({
      title: 'Đang tra cứu thông tin...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });
    try {
      const res = await fetch(`https://api.vietqr.io/v2/business/${taxCode}`);
      if (!res.ok) throw new Error('Không thể kết nối đến dịch vụ tra cứu.');
      const result = await res.json();
      if (result.code === '00' && result.data) {
        companyNameInput.value = result.data.name || '';
        companyAddressInput.value = result.data.address || '';
      } else {
        throw new Error(result.message || 'Không tìm thấy thông tin công ty.');
      }
    } catch (err) {
      Swal.fire('Lỗi Tra Cứu', err.message, 'error');
    } finally {
      Swal.close();
    }
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    setSubmitState(false);

    const payload = {
      isRegistration: true,
      registrationData: {
        taxCode: taxCodeInput.value.trim(),
        company: companyNameInput.value.trim(),
        address: companyAddressInput.value.trim(),
        password: document.getElementById('password').value
      }
    };

    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.result === 'success') {
        await Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
          text: 'Chuyển về trang đăng nhập…',
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true
        });
        window.location.href = '../index.html';
      } else {
        throw new Error(result.error || 'Lỗi không xác định.');
      }
    } catch (err) {
      Swal.fire('Lỗi Đăng Ký', err.message, 'error');
    } finally {
      setSubmitState(true);
    }
  });

  function setSubmitState(enabled) {
    submitBtn.disabled = !enabled;
    loadingSpinner.classList.toggle('hidden', enabled);
    submitText.style.display = enabled ? 'inline' : 'none';
  }
});
