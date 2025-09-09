// script.js

document.addEventListener('DOMContentLoaded', () => {
  const SCRIPT_URL    = 'https://script.google.com/macros/s/AKfycbxCEzp3E_n1B167Lfg4wfgoY1YMGTX9pPXwoU92EDZY5haOlxhjcIZdAt789qKfM86v/exec';
  const UNIT_NAME     = 'CorporateOrders';
  const PACKAGE_LIST  = ['500MB/ngày', '1GB/ngày', '5GB/ngày'];
  const PRICE_TABLE   = window.PRICE_TABLE || {};
  const form          = document.getElementById('wifi-form');
  const taxInput      = document.getElementById('sender-taxcode');
  const regionSelect  = document.getElementById('sender-region');
  const discMsg       = document.getElementById('discount-message');
  const addBtn        = document.getElementById('add-request-btn');
  const reqContainer  = document.getElementById('rental-requests-container');
  let requestIndex    = 0;

  // 1. Lấy chiết khấu
  async function fetchDiscount(tax) {
    if (!tax) {
      discMsg.textContent = '';
      return;
    }
    discMsg.textContent = 'Đang lấy chiết khấu…';
    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({action:'getDiscount', taxCode:tax})
      });
      const json = await res.json();
      discMsg.textContent = (json.result==='success')
        ? `Chiết khấu của bạn: ${json.discount}%`
        : 'Không tìm thấy chiết khấu (0%).';
    } catch {
      discMsg.textContent = 'Lỗi tải chiết khấu.';
    }
  }
  taxInput.addEventListener('blur', () =>
    fetchDiscount(taxInput.value.trim())
  );

  // 2. Tạo block “Đơn thuê”
  function createRequestBlock(idx) {
    const wrapper = document.createElement('div');
    wrapper.className = 'grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-lg relative';
    wrapper.dataset.idx = idx;
    wrapper.innerHTML = `
      <button type="button" class="remove-btn absolute top-2 right-2 text-red-600">✕</button>
      <div>
        <label class="block font-semibold mb-1">Ngày bắt đầu</label>
        <input type="date" name="startDate" class="input-base" required>
      </div>
      <div>
        <label class="block font-semibold mb-1">Ngày kết thúc</label>
        <input type="date" name="endDate" class="input-base" required>
      </div>
      <div>
        <label class="block font-semibold mb-1">Số lượng</label>
        <input type="number" name="quantity" min="1" value="1" class="input-base" required>
      </div>
      <div>
        <label class="block font-semibold mb-1">Gói Data</label>
        <select name="package" class="input-base package-select" required>
          <option value="">-- Chọn gói --</option>
          ${PACKAGE_LIST.map(p => `<option value="${p}">${p}</option>`).join('')}
        </select>
        <div class="price-info-highlight mt-2 hidden"></div>
      </div>
    `;

    // Remove
    wrapper.querySelector('.remove-btn')
      .addEventListener('click', () => wrapper.remove());

    // Choices & tính giá
    wrapper.querySelectorAll('.package-select').forEach(sel => {
      new Choices(sel, {searchEnabled:false, itemSelectText:''});
      sel.addEventListener('change', () => {
        const region = regionSelect.value;
        const pkg    = sel.value;
        const priceEl= wrapper.querySelector('.price-info-highlight');
        if (region && pkg && PRICE_TABLE[region]?.[pkg]!=null) {
          priceEl.textContent = `Giá: ${PRICE_TABLE[region][pkg].toLocaleString()} VND`;
          priceEl.classList.remove('hidden');
        } else {
          priceEl.textContent = '';
          priceEl.classList.add('hidden');
        }
      });
    });

    return wrapper;
  }

  // 3. Thêm đơn
  addBtn.addEventListener('click', () => {
    requestIndex++;
    reqContainer.appendChild(createRequestBlock(requestIndex));
  });

  // 4. Submit form
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const taxCode = taxInput.value.trim();
    if (!taxCode) {
      return Swal.fire('Thiếu thông tin','Nhập Mã số thuế.','warning');
    }
    const blocks = Array.from(reqContainer.children);
    if (blocks.length === 0) {
      return Swal.fire('Thiếu đơn','Thêm ít nhất một đơn thuê.','warning');
    }

    // Build rentalRequests
    const rentalRequests = blocks.map(b => ({
      startDate: b.querySelector('[name=startDate]').value,
      endDate:   b.querySelector('[name=endDate]').value,
      quantity:  b.querySelector('[name=quantity]').value,
      package:   b.querySelector('[name=package]').value
    }));

    // Payload đầy đủ
    const payload = {
      unit:             UNIT_NAME,
      action:           'submitCorporateForm',
      senderName:       form['sender-name'].value.trim(),
      senderEmail:      form['sender-email'].value.trim(),
      senderPhone:      form['sender-phone'].value.trim(),
      senderCompany:    form['sender-company'].value.trim(),
      senderRegion:     regionSelect.value,
      senderTaxCode:    taxCode,
      discount:         discMsg.textContent.match(/\d+/)?.[0]||0,
      rentalRequests,
      shippingRecipient: form['shipping-recipient'].value.trim(),
      shippingPhone:     form['shipping-phone'].value.trim(),
      shippingAddress:   form['shipping-address'].value.trim(),
      shippingDate:      form['shipping-date'].value,
      shippingMethod:    form['shipping-method'].value,
      submissionTime:    new Date().toISOString()
    };

    try {
      Swal.fire({title:'Đang gửi…',didOpen:Swal.showLoading,allowOutsideClick:false});
      const res  = await fetch(SCRIPT_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      Swal.close();
      if (json.result==='success') {
        Swal.fire('Thành công','Yêu cầu đã ghi nhận!','success');
        form.reset();
        reqContainer.innerHTML = '';
        discMsg.textContent = '';
      } else {
        Swal.fire('Lỗi',json.error||'Không thể gửi yêu cầu.','error');
      }
    } catch {
      Swal.fire('Lỗi','Không kết nối server.','error');
    }
  });
});
