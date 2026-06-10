// ===== MAIN JS =====

// Header scroll effect
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile nav
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });
}

// Shared doctor card builder (photo-style avatar)
function doctorCardHTML(d) {
  const gradient = typeof deptGradient === 'function' ? deptGradient(d.dept) : 'linear-gradient(135deg,#0057a8,#003f7a)';
  const initials  = typeof getInitials === 'function' ? getInitials(d.name) : d.name.slice(0,2).toUpperCase();
  return `
    <div class="doctor-card">
      <div class="doctor-photo-area" style="background:${gradient}">
        <div class="doctor-initials">${initials}</div>
        <span class="doctor-dept-tag">${d.dept}</span>
      </div>
      <div class="doctor-info">
        <h4>${d.name}</h4>
        <p class="specialty">${d.specialty}</p>
        <p class="qual">${d.qual}</p>
        <p class="exp">${d.exp} experience</p>
      </div>
    </div>`;
}

// Shared staff card builder (pharmacy / lab)
function staffCardHTML(s, bgGrad) {
  const initials = typeof getInitials === 'function' ? getInitials(s.name) : s.name.slice(0,2).toUpperCase();
  return `
    <div class="staff-card">
      <div class="staff-photo" style="background:${bgGrad}">
        <div class="staff-initials">${initials}</div>
        <span class="staff-role-tag">${s.title}</span>
      </div>
      <div class="staff-info">
        <h4>${s.name}</h4>
        <p class="staff-title">${s.title}</p>
        <p class="staff-qual">${s.qual}</p>
        <p class="staff-exp">${s.exp} experience</p>
      </div>
    </div>`;
}

// Render featured doctors (home page — first 8)
const featuredDoctorsEl = document.getElementById('featured-doctors');
if (featuredDoctorsEl && typeof DOCTORS !== 'undefined') {
  featuredDoctorsEl.innerHTML = DOCTORS.slice(0, 8).map(doctorCardHTML).join('');
}

// Render all doctors (doctors page)
const allDoctorsEl = document.getElementById('all-doctors');
if (allDoctorsEl && typeof DOCTORS !== 'undefined') {
  function renderDoctors(list) {
    allDoctorsEl.innerHTML = list.map(doctorCardHTML).join('');
  }

  renderDoctors(DOCTORS);

  const searchInput = document.getElementById('doctor-search');
  const deptFilter = document.getElementById('dept-filter');

  function filterDoctors() {
    const q = searchInput ? searchInput.value.toLowerCase() : '';
    const dept = deptFilter ? deptFilter.value : '';
    const filtered = DOCTORS.filter(d => {
      const matchQ = !q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.dept.toLowerCase().includes(q);
      const matchDept = !dept || d.dept === dept;
      return matchQ && matchDept;
    });
    renderDoctors(filtered);
    const count = document.getElementById('doctor-count');
    if (count) count.textContent = filtered.length;
  }

  if (searchInput) searchInput.addEventListener('input', filterDoctors);
  if (deptFilter) deptFilter.addEventListener('change', filterDoctors);

  // Populate dept filter
  if (deptFilter) {
    const depts = [...new Set(DOCTORS.map(d => d.dept))].sort();
    depts.forEach(dept => {
      const opt = document.createElement('option');
      opt.value = dept;
      opt.textContent = dept;
      deptFilter.appendChild(opt);
    });
  }
}

// Render departments
const deptGridEl = document.getElementById('dept-grid');
if (deptGridEl && typeof DEPARTMENTS !== 'undefined') {
  deptGridEl.innerHTML = DEPARTMENTS.map(d => `
    <div class="dept-card" id="${d.id}">
      <div class="dept-icon">${d.icon}</div>
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
      <span class="doctor-count">${d.doctors} Specialist${d.doctors > 1 ? 's' : ''}</span>
    </div>
  `).join('');
}

// Render featured blog posts (home — first 3)
const featuredPostsEl = document.getElementById('featured-posts');
if (featuredPostsEl && typeof BLOG_POSTS !== 'undefined') {
  const featured = BLOG_POSTS.slice(0, 3);
  featuredPostsEl.innerHTML = featured.map(p => `
    <div class="blog-card">
      <div class="blog-card-img">
        ${p.icon}
        <span class="blog-card-cat">${p.category}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-meta">
          <span>${p.date}</span>
          <span>${p.readTime}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <a href="blog-post.html?id=${p.id}" class="blog-read-more">Read Article →</a>
      </div>
    </div>
  `).join('');
}

// Render all blog posts (blog page)
const allPostsEl = document.getElementById('all-posts');
if (allPostsEl && typeof BLOG_POSTS !== 'undefined') {
  function renderPosts(list) {
    allPostsEl.innerHTML = list.map(p => `
      <div class="blog-post-card">
        <div class="blog-post-img">${p.icon}</div>
        <div class="blog-post-body">
          <div class="blog-meta">
            <span class="section-eyebrow" style="font-size:.7rem;padding:3px 10px">${p.category}</span>
            <span>${p.date}</span>
            <span>${p.readTime}</span>
          </div>
          <h3 style="font-family:var(--font-display);font-size:1.15rem;margin:10px 0 10px">${p.title}</h3>
          <p style="font-size:.875rem;color:var(--clr-text-muted)">${p.excerpt}</p>
          <div style="margin-top:12px;font-size:.85rem;color:var(--clr-text-muted)">By ${p.author}</div>
          <a href="blog-post.html?id=${p.id}" class="blog-read-more">Read Article →</a>
        </div>
      </div>
    `).join('');
  }

  renderPosts(BLOG_POSTS);

  const catFilter = document.getElementById('cat-filter');
  if (catFilter) {
    const cats = [...new Set(BLOG_POSTS.map(p => p.category))].sort();
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      catFilter.appendChild(opt);
    });
    catFilter.addEventListener('change', () => {
      const v = catFilter.value;
      renderPosts(v ? BLOG_POSTS.filter(p => p.category === v) : BLOG_POSTS);
    });
  }
}

// Render blog sidebar categories
const sidebarCatsEl = document.getElementById('sidebar-cats');
if (sidebarCatsEl && typeof BLOG_POSTS !== 'undefined') {
  const catCounts = {};
  BLOG_POSTS.forEach(p => { catCounts[p.category] = (catCounts[p.category] || 0) + 1; });
  sidebarCatsEl.innerHTML = Object.entries(catCounts).sort().map(([cat, count]) => `
    <li><a href="#" style="color:var(--clr-text)">${cat}</a><span>${count}</span></li>
  `).join('');
}

// Render blog post (blog-post.html)
const postContentEl = document.getElementById('post-content');
const postHeroEl = document.getElementById('post-hero');
if (postContentEl && typeof BLOG_POSTS !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const post = BLOG_POSTS.find(p => p.id === id) || BLOG_POSTS[0];

  document.title = `${post.title} — Alliance Hospital`;

  if (postHeroEl) {
    postHeroEl.innerHTML = `
      <div class="post-hero-img">${post.icon}</div>
      <div class="post-meta">
        <span class="section-eyebrow" style="font-size:.7rem">${post.category}</span>
        <div class="author">
          <div class="author-pic">${post.author.charAt(4)}</div>
          <div>
            <strong>${post.author}</strong><br/>
            <small style="color:var(--clr-text-muted)">${post.dept || 'Alliance Hospital'}</small>
          </div>
        </div>
        <span class="date">${post.date}</span>
        <span class="read-time">⏱ ${post.readTime}</span>
      </div>
      <h1 style="font-family:var(--font-display);font-size:clamp(1.8rem,3vw,2.6rem);margin-bottom:32px;line-height:1.25">${post.title}</h1>
    `;
  }

  postContentEl.innerHTML = post.content;

  // Related posts
  const relatedEl = document.getElementById('related-posts');
  if (relatedEl) {
    const related = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);
    relatedEl.innerHTML = related.map(p => `
      <a href="blog-post.html?id=${p.id}" style="display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid var(--clr-border);text-decoration:none">
        <span style="font-size:1.5rem">${p.icon}</span>
        <div>
          <div style="font-size:.8rem;font-weight:700;color:var(--clr-primary);margin-bottom:2px">${p.category}</div>
          <div style="font-size:.875rem;font-weight:600;color:var(--clr-text);line-height:1.4">${p.title}</div>
        </div>
      </a>
    `).join('');
  }
}

// Appointment form
const apptForm = document.getElementById('appointment-form');
if (apptForm) {
  apptForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('appt-success');
    if (msg) {
      msg.style.display = 'block';
      apptForm.reset();
      msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Populate dept select
  const deptSel = document.getElementById('appt-dept');
  if (deptSel && typeof DEPARTMENTS !== 'undefined') {
    DEPARTMENTS.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.id; opt.textContent = d.name;
      deptSel.appendChild(opt);
    });
  }
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('contact-success');
    if (msg) {
      msg.style.display = 'block';
      contactForm.reset();
      msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

// ===== FACILITIES PAGE =====

// Featured specialists section (facilities page — 12 highlighted doctors)
const featuredSpecialistsEl = document.getElementById('featured-specialists');
if (featuredSpecialistsEl && typeof DOCTORS !== 'undefined') {
  const picks = [0,3,5,8,9,15,18,21,25,28,33,38].map(i => DOCTORS[i]).filter(Boolean);
  featuredSpecialistsEl.innerHTML = picks.map(doctorCardHTML).join('');
}

// Pharmacy staff
const pharmacyStaffEl = document.getElementById('pharmacy-staff');
if (pharmacyStaffEl && typeof PHARMACISTS !== 'undefined') {
  const PHARM_GRADS = [
    'linear-gradient(135deg,#1a6e4a,#0d4f3c)',
    'linear-gradient(135deg,#2c6e1a,#1a4f0d)',
    'linear-gradient(135deg,#1a4e6e,#0d3450)',
    'linear-gradient(135deg,#1a3d6e,#0d2a50)',
    'linear-gradient(135deg,#4a6e1a,#304f0d)',
    'linear-gradient(135deg,#1a6e6e,#0d4f4f)',
  ];
  pharmacyStaffEl.innerHTML = PHARMACISTS.map((s,i) => staffCardHTML(s, PHARM_GRADS[i % PHARM_GRADS.length])).join('');
}

// Laboratory staff
const labStaffEl = document.getElementById('lab-staff');
if (labStaffEl && typeof LAB_STAFF !== 'undefined') {
  const LAB_GRADS = [
    'linear-gradient(135deg,#5a1f6e,#3d0f52)',
    'linear-gradient(135deg,#6e1f1f,#521212)',
    'linear-gradient(135deg,#1f3a6e,#122352)',
    'linear-gradient(135deg,#6e4a1f,#52300d)',
    'linear-gradient(135deg,#1f6e4a,#0d4f30)',
    'linear-gradient(135deg,#3a1f6e,#220f52)',
    'linear-gradient(135deg,#6e1f5a,#52103e)',
    'linear-gradient(135deg,#1f4a6e,#0d2e52)',
  ];
  labStaffEl.innerHTML = LAB_STAFF.map((s,i) => staffCardHTML(s, LAB_GRADS[i % LAB_GRADS.length])).join('');
}

// Medical equipment
const equipmentGridEl = document.getElementById('equipment-grid');
if (equipmentGridEl && typeof EQUIPMENT !== 'undefined') {
  equipmentGridEl.innerHTML = EQUIPMENT.map(eq => `
    <div class="equipment-card">
      <div class="equipment-img" style="background:linear-gradient(135deg,${eq.color1},${eq.color2})">
        <div class="equipment-pattern"></div>
        <div class="equipment-stat-bubble">
          <span class="stat-bubble-num">${eq.stat}</span>
          <span class="stat-bubble-label">${eq.statLabel}</span>
        </div>
        <div class="equipment-icon-wrap">
          <span class="equipment-icon">${eq.icon}</span>
        </div>
        <div class="equipment-tagline">${eq.tagline}</div>
      </div>
      <div class="equipment-body">
        <h3>${eq.name}</h3>
        <p>${eq.description}</p>
        <div class="equipment-features">
          ${eq.features.map(f => `<span class="feat-tag">${f}</span>`).join('')}
        </div>
        <div class="equipment-uses">
          <h4>Common Uses</h4>
          <ul>${eq.uses.map(u => `<li>${u}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  `).join('');
}
