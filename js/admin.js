(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────── */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function showToast(msg, type) {
    var existing = document.querySelector('.admin-toast');
    if (existing) existing.remove();
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;'
      + 'padding:13px 20px;border-radius:10px;font-size:.875rem;font-weight:600;'
      + 'box-shadow:0 8px 24px rgba(0,0,0,.25);color:#fff;opacity:0;'
      + 'transition:opacity .25s ease,transform .25s ease;transform:translateY(8px);';
    t.style.background = type === 'error' ? '#e74c3c' : '#1a2535';
    t.className = 'admin-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () {
      t.style.opacity = '1';
      t.style.transform = 'translateY(0)';
    });
    setTimeout(function () {
      t.style.opacity = '0';
      t.style.transform = 'translateY(8px)';
      setTimeout(function () { t.remove(); }, 300);
    }, 3000);
  }

  /* ── session ──────────────────────────────────────────── */
  function isLoggedIn() {
    return localStorage.getItem('admin_session') === 'true';
  }

  function getCredentials() {
    return {
      user: localStorage.getItem('admin_username') || 'admin',
      pass: localStorage.getItem('admin_password') || 'alliance2026'
    };
  }

  function login() {
    var user = $('l-user').value.trim();
    var pass = $('l-pass').value;
    var creds = getCredentials();
    if (user === creds.user && pass === creds.pass) {
      localStorage.setItem('admin_session', 'true');
      $('login-screen').style.display = 'none';
      $('admin-dashboard').classList.remove('hidden');
      $('admin-dashboard').style.display = 'flex';
      switchTab('dashboard');
    } else {
      $('login-error').style.display = 'block';
    }
  }

  function handleLogout() {
    localStorage.removeItem('admin_session');
    $('admin-dashboard').style.display = 'none';
    $('admin-dashboard').classList.add('hidden');
    $('login-screen').style.display = 'flex';
    $('l-user').value = '';
    $('l-pass').value = '';
    $('login-error').style.display = 'none';
  }

  /* ── tab switching ────────────────────────────────────── */
  var TAB_TITLES = {
    dashboard: 'Dashboard',
    doctors: 'Doctor Photos',
    equipment: 'Equipment Images',
    announcements: 'Announcements',
    settings: 'Settings'
  };

  window.switchTab = function (name) {
    document.querySelectorAll('.admin-tab').forEach(function (el) {
      el.classList.remove('active');
    });
    document.querySelectorAll('.sidebar-link[data-tab]').forEach(function (el) {
      el.classList.remove('active');
    });

    var tab = $('tab-' + name);
    if (tab) tab.classList.add('active');

    var link = document.querySelector('.sidebar-link[data-tab="' + name + '"]');
    if (link) link.classList.add('active');

    var title = $('tab-title');
    if (title) title.textContent = TAB_TITLES[name] || name;

    if (name === 'dashboard')     renderDashboard();
    if (name === 'doctors')       renderDoctors();
    if (name === 'equipment')     renderEquipment();
    if (name === 'announcements') renderAnnouncements();
  };

  /* ── dashboard stats ──────────────────────────────────── */
  function renderDashboard() {
    var photoCount = 0;
    if (typeof DOCTORS !== 'undefined') {
      DOCTORS.forEach(function (d) {
        if (localStorage.getItem('doctor_photo_' + d.id)) photoCount++;
      });
    }
    var equipCount = ['xray', 'ultrasound', 'endoscopy', 'ct'].filter(function (k) {
      return !!localStorage.getItem('equip_img_' + k);
    }).length;

    var anns = getAnnouncements();
    var pubCount = anns.filter(function (a) { return a.published; }).length;
    var total = typeof DOCTORS !== 'undefined' ? DOCTORS.length : 42;

    var container = $('dash-stats');
    if (!container) return;
    container.innerHTML = [
      { val: photoCount + '/' + total, lbl: 'Doctor Photos', sub: 'photos uploaded', col: '#0057a8' },
      { val: equipCount + '/4',        lbl: 'Equipment',      sub: 'images uploaded', col: '#00a878' },
      { val: anns.length,              lbl: 'Announcements',  sub: 'total created',   col: '#8e44ad' },
      { val: pubCount,                 lbl: 'Published',      sub: 'visible to public', col: '#f39c12' }
    ].map(function (s) {
      return '<div class="stat-card">'
        + '<div class="stat-label">' + s.lbl + '</div>'
        + '<div class="stat-value" style="color:' + s.col + '">' + s.val + '</div>'
        + '<div class="stat-sub">' + s.sub + '</div>'
        + '</div>';
    }).join('');
  }

  /* ── doctor photos ────────────────────────────────────── */
  var doctorFilter = { dept: '', q: '' };

  function updateProgress() {
    if (typeof DOCTORS === 'undefined') return;
    var total = DOCTORS.length;
    var done  = 0;
    DOCTORS.forEach(function (d) {
      if (localStorage.getItem('doctor_photo_' + d.id)) done++;
    });
    var pct = total ? Math.round((done / total) * 100) : 0;
    var fill = $('progress-fill');
    var lbl  = $('progress-label');
    if (fill) fill.style.width = pct + '%';
    if (lbl)  lbl.textContent  = done + ' / ' + total + ' photos uploaded (' + pct + '%)';
  }

  function renderDoctors() {
    var grid = $('admin-doctors-grid');
    if (!grid || typeof DOCTORS === 'undefined') return;

    var list = DOCTORS.filter(function (d) {
      var matchDept = !doctorFilter.dept || d.dept === doctorFilter.dept;
      var q = doctorFilter.q.toLowerCase();
      var matchQ = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
      return matchDept && matchQ;
    });

    grid.innerHTML = list.map(function (d) {
      var photo = localStorage.getItem('doctor_photo_' + d.id);
      var gradient = typeof deptGradient === 'function'
        ? deptGradient(d.dept)
        : 'linear-gradient(135deg,#0057a8,#003f7a)';
      var initials = typeof getInitials === 'function' ? getInitials(d.name) : d.name.slice(0,2).toUpperCase();

      var photoArea = photo
        ? '<div class="admin-doc-photo" style="background:#0a1020">'
          + '<img src="' + photo + '" alt="' + esc(d.name) + '">'
          + '<span class="admin-doc-status">✓ Photo</span>'
          + '</div>'
        : '<div class="admin-doc-photo" style="background:' + gradient + '">'
          + '<div class="photo-initials">' + initials + '</div>'
          + '</div>';

      var removeBtn = photo
        ? '<button class="btn-remove-photo" onclick="removeDocPhoto(' + d.id + ')">✕</button>'
        : '';

      return '<div class="admin-doc-card' + (photo ? ' has-photo' : '') + '" id="adoc-' + d.id + '">'
        + photoArea
        + '<div class="admin-doc-body">'
        + '<div class="admin-doc-name">' + esc(d.name) + '</div>'
        + '<div class="admin-doc-spec">' + esc(d.specialty) + '</div>'
        + '<div class="admin-doc-dept">' + esc(d.dept) + '</div>'
        + '<div class="admin-doc-actions">'
        + '<label class="btn-upload-photo">'
        + (photo ? '⟳ Change' : '↑ Upload')
        + '<input type="file" accept="image/*" onchange="uploadDocPhoto(' + d.id + ',this)">'
        + '</label>'
        + removeBtn
        + '</div>'
        + '</div>'
        + '</div>';
    }).join('');

    /* populate dept filter once */
    var deptSel = $('doc-dept-filter');
    if (deptSel && deptSel.options.length <= 1 && typeof DEPARTMENTS !== 'undefined') {
      DEPARTMENTS.forEach(function (dep) {
        var opt = document.createElement('option');
        opt.value = dep.name;
        opt.textContent = dep.name;
        deptSel.appendChild(opt);
      });
    }

    updateProgress();
  }

  window.uploadDocPhoto = function (id, input) {
    if (!input.files || !input.files[0]) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem('doctor_photo_' + id, e.target.result);
      renderDoctors();
      showToast('Photo saved for doctor #' + id);
    };
    reader.readAsDataURL(input.files[0]);
  };

  window.removeDocPhoto = function (id) {
    localStorage.removeItem('doctor_photo_' + id);
    renderDoctors();
    showToast('Photo removed');
  };

  /* ── equipment images ─────────────────────────────────── */
  var EQUIP_LABELS = { xray: 'X-Ray Machine', ultrasound: 'Ultrasound', endoscopy: 'Endoscopy', ct: 'CT Scanner' };

  function renderEquipment() {
    var grid = $('admin-equip-grid');
    if (!grid) return;

    var keys = ['xray', 'ultrasound', 'endoscopy', 'ct'];
    grid.innerHTML = keys.map(function (k) {
      var img    = localStorage.getItem('equip_img_' + k);
      var hasSvg = typeof EQUIP_SVG !== 'undefined' && EQUIP_SVG[k];

      var previewContent;
      if (img) {
        previewContent = '<img src="' + img + '" alt="' + esc(EQUIP_LABELS[k]) + '">'
          + '<span class="equip-badge" style="background:#27ae60;color:#fff">✓ Custom</span>';
      } else if (hasSvg) {
        previewContent = EQUIP_SVG[k]
          + '<span class="equip-badge" style="background:rgba(0,0,0,.5);color:#fff">SVG</span>';
      } else {
        previewContent = '<div class="equip-placeholder"><div class="ep-icon">🏥</div></div>';
      }

      var removeBtn = img
        ? '<button class="btn-equip-remove" onclick="removeEquipImg(\'' + k + '\')">Remove</button>'
        : '';

      return '<div class="admin-equip-card' + (img ? ' has-image' : '') + '">'
        + '<div class="admin-equip-preview" style="position:relative">' + previewContent + '</div>'
        + '<div class="equip-body-admin">'
        + '<h4>' + esc(EQUIP_LABELS[k]) + '</h4>'
        + '<div class="equip-status-label">'
        + '<span class="equip-status-dot" style="background:' + (img ? '#27ae60' : '#94a3b8') + '"></span>'
        + (img ? 'Custom photo uploaded' : 'Showing default illustration')
        + '</div>'
        + '<div class="equip-actions">'
        + '<label class="btn-equip-upload">'
        + (img ? '⟳ Replace Image' : '↑ Upload Image')
        + '<input type="file" accept="image/*" onchange="uploadEquipImg(\'' + k + '\',this)">'
        + '</label>'
        + removeBtn
        + '</div>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  window.uploadEquipImg = function (key, input) {
    if (!input.files || !input.files[0]) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem('equip_img_' + key, e.target.result);
      renderEquipment();
      renderDashboard();
      showToast('Image saved for ' + EQUIP_LABELS[key]);
    };
    reader.readAsDataURL(input.files[0]);
  };

  window.removeEquipImg = function (key) {
    localStorage.removeItem('equip_img_' + key);
    renderEquipment();
    renderDashboard();
    showToast('Image removed');
  };

  /* ── announcements ────────────────────────────────────── */
  function getAnnouncements() {
    try { return JSON.parse(localStorage.getItem('announcements') || '[]'); }
    catch (e) { return []; }
  }
  function saveAnnouncements(arr) {
    localStorage.setItem('announcements', JSON.stringify(arr));
  }

  var editingAnnId = null;

  function renderAnnouncements() {
    var list = $('admin-ann-list');
    if (!list) return;
    var anns = getAnnouncements();

    if (!anns.length) {
      list.innerHTML = '<div style="text-align:center;color:#6b7280;padding:40px 20px">No announcements yet. Create your first one above.</div>';
      return;
    }

    anns = anns.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    list.innerHTML = anns.map(function (a) {
      var dateStr = new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      var pubLabel = a.published ? '✓ Published' : '○ Draft';
      var pubColor = a.published ? '#27ae60' : '#94a3b8';
      var urgBadge = a.urgent ? '<span class="ann-urgent-chip">🔴 Urgent</span>&nbsp;' : '';

      return '<div class="admin-ann-item' + (a.published ? '' : ' unpublished') + '" id="ann-item-' + a.id + '">'
        + '<span class="ann-item-badge" style="background:#0057a8">' + esc(a.category) + '</span>'
        + '<div class="ann-item-content">'
        + '<div class="ann-item-title">' + urgBadge + esc(a.title) + '</div>'
        + '<div class="ann-item-meta">'
        + '<span>' + dateStr + '</span>'
        + '<span style="color:' + pubColor + ';font-weight:600">' + pubLabel + '</span>'
        + '</div>'
        + '</div>'
        + '<div class="ann-item-actions">'
        + '<button class="btn-ann-edit" onclick="editAnnouncement(\'' + a.id + '\')">Edit</button>'
        + '<button class="btn-ann-toggle" onclick="togglePublish(\'' + a.id + '\')" style="'
        + (a.published ? 'background:#fef9c3;color:#b45309;border-color:#fde68a' : 'background:#dcfce7;color:#15803d;border-color:#86efac')
        + '">' + (a.published ? 'Unpublish' : 'Publish') + '</button>'
        + '<button class="btn-ann-delete" onclick="deleteAnnouncement(\'' + a.id + '\')">Delete</button>'
        + '</div>'
        + '</div>';
    }).join('');
  }

  window.saveAnnouncement = function () {
    var title   = $('af-title').value.trim();
    var content = $('af-content').value.trim();
    var category = $('af-cat').value;
    var urgent  = $('af-urgent').checked;
    var publish = $('af-published').checked;

    if (!title || !content) { showToast('Title and content are required', 'error'); return; }

    var anns = getAnnouncements();
    if (editingAnnId) {
      var idx = anns.findIndex(function (a) { return a.id === editingAnnId; });
      if (idx !== -1) {
        anns[idx].title = title; anns[idx].content = content;
        anns[idx].category = category; anns[idx].urgent = urgent;
        anns[idx].published = publish; anns[idx].date = new Date().toISOString();
      }
      showToast('Announcement updated');
    } else {
      anns.push({ id: 'ann_' + Date.now(), title: title, content: content,
        category: category, urgent: urgent, published: publish, date: new Date().toISOString() });
      showToast('Announcement saved');
    }

    saveAnnouncements(anns);
    hideAnnForm();
    renderAnnouncements();
    renderDashboard();
  };

  window.editAnnouncement = function (id) {
    var a = getAnnouncements().find(function (x) { return x.id === id; });
    if (!a) return;
    editingAnnId = id;
    $('af-title').value    = a.title;
    $('af-content').value  = a.content;
    $('af-cat').value      = a.category;
    $('af-urgent').checked = a.urgent;
    $('af-published').checked = a.published;
    var lbl = $('ann-form-title'); if (lbl) lbl.textContent = 'Edit Announcement';
    var btn = $('ann-save-btn');   if (btn) btn.textContent  = 'Update Announcement';
    showAnnForm();
  };

  window.deleteAnnouncement = function (id) {
    if (!confirm('Delete this announcement?')) return;
    saveAnnouncements(getAnnouncements().filter(function (a) { return a.id !== id; }));
    renderAnnouncements(); renderDashboard();
    showToast('Deleted');
  };

  window.togglePublish = function (id) {
    var anns = getAnnouncements();
    var idx  = anns.findIndex(function (a) { return a.id === id; });
    if (idx === -1) return;
    anns[idx].published = !anns[idx].published;
    saveAnnouncements(anns);
    renderAnnouncements(); renderDashboard();
    showToast(anns[idx].published ? 'Published' : 'Unpublished');
  };

  function showAnnForm() {
    var panel = $('ann-form-panel');
    if (panel) { panel.classList.remove('hidden'); panel.style.display = ''; }
  }
  function hideAnnForm() {
    editingAnnId = null;
    var panel = $('ann-form-panel');
    if (panel) { panel.classList.add('hidden'); }
    $('af-title').value = '';
    $('af-content').value = '';
    $('af-cat').value = 'News';
    $('af-urgent').checked = false;
    $('af-published').checked = true;
    var lbl = $('ann-form-title'); if (lbl) lbl.textContent = 'New Announcement';
    var btn = $('ann-save-btn');   if (btn) btn.textContent  = 'Save Announcement';
  }

  window.cancelAnnEdit = function () { hideAnnForm(); };

  /* ── settings ─────────────────────────────────────────── */
  window.changePassword = function () {
    var current = $('s-cur-pass').value;
    var newPass  = $('s-new-pass').value;
    var confirm  = $('s-conf-pass').value;
    var creds = getCredentials();
    if (current !== creds.pass) { showToast('Current password incorrect', 'error'); return; }
    if (newPass.length < 6)     { showToast('Min 6 characters', 'error'); return; }
    if (newPass !== confirm)     { showToast('Passwords do not match', 'error'); return; }
    localStorage.setItem('admin_password', newPass);
    $('s-cur-pass').value = ''; $('s-new-pass').value = ''; $('s-conf-pass').value = '';
    showToast('Password updated');
  };

  window.clearDoctorPhotos = function () {
    if (!confirm('Remove all uploaded doctor photos?')) return;
    if (typeof DOCTORS !== 'undefined') {
      DOCTORS.forEach(function (d) { localStorage.removeItem('doctor_photo_' + d.id); });
    }
    renderDashboard(); showToast('Doctor photos cleared');
  };

  window.clearEquipImages = function () {
    if (!confirm('Remove all equipment images?')) return;
    ['xray','ultrasound','endoscopy','ct'].forEach(function (k) { localStorage.removeItem('equip_img_' + k); });
    renderDashboard(); showToast('Equipment images cleared');
  };

  window.clearAnnouncements = function () {
    if (!confirm('Delete ALL announcements?')) return;
    localStorage.removeItem('announcements');
    renderAnnouncements(); renderDashboard(); showToast('Announcements cleared');
  };

  /* ── init ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    if (isLoggedIn()) {
      $('login-screen').style.display = 'none';
      $('admin-dashboard').classList.remove('hidden');
      $('admin-dashboard').style.display = 'flex';
      switchTab('dashboard');
    }

    /* login form */
    var loginForm = $('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) { e.preventDefault(); login(); });
    }

    /* sidebar nav */
    document.querySelectorAll('.sidebar-link[data-tab]').forEach(function (el) {
      el.addEventListener('click', function () {
        var tab = el.getAttribute('data-tab');
        if (tab) switchTab(tab);
      });
    });

    /* logout */
    var lb = $('logout-btn');
    if (lb) lb.addEventListener('click', handleLogout);

    /* doctor search/filter */
    var docSearch = $('doc-search');
    if (docSearch) docSearch.addEventListener('input', function () { doctorFilter.q = this.value; renderDoctors(); });

    var docDept = $('doc-dept-filter');
    if (docDept) docDept.addEventListener('change', function () { doctorFilter.dept = this.value; renderDoctors(); });

    /* new announcement button */
    var newAnnBtn = $('new-ann-btn');
    if (newAnnBtn) {
      newAnnBtn.addEventListener('click', function () {
        hideAnnForm();
        showAnnForm();
        $('af-title').focus();
      });
    }

    /* ann form buttons */
    var saveBtn = $('ann-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', window.saveAnnouncement);
    var cancelBtn = $('ann-cancel-btn');
    if (cancelBtn) cancelBtn.addEventListener('click', hideAnnForm);
  });

})();
