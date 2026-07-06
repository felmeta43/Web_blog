(function () {
  'use strict';

  /* ── helpers ──────────────────────────────────────────── */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function val(id) { var el = $(id); return el ? el.value : ''; }
  function setVal(id, v) { var el = $(id); if (el) el.value = v || ''; }

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
    requestAnimationFrame(function () { t.style.opacity='1'; t.style.transform='translateY(0)'; });
    setTimeout(function () {
      t.style.opacity='0'; t.style.transform='translateY(8px)';
      setTimeout(function () { t.remove(); }, 300);
    }, 3000);
  }

  /* ── session ──────────────────────────────────────────── */
  function isLoggedIn() { return localStorage.getItem('admin_session') === 'true'; }

  function getCredentials() {
    return { user: localStorage.getItem('admin_username') || 'admin',
             pass: localStorage.getItem('admin_password') || 'alliance2026' };
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
    dashboard:      'Dashboard',
    doctors:        'Doctor Photos',
    equipment:      'Equipment Images',
    announcements:  'Announcements',
    branding:       'Branding',
    'about-editor': 'About Page',
    'contact-editor':'Contact Info',
    'blog-editor':  'Blog Articles',
    settings:       'Settings'
  };

  window.switchTab = function (name) {
    document.querySelectorAll('.admin-tab').forEach(function (el) { el.classList.remove('active'); });
    document.querySelectorAll('.sidebar-link[data-tab]').forEach(function (el) { el.classList.remove('active'); });
    var tab  = $('tab-' + name); if (tab) tab.classList.add('active');
    var link = document.querySelector('.sidebar-link[data-tab="' + name + '"]');
    if (link) link.classList.add('active');
    var title = $('tab-title'); if (title) title.textContent = TAB_TITLES[name] || name;

    if (name === 'dashboard')     renderDashboard();
    if (name === 'doctors')       renderDoctors();
    if (name === 'equipment')     renderEquipment();
    if (name === 'announcements') renderAnnouncements();
    if (name === 'branding')      renderBranding();
    if (name === 'about-editor')  renderAboutEditor();
    if (name === 'contact-editor')renderContactEditor();
    if (name === 'blog-editor')   renderBlogEditor();
  };

  /* ── dashboard stats ──────────────────────────────────── */
  function renderDashboard() {
    var photoCount = 0;
    if (typeof DOCTORS !== 'undefined') {
      DOCTORS.forEach(function (d) { if (localStorage.getItem('doctor_photo_'+d.id)) photoCount++; });
    }
    var equipCount = ['xray','ultrasound','endoscopy','ct'].filter(function(k){
      return !!localStorage.getItem('equip_img_'+k);
    }).length;
    var anns    = getAnnouncements();
    var pubAnn  = anns.filter(function(a){ return a.published; }).length;
    var posts   = getCustomPosts();
    var total   = typeof DOCTORS !== 'undefined' ? DOCTORS.length : 42;

    var container = $('dash-stats');
    if (!container) return;
    container.innerHTML = [
      { val: photoCount+'/'+total, lbl: 'Doctor Photos',  sub: 'photos uploaded',  col: '#0057a8' },
      { val: equipCount+'/4',      lbl: 'Equipment',       sub: 'images uploaded',  col: '#00a878' },
      { val: anns.length,          lbl: 'Announcements',   sub: pubAnn+' published',col: '#8e44ad' },
      { val: posts.length,         lbl: 'Custom Articles', sub: 'blog posts added', col: '#c0392b' }
    ].map(function(s){
      return '<div class="stat-card"><div class="stat-label">'+s.lbl+'</div>'
        +'<div class="stat-value" style="color:'+s.col+'">'+s.val+'</div>'
        +'<div class="stat-sub">'+s.sub+'</div></div>';
    }).join('');
  }

  /* ── doctor photos ────────────────────────────────────── */
  var doctorFilter = { dept: '', q: '' };

  function updateProgress() {
    if (typeof DOCTORS === 'undefined') return;
    var total = DOCTORS.length, done = 0;
    DOCTORS.forEach(function(d){ if (localStorage.getItem('doctor_photo_'+d.id)) done++; });
    var pct = total ? Math.round((done/total)*100) : 0;
    var fill = $('progress-fill'), lbl = $('progress-label');
    if (fill) fill.style.width = pct+'%';
    if (lbl)  lbl.textContent  = done+' / '+total+' photos uploaded ('+pct+'%)';
  }

  function renderDoctors() {
    var grid = $('admin-doctors-grid');
    if (!grid || typeof DOCTORS === 'undefined') return;
    var list = DOCTORS.filter(function(d){
      var matchDept = !doctorFilter.dept || d.dept === doctorFilter.dept;
      var q = doctorFilter.q.toLowerCase();
      return matchDept && (!q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q));
    });
    grid.innerHTML = list.map(function(d){
      var photo    = localStorage.getItem('doctor_photo_'+d.id);
      var gradient = typeof deptGradient === 'function' ? deptGradient(d.dept) : 'linear-gradient(135deg,#0057a8,#003f7a)';
      var initials = typeof getInitials === 'function' ? getInitials(d.name) : d.name.slice(0,2).toUpperCase();
      var photoArea = photo
        ? '<div class="admin-doc-photo" style="background:#0a1020"><img src="'+photo+'" alt="'+esc(d.name)+'"><span class="admin-doc-status">✓ Photo</span></div>'
        : '<div class="admin-doc-photo" style="background:'+gradient+'"><div class="photo-initials">'+initials+'</div></div>';
      var removeBtn = photo ? '<button class="btn-remove-photo" onclick="removeDocPhoto('+d.id+')">✕</button>' : '';
      return '<div class="admin-doc-card'+(photo?' has-photo':'')+'" id="adoc-'+d.id+'">'
        +photoArea+'<div class="admin-doc-body">'
        +'<div class="admin-doc-name">'+esc(d.name)+'</div>'
        +'<div class="admin-doc-spec">'+esc(d.specialty)+'</div>'
        +'<div class="admin-doc-dept">'+esc(d.dept)+'</div>'
        +'<div class="admin-doc-actions">'
        +'<label class="btn-upload-photo">'+(photo?'⟳ Change':'↑ Upload')
        +'<input type="file" accept="image/*" onchange="uploadDocPhoto('+d.id+',this)"></label>'
        +removeBtn+'</div></div></div>';
    }).join('');
    var deptSel = $('doc-dept-filter');
    if (deptSel && deptSel.options.length <= 1 && typeof DEPARTMENTS !== 'undefined') {
      DEPARTMENTS.forEach(function(dep){
        var opt = document.createElement('option');
        opt.value = dep.name; opt.textContent = dep.name; deptSel.appendChild(opt);
      });
    }
    updateProgress();
  }

  window.uploadDocPhoto = function(id, input) {
    if (!input.files || !input.files[0]) return;
    var r = new FileReader();
    r.onload = function(e){
      localStorage.setItem('doctor_photo_'+id, e.target.result);
      renderDoctors(); showToast('Photo saved for doctor #'+id);
    };
    r.readAsDataURL(input.files[0]);
  };
  window.removeDocPhoto = function(id){
    localStorage.removeItem('doctor_photo_'+id); renderDoctors(); showToast('Photo removed');
  };

  /* ── equipment images ─────────────────────────────────── */
  var EQUIP_LABELS = { xray:'X-Ray Machine', ultrasound:'Ultrasound', endoscopy:'Endoscopy', ct:'CT Scanner' };

  function renderEquipment() {
    var grid = $('admin-equip-grid');
    if (!grid) return;
    grid.innerHTML = ['xray','ultrasound','endoscopy','ct'].map(function(k){
      var img = localStorage.getItem('equip_img_'+k);
      var hasSvg = typeof EQUIP_SVG !== 'undefined' && EQUIP_SVG[k];
      var previewContent = img
        ? '<img src="'+img+'" alt="'+esc(EQUIP_LABELS[k])+'"><span class="equip-badge" style="background:#27ae60;color:#fff;position:absolute;top:8px;right:8px;font-size:.65rem;font-weight:700;padding:3px 8px;border-radius:999px">✓ Custom</span>'
        : (hasSvg ? EQUIP_SVG[k] : '<div class="equip-placeholder"><div class="ep-icon">🏥</div></div>');
      var removeBtn = img ? '<button class="btn-equip-remove" onclick="removeEquipImg(\''+k+'\')">Remove</button>' : '';
      return '<div class="admin-equip-card'+(img?' has-image':'')+'">'
        +'<div class="admin-equip-preview" style="position:relative">'+previewContent+'</div>'
        +'<div class="equip-body-admin"><h4>'+esc(EQUIP_LABELS[k])+'</h4>'
        +'<div class="equip-status-label">'
        +'<span class="equip-status-dot" style="background:'+(img?'#27ae60':'#94a3b8')+'"></span>'
        +(img?'Custom photo uploaded':'Showing default illustration')+'</div>'
        +'<div class="equip-actions">'
        +'<label class="btn-equip-upload">'+(img?'⟳ Replace Image':'↑ Upload Image')
        +'<input type="file" accept="image/*" onchange="uploadEquipImg(\''+k+'\',this)"></label>'
        +removeBtn+'</div></div></div>';
    }).join('');
  }

  window.uploadEquipImg = function(key, input){
    if (!input.files || !input.files[0]) return;
    var r = new FileReader();
    r.onload = function(e){
      localStorage.setItem('equip_img_'+key, e.target.result);
      renderEquipment(); renderDashboard(); showToast('Image saved for '+EQUIP_LABELS[key]);
    };
    r.readAsDataURL(input.files[0]);
  };
  window.removeEquipImg = function(key){
    localStorage.removeItem('equip_img_'+key); renderEquipment(); renderDashboard(); showToast('Image removed');
  };

  /* ── announcements ────────────────────────────────────── */
  function getAnnouncements(){
    try{ return JSON.parse(localStorage.getItem('announcements')||'[]'); }catch(e){ return []; }
  }
  function saveAnnouncements(arr){ localStorage.setItem('announcements', JSON.stringify(arr)); }

  var editingAnnId = null;

  function renderAnnouncements(){
    var list = $('admin-ann-list');
    if (!list) return;
    var anns = getAnnouncements();
    if (!anns.length){
      list.innerHTML='<div style="text-align:center;color:#6b7280;padding:40px 20px">No announcements yet. Create your first one above.</div>';
      return;
    }
    anns = anns.slice().sort(function(a,b){ return new Date(b.date)-new Date(a.date); });
    list.innerHTML = anns.map(function(a){
      var dateStr = new Date(a.date).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'});
      var pubLabel = a.published?'✓ Published':'○ Draft';
      var pubColor = a.published?'#27ae60':'#94a3b8';
      var urgBadge = a.urgent?'<span class="ann-urgent-chip">🔴 Urgent</span>&nbsp;':'';
      return '<div class="admin-ann-item'+(a.published?'':' unpublished')+'" id="ann-item-'+a.id+'">'
        +'<span class="ann-item-badge" style="background:#0057a8">'+esc(a.category)+'</span>'
        +'<div class="ann-item-content"><div class="ann-item-title">'+urgBadge+esc(a.title)+'</div>'
        +'<div class="ann-item-meta"><span>'+dateStr+'</span>'
        +'<span style="color:'+pubColor+';font-weight:600">'+pubLabel+'</span></div></div>'
        +'<div class="ann-item-actions">'
        +'<button class="btn-ann-edit" onclick="editAnnouncement(\''+a.id+'\')">Edit</button>'
        +'<button class="btn-ann-toggle" onclick="togglePublish(\''+a.id+'\')" style="'
        +(a.published?'background:#fef9c3;color:#b45309;border-color:#fde68a':'background:#dcfce7;color:#15803d;border-color:#86efac')
        +'">'+(a.published?'Unpublish':'Publish')+'</button>'
        +'<button class="btn-ann-delete" onclick="deleteAnnouncement(\''+a.id+'\')">Delete</button>'
        +'</div></div>';
    }).join('');
  }

  window.saveAnnouncement = function(){
    var title = $('af-title').value.trim(), content = $('af-content').value.trim();
    var category = $('af-cat').value, urgent = $('af-urgent').checked, publish = $('af-published').checked;
    if (!title||!content){ showToast('Title and content are required','error'); return; }
    var anns = getAnnouncements();
    if (editingAnnId){
      var idx = anns.findIndex(function(a){ return a.id===editingAnnId; });
      if (idx!==-1){ anns[idx].title=title; anns[idx].content=content; anns[idx].category=category;
        anns[idx].urgent=urgent; anns[idx].published=publish; anns[idx].date=new Date().toISOString(); }
      showToast('Announcement updated');
    } else {
      anns.push({ id:'ann_'+Date.now(), title:title, content:content, category:category,
        urgent:urgent, published:publish, date:new Date().toISOString() });
      showToast('Announcement saved');
    }
    saveAnnouncements(anns); hideAnnForm(); renderAnnouncements(); renderDashboard();
  };

  window.editAnnouncement = function(id){
    var a = getAnnouncements().find(function(x){ return x.id===id; }); if (!a) return;
    editingAnnId = id;
    $('af-title').value=a.title; $('af-content').value=a.content; $('af-cat').value=a.category;
    $('af-urgent').checked=a.urgent; $('af-published').checked=a.published;
    var lbl=$('ann-form-title'); if(lbl) lbl.textContent='Edit Announcement';
    var btn=$('ann-save-btn');   if(btn) btn.textContent='Update Announcement';
    showAnnForm();
  };

  window.deleteAnnouncement = function(id){
    if (!confirm('Delete this announcement?')) return;
    saveAnnouncements(getAnnouncements().filter(function(a){ return a.id!==id; }));
    renderAnnouncements(); renderDashboard(); showToast('Deleted');
  };

  window.togglePublish = function(id){
    var anns=getAnnouncements(), idx=anns.findIndex(function(a){ return a.id===id; });
    if (idx===-1) return;
    anns[idx].published=!anns[idx].published; saveAnnouncements(anns);
    renderAnnouncements(); renderDashboard();
    showToast(anns[idx].published?'Published':'Unpublished');
  };

  function showAnnForm(){
    var panel=$('ann-form-panel'); if(panel){ panel.classList.remove('hidden'); panel.style.display=''; }
  }
  function hideAnnForm(){
    editingAnnId=null;
    var panel=$('ann-form-panel'); if(panel) panel.classList.add('hidden');
    $('af-title').value=''; $('af-content').value=''; $('af-cat').value='News';
    $('af-urgent').checked=false; $('af-published').checked=true;
    var lbl=$('ann-form-title'); if(lbl) lbl.textContent='New Announcement';
    var btn=$('ann-save-btn');   if(btn) btn.textContent='Save Announcement';
  }
  window.cancelAnnEdit = function(){ hideAnnForm(); };

  /* ── BRANDING ─────────────────────────────────────────── */
  function renderBranding(){
    setVal('b-name-p1', localStorage.getItem('brand_name_p1'));
    setVal('b-name-p2', localStorage.getItem('brand_name_p2'));
    setVal('b-icon',    localStorage.getItem('brand_logo_icon') || '✚');
    setVal('b-tagline', localStorage.getItem('brand_tagline'));
    updateBrandPreview();
  }

  function updateBrandPreview(){
    var p1    = val('b-name-p1') || 'Alliance';
    var p2    = val('b-name-p2') || 'Hospital';
    var icon  = val('b-icon')    || '✚';
    var img   = localStorage.getItem('brand_logo_img');
    var previewIcon = $('brand-preview-icon');
    var previewP1   = $('brand-preview-p1');
    var previewP2   = $('brand-preview-p2');
    var logoPreview = $('b-logo-preview');
    if (previewIcon) previewIcon.innerHTML = img ? '<img src="'+img+'">' : esc(icon);
    if (previewP1)   previewP1.textContent  = p1;
    if (previewP2)   previewP2.textContent  = p2;
    if (logoPreview) logoPreview.innerHTML  = img ? '<img src="'+img+'" style="width:100%;height:100%;object-fit:contain">' : esc(icon);
  }

  window.saveBranding = function(){
    var p1 = val('b-name-p1'), p2 = val('b-name-p2'), icon = val('b-icon'), tagline = val('b-tagline');
    if (p1) localStorage.setItem('brand_name_p1', p1); else localStorage.removeItem('brand_name_p1');
    if (p2) localStorage.setItem('brand_name_p2', p2); else localStorage.removeItem('brand_name_p2');
    if (icon) localStorage.setItem('brand_logo_icon', icon); else localStorage.removeItem('brand_logo_icon');
    if (tagline) localStorage.setItem('brand_tagline', tagline); else localStorage.removeItem('brand_tagline');
    updateBrandPreview(); showToast('Branding saved — reload any page to see changes');
  };

  window.uploadLogoImg = function(input){
    if (!input.files||!input.files[0]) return;
    var r = new FileReader();
    r.onload = function(e){
      localStorage.setItem('brand_logo_img', e.target.result);
      updateBrandPreview(); showToast('Logo image saved');
    };
    r.readAsDataURL(input.files[0]);
  };
  window.removeLogoImg = function(){
    localStorage.removeItem('brand_logo_img'); updateBrandPreview(); showToast('Logo image removed');
  };

  /* ── ABOUT PAGE EDITOR ────────────────────────────────── */
  function renderAboutEditor(){
    setVal('ab-mission', localStorage.getItem('about_mission'));
    setVal('ab-vision',  localStorage.getItem('about_vision'));
    setVal('ab-values',  localStorage.getItem('about_values'));
    setVal('ab-accred',  localStorage.getItem('about_accred'));
    for (var i=1; i<=5; i++){
      setVal('ab-s'+i+'v', localStorage.getItem('about_stat_'+i+'_val'));
      setVal('ab-s'+i+'l', localStorage.getItem('about_stat_'+i+'_lbl'));
    }
  }

  window.saveAboutMVV = function(){
    var fields = { mission:'ab-mission', vision:'ab-vision', values:'ab-values', accred:'ab-accred' };
    Object.keys(fields).forEach(function(k){
      var v = val(fields[k]);
      if (v) localStorage.setItem('about_'+k, v); else localStorage.removeItem('about_'+k);
    });
    showToast('Mission/Vision/Values saved');
  };

  window.saveAboutStats = function(){
    for (var i=1; i<=5; i++){
      var sv = val('ab-s'+i+'v'), sl = val('ab-s'+i+'l');
      if (sv) localStorage.setItem('about_stat_'+i+'_val', sv); else localStorage.removeItem('about_stat_'+i+'_val');
      if (sl) localStorage.setItem('about_stat_'+i+'_lbl', sl); else localStorage.removeItem('about_stat_'+i+'_lbl');
    }
    showToast('Statistics saved');
  };

  /* ── CONTACT EDITOR ───────────────────────────────────── */
  function renderContactEditor(){
    setVal('ct-address', localStorage.getItem('contact_address'));
    setVal('ct-phone',   localStorage.getItem('contact_phone'));
    setVal('ct-email',   localStorage.getItem('contact_email'));
    setVal('ct-hours',   localStorage.getItem('contact_hours'));
    ['emergency','appointments','laboratory','billing'].forEach(function(k){
      setVal('ct-d-'+k, localStorage.getItem('contact_dept_'+k));
    });
  }

  window.saveContactGeneral = function(){
    var fields = { address:'ct-address', phone:'ct-phone', email:'ct-email', hours:'ct-hours' };
    Object.keys(fields).forEach(function(k){
      var v = val(fields[k]);
      if (v) localStorage.setItem('contact_'+k, v); else localStorage.removeItem('contact_'+k);
    });
    showToast('Contact info saved');
  };

  window.saveContactDepts = function(){
    ['emergency','appointments','laboratory','billing'].forEach(function(k){
      var v = val('ct-d-'+k);
      if (v) localStorage.setItem('contact_dept_'+k, v); else localStorage.removeItem('contact_dept_'+k);
    });
    showToast('Department lines saved');
  };

  /* ── BLOG ARTICLES ────────────────────────────────────── */
  function getCustomPosts(){
    try{ return JSON.parse(localStorage.getItem('custom_blog_posts')||'[]'); }catch(e){ return []; }
  }
  function saveCustomPosts(arr){ localStorage.setItem('custom_blog_posts', JSON.stringify(arr)); }
  function getHiddenPosts(){
    try{ return JSON.parse(localStorage.getItem('hidden_blog_posts')||'[]'); }catch(e){ return []; }
  }
  function saveHiddenPosts(arr){ localStorage.setItem('hidden_blog_posts', JSON.stringify(arr)); }

  var editingBlogId  = null;
  var pendingCoverImg = null;

  function renderBlogEditor(){
    var listEl = $('admin-blog-list'); if (!listEl) return;
    var customPosts = getCustomPosts();
    var hiddenIds   = getHiddenPosts();

    var items = [];

    /* custom posts first */
    customPosts.forEach(function(p){
      items.push({ p:p, isCustom:true, hidden:false });
    });

    /* static data.js posts */
    if (typeof BLOG_POSTS !== 'undefined') {
      BLOG_POSTS.forEach(function(p){
        items.push({ p:p, isCustom:false, hidden: hiddenIds.indexOf(String(p.id))!==-1 });
      });
    }

    if (!items.length){
      listEl.innerHTML='<div style="text-align:center;color:#6b7280;padding:40px">No articles found.</div>';
      return;
    }

    listEl.innerHTML = items.map(function(item){
      var p = item.p;
      var badge = item.isCustom
        ? '<span class="blog-custom-badge">Custom</span>'
        : '<span class="blog-static-badge">Built-in</span>';
      var hiddenBadge = item.hidden ? ' <span class="blog-static-badge" style="background:#fef2f2;color:#e74c3c">Hidden</span>' : '';
      var editBtn = item.isCustom
        ? '<button class="btn-ann-edit" onclick="editBlogPost(\''+esc(String(p.id))+'\')">Edit</button>'
        : '';
      var deleteBtn = item.isCustom
        ? '<button class="btn-ann-delete" onclick="deleteBlogPost(\''+esc(String(p.id))+'\')">Delete</button>'
        : '';
      var toggleBtn = !item.isCustom
        ? '<button class="btn-ann-toggle" onclick="toggleBlogVisibility(\''+p.id+'\')" style="'
          +(item.hidden?'background:#dcfce7;color:#15803d;border-color:#86efac':'background:#fef9c3;color:#b45309;border-color:#fde68a')
          +'">'+(item.hidden?'Show':'Hide')+'</button>'
        : '';
      return '<div class="blog-item'+(item.hidden?' hidden-post':'')+'">'
        +'<div class="blog-item-icon">'+(p.icon||'📝')+'</div>'
        +'<div class="blog-item-content">'
        +'<div class="blog-item-title">'+esc(p.title)+'</div>'
        +'<div class="blog-item-meta"><span>'+badge+'</span>'+hiddenBadge
        +'<span>'+esc(p.category||'')+'</span>'
        +'<span>'+esc(p.author||'')+'</span>'
        +'<span>'+esc(p.date||'')+'</span></div></div>'
        +'<div class="blog-item-actions">'+editBtn+toggleBtn+deleteBtn+'</div>'
        +'</div>';
    }).join('');
  }

  window.toggleBlogVisibility = function(id){
    var hidden = getHiddenPosts(); var sid = String(id);
    var idx = hidden.indexOf(sid);
    if (idx===-1) hidden.push(sid); else hidden.splice(idx,1);
    saveHiddenPosts(hidden); renderBlogEditor();
    showToast(idx===-1?'Article hidden from blog':'Article visible on blog');
  };

  window.editBlogPost = function(id){
    var posts = getCustomPosts(); var p = posts.find(function(x){ return String(x.id)===String(id); });
    if (!p) return;
    editingBlogId = id;
    pendingCoverImg = p.coverImg || null;
    setVal('bl-title',   p.title);
    setVal('bl-category',p.category);
    setVal('bl-author',  p.author);
    setVal('bl-date',    p.date);
    setVal('bl-readtime',p.readTime);
    setVal('bl-icon',    p.icon);
    setVal('bl-excerpt', p.excerpt);
    setVal('bl-content', p.content);
    var prev = $('bl-img-preview');
    if (prev) prev.innerHTML = pendingCoverImg ? '<img src="'+pendingCoverImg+'" style="width:100%;height:100%;object-fit:cover">' : '🖼️';
    var formTitle = $('blog-form-title'); if(formTitle) formTitle.textContent='Edit Article';
    var saveBtn   = $('bl-save-btn');     if(saveBtn)   saveBtn.textContent='Update Article';
    showBlogForm();
    $('bl-title').focus();
  };

  window.saveBlogPost = function(){
    var title   = val('bl-title').trim();
    var content = val('bl-content').trim();
    if (!title||!content){ showToast('Title and content are required','error'); return; }

    var posts = getCustomPosts();
    var now   = new Date().toISOString();

    if (editingBlogId){
      var idx = posts.findIndex(function(p){ return String(p.id)===String(editingBlogId); });
      if (idx!==-1){
        posts[idx].title    = title;
        posts[idx].category = val('bl-category');
        posts[idx].author   = val('bl-author');
        posts[idx].date     = val('bl-date') || formatDate(now);
        posts[idx].readTime = val('bl-readtime');
        posts[idx].icon     = val('bl-icon') || '📝';
        posts[idx].excerpt  = val('bl-excerpt');
        posts[idx].content  = content;
        if (pendingCoverImg) posts[idx].coverImg = pendingCoverImg;
      }
      showToast('Article updated');
    } else {
      posts.unshift({
        id: 'custom_'+Date.now(),
        title:    title,
        category: val('bl-category') || 'General',
        author:   val('bl-author'),
        date:     val('bl-date') || formatDate(now),
        readTime: val('bl-readtime') || '3 min read',
        icon:     val('bl-icon') || '📝',
        excerpt:  val('bl-excerpt'),
        content:  content,
        coverImg: pendingCoverImg || null,
        isCustom: true
      });
      showToast('Article saved');
    }
    saveCustomPosts(posts); hideBlogForm(); renderBlogEditor(); renderDashboard();
  };

  window.deleteBlogPost = function(id){
    if (!confirm('Delete this article?')) return;
    saveCustomPosts(getCustomPosts().filter(function(p){ return String(p.id)!==String(id); }));
    renderBlogEditor(); renderDashboard(); showToast('Article deleted');
  };

  window.uploadBlogCover = function(input){
    if (!input.files||!input.files[0]) return;
    var r = new FileReader();
    r.onload = function(e){
      pendingCoverImg = e.target.result;
      var prev = $('bl-img-preview');
      if (prev) prev.innerHTML='<img src="'+pendingCoverImg+'" style="width:100%;height:100%;object-fit:cover">';
      showToast('Cover image ready');
    };
    r.readAsDataURL(input.files[0]);
  };

  window.removeBlogCover = function(){
    pendingCoverImg = null;
    var prev = $('bl-img-preview'); if(prev) prev.innerHTML='🖼️';
  };

  window.cancelBlogEdit = function(){ hideBlogForm(); };

  function showBlogForm(){
    var panel = $('blog-form-panel'); if(panel){ panel.classList.remove('hidden'); panel.style.display=''; }
  }
  function hideBlogForm(){
    editingBlogId = null; pendingCoverImg = null;
    var panel = $('blog-form-panel'); if(panel) panel.classList.add('hidden');
    ['bl-title','bl-category','bl-author','bl-date','bl-readtime','bl-icon','bl-excerpt','bl-content'].forEach(function(id){ setVal(id,''); });
    var prev=$('bl-img-preview'); if(prev) prev.innerHTML='🖼️';
    var ft=$('blog-form-title'); if(ft) ft.textContent='New Article';
    var sb=$('bl-save-btn');     if(sb) sb.textContent='Save Article';
  }

  function formatDate(iso){
    return new Date(iso).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  }

  /* ── SETTINGS ─────────────────────────────────────────── */
  window.changePassword = function(){
    var current=val('s-cur-pass'), newPass=val('s-new-pass'), confirm=val('s-conf-pass');
    var creds = getCredentials();
    if (current!==creds.pass){ showToast('Current password incorrect','error'); return; }
    if (newPass.length<6)    { showToast('Min 6 characters','error'); return; }
    if (newPass!==confirm)   { showToast('Passwords do not match','error'); return; }
    localStorage.setItem('admin_password', newPass);
    setVal('s-cur-pass',''); setVal('s-new-pass',''); setVal('s-conf-pass','');
    showToast('Password updated');
  };

  window.clearDoctorPhotos = function(){
    if (!confirm('Remove all uploaded doctor photos?')) return;
    if (typeof DOCTORS!=='undefined') DOCTORS.forEach(function(d){ localStorage.removeItem('doctor_photo_'+d.id); });
    renderDashboard(); showToast('Doctor photos cleared');
  };
  window.clearEquipImages = function(){
    if (!confirm('Remove all equipment images?')) return;
    ['xray','ultrasound','endoscopy','ct'].forEach(function(k){ localStorage.removeItem('equip_img_'+k); });
    renderDashboard(); showToast('Equipment images cleared');
  };
  window.clearAnnouncements = function(){
    if (!confirm('Delete ALL announcements?')) return;
    localStorage.removeItem('announcements');
    renderAnnouncements(); renderDashboard(); showToast('Announcements cleared');
  };
  window.clearCustomPosts = function(){
    if (!confirm('Delete ALL custom blog articles?')) return;
    localStorage.removeItem('custom_blog_posts');
    renderBlogEditor(); renderDashboard(); showToast('Custom articles cleared');
  };
  window.resetBranding = function(){
    if (!confirm('Reset all branding to defaults?')) return;
    ['brand_name_p1','brand_name_p2','brand_logo_icon','brand_logo_img','brand_tagline'].forEach(function(k){ localStorage.removeItem(k); });
    renderBranding(); showToast('Branding reset');
  };

  /* ── INIT ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function(){
    if (isLoggedIn()){
      $('login-screen').style.display='none';
      $('admin-dashboard').classList.remove('hidden');
      $('admin-dashboard').style.display='flex';
      switchTab('dashboard');
    }

    var loginForm = $('login-form');
    if (loginForm) loginForm.addEventListener('submit', function(e){ e.preventDefault(); login(); });

    document.querySelectorAll('.sidebar-link[data-tab]').forEach(function(el){
      el.addEventListener('click', function(){ switchTab(el.getAttribute('data-tab')); });
    });

    var lb = $('logout-btn'); if(lb) lb.addEventListener('click', handleLogout);

    var docSearch = $('doc-search');
    if (docSearch) docSearch.addEventListener('input', function(){ doctorFilter.q=this.value; renderDoctors(); });
    var docDept = $('doc-dept-filter');
    if (docDept) docDept.addEventListener('change', function(){ doctorFilter.dept=this.value; renderDoctors(); });

    var newAnnBtn = $('new-ann-btn');
    if (newAnnBtn) newAnnBtn.addEventListener('click', function(){ hideAnnForm(); showAnnForm(); $('af-title').focus(); });
    var saveAnnBtn = $('ann-save-btn');
    if (saveAnnBtn) saveAnnBtn.addEventListener('click', window.saveAnnouncement);
    var cancelAnnBtn = $('ann-cancel-btn');
    if (cancelAnnBtn) cancelAnnBtn.addEventListener('click', hideAnnForm);

    var newBlogBtn = $('new-blog-btn');
    if (newBlogBtn) newBlogBtn.addEventListener('click', function(){ hideBlogForm(); showBlogForm(); $('bl-title').focus(); });

    /* live brand preview on name/icon changes */
    ['b-name-p1','b-name-p2','b-icon'].forEach(function(id){
      var el=$(id); if(el) el.addEventListener('input', updateBrandPreview);
    });

    /* settings clear buttons */
    var clearPassBtn=$('change-pass-btn'); if(clearPassBtn) clearPassBtn.addEventListener('click', window.changePassword);
    var clearDocsBtn=$('clear-doctor-photos-btn'); if(clearDocsBtn) clearDocsBtn.addEventListener('click', window.clearDoctorPhotos);
    var clearEquipBtn=$('clear-equip-images-btn'); if(clearEquipBtn) clearEquipBtn.addEventListener('click', window.clearEquipImages);
    var clearAnnsBtn=$('clear-anns-btn'); if(clearAnnsBtn) clearAnnsBtn.addEventListener('click', window.clearAnnouncements);
  });

})();
