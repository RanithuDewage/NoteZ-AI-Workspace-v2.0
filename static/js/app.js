/**
 * SMART NOTES AI - ADVANCED FRONTEND CONTROLLER WITH UNIFIED THEMES, CLOUD DASHBOARD, 5 NEXT-LEVEL MODULES, VISUAL CANVAS & AUTH
 */

document.addEventListener('DOMContentLoaded', () => {
    // App State
    let currentUser = null;
    let notes = [];
    let activeNoteId = null;
    let activeFilter = 'active';
    let activeCategory = 'All';
    let searchQuery = '';
    let autoSaveTimer = null;
    let currentAiInsight = null;
    let currentVerifiedPin = '';
    let speechRecognition = null;
    let isRecording = false;
    let recordedSpeechText = '';
    let activityChartInstance = null;

    // Flashcards State
    let flashcardsDeck = [];
    let currentFlashcardIndex = 0;
    let isFlashcardFlipped = false;

    // Audio Recorder State
    let mediaRecorder = null;
    let audioChunks = [];
    let audioRecordTimer = null;
    let audioRecordSeconds = 0;
    let currentRecordedAudioBlob = null;

    // DOM Elements - User Profile & Auth
    const userProfileWidget = document.getElementById('userProfileWidget');
    const userAvatarBadge = document.getElementById('userAvatarBadge');
    const userDisplayName = document.getElementById('userDisplayName');
    const userEmailText = document.getElementById('userEmailText');
    const openSettingsBtn = document.getElementById('openSettingsBtn');
    const cloudBackupBtn = document.getElementById('cloudBackupBtn');
    const streakCountText = document.getElementById('streakCountText');

    // 🤖 AI Chat Drawer Elements
    const openAiChatDrawerBtn = document.getElementById('openAiChatDrawerBtn');
    const aiChatDrawer = document.getElementById('aiChatDrawer');
    const closeAiChatDrawerBtn = document.getElementById('closeAiChatDrawerBtn');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiChatInput = document.getElementById('aiChatInput');
    const aiChatSendBtn = document.getElementById('aiChatSendBtn');
    const aiPillBtns = document.querySelectorAll('.ai-pill-btn');

    // 🎴 Flashcards Modal Elements
    const openFlashcardsModalBtn = document.getElementById('openFlashcardsModalBtn');
    const flashcardsModal = document.getElementById('flashcardsModal');
    const closeFlashcardsModalBtn = document.getElementById('closeFlashcardsModalBtn');
    const flashcardCard = document.getElementById('flashcardCard');
    const flashcardInner = document.getElementById('flashcardInner');
    const flashcardQuestionText = document.getElementById('flashcardQuestionText');
    const flashcardIndexLabel = document.getElementById('flashcardIndexLabel');
    const prevFlashcardBtn = document.getElementById('prevFlashcardBtn');
    const nextFlashcardBtn = document.getElementById('nextFlashcardBtn');

    // 📝 Templates Modal Elements
    const openTemplatesModalBtn = document.getElementById('openTemplatesModalBtn');
    const templatesModal = document.getElementById('templatesModal');
    const closeTemplatesModalBtn = document.getElementById('closeTemplatesModalBtn');
    const templateCards = document.querySelectorAll('.template-card-item');

    // Cloud Backup Dashboard Modal
    const cloudBackupModal = document.getElementById('cloudBackupModal');
    const closeCloudBackupModalBtn = document.getElementById('closeCloudBackupModalBtn');
    const cloudDashboardLastSync = document.getElementById('cloudDashboardLastSync');
    const cloudDashboardNotesSize = document.getElementById('cloudDashboardNotesSize');
    const cloudAccountEmailInput = document.getElementById('cloudAccountEmailInput');
    const saveCloudAccountBtn = document.getElementById('saveCloudAccountBtn');
    const modalCloudSyncBtn = document.getElementById('modalCloudSyncBtn');
    const downloadFullPdfBtn = document.getElementById('downloadFullPdfBtn');
    const downloadJsonBackupBtn = document.getElementById('downloadJsonBackupBtn');
    const triggerRestoreBrowseBtn = document.getElementById('triggerRestoreBrowseBtn');
    const restoreFileInput = document.getElementById('restoreFileInput');

    // Custom Avatar & Gemini API Inputs
    const triggerCustomAvatarBrowseBtn = document.getElementById('triggerCustomAvatarBrowseBtn');
    const customAvatarFileInput = document.getElementById('customAvatarFileInput');
    const avatarPreviewBox = document.getElementById('avatarPreviewBox');
    const setGeminiApiKey = document.getElementById('setGeminiApiKey');

    // Auth Modal
    const authModal = document.getElementById('authModal');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginFormSection = document.getElementById('loginFormSection');
    const registerFormSection = document.getElementById('registerFormSection');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const submitLoginBtn = document.getElementById('submitLoginBtn');
    const regName = document.getElementById('regName');
    const regEmail = document.getElementById('regEmail');
    const regPassword = document.getElementById('regPassword');
    const submitRegisterBtn = document.getElementById('submitRegisterBtn');

    // Settings Modal
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');
    const tabSetProfile = document.getElementById('tabSetProfile');
    const tabSetCloud = document.getElementById('tabSetCloud');
    const tabSetSecurity = document.getElementById('tabSetSecurity');
    const setProfileSection = document.getElementById('setProfileSection');
    const setCloudSection = document.getElementById('setCloudSection');
    const setSecuritySection = document.getElementById('setSecuritySection');
    const setDisplayName = document.getElementById('setDisplayName');
    const setEmail = document.getElementById('setEmail');
    const setNewPassword = document.getElementById('setNewPassword');
    const saveProfileSettingsBtn = document.getElementById('saveProfileSettingsBtn');
    const setGdriveEmail = document.getElementById('setGdriveEmail');
    const triggerCloudSyncNowBtn = document.getElementById('triggerCloudSyncNowBtn');
    const cloudSyncInfoBox = document.getElementById('cloudSyncInfoBox');
    const cloudSyncText = document.getElementById('cloudSyncText');
    const logoutBtn = document.getElementById('logoutBtn');
    const avatarDots = document.querySelectorAll('.avatar-dot');

    // Navigation & Sidebar
    const navItems = document.querySelectorAll('.nav-item');
    const categoryNavList = document.getElementById('categoryNavList');
    const newNoteBtn = document.getElementById('newNoteBtn');
    const emptyNewNoteBtn = document.getElementById('emptyNewNoteBtn');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.querySelector('.sidebar');
    const navMindMap = document.getElementById('navMindMap');
    const navKanban = document.getElementById('navKanban');

    // Counts
    const countAll = document.getElementById('countAll');
    const countPinned = document.getElementById('countPinned');
    const countFavs = document.getElementById('countFavs');
    const countReminders = document.getElementById('countReminders');
    const countTrash = document.getElementById('countTrash');

    // Header & Search
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const activeFilterText = document.getElementById('activeFilterText');
    const notesCountLabel = document.getElementById('notesCountLabel');
    const topAiBtn = document.getElementById('topAiBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themePaletteBtn = document.getElementById('themePaletteBtn');
    const themePaletteDropdown = document.getElementById('themePaletteDropdown');

    // Pane Views
    const notesCardsContainer = document.getElementById('notesCardsContainer');
    const emptyStateView = document.getElementById('emptyStateView');
    const activeEditorView = document.getElementById('activeEditorView');

    // Editor Controls
    const editorTitleInput = document.getElementById('editorTitleInput');
    const editorCategorySelect = document.getElementById('editorCategorySelect');
    const editorTagsInput = document.getElementById('editorTagsInput');
    const colorDots = document.querySelectorAll('.color-dot');
    const editorPinBtn = document.getElementById('editorPinBtn');
    const editorFavBtn = document.getElementById('editorFavBtn');
    const lockNoteBtn = document.getElementById('lockNoteBtn');
    const lockIcon = document.getElementById('lockIcon');
    const dueDateBtn = document.getElementById('dueDateBtn');
    const popoutStickyBtn = document.getElementById('popoutStickyBtn');
    const editorDeleteBtn = document.getElementById('editorDeleteBtn');
    const tabEditBtn = document.getElementById('tabEditBtn');
    const tabRawBtn = document.getElementById('tabRawBtn');
    const editorVisualCanvas = document.getElementById('editorVisualCanvas');
    const editorTextarea = document.getElementById('editorTextarea');
    const triggerAiBtn = document.getElementById('triggerAiBtn');
    const saveStatus = document.getElementById('saveStatus');
    const dueDateStatus = document.getElementById('dueDateStatus');

    // Upgraded Toolbar Buttons
    const insertImgBtn = document.getElementById('insertImgBtn');
    const ocrScanBtn = document.getElementById('ocrScanBtn');
    const recordAudioBtn = document.getElementById('recordAudioBtn');
    const attachDocBtn = document.getElementById('attachDocBtn');
    const imageFileInput = document.getElementById('imageFileInput');
    const ocrFileInput = document.getElementById('ocrFileInput');
    const docFileInput = document.getElementById('docFileInput');
    const voiceTypingBtn = document.getElementById('voiceTypingBtn');
    const dropZone = document.getElementById('dropZone');
    const dragOverlay = document.getElementById('dragOverlay');

    // Status bar
    const statWordCount = document.getElementById('statWordCount');
    const statCharCount = document.getElementById('statCharCount');
    const statReadingTime = document.getElementById('statReadingTime');

    // Image Modal
    const imageModal = document.getElementById('imageModal');
    const tabUploadFile = document.getElementById('tabUploadFile');
    const tabImageUrl = document.getElementById('tabImageUrl');
    const uploadFileSection = document.getElementById('uploadFileSection');
    const imageUrlSection = document.getElementById('imageUrlSection');
    const triggerFileBrowseBtn = document.getElementById('triggerFileBrowseBtn');
    const imageUrlInput = document.getElementById('imageUrlInput');
    const closeImageModalBtn = document.getElementById('closeImageModalBtn');
    const cancelImageModalBtn = document.getElementById('cancelImageModalBtn');
    const confirmImageUrlBtn = document.getElementById('confirmImageUrlBtn');

    // Voice Modal
    const voiceModal = document.getElementById('voiceModal');
    const closeVoiceModalBtn = document.getElementById('closeVoiceModalBtn');
    const voiceMicCircle = document.getElementById('voiceMicCircle');
    const voiceStatusText = document.getElementById('voiceStatusText');
    const speechBoxText = document.getElementById('speechBoxText');
    const toggleSpeechRecBtn = document.getElementById('toggleSpeechRecBtn');
    const appendSpeechToNoteBtn = document.getElementById('appendSpeechToNoteBtn');

    // Mind Map Modal
    const graphModal = document.getElementById('graphModal');
    const closeGraphModalBtn = document.getElementById('closeGraphModalBtn');
    const mindMapCanvas = document.getElementById('mindMapCanvas');

    // Kanban Board Modal
    const kanbanModal = document.getElementById('kanbanModal');
    const closeKanbanModalBtn = document.getElementById('closeKanbanModalBtn');
    const kanbanZoneTodo = document.getElementById('kanbanZoneTodo');
    const kanbanZoneProgress = document.getElementById('kanbanZoneProgress');
    const kanbanZoneDone = document.getElementById('kanbanZoneDone');
    const countKanbanTodo = document.getElementById('countKanbanTodo');
    const countKanbanProgress = document.getElementById('countKanbanProgress');
    const countKanbanDone = document.getElementById('countKanbanDone');

    // Audio Recorder Modal
    const audioRecorderModal = document.getElementById('audioRecorderModal');
    const closeAudioRecorderModalBtn = document.getElementById('closeAudioRecorderModalBtn');
    const audioMicCircle = document.getElementById('audioMicCircle');
    const audioTimerDisplay = document.getElementById('audioTimerDisplay');
    const audioRecordStatusText = document.getElementById('audioRecordStatusText');
    const toggleAudioRecordBtn = document.getElementById('toggleAudioRecordBtn');
    const insertAudioToNoteBtn = document.getElementById('insertAudioToNoteBtn');

    // PDF Viewer Modal
    const pdfViewerModal = document.getElementById('pdfViewerModal');
    const closePdfModalBtn = document.getElementById('closePdfModalBtn');
    const pdfIframe = document.getElementById('pdfIframe');
    const pdfModalTitle = document.getElementById('pdfModalTitle');

    // OCR Scanner Modal
    const ocrModal = document.getElementById('ocrModal');
    const closeOcrModalBtn = document.getElementById('closeOcrModalBtn');
    const triggerOcrBrowseBtn = document.getElementById('triggerOcrBrowseBtn');
    const ocrResultBox = document.getElementById('ocrResultBox');
    const ocrExtractedTextarea = document.getElementById('ocrExtractedTextarea');
    const cancelOcrBtn = document.getElementById('cancelOcrBtn');
    const appendOcrTextBtn = document.getElementById('appendOcrTextBtn');

    // PIN & Reminder Modals
    const pinModal = document.getElementById('pinModal');
    const pinInput = document.getElementById('pinInput');
    const pinModalTitle = document.getElementById('pinModalTitle');
    const pinModalSub = document.getElementById('pinModalSub');
    const closePinModalBtn = document.getElementById('closePinModalBtn');
    const cancelPinBtn = document.getElementById('cancelPinBtn');
    const submitPinBtn = document.getElementById('submitPinBtn');
    let pinCallback = null;

    const reminderModal = document.getElementById('reminderModal');
    const reminderDateTimeInput = document.getElementById('reminderDateTimeInput');
    const closeReminderModalBtn = document.getElementById('closeReminderModalBtn');
    const clearReminderBtn = document.getElementById('clearReminderBtn');
    const saveReminderBtn = document.getElementById('saveReminderBtn');

    // AI & Stats Modals
    const aiModal = document.getElementById('aiModal');
    const closeAiModalBtn = document.getElementById('closeAiModalBtn');
    const aiLoader = document.getElementById('aiLoader');
    const aiResults = document.getElementById('aiResults');
    const aiSummaryText = document.getElementById('aiSummaryText');
    const aiKeypointsList = document.getElementById('aiKeypointsList');
    const aiTagsContainer = document.getElementById('aiTagsContainer');
    const aiReadingTime = document.getElementById('aiReadingTime');
    const aiWordCount = document.getElementById('aiWordCount');
    const aiModeBadge = document.getElementById('aiModeBadge');
    const openGeminiWebBtn = document.getElementById('openGeminiWebBtn');
    const geminiImportInput = document.getElementById('geminiImportInput');
    const copyAiSummaryBtn = document.getElementById('copyAiSummaryBtn');
    const applyAiTagsBtn = document.getElementById('applyAiTagsBtn');
    const saveAiSummaryAsNoteBtn = document.getElementById('saveAiSummaryAsNoteBtn');

    const statsModal = document.getElementById('statsModal');
    const openStatsBtn = document.getElementById('openStatsBtn');
    const closeStatsModalBtn = document.getElementById('closeStatsModalBtn');

    // Export
    const exportDropdownBtn = document.getElementById('exportDropdownBtn');
    const exportMenu = document.getElementById('exportMenu');
    const exportDocxBtn = document.getElementById('exportDocxBtn');
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    const exportMdBtn = document.getElementById('exportMdBtn');
    const exportTxtBtn = document.getElementById('exportTxtBtn');

    // Initialize System
    initUserSession();
    initAppTheme();
    bindEvents();
    initSpeechRecognition();
    loadCategories();
    loadNotes();
    updateCounts();

    // =========================================================================
    // AUTHENTICATION & USER SESSION
    // =========================================================================
    async function initUserSession() {
        const stored = localStorage.getItem('smartnotes_user');
        if (stored) {
            try {
                currentUser = JSON.parse(stored);
            } catch (e) {
                currentUser = null;
            }
        }

        try {
            const uidParam = currentUser && currentUser.id ? `?user_id=${currentUser.id}` : '';
            const res = await fetch(`/api/auth/active-user${uidParam}`);
            const data = await res.json();
            if (res.ok && data.user) {
                currentUser = data.user;
                localStorage.setItem('smartnotes_user', JSON.stringify(currentUser));
                updateUserProfileUI();
            }
        } catch (e) {
            if (currentUser) updateUserProfileUI();
        }

        // Keep login inputs blank on launch for privacy & security!
        if (loginEmail) loginEmail.value = '';
        if (loginPassword) loginPassword.value = '';

        const isSessionActive = localStorage.getItem('smartnotes_session_active') === 'true';

        if (!isSessionActive) {
            if (authModal) authModal.style.display = 'flex';
        } else {
            if (authModal) authModal.style.display = 'none';
            loadNotes();
        }
    }

    const openAuthModalBtn = document.getElementById('openAuthModalBtn');
    if (openAuthModalBtn) {
        openAuthModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (authModal) authModal.style.display = 'flex';
        });
    }
    if (userProfileWidget) {
        userProfileWidget.addEventListener('click', (e) => {
            if (e.target.closest('#openSettingsBtn')) return;
            if (authModal) authModal.style.display = 'flex';
        });
    }

    function updateUserProfileUI() {
        if (!currentUser) return;
        userDisplayName.textContent = currentUser.display_name || 'User Profile';
        userEmailText.textContent = currentUser.email || 'user@example.com';
        streakCountText.textContent = `${currentUser.streak_count || 1} Day Streak`;

        if (currentUser.custom_avatar_url) {
            userAvatarBadge.innerHTML = `<img src="${currentUser.custom_avatar_url}" alt="Profile Photo">`;
            avatarPreviewBox.innerHTML = `<img src="${currentUser.custom_avatar_url}" alt="Profile Photo">`;
        } else {
            const avatarMap = {
                'avatar1': 'fa-user-astronaut',
                'avatar2': 'fa-user-ninja',
                'avatar3': 'fa-user-graduate',
                'avatar4': 'fa-user-tie',
                'avatar5': 'fa-user-gear',
                'avatar6': 'fa-user-shield'
            };
            const iconClass = avatarMap[currentUser.avatar] || 'fa-user';
            userAvatarBadge.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
            avatarPreviewBox.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        }

        setDisplayName.value = currentUser.display_name || '';
        setEmail.value = currentUser.email || '';
        setGdriveEmail.value = currentUser.gdrive_email || currentUser.email || '';
        setGeminiApiKey.value = currentUser.gemini_api_key || '';

        avatarDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.avatar === (currentUser.avatar || 'avatar1'));
        });
    }

    triggerCustomAvatarBrowseBtn.addEventListener('click', () => customAvatarFileInput.click());

    customAvatarFileInput.addEventListener('change', async (e) => {
        if (e.target.files.length > 0 && currentUser) {
            showToast('Uploading custom profile photo...', 'info');
            const formData = new FormData();
            formData.append('avatar_image', e.target.files[0]);
            formData.append('user_id', currentUser.id);

            try {
                const res = await fetch('/api/user/upload-avatar', {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {
                    const data = await res.json();
                    currentUser.custom_avatar_url = data.url;
                    localStorage.setItem('smartnotes_user', JSON.stringify(currentUser));
                    updateUserProfileUI();
                    showToast('Profile photo updated!', 'success');
                } else {
                    showToast('Failed to upload profile photo', 'error');
                }
            } catch (err) {
                showToast('Error uploading photo', 'error');
            }
        }
    });

    if (tabLogin) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            if (tabRegister) tabRegister.classList.remove('active');
            if (loginFormSection) loginFormSection.style.display = 'block';
            if (registerFormSection) registerFormSection.style.display = 'none';
        });
    }

    if (tabRegister) {
        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active');
            if (tabLogin) tabLogin.classList.remove('active');
            if (loginFormSection) loginFormSection.style.display = 'none';
            if (registerFormSection) registerFormSection.style.display = 'block';
        });
    }

    submitLoginBtn.addEventListener('click', async () => {
        const email = loginEmail.value.trim();
        const pass = loginPassword.value.trim();

        if (!email || !pass) {
            showToast('Enter email and password!', 'info');
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: pass })
            });

            const data = await res.json();
            if (res.ok && data.user) {
                currentUser = data.user;
                localStorage.setItem('smartnotes_user', JSON.stringify(currentUser));
                localStorage.setItem('smartnotes_session_active', 'true');
                updateUserProfileUI();
                authModal.style.display = 'none';
                loadNotes();
                showToast(`Welcome back, ${currentUser.display_name}!`, 'success');
            } else {
                showToast(data.error || 'Invalid credentials', 'error');
            }
        } catch (err) {
            showToast('Login failed', 'error');
        }
    });

    submitRegisterBtn.addEventListener('click', async () => {
        const name = regName.value.trim();
        const email = regEmail.value.trim();
        const pass = regPassword.value.trim();

        if (!email || !pass) {
            showToast('Enter valid email and password!', 'info');
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ display_name: name, email: email, password: pass })
            });

            const data = await res.json();
            if (res.ok && data.user) {
                currentUser = data.user;
                localStorage.setItem('smartnotes_user', JSON.stringify(currentUser));
                localStorage.setItem('smartnotes_session_active', 'true');
                updateUserProfileUI();
                authModal.style.display = 'none';
                loadNotes();
                showToast(`Account created! Welcome, ${currentUser.display_name}!`, 'success');
            } else {
                showToast(data.error || 'Registration failed', 'error');
            }
        } catch (err) {
            showToast('Registration failed', 'error');
        }
    });

    // =========================================================================
    // 🤖 FEATURE 1: INTERACTIVE AI ASSISTANT CHAT DRAWER
    // =========================================================================

    async function sendAiChatMessage(question) {
        if (!question) return;
        appendChatMessage(question, 'user');
        aiChatInput.value = '';

        const noteContent = getCleanContentToSave();

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: question, content: noteContent })
            });

            const data = await res.json();
            appendChatMessage(data.answer, 'bot');
        } catch (err) {
            appendChatMessage('Sorry, I encountered an error answering that.', 'bot');
        }
    }

    function appendChatMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `ai-chat-msg ${sender}`;
        msg.innerHTML = sender === 'bot' ? marked.parse(text) : escapeHtml(text);
        aiChatMessages.appendChild(msg);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    aiChatSendBtn.addEventListener('click', () => sendAiChatMessage(aiChatInput.value.trim()));
    aiChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendAiChatMessage(aiChatInput.value.trim());
    });

    aiPillBtns.forEach(pill => {
        pill.addEventListener('click', () => sendAiChatMessage(pill.dataset.q));
    });

    // =========================================================================
    // 🎴 FEATURE 2: SMART FLASHCARDS & QUIZ REVISION MODE
    // =========================================================================
    openFlashcardsModalBtn.addEventListener('click', async () => {
        if (!activeNoteId) return;
        flashcardsModal.style.display = 'flex';
        showToast('Generating Revision Flashcards Deck...', 'info');

        const noteContent = getCleanContentToSave();
        try {
            const res = await fetch('/api/ai/flashcards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: noteContent })
            });

            const data = await res.json();
            flashcardsDeck = data.flashcards || [];
            currentFlashcardIndex = 0;
            renderCurrentFlashcard();
        } catch (err) {
            showToast('Flashcards generator error', 'error');
        }
    });

    closeFlashcardsModalBtn.addEventListener('click', () => flashcardsModal.style.display = 'none');

    function renderCurrentFlashcard() {
        if (flashcardsDeck.length === 0) return;
        const card = flashcardsDeck[currentFlashcardIndex];
        isFlashcardFlipped = false;
        flashcardInner.classList.remove('flipped');
        flashcardQuestionText.innerHTML = `<strong>Q:</strong> ${card.question}`;
        flashcardIndexLabel.textContent = `Card ${currentFlashcardIndex + 1} / ${flashcardsDeck.length}`;
    }

    flashcardCard.addEventListener('click', () => {
        if (flashcardsDeck.length === 0) return;
        const card = flashcardsDeck[currentFlashcardIndex];
        isFlashcardFlipped = !isFlashcardFlipped;
        flashcardInner.classList.toggle('flipped');

        if (isFlashcardFlipped) {
            flashcardQuestionText.innerHTML = `<strong style="color: var(--accent-emerald);">A:</strong> ${card.answer}`;
        } else {
            flashcardQuestionText.innerHTML = `<strong>Q:</strong> ${card.question}`;
        }
    });

    prevFlashcardBtn.addEventListener('click', () => {
        if (currentFlashcardIndex > 0) {
            currentFlashcardIndex--;
            renderCurrentFlashcard();
        }
    });

    nextFlashcardBtn.addEventListener('click', () => {
        if (currentFlashcardIndex < flashcardsDeck.length - 1) {
            currentFlashcardIndex++;
            renderCurrentFlashcard();
        }
    });

    // =========================================================================
    // 📝 FEATURE 3: READY-MADE NOTE LAYOUT TEMPLATES
    // =========================================================================
    openTemplatesModalBtn.addEventListener('click', () => {
        if (!activeNoteId) return;
        templatesModal.style.display = 'flex';
    });

    closeTemplatesModalBtn.addEventListener('click', () => templatesModal.style.display = 'none');

    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.template;
            insertNoteTemplate(type);
            templatesModal.style.display = 'none';
        });
    });

    function insertNoteTemplate(type) {
        let templateHtml = '';

        switch (type) {
            case 'study':
                templateHtml = `
                    <h1>🎓 Study Note: [Topic Name]</h1>
                    <p><strong>Subject:</strong> Computer Science | <strong>Date:</strong> ${new Date().toISOString().split('T')[0]}</p>
                    <h2>1. Core Concept Overview</h2>
                    <p>Briefly describe the key topic or formula here...</p>
                    <h2>2. Key Highlights & Bullet Points</h2>
                    <ul>
                        <li>Key Takeaway #1</li>
                        <li>Key Takeaway #2</li>
                    </ul>
                    <h2>3. Summary & Practice Quiz</h2>
                    <p>Write your summary reflection here...</p>
                `;
                break;

            case 'meeting':
                templateHtml = `
                    <h1>💼 Meeting Minutes: [Project Discussion]</h1>
                    <p><strong>Attendees:</strong> John, Sarah, Alex | <strong>Time:</strong> 10:00 AM</p>
                    <h2>1. Meeting Agenda</h2>
                    <ul><li>Item 1: Project Update</li><li>Item 2: Sprint Goals</li></ul>
                    <h2>2. Key Decisions Made</h2>
                    <p>Document decisions reached during discussion...</p>
                    <h2>3. Action Items Checklist</h2>
                    <div><input type="checkbox"> Task 1: Prepare presentation slides</div>
                    <div><input type="checkbox"> Task 2: Review database schema</div>
                `;
                break;

            case 'journal':
                templateHtml = `
                    <h1>📔 Daily Journal - ${new Date().toISOString().split('T')[0]}</h1>
                    <h2>🎯 Top 3 Goals for Today</h2>
                    <div><input type="checkbox"> Goal 1</div>
                    <div><input type="checkbox"> Goal 2</div>
                    <h2>🌟 Gratitude & Reflections</h2>
                    <p>What went well today?</p>
                    <h2>💡 Daily Wins & Learning</h2>
                    <p>Key takeaways from today...</p>
                `;
                break;

            case 'checklist':
                templateHtml = `
                    <h1>📋 Project Task Checklist</h1>
                    <p><strong>Project Name:</strong> Smart Workspace v1.0</p>
                    <h2>Phase 1: Planning</h2>
                    <div><input type="checkbox"> Requirement Gathering</div>
                    <div><input type="checkbox"> System Architecture</div>
                    <h2>Phase 2: Execution</h2>
                    <div><input type="checkbox"> Frontend UI Build</div>
                    <div><input type="checkbox"> Backend API Integration</div>
                `;
                break;
        }

        editorVisualCanvas.focus();
        document.execCommand('insertHTML', false, templateHtml);
        saveActiveNote();
        updateWordCounts();
        showToast(`Inserted ${type.toUpperCase()} Template!`, 'success');
    }

    // =========================================================================
    // 💻 FEATURE 4: CODE LIVE RUNNER & SYNTAX HIGHLIGHTER
    // =========================================================================
    window.runCodeSnippetBlock = async (codeBlockId, lang) => {
        const codeElement = document.getElementById(codeBlockId);
        const outputElement = document.getElementById(`out_${codeBlockId}`);
        if (!codeElement || !outputElement) return;

        const codeText = codeElement.innerText;
        outputElement.style.display = 'block';
        outputElement.textContent = 'Running code snippet...';

        try {
            const res = await fetch('/api/code/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: codeText, language: lang })
            });

            const data = await res.json();
            outputElement.textContent = data.output;
        } catch (err) {
            outputElement.textContent = 'Error executing code snippet.';
        }
    };

    window.copyCodeSnippetBlock = (codeBlockId) => {
        const codeElement = document.getElementById(codeBlockId);
        if (codeElement) {
            navigator.clipboard.writeText(codeElement.innerText);
            showToast('Code copied to clipboard!', 'success');
        }
    };

    // =========================================================================
    // 🎙️ FEATURE 5: AUDIO SPEED CONTROLLERS
    // =========================================================================
    window.setAudioPlaybackSpeed = (audioId, speed) => {
        const audio = document.getElementById(audioId);
        if (audio) {
            audio.playbackRate = speed;
            showToast(`Playback Speed set to ${speed}x!`, 'info');
        }
    };

    // =========================================================================
    // ☁️ CLOUD BACKUP DASHBOARD MODAL, ACCOUNT SWITCHER & RESTORE PDF BUNDLE
    // =========================================================================
    const cloudAccountStatusBadge = document.getElementById('cloudAccountStatusBadge');

    async function openCloudBackupDashboardModal() {
        cloudBackupModal.style.display = 'flex';
        await refreshCloudStatusUI();
    }

    async function refreshCloudStatusUI() {
        try {
            const userId = currentUser ? currentUser.id : 1;
            const res = await fetch(`/api/cloud-backup/status?user_id=${userId}`);
            const data = await res.json();

            cloudDashboardLastSync.textContent = data.last_sync_time || 'Just Now';
            cloudDashboardNotesSize.textContent = `${data.total_synced} Notes (${data.file_size})`;

            const savedEmail = data.gdrive_email || (currentUser ? currentUser.gdrive_email : '');
            if (savedEmail) {
                cloudAccountEmailInput.value = savedEmail;
                if (cloudAccountStatusBadge) {
                    cloudAccountStatusBadge.style.display = 'inline-flex';
                    cloudAccountStatusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connected: ${escapeHtml(savedEmail)}`;
                }
            } else {
                if (cloudAccountStatusBadge) cloudAccountStatusBadge.style.display = 'none';
            }
        } catch (err) {
            console.error('Cloud status error:', err);
        }
    }

    closeCloudBackupModalBtn.addEventListener('click', () => cloudBackupModal.style.display = 'none');
    cloudBackupBtn.addEventListener('click', openCloudBackupDashboardModal);

    saveCloudAccountBtn.addEventListener('click', async () => {
        const newEmail = cloudAccountEmailInput.value.trim();
        if (!newEmail || !newEmail.includes('@')) {
            showToast('Please enter a valid Gmail address!', 'info');
            return;
        }

        try {
            const userId = currentUser ? currentUser.id : 1;
            const res = await fetch('/api/cloud-backup/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gdrive_email: newEmail, user_id: userId })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                if (currentUser) {
                    currentUser.gdrive_email = newEmail;
                    localStorage.setItem('smartnotes_user', JSON.stringify(currentUser));
                }
                if (cloudAccountStatusBadge) {
                    cloudAccountStatusBadge.style.display = 'inline-flex';
                    cloudAccountStatusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connected: ${escapeHtml(newEmail)}`;
                }
                showToast(`Google Storage Account connected: ${newEmail}!`, 'success');
            } else {
                showToast(data.error || 'Failed to connect account', 'error');
            }
        } catch (err) {
            showToast('Error connecting cloud account', 'error');
        }
    });

    async function triggerCloudBackup(emailOverride = '') {
        const emailToUse = emailOverride || cloudAccountEmailInput.value.trim() || (currentUser ? currentUser.gdrive_email : '');
        const userId = currentUser ? currentUser.id : 1;
        showToast('Initiating 5TB Cloud Backup & Sync...', 'info');

        try {
            const res = await fetch('/api/cloud-backup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, gdrive_email: emailToUse })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                showToast(data.gdrive_status, 'success');
                return data;
            }
        } catch (err) {
            showToast('Cloud backup sync error', 'error');
        }
    }

    modalCloudSyncBtn.addEventListener('click', async () => {
        const currentEmail = cloudAccountEmailInput.value.trim();
        await triggerCloudBackup(currentEmail);
        await refreshCloudStatusUI();
    });

    downloadFullPdfBtn.addEventListener('click', () => {
        window.open('/api/cloud-backup/export-all-pdf', '_blank');
    });

    downloadJsonBackupBtn.addEventListener('click', () => {
        window.location.href = '/api/backup';
    });

    triggerRestoreBrowseBtn.addEventListener('click', () => restoreFileInput.click());

    restoreFileInput.addEventListener('change', async (e) => {
        if (e.target.files.length > 0) {
            showToast('Restoring notes from backup file...', 'info');
            const formData = new FormData();
            formData.append('backup_file', e.target.files[0]);

            try {
                const res = await fetch('/api/cloud-backup/restore', {
                    method: 'POST',
                    body: formData
                });

                const data = await res.json();
                if (res.ok && data.success) {
                    showToast(data.message, 'success');
                    cloudBackupModal.style.display = 'none';
                    await loadNotes();
                    await loadCategories();
                } else {
                    showToast(data.error || 'Failed to restore notes', 'error');
                }
            } catch (err) {
                showToast('Error restoring backup file', 'error');
            }
        }
    });

    // =========================================================================
    // SETTINGS & PROFILE CUSTOMIZATION
    // =========================================================================
    openSettingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
        tabSetProfile.click();
    });

    closeSettingsModalBtn.addEventListener('click', () => settingsModal.style.display = 'none');

    tabSetProfile.addEventListener('click', () => {
        tabSetProfile.classList.add('active');
        tabSetCloud.classList.remove('active');
        tabSetSecurity.classList.remove('active');
        setProfileSection.style.display = 'block';
        setCloudSection.style.display = 'none';
        setSecuritySection.style.display = 'none';
    });

    tabSetCloud.addEventListener('click', () => {
        tabSetCloud.classList.add('active');
        tabSetProfile.classList.remove('active');
        tabSetSecurity.classList.remove('active');
        setCloudSection.style.display = 'block';
        setProfileSection.style.display = 'none';
        setSecuritySection.style.display = 'none';
    });

    tabSetSecurity.addEventListener('click', () => {
        tabSetSecurity.classList.add('active');
        tabSetProfile.classList.remove('active');
        tabSetCloud.classList.remove('active');
        setSecuritySection.style.display = 'block';
        setProfileSection.style.display = 'none';
        setCloudSection.style.display = 'none';
    });

    avatarDots.forEach(dot => {
        dot.addEventListener('click', () => {
            avatarDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            if (currentUser) currentUser.custom_avatar_url = '';
        });
    });

    saveProfileSettingsBtn.addEventListener('click', async () => {
        if (!currentUser) return;
        const activeAvatar = document.querySelector('.avatar-dot.active')?.dataset.avatar || 'avatar1';

        const payload = {
            user_id: currentUser.id,
            display_name: setDisplayName.value.trim() || currentUser.display_name,
            email: setEmail.value.trim() || currentUser.email,
            avatar: activeAvatar,
            custom_avatar_url: currentUser.custom_avatar_url || '',
            gdrive_email: setGdriveEmail.value.trim(),
            gemini_api_key: setGeminiApiKey.value.trim(),
            new_password: setNewPassword.value.trim()
        };

        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok && data.user) {
                currentUser = data.user;
                localStorage.setItem('smartnotes_user', JSON.stringify(currentUser));
                updateUserProfileUI();
                setNewPassword.value = '';
                showToast('Profile & AI settings saved!', 'success');
            } else {
                showToast('Failed to save settings', 'error');
            }
        } catch (err) {
            showToast('Error saving settings', 'error');
        }
    });

    // =========================================================================
    // GOOGLE DRIVE & GMAIL CLOUD BACKUP
    // =========================================================================
    async function triggerCloudBackup() {
        showToast('Initiating 5TB Google Drive Cloud Sync...', 'info');
        try {
            const res = await fetch('/api/cloud-backup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: currentUser ? currentUser.id : 1,
                    gdrive_email: cloudAccountEmailInput.value || setGdriveEmail.value || (currentUser ? currentUser.email : 'user@example.com')
                })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                cloudSyncInfoBox.style.display = 'flex';
                cloudSyncText.textContent = `${data.gdrive_status} (${data.total_notes_synced} Notes)`;
                showToast('Synced to 5TB Google Drive & Email Backup Sent!', 'success');
            } else {
                showToast('Cloud backup failed', 'error');
            }
        } catch (err) {
            showToast('Cloud backup error', 'error');
        }
    }

    triggerCloudSyncNowBtn.addEventListener('click', triggerCloudBackup);

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('smartnotes_user');
        localStorage.removeItem('smartnotes_session_active');
        currentUser = null;
        settingsModal.style.display = 'none';
        authModal.style.display = 'flex';
        showToast('Logged out of account', 'info');
    });

    // =========================================================================
    // UNIFIED THEME & PALETTE SYSTEM
    // =========================================================================
    function initAppTheme() {
        const savedPalette = localStorage.getItem('smartnotes_app_palette') || 'palette-sky';
        const isDark = localStorage.getItem('smartnotes_dark_mode') === 'true';

        if (isDark) {
            document.body.classList.add('theme-dark');
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            document.body.classList.remove('theme-dark');
            themeIcon.className = 'fa-solid fa-moon';
        }

        setAppPalette(savedPalette, false);
    }

    function setAppPalette(paletteName, notify = true) {
        document.body.classList.remove('palette-sky', 'palette-emerald', 'palette-indigo', 'palette-rose', 'palette-amber');

        let cleanPalette = paletteName.replace('theme-', 'palette-');
        if (!cleanPalette.startsWith('palette-')) cleanPalette = 'palette-sky';

        document.body.classList.add(cleanPalette);
        localStorage.setItem('smartnotes_app_palette', cleanPalette);

        document.querySelectorAll('.theme-palette-item').forEach(item => {
            const itemTheme = item.dataset.apptheme ? item.dataset.apptheme.replace('theme-', 'palette-') : '';
            item.classList.toggle('active', itemTheme === cleanPalette);
        });

        const paletteNamesMap = {
            'palette-sky': 'Sky Blue Classic',
            'palette-emerald': 'Mint Emerald',
            'palette-indigo': 'Royal Purple',
            'palette-rose': 'Sunset Rose',
            'palette-amber': 'Warm Amber Gold'
        };

        if (notify) {
            showToast(`App Color Palette set to ${paletteNamesMap[cleanPalette] || cleanPalette}!`, 'success');
        }
    }

    themePaletteBtn.addEventListener('click', () => {
        themePaletteDropdown.classList.toggle('show');
    });

    document.querySelectorAll('.theme-palette-item').forEach(item => {
        item.addEventListener('click', () => {
            const chosen = item.dataset.apptheme;
            if (chosen) {
                setAppPalette(chosen);
                themePaletteDropdown.classList.remove('show');
            }
        });
    });

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('theme-dark');
        if (isDark) {
            document.body.classList.remove('theme-dark');
            localStorage.setItem('smartnotes_dark_mode', 'false');
            themeIcon.className = 'fa-solid fa-moon';
            showToast('Switched to Light Mode', 'info');
        } else {
            document.body.classList.add('theme-dark');
            localStorage.setItem('smartnotes_dark_mode', 'true');
            themeIcon.className = 'fa-solid fa-sun';
            showToast('Switched to Dark Mode', 'info');
        }
    });

    // =========================================================================
    // API CALLS (NOTES)
    // =========================================================================
    async function loadNotes() {
        try {
            let url = `/api/notes?filter=${activeFilter}&category=${encodeURIComponent(activeCategory)}&search=${encodeURIComponent(searchQuery)}`;
            const res = await fetch(url);
            notes = await res.json();
            renderNotesCards();
            updateHeaderStatus();

            if (activeNoteId) {
                const found = notes.find(n => n.id === activeNoteId);
                if (found) {
                    selectNote(found.id, false, false);
                } else {
                    const firstUnlocked = notes.find(n => !n.is_locked) || notes[0];
                    if (firstUnlocked) selectNote(firstUnlocked.id, false, false);
                    else showEmptyState();
                }
            } else if (notes.length > 0) {
                const firstUnlocked = notes.find(n => !n.is_locked) || notes[0];
                selectNote(firstUnlocked.id, false, false);
            } else {
                showEmptyState();
            }
        } catch (err) {
            showToast('Failed to load notes', 'error');
        }
    }

    async function loadCategories() {
        try {
            const res = await fetch('/api/categories');
            const categories = await res.json();
            renderCategorySidebar(categories);
        } catch (err) {
            console.error('Error loading categories:', err);
        }
    }

    async function createNewNote() {
        try {
            const newPayload = {
                user_id: currentUser ? currentUser.id : 1,
                title: 'Untitled Note',
                content: '',
                category: activeCategory !== 'All' ? activeCategory : 'General',
                tags: '',
                color: 'sky',
                is_pinned: activeFilter === 'pinned' ? 1 : 0,
                is_favorite: activeFilter === 'favorites' ? 1 : 0
            };

            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPayload)
            });

            const created = await res.json();
            showToast('New note created', 'success');
            await loadNotes();
            await loadCategories();
            selectNote(created.id, true, true);
            editorTitleInput.focus();
        } catch (err) {
            showToast('Could not create note', 'error');
        }
    }

    function getCleanContentToSave() {
        if (editorVisualCanvas.style.display !== 'none') {
            let html = editorVisualCanvas.innerHTML;
            html = html.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, '\n![Image]($1)\n');
            html = html.replace(/<audio[^>]*src=["']([^"']+)["'][^>]*>.*?<\/audio>/gi, '\n[Audio]($1)\n');
            html = html.replace(/<div[^>]*class=["']doc-attachment-pill["'][^>]*data-url=["']([^"']+)["'][^>]*data-filename=["']([^"']+)["'][^>]*>.*?<\/div>/gi, '\n[PDF]($1|$2)\n');
            html = html.replace(/<a[^>]*class=["']wiki-link["'][^>]*>\[\[(.*?)\]\]<\/a>/gi, '[[$1]]');
            html = html.replace(/<button[^>]*class=["']media-remove-btn["'][^>]*>.*?<\/button>/gi, '');
            html = html.replace(/<span[^>]*class=["']doc-remove-btn["'][^>]*>.*?<\/span>/gi, '');
            html = html.replace(/<div[^>]*>/gi, '\n').replace(/<\/div>/gi, '').replace(/<br\s*[\/]?>/gi, '\n');
            const tmp = document.createElement('div');
            tmp.innerHTML = html;
            return tmp.textContent.trim();
        }
        return editorTextarea.value || '';
    }

    function renderMarkdownToVisualCanvas(content) {
        if (!content) {
            editorVisualCanvas.innerHTML = '';
            editorTextarea.value = '';
            return;
        }

        editorTextarea.value = content;
        let html = content.replace(/!\[.*?\]\((.*?)\)/g, '<div class="embedded-media-wrapper" contenteditable="false"><button class="media-remove-btn" title="Remove Photo"><i class="fa-solid fa-trash-can"></i> Remove Photo</button><img src="$1" class="note-embedded-image" alt="Image"></div>');

        if (!html.includes('embedded-media-wrapper') && html.includes('<img')) {
            html = html.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, '<div class="embedded-media-wrapper" contenteditable="false"><button class="media-remove-btn" title="Remove Photo"><i class="fa-solid fa-trash-can"></i> Remove Photo</button><img src="$1" class="note-embedded-image" alt="Image"></div>');
        }

        // AUDIO PLAYERS WITH SPEED CONTROLLER
        html = html.replace(/\[Audio\]\((.*?)\)/g, (match, url) => {
            const uid = 'aud_' + Math.random().toString(36).substr(2, 6);
            return `<div class="embedded-media-wrapper" contenteditable="false"><button class="media-remove-btn" title="Remove Audio"><i class="fa-solid fa-trash-can"></i> Remove Audio</button><audio id="${uid}" controls src="${url}" class="note-embedded-audio"></audio><div class="audio-speed-controls"><span style="font-size:11px; color:var(--text-muted);">Speed:</span><button class="audio-speed-btn" onclick="window.setAudioPlaybackSpeed('${uid}', 1.0)">1x</button><button class="audio-speed-btn" onclick="window.setAudioPlaybackSpeed('${uid}', 1.25)">1.25x</button><button class="audio-speed-btn" onclick="window.setAudioPlaybackSpeed('${uid}', 1.5)">1.5x</button><button class="audio-speed-btn" onclick="window.setAudioPlaybackSpeed('${uid}', 2.0)">2x</button></div></div>`;
        });

        html = html.replace(/\[PDF\]\((.*?)\|(.*?)\)/g, '<div class="doc-attachment-pill" data-url="$1" data-filename="$2" style="padding: 10px 14px; background: rgba(244,63,94,0.12); border: 1px solid rgba(244,63,94,0.35); border-radius: 10px; display: inline-flex; align-items: center; gap: 10px; margin: 10px 0; color: #f43f5e; font-weight: 600; cursor: pointer;"><i class="fa-solid fa-file-pdf" style="font-size: 20px;"></i><span class="pdf-title-text">$2</span><span class="view-pdf-btn" style="font-size: 11px; background: #f43f5e; color: #ffffff; padding: 3px 10px; border-radius: 12px; font-weight: 700; margin-left: 6px;"><i class="fa-solid fa-eye"></i> View PDF</span><span class="doc-remove-btn" title="Remove PDF Attachment"><i class="fa-solid fa-xmark"></i></span></div>');
        html = html.replace(/\[\[(.*?)\]\]/g, '<a class="wiki-link" data-title="$1">[[ $1 ]]</a>');
        html = html.replace(/\n/g, '<br>');
        editorVisualCanvas.innerHTML = html;

        bindMediaRemoveListeners();
    }

    function bindMediaRemoveListeners() {
        editorVisualCanvas.querySelectorAll('.media-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const wrapper = btn.closest('.embedded-media-wrapper');
                if (wrapper) {
                    wrapper.remove();
                    saveActiveNote();
                    updateWordCounts();
                    showToast('Media removed from note', 'info');
                }
            });
        });

        editorVisualCanvas.querySelectorAll('.doc-attachment-pill').forEach(pill => {
            const viewBtn = pill.querySelector('.view-pdf-btn') || pill;
            const removeBtn = pill.querySelector('.doc-remove-btn');

            viewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const url = pill.dataset.url;
                const filename = pill.dataset.filename;
                if (url) window.openPdfViewer(url, filename || 'PDF Reader');
            });

            if (removeBtn) {
                removeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    pill.remove();
                    saveActiveNote();
                    updateWordCounts();
                    showToast('PDF Attachment removed from note', 'info');
                });
            }
        });

        editorVisualCanvas.querySelectorAll('.wiki-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const title = link.dataset.title;
                const target = notes.find(n => n.title.toLowerCase() === title.toLowerCase());
                if (target) {
                    selectNote(target.id, true, true);
                    showToast(`Navigated to linked note: ${target.title}`, 'info');
                } else {
                    showToast(`Note "${title}" not found. Create a note with this title first!`, 'info');
                }
            });
        });
    }

    function insertVisualImageToCanvas(imgUrl) {
        const imgTag = `<br><div class="embedded-media-wrapper" contenteditable="false"><button class="media-remove-btn" title="Remove Photo"><i class="fa-solid fa-trash-can"></i> Remove Photo</button><img src="${imgUrl}" class="note-embedded-image" alt="Image"></div><br>`;
        editorVisualCanvas.focus();
        document.execCommand('insertHTML', false, imgTag);
        bindMediaRemoveListeners();
        updateWordCounts();
    }

    async function saveActiveNote() {
        if (!activeNoteId) return;
        showSaveStatus('<i class="fa-solid fa-spinner fa-spin"></i> Saving...');
        const activeColor = document.querySelector('.color-dot.active')?.dataset.color || 'sky';
        const cleanContent = getCleanContentToSave();

        const payload = {
            user_id: currentUser ? currentUser.id : 1,
            title: editorTitleInput.value.trim() || 'Untitled Note',
            content: cleanContent,
            category: editorCategorySelect.value,
            tags: editorTagsInput.value,
            color: activeColor,
            is_pinned: editorPinBtn.classList.contains('active') ? 1 : 0,
            is_favorite: editorFavBtn.classList.contains('active') ? 1 : 0,
            due_date: dueDateStatus.dataset.date || '',
            subject_code: editorSubjectSelect ? editorSubjectSelect.value : ''
        };

        try {
            const res = await fetch(`/api/notes/${activeNoteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Note-PIN': currentVerifiedPin
                },
                body: JSON.stringify(payload)
            });

            const updated = await res.json();
            showSaveStatus('<i class="fa-solid fa-check-double"></i> Saved');

            const idx = notes.findIndex(n => n.id === activeNoteId);
            if (idx !== -1) {
                notes[idx] = updated;
                renderNotesCards();
            }

            loadCategories();
            updateCounts();
        } catch (err) {
            showSaveStatus('<i class="fa-solid fa-circle-exclamation"></i> Save failed');
        }
    }

    async function updateCounts() {
        try {
            const [rAll, rPinned, rFavs, rReminders, rTrash] = await Promise.all([
                fetch('/api/notes?filter=active').then(r => r.json()),
                fetch('/api/notes?filter=pinned').then(r => r.json()),
                fetch('/api/notes?filter=favorites').then(r => r.json()),
                fetch('/api/notes?filter=reminders').then(r => r.json()),
                fetch('/api/notes?filter=trashed').then(r => r.json())
            ]);

            countAll.textContent = rAll.length;
            countPinned.textContent = rPinned.length;
            countFavs.textContent = rFavs.length;
            countReminders.textContent = rReminders.length;
            countTrash.textContent = rTrash.length;
        } catch (err) {
            console.error(err);
        }
    }

    // =========================================================================
    // UI RENDERING
    // =========================================================================
    function renderNotesCards() {
        notesCardsContainer.innerHTML = '';
        notesCountLabel.textContent = `${notes.length} Notes`;

        const emptyTrashHeaderBtn = document.getElementById('emptyTrashHeaderBtn');
        if (emptyTrashHeaderBtn) {
            emptyTrashHeaderBtn.style.display = (activeFilter === 'trashed' && notes.length > 0) ? 'inline-flex' : 'none';
        }

        if (notes.length === 0) {
            notesCardsContainer.innerHTML = `
                <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
                    No notes found.
                </div>
            `;
            return;
        }

        notes.forEach(note => {
            const card = document.createElement('div');
            card.className = `note-card ${note.id === activeNoteId ? 'active' : ''}`;
            card.dataset.id = note.id;
            card.dataset.color = note.color || 'sky';

            let cleanSnippetText = note.content ? note.content.replace(/!\[.*?\]\(.*?\)/g, '[📷 Image]').replace(/\[Audio\]\(.*?\)/g, '[🎙️ Audio]').replace(/\[PDF\]\(.*?\)/g, '[📄 PDF]').replace(/#+\s*/g, '').substring(0, 90) : 'Empty note...';

            const snippet = note.is_locked ? '🔒 Protected Note (PIN required)' : cleanSnippetText;
            const dateStr = note.updated_at ? note.updated_at.split(' ')[0] : '';
            const dueStr = note.due_date ? `<span style="color: var(--accent-amber);"><i class="fa-solid fa-calendar"></i> ${note.due_date.split('T')[0]}</span>` : '';

            card.innerHTML = `
                <div class="note-card-header">
                    <div class="note-card-title">${escapeHtml(note.title)}</div>
                    <div class="card-icons">
                        ${note.is_locked ? '<i class="fa-solid fa-lock" style="color: var(--accent-rose);" title="Locked"></i>' : ''}
                        ${note.is_pinned ? '<i class="fa-solid fa-thumbtack" title="Pinned"></i>' : ''}
                        ${note.is_favorite ? '<i class="fa-solid fa-star" title="Favorite"></i>' : ''}
                    </div>
                </div>
                <div class="note-card-snippet">${escapeHtml(snippet)}</div>
                <div class="note-card-footer">
                    <span class="category-tag">${escapeHtml(note.category || 'General')}</span>
                    <span>${dueStr ? dueStr : dateStr}</span>
                </div>
            `;

            card.addEventListener('click', () => selectNote(note.id, true, true));
            notesCardsContainer.appendChild(card);
        });
    }

    function renderCategorySidebar(categories) {
        categoryNavList.innerHTML = `
            <li class="nav-item ${activeCategory === 'All' ? 'active' : ''}" data-category="All">
                <a href="#"><i class="fa-solid fa-layer-group"></i> All Categories</a>
            </li>
        `;

        categories.forEach(cat => {
            if (!cat.category) return;
            const li = document.createElement('li');
            li.className = `nav-item ${activeCategory === cat.category ? 'active' : ''}`;
            li.dataset.category = cat.category;
            li.innerHTML = `
                <a href="#"><i class="fa-solid fa-tag"></i> ${escapeHtml(cat.category)} <span class="badge">${cat.count}</span></a>
            `;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                activeCategory = cat.category;
                loadNotes();
                document.querySelectorAll('#categoryNavList .nav-item').forEach(item => item.classList.remove('active'));
                li.classList.add('active');
            });
            categoryNavList.appendChild(li);
        });
    }

    async function selectNote(noteId, focus = false, isUserClick = false) {
        activeNoteId = noteId;
        let note = notes.find(n => n.id === noteId);

        if (!note) {
            showEmptyState();
            return;
        }

        if (note.is_locked && currentVerifiedPin === '') {
            if (isUserClick) {
                promptPinModal("Protected Note", "Enter 4-digit PIN to view note content:", async (enteredPin) => {
                    try {
                        const res = await fetch(`/api/notes/${noteId}/verify-pin`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ pin_code: enteredPin })
                        });
                        if (res.ok) {
                            currentVerifiedPin = enteredPin;
                            const data = await res.json();
                            note = data.note;
                            displayActiveNote(note, focus);
                        } else {
                            showToast('Incorrect PIN code!', 'error');
                        }
                    } catch (err) {
                        showToast('PIN verification error', 'error');
                    }
                });
            } else {
                displayLockedNotePlaceholder(note);
            }
            return;
        }

        displayActiveNote(note, focus);
    }

    function displayLockedNotePlaceholder(note) {
        emptyStateView.style.display = 'none';
        activeEditorView.style.display = 'flex';

        editorTitleInput.value = note.title || '';
        editorVisualCanvas.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(244,63,94,0.15); color: #f43f5e; font-size: 26px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                    <i class="fa-solid fa-lock"></i>
                </div>
                <h3 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Protected Note</h3>
                <p style="font-size: 13px; color: var(--text-muted); margin: 8px 0 18px;">This note is protected with a 4-digit PIN. Click below to enter your PIN and unlock.</p>
                <button class="btn btn-primary" id="unlockPlaceholderBtn">
                    <i class="fa-solid fa-key"></i> Enter PIN to Unlock
                </button>
            </div>
        `;
        editorTextarea.value = '';

        setTimeout(() => {
            const unlockBtn = document.getElementById('unlockPlaceholderBtn');
            if (unlockBtn) {
                unlockBtn.addEventListener('click', () => selectNote(note.id, true, true));
            }
        }, 50);

        editorCategorySelect.value = note.category || 'General';
        editorTagsInput.value = note.tags || '';

        editorPinBtn.classList.toggle('active', note.is_pinned === 1);
        editorFavBtn.classList.toggle('active', note.is_favorite === 1);
        lockNoteBtn.classList.add('locked');
        lockIcon.className = 'fa-solid fa-lock';

        document.querySelectorAll('.note-card').forEach(card => {
            card.classList.toggle('active', parseInt(card.dataset.id) === note.id);
        });
    }

    function displayActiveNote(note, focus) {
        emptyStateView.style.display = 'none';
        activeEditorView.style.display = 'flex';

        editorTitleInput.value = note.title || '';
        renderMarkdownToVisualCanvas(note.content || '');
        editorCategorySelect.value = note.category || 'General';
        if (editorSubjectSelect) editorSubjectSelect.value = note.subject_code || '';
        editorTagsInput.value = note.tags || '';

        editorPinBtn.classList.toggle('active', note.is_pinned === 1);
        editorFavBtn.classList.toggle('active', note.is_favorite === 1);

        if (note.is_locked) {
            lockNoteBtn.classList.add('locked');
            lockIcon.className = 'fa-solid fa-lock';
        } else {
            lockNoteBtn.classList.remove('locked');
            lockIcon.className = 'fa-solid fa-lock-open';
        }

        if (note.due_date) {
            dueDateStatus.textContent = `📅 Due: ${note.due_date.replace('T', ' ')}`;
            dueDateStatus.dataset.date = note.due_date;
        } else {
            dueDateStatus.textContent = '';
            dueDateStatus.dataset.date = '';
        }

        colorDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.color === (note.color || 'sky'));
        });

        const noteEditorPane = document.getElementById('noteEditorPane');
        if (noteEditorPane) {
            noteEditorPane.dataset.theme = note.color || 'sky';
        }

        document.querySelectorAll('.note-card').forEach(card => {
            card.classList.toggle('active', parseInt(card.dataset.id) === note.id);
        });

        updateWordCounts();

        if (focus) editorVisualCanvas.focus();
    }

    function showEmptyState() {
        activeNoteId = null;
        emptyStateView.style.display = 'flex';
        activeEditorView.style.display = 'none';
    }

    function updateWordCounts() {
        const text = editorVisualCanvas.innerText || editorTextarea.value || '';
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const readingMins = Math.max(1, Math.ceil(words / 200));

        statWordCount.textContent = `${words} words`;
        statCharCount.textContent = `${chars} chars`;
        statReadingTime.textContent = words > 0 ? `${readingMins} min read` : '< 1 min read';
    }

    function updateHeaderStatus() {
        let label = 'All Notes';
        if (activeFilter === 'pinned') label = 'Pinned Notes';
        else if (activeFilter === 'favorites') label = 'Favorite Notes';
        else if (activeFilter === 'reminders') label = 'Reminders';
        else if (activeFilter === 'trashed') label = 'Trash';

        if (activeCategory !== 'All') {
            label += ` (${activeCategory})`;
        }
        activeFilterText.textContent = label;
    }

    function showSaveStatus(html) {
        saveStatus.innerHTML = html;
    }

    // =========================================================================
    // 🧠 MODULE 1: INTERACTIVE MIND MAP & NOTE NETWORK CANVAS (UPGRADED)
    // =========================================================================
    let mindMapNodes = [];
    let mindMapEdges = [];
    let draggedNode = null;
    let hoveredNode = null;
    let isMindMapAnimating = false;

    const topbarMindMapBtn = document.getElementById('topbarMindMapBtn');
    const topbarKanbanBtn = document.getElementById('topbarKanbanBtn');

    async function openMindMapWindow() {
        graphModal.style.display = 'flex';
        setTimeout(async () => {
            await initAndRenderMindMap();
        }, 50);
    }

    async function openKanbanWindow() {
        kanbanModal.style.display = 'flex';
        await loadKanbanBoard();
    }

    navMindMap.addEventListener('click', openMindMapWindow);
    if (topbarMindMapBtn) topbarMindMapBtn.addEventListener('click', openMindMapWindow);

    closeGraphModalBtn.addEventListener('click', () => {
        graphModal.style.display = 'none';
        isMindMapAnimating = false;
    });

    const mindMapResetBtn = document.getElementById('mindMapResetBtn');
    if (mindMapResetBtn) {
        mindMapResetBtn.addEventListener('click', () => {
            initNodePositions();
            drawMindMapFrame();
            showToast('Mind Map view centered!', 'info');
        });
    }

    function initNodePositions() {
        const container = document.getElementById('mindmapCanvasContainer');
        if (!container || !mindMapCanvas) return;

        const rect = container.getBoundingClientRect();
        const width = mindMapCanvas.width = container.clientWidth || rect.width || 800;
        const height = mindMapCanvas.height = container.clientHeight || rect.height || 500;

        const centerX = width / 2;
        const centerY = height / 2;

        const categoryNodes = mindMapNodes.filter(n => n.is_category);
        const noteNodes = mindMapNodes.filter(n => !n.is_category);

        categoryNodes.forEach((node, idx) => {
            const angle = (idx / Math.max(1, categoryNodes.length)) * Math.PI * 2;
            const radius = Math.min(width, height) * 0.25;
            node.x = centerX + Math.cos(angle) * radius;
            node.y = centerY + Math.sin(angle) * radius;
            node.targetX = node.x;
            node.targetY = node.y;
            node.radius = 22;
        });

        noteNodes.forEach((node, idx) => {
            const parentCat = categoryNodes.find(c => c.label === node.category);
            const parentX = parentCat ? parentCat.x : centerX;
            const parentY = parentCat ? parentCat.y : centerY;

            const angle = (idx / Math.max(1, noteNodes.length)) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
            const radius = Math.min(width, height) * 0.38;
            node.x = parentX + (Math.random() - 0.5) * 120;
            node.y = parentY + (Math.random() - 0.5) * 120;
            node.targetX = centerX + Math.cos(angle) * radius;
            node.targetY = centerY + Math.sin(angle) * radius;
            node.radius = 16;
        });
    }

    async function initAndRenderMindMap() {
        try {
            const res = await fetch('/api/graph/data');
            const data = await res.json();
            mindMapNodes = data.nodes || [];
            mindMapEdges = data.edges || [];

            initNodePositions();
            setupMindMapInteractions();

            isMindMapAnimating = true;
            animateMindMap();
        } catch (err) {
            console.error('Mindmap error:', err);
        }
    }

    function setupMindMapInteractions() {
        if (!mindMapCanvas) return;

        mindMapCanvas.onmousedown = (e) => {
            const rect = mindMapCanvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            draggedNode = mindMapNodes.find(n => Math.hypot(n.x - mx, n.y - my) < n.radius + 8);
            if (draggedNode) {
                mindMapCanvas.style.cursor = 'grabbing';
            }
        };

        mindMapCanvas.onmousemove = (e) => {
            const rect = mindMapCanvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            if (draggedNode) {
                draggedNode.x = mx;
                draggedNode.y = my;
                draggedNode.targetX = mx;
                draggedNode.targetY = my;
                return;
            }

            hoveredNode = mindMapNodes.find(n => Math.hypot(n.x - mx, n.y - my) < n.radius + 8);
            mindMapCanvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
        };

        mindMapCanvas.onmouseup = (e) => {
            if (draggedNode) {
                draggedNode = null;
                mindMapCanvas.style.cursor = 'grab';
            }
        };

        mindMapCanvas.onclick = (e) => {
            const rect = mindMapCanvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            const clicked = mindMapNodes.find(n => Math.hypot(n.x - mx, n.y - my) < n.radius + 8);
            if (clicked && clicked.note_id) {
                graphModal.style.display = 'none';
                isMindMapAnimating = false;
                selectNote(clicked.note_id, true, true);
            }
        };
    }

    function animateMindMap() {
        if (!isMindMapAnimating || graphModal.style.display === 'none') return;

        mindMapNodes.forEach(node => {
            if (node !== draggedNode) {
                node.x += (node.targetX - node.x) * 0.08;
                node.y += (node.targetY - node.y) * 0.08;
            }
        });

        drawMindMapFrame();
        requestAnimationFrame(animateMindMap);
    }

    function drawMindMapFrame() {
        const ctx = mindMapCanvas.getContext('2d');
        const width = mindMapCanvas.width;
        const height = mindMapCanvas.height;
        const isDark = document.body.classList.contains('theme-dark');

        ctx.clearRect(0, 0, width, height);

        // Draw Connecting Edges with Glow
        mindMapEdges.forEach(edge => {
            const fromNode = mindMapNodes.find(n => n.id === edge.from);
            const toNode = mindMapNodes.find(n => n.id === edge.to);
            if (fromNode && toNode) {
                ctx.save();
                const isHovered = (hoveredNode && (hoveredNode.id === fromNode.id || hoveredNode.id === toNode.id));

                ctx.strokeStyle = isHovered ? 'rgba(14, 165, 233, 0.9)' : (isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(203, 213, 225, 0.8)');
                ctx.lineWidth = isHovered ? 3 : 1.8;

                if (isHovered) {
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = '#0ea5e9';
                }

                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.stroke();
                ctx.restore();
            }
        });

        // Draw Nodes
        mindMapNodes.forEach(node => {
            ctx.save();
            const isHover = (hoveredNode && hoveredNode.id === node.id);

            ctx.beginPath();
            ctx.arc(node.x, node.y, isHover ? node.radius + 5 : node.radius, 0, Math.PI * 2);

            let nodeBg = node.is_category ? '#f59e0b' : '#0ea5e9';
            ctx.fillStyle = nodeBg;
            ctx.shadowBlur = isHover ? 20 : 10;
            ctx.shadowColor = nodeBg;
            ctx.fill();

            ctx.lineWidth = 2.5;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            // Label Text (Adaptive Dark / Light Mode)
            ctx.shadowBlur = 0;
            ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
            ctx.font = isHover ? 'bold 13px Inter' : '600 12px Inter';
            ctx.textAlign = 'center';

            const iconPrefix = node.is_category ? '📁 ' : '📄 ';
            ctx.fillText(iconPrefix + node.label, node.x, node.y + node.radius + 18);
            ctx.restore();
        });
    }

    // =========================================================================
    // 📋 MODULE 2: SMART KANBAN TASK BOARD (UPGRADED)
    // =========================================================================
    const kanbanSearchInput = document.getElementById('kanbanSearchInput');
    const kanbanCreateTaskBtn = document.getElementById('kanbanCreateTaskBtn');
    const kanbanProgressBar = document.getElementById('kanbanProgressBar');
    const kanbanProgressText = document.getElementById('kanbanProgressText');

    let currentKanbanData = { todo: [], in_progress: [], completed: [] };
    let kanbanSearchQuery = '';

    navKanban.addEventListener('click', openKanbanWindow);
    if (topbarKanbanBtn) topbarKanbanBtn.addEventListener('click', openKanbanWindow);

    closeKanbanModalBtn.addEventListener('click', () => kanbanModal.style.display = 'none');

    if (kanbanSearchInput) {
        kanbanSearchInput.addEventListener('input', () => {
            kanbanSearchQuery = kanbanSearchInput.value.trim().toLowerCase();
            renderAllKanbanColumns();
        });
    }

    if (kanbanCreateTaskBtn) {
        kanbanCreateTaskBtn.addEventListener('click', async () => {
            await createNewNote();
            kanbanModal.style.display = 'none';
        });
    }

    document.querySelectorAll('.kanban-add-task-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const targetStatus = btn.dataset.status || 'todo';
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'New Kanban Task',
                    content: 'Task details & checklist...',
                    category: 'General',
                    tags: targetStatus
                })
            });
            const newNote = await res.json();
            showToast(`Created new ${targetStatus.toUpperCase()} task!`, 'success');
            await loadKanbanBoard();
            await loadNotes();
        });
    });

    async function loadKanbanBoard() {
        try {
            const res = await fetch('/api/kanban/data');
            currentKanbanData = await res.json();
            renderAllKanbanColumns();
        } catch (err) {
            showToast('Failed to load Kanban board', 'error');
        }
    }

    function renderAllKanbanColumns() {
        const filterNotes = (list) => {
            if (!kanbanSearchQuery) return list;
            return list.filter(n =>
                (n.title || '').toLowerCase().includes(kanbanSearchQuery) ||
                (n.category || '').toLowerCase().includes(kanbanSearchQuery)
            );
        };

        const filteredTodo = filterNotes(currentKanbanData.todo || []);
        const filteredProgress = filterNotes(currentKanbanData.in_progress || []);
        const filteredDone = filterNotes(currentKanbanData.completed || []);

        renderKanbanColumn(kanbanZoneTodo, filteredTodo, 'todo');
        renderKanbanColumn(kanbanZoneProgress, filteredProgress, 'in-progress');
        renderKanbanColumn(kanbanZoneDone, filteredDone, 'completed');

        const countTodo = (currentKanbanData.todo || []).length;
        const countProgress = (currentKanbanData.in_progress || []).length;
        const countDone = (currentKanbanData.completed || []).length;

        countKanbanTodo.textContent = countTodo;
        countKanbanProgress.textContent = countProgress;
        countKanbanDone.textContent = countDone;

        const totalTasks = countTodo + countProgress + countDone;
        const percent = totalTasks > 0 ? Math.round((countDone / totalTasks) * 100) : 0;

        if (kanbanProgressBar) kanbanProgressBar.style.width = `${percent}%`;
        if (kanbanProgressText) kanbanProgressText.textContent = `${percent}% (${countDone}/${totalTasks} Tasks Done)`;
    }

    function renderKanbanColumn(container, noteList, status) {
        container.innerHTML = '';

        if (noteList.length === 0) {
            container.innerHTML = `
                <div style="padding: 18px; text-align: center; color: var(--text-muted); font-size: 12px; border: 1px dashed var(--border-color); border-radius: 8px;">
                    No tasks found
                </div>
            `;
        }

        noteList.forEach(note => {
            const card = document.createElement('div');
            card.className = 'kanban-card-item';
            card.draggable = true;
            card.dataset.id = note.id;

            card.innerHTML = `
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                    <h5 style="font-size: 13.5px; font-weight: 700; color: var(--text-primary); line-height: 1.3;">${escapeHtml(note.title)}</h5>
                    <span style="font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 8px; background: var(--accent-sky-bg); color: var(--accent-sky); border: 1px solid rgba(14,165,233,0.3); white-space: nowrap;">${escapeHtml(note.category || 'General')}</span>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--border-color); font-size: 11px;">
                    <span style="color: var(--text-muted);"><i class="fa-solid fa-clock" style="font-size: 10px; margin-right: 3px;"></i> ${note.updated_at ? note.updated_at.split(' ')[0] : 'Today'}</span>
                    
                    <div style="display: flex; gap: 4px;" onclick="event.stopPropagation();">
                        ${status !== 'todo' ? `<button class="btn-icon move-status-btn" data-id="${note.id}" data-target="todo" title="Move to To-Do" style="width: 22px; height: 22px; font-size: 10px;"><i class="fa-solid fa-arrow-left"></i></button>` : ''}
                        ${status !== 'in-progress' ? `<button class="btn-icon move-status-btn" data-id="${note.id}" data-target="in-progress" title="Move to In Progress" style="width: 22px; height: 22px; font-size: 10px;"><i class="fa-solid fa-spinner"></i></button>` : ''}
                        ${status !== 'completed' ? `<button class="btn-icon move-status-btn" data-id="${note.id}" data-target="completed" title="Mark Completed" style="width: 22px; height: 22px; font-size: 10px; color: var(--accent-emerald);"><i class="fa-solid fa-check"></i></button>` : ''}
                    </div>
                </div>
            `;

            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', note.id);
            });

            card.addEventListener('click', () => {
                kanbanModal.style.display = 'none';
                selectNote(note.id, true, true);
            });

            container.appendChild(card);
        });

        // 1-Click Status Shift Event Handler
        container.querySelectorAll('.move-status-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const noteId = btn.dataset.id;
                const targetStatus = btn.dataset.target;
                if (noteId && targetStatus) {
                    await fetch('/api/kanban/update', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ note_id: noteId, status: targetStatus })
                    });
                    showToast(`Task moved to ${targetStatus.toUpperCase()}!`, 'success');
                    await loadKanbanBoard();
                    await loadNotes();
                }
            });
        });

        container.addEventListener('dragover', (e) => e.preventDefault());
        container.addEventListener('drop', async (e) => {
            e.preventDefault();
            const noteId = e.dataTransfer.getData('text/plain');
            if (noteId) {
                await fetch('/api/kanban/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ note_id: noteId, status: status })
                });
                showToast(`Moved note status to ${status.toUpperCase()}!`, 'success');
                await loadKanbanBoard();
                await loadNotes();
            }
        });
    }

    // =========================================================================
    // 🔍 MODULE 3: OCR IMAGE TEXT EXTRACTOR
    // =========================================================================
    ocrScanBtn.addEventListener('click', () => {
        if (!activeNoteId) return;
        ocrModal.style.display = 'flex';
        ocrResultBox.style.display = 'none';
        appendOcrTextBtn.style.display = 'none';
    });

    triggerOcrBrowseBtn.addEventListener('click', () => ocrFileInput.click());
    closeOcrModalBtn.addEventListener('click', () => ocrModal.style.display = 'none');
    cancelOcrBtn.addEventListener('click', () => ocrModal.style.display = 'none');

    ocrFileInput.addEventListener('change', async (e) => {
        if (e.target.files.length > 0) {
            showToast('Extracting text from image (OCR)...', 'info');
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            try {
                const res = await fetch('/api/ocr/extract', {
                    method: 'POST',
                    body: formData
                });

                const data = await res.json();
                ocrResultBox.style.display = 'block';
                appendOcrTextBtn.style.display = 'inline-flex';
                ocrExtractedTextarea.value = data.extracted_text;
                showToast('Text extracted cleanly!', 'success');
            } catch (err) {
                showToast('OCR extraction failed', 'error');
            }
        }
    });

    appendOcrTextBtn.addEventListener('click', () => {
        const text = ocrExtractedTextarea.value;
        if (text) {
            document.execCommand('insertHTML', false, '<br><pre>' + text + '</pre><br>');
            saveActiveNote();
            ocrModal.style.display = 'none';
            showToast('Extracted OCR text added to note!', 'success');
        }
    });

    // =========================================================================
    // 🎙️ MODULE 4: REAL-TIME AUDIO RECORDER & AI TRANSCRIBER
    // =========================================================================
    recordAudioBtn.addEventListener('click', () => {
        if (!activeNoteId) return;
        audioRecorderModal.style.display = 'flex';
        audioTimerDisplay.textContent = '00:00';
        audioRecordStatusText.textContent = 'Click Record to start lecture/meeting recording...';
        insertAudioToNoteBtn.style.display = 'none';
    });

    closeAudioRecorderModalBtn.addEventListener('click', () => {
        stopAudioRecording();
        audioRecorderModal.style.display = 'none';
    });

    toggleAudioRecordBtn.addEventListener('click', async () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            stopAudioRecording();
        } else {
            await startAudioRecording();
        }
    });

    async function startAudioRecording() {
        audioChunks = [];
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
            mediaRecorder.onstop = () => {
                currentRecordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            };
            mediaRecorder.start();

            audioRecordSeconds = 0;
            audioRecordTimer = setInterval(() => {
                audioRecordSeconds++;
                const mins = String(Math.floor(audioRecordSeconds / 60)).padStart(2, '0');
                const secs = String(audioRecordSeconds % 60).padStart(2, '0');
                audioTimerDisplay.textContent = `${mins}:${secs}`;
            }, 1000);

            audioRecordStatusText.textContent = 'Recording lecture audio...';
            toggleAudioRecordBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop Recording';
            insertAudioToNoteBtn.style.display = 'none';
        } catch (err) {
            showToast('Microphone access required for recording', 'error');
        }
    }

    function stopAudioRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }
        clearInterval(audioRecordTimer);
        audioRecordStatusText.textContent = 'Recording complete! Ready to insert & transcribe.';
        toggleAudioRecordBtn.innerHTML = '<i class="fa-solid fa-circle" style="color: #f43f5e;"></i> Record Again';
        insertAudioToNoteBtn.style.display = 'inline-flex';
    }

    insertAudioToNoteBtn.addEventListener('click', async () => {
        if (!currentRecordedAudioBlob) return;
        showToast('Uploading & AI Transcribing Audio...', 'info');
        const formData = new FormData();
        formData.append('audio', currentRecordedAudioBlob, 'lecture.webm');

        try {
            const res = await fetch('/api/audio/upload', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            const playerTag = `<br><div class="embedded-media-wrapper" contenteditable="false"><button class="media-remove-btn" title="Remove Audio"><i class="fa-solid fa-trash-can"></i> Remove Audio</button><audio controls src="${data.url}" class="note-embedded-audio"></audio></div><br>`;
            document.execCommand('insertHTML', false, playerTag);
            bindMediaRemoveListeners();

            const resTrans = await fetch('/api/audio/transcribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ audio_url: data.url })
            });

            const dataTrans = await resTrans.json();
            const transcriptBlock = `\n> **🎙️ AI Audio Transcript & Action Points:**\n> ${dataTrans.transcript}\n`;
            document.execCommand('insertHTML', false, transcriptBlock.replace(/\n/g, '<br>'));

            saveActiveNote();
            audioRecorderModal.style.display = 'none';
            showToast('Audio Player & AI Transcript inserted into note!', 'success');
        } catch (err) {
            showToast('Error uploading audio', 'error');
        }
    });

    // =========================================================================
    // 📎 MODULE 5: PDF DOCUMENT VIEWER
    // =========================================================================
    attachDocBtn.addEventListener('click', () => {
        if (!activeNoteId) return;
        docFileInput.click();
    });

    closePdfModalBtn.addEventListener('click', () => pdfViewerModal.style.display = 'none');

    docFileInput.addEventListener('change', async (e) => {
        if (e.target.files.length > 0) {
            showToast('Uploading PDF Document...', 'info');
            const formData = new FormData();
            formData.append('document', e.target.files[0]);

            try {
                const res = await fetch('/api/attachments/upload', {
                    method: 'POST',
                    body: formData
                });

                const data = await res.json();
                const docCard = `<br><div class="doc-attachment-pill" data-url="${data.file_url}" data-filename="${data.filename}" style="padding: 10px 14px; background: rgba(244,63,94,0.12); border: 1px solid rgba(244,63,94,0.35); border-radius: 10px; display: inline-flex; align-items: center; gap: 10px; margin: 10px 0; color: #f43f5e; font-weight: 600; cursor: pointer;"><i class="fa-solid fa-file-pdf" style="font-size: 20px;"></i><span class="pdf-title-text">${data.filename}</span><span class="view-pdf-btn" style="font-size: 11px; background: #f43f5e; color: #ffffff; padding: 3px 10px; border-radius: 12px; font-weight: 700; margin-left: 6px;"><i class="fa-solid fa-eye"></i> View PDF</span><span class="doc-remove-btn" title="Remove PDF Attachment"><i class="fa-solid fa-xmark"></i></span></div><br>`;

                editorVisualCanvas.focus();
                document.execCommand('insertHTML', false, docCard);
                bindMediaRemoveListeners();

                saveActiveNote();
                showToast('PDF Attached & Saved cleanly!', 'success');
            } catch (err) {
                showToast('Document upload failed', 'error');
            }
        }
    });

    window.openPdfViewer = (url, name) => {
        pdfModalTitle.textContent = name || 'PDF Document Reader';
        pdfIframe.src = url;
        pdfViewerModal.style.display = 'flex';
    };

    // =========================================================================
    // FEATURE: REAL VISUAL IMAGE INSERT & UPLOAD
    // =========================================================================
    function openImageModal() {
        if (!activeNoteId) return;
        imageModal.style.display = 'flex';
        tabUploadFile.click();
    }

    tabUploadFile.addEventListener('click', () => {
        tabUploadFile.classList.add('active');
        tabImageUrl.classList.remove('active');
        uploadFileSection.style.display = 'block';
        imageUrlSection.style.display = 'none';
        confirmImageUrlBtn.style.display = 'none';
    });

    tabImageUrl.addEventListener('click', () => {
        tabImageUrl.classList.add('active');
        tabUploadFile.classList.remove('active');
        uploadFileSection.style.display = 'none';
        imageUrlSection.style.display = 'block';
        confirmImageUrlBtn.style.display = 'inline-flex';
        imageUrlInput.focus();
    });

    triggerFileBrowseBtn.addEventListener('click', () => imageFileInput.click());

    imageFileInput.addEventListener('change', async (e) => {
        if (e.target.files.length > 0) {
            imageModal.style.display = 'none';
            await handleImageUpload(e.target.files[0]);
        }
    });

    confirmImageUrlBtn.addEventListener('click', () => {
        const url = imageUrlInput.value.trim();
        if (url) {
            insertVisualImageToCanvas(url);
            saveActiveNote();
            imageModal.style.display = 'none';
            imageUrlInput.value = '';
            showToast('Image inserted!', 'success');
        }
    });

    closeImageModalBtn.addEventListener('click', () => imageModal.style.display = 'none');
    cancelImageModalBtn.addEventListener('click', () => imageModal.style.display = 'none');

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragOverlay.style.display = 'flex';
    });

    dropZone.addEventListener('dragleave', () => {
        dragOverlay.style.display = 'none';
    });

    dropZone.addEventListener('drop', async (e) => {
        e.preventDefault();
        dragOverlay.style.display = 'none';
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                await handleImageUpload(file);
            }
        }
    });

    async function handleImageUpload(file) {
        showToast('Uploading image...', 'info');
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                insertVisualImageToCanvas(data.url);
                saveActiveNote();
                showToast('Image inserted visually!', 'success');
            } else {
                showToast('Upload failed', 'error');
            }
        } catch (err) {
            showToast('Error uploading image', 'error');
        }
    }

    // =========================================================================
    // FEATURE: VOICE-TO-TEXT DICTATION MODAL
    // =========================================================================
    function openVoiceModal() {
        if (!activeNoteId) return;
        voiceModal.style.display = 'flex';
        speechBoxText.textContent = '';
        recordedSpeechText = '';
        voiceStatusText.textContent = 'Click Start to Dictate...';
        voiceMicCircle.classList.remove('recording');
        toggleSpeechRecBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Dictation';
    }

    function initSpeechRecognition() {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRec) {
            speechRecognition = new SpeechRec();
            speechRecognition.continuous = true;
            speechRecognition.interimResults = true;
            speechRecognition.lang = 'en-US';

            speechRecognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        transcript += event.results[i][0].transcript + ' ';
                    }
                }
                if (transcript) {
                    recordedSpeechText += transcript;
                    speechBoxText.textContent = recordedSpeechText;
                }
            };

            speechRecognition.onerror = (e) => {
                console.error(e);
                stopVoiceDictation();
            };

            speechRecognition.onend = () => {
                if (isRecording) speechRecognition.start();
            };
        }
    }

    toggleSpeechRecBtn.addEventListener('click', () => {
        if (isRecording) {
            stopVoiceDictation();
        } else {
            startVoiceDictation();
        }
    });

    function startVoiceDictation() {
        isRecording = true;
        voiceMicCircle.classList.add('recording');
        voiceStatusText.textContent = 'Listening... Speak now!';
        toggleSpeechRecBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop Dictation';

        if (speechRecognition) {
            try { speechRecognition.start(); } catch (e) {}
        } else {
            speechBoxText.contentEditable = "true";
            speechBoxText.focus();
            showToast('Browser Web Speech API unavailable. Type or dictate in box directly.', 'info');
        }
    }

    function stopVoiceDictation() {
        isRecording = false;
        voiceMicCircle.classList.remove('recording');
        voiceStatusText.textContent = 'Dictation Paused';
        toggleSpeechRecBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume Dictation';
        if (speechRecognition) {
            try { speechRecognition.stop(); } catch (e) {}
        }
    }

    appendSpeechToNoteBtn.addEventListener('click', () => {
        const text = speechBoxText.textContent || recordedSpeechText;
        if (text && text.trim()) {
            document.execCommand('insertHTML', false, '<br>' + text.trim() + '<br>');
            updateWordCounts();
            saveActiveNote();
            voiceModal.style.display = 'none';
            stopVoiceDictation();
            showToast('Voice text added to note!', 'success');
        } else {
            showToast('No spoken text recorded yet', 'info');
        }
    });

    closeVoiceModalBtn.addEventListener('click', () => {
        stopVoiceDictation();
        voiceModal.style.display = 'none';
    });

    // =========================================================================
    // FEATURE: PIN LOCK MODAL
    // =========================================================================
    function promptPinModal(title, sub, callback) {
        pinModalTitle.textContent = title;
        pinModalSub.textContent = sub;
        pinInput.value = '';
        pinModal.style.display = 'flex';
        pinInput.focus();
        pinCallback = callback;
    }

    submitPinBtn.addEventListener('click', () => {
        const val = pinInput.value.trim();
        if (val.length < 4) {
            showToast('Enter at least 4 digits for PIN!', 'info');
            return;
        }
        pinModal.style.display = 'none';
        if (pinCallback) pinCallback(val);
    });

    cancelPinBtn.addEventListener('click', () => pinModal.style.display = 'none');
    closePinModalBtn.addEventListener('click', () => pinModal.style.display = 'none');

    lockNoteBtn.addEventListener('click', async () => {
        if (!activeNoteId) return;
        const note = notes.find(n => n.id === activeNoteId);
        if (!note) return;

        if (note.is_locked) {
            promptPinModal("Unlock Note", "Enter current PIN to remove lock:", async (enteredPin) => {
                const res = await fetch(`/api/notes/${activeNoteId}/lock`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'unlock', pin_code: enteredPin })
                });
                if (res.ok) {
                    showToast('Note unlocked', 'success');
                    currentVerifiedPin = '';
                    loadNotes();
                } else {
                    showToast('Incorrect PIN!', 'error');
                }
            });
        } else {
            promptPinModal("Set PIN Lock", "Set a 4-digit PIN for this note:", async (enteredPin) => {
                const res = await fetch(`/api/notes/${activeNoteId}/lock`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'lock', pin_code: enteredPin })
                });
                if (res.ok) {
                    showToast('Note locked with PIN', 'success');
                    currentVerifiedPin = enteredPin;
                    loadNotes();
                } else {
                    showToast('Failed to set PIN', 'error');
                }
            });
        }
    });

    // =========================================================================
    // FEATURE: REMINDER & DUE DATES
    // =========================================================================
    dueDateBtn.addEventListener('click', () => {
        if (!activeNoteId) return;
        reminderModal.style.display = 'flex';
        reminderDateTimeInput.value = dueDateStatus.dataset.date || '';
    });

    closeReminderModalBtn.addEventListener('click', () => reminderModal.style.display = 'none');

    clearReminderBtn.addEventListener('click', () => {
        dueDateStatus.textContent = '';
        dueDateStatus.dataset.date = '';
        saveActiveNote();
        reminderModal.style.display = 'none';
        showToast('Reminder cleared', 'info');
    });

    saveReminderBtn.addEventListener('click', () => {
        const dt = reminderDateTimeInput.value;
        if (dt) {
            dueDateStatus.textContent = `📅 Due: ${dt.replace('T', ' ')}`;
            dueDateStatus.dataset.date = dt;
            saveActiveNote();
            showToast('Reminder set!', 'success');
        }
        reminderModal.style.display = 'none';
    });

    // =========================================================================
    // FEATURE: FLOATING STICKY DESKTOP WIDGET
    // =========================================================================
    popoutStickyBtn.addEventListener('click', () => {
        if (!activeNoteId) return;
        window.open(`/sticky/${activeNoteId}`, `StickyNote_${activeNoteId}`, 'width=420,height=480,resizable=yes,scrollbars=yes');
    });

    // =========================================================================
    // GOOGLE GEMINI PRO WEB 1-CLICK LAUNCH & IMPORT FEATURE
    // =========================================================================
    openGeminiWebBtn.addEventListener('click', () => {
        const text = editorVisualCanvas.innerText || editorTextarea.value || '';
        const cleanText = text.replace(/!\[.*?\]\(.*?\)/g, '').trim();

        if (cleanText) {
            navigator.clipboard.writeText(cleanText);
            showToast('Note text copied to clipboard! Opening Gemini Pro...', 'success');
        } else {
            showToast('Opening Google Gemini Pro Web...', 'info');
        }

        window.open('https://gemini.google.com', '_blank');
    });

    async function triggerAiSummarizer() {
        const text = getCleanContentToSave();
        if (!text || text.trim().length < 5) {
            showToast('Note content is too short for AI summary!', 'info');
            return;
        }

        aiModal.style.display = 'flex';
        aiLoader.style.display = 'block';
        aiResults.style.display = 'none';

        const activeApiKey = setGeminiApiKey.value.trim() || (currentUser ? currentUser.gemini_api_key : '');

        try {
            const res = await fetch('/api/ai/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text,
                    note_id: activeNoteId,
                    user_id: currentUser ? currentUser.id : 1,
                    api_key: activeApiKey
                })
            });

            currentAiInsight = await res.json();
            renderAiModalResults(currentAiInsight);
        } catch (err) {
            showToast('AI Summarizer error', 'error');
            aiModal.style.display = 'none';
        }
    }

    function renderAiModalResults(data) {
        aiLoader.style.display = 'none';
        aiResults.style.display = 'block';
        aiSummaryText.textContent = data.summary || 'Summary unavailable.';
        aiModeBadge.textContent = `Engine: ${data.engine || 'Google Gemini Pro AI'}`;

        aiKeypointsList.innerHTML = '';
        if (data.key_points && data.key_points.length > 0) {
            data.key_points.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                aiKeypointsList.appendChild(li);
            });
        }

        aiTagsContainer.innerHTML = '';
        if (data.tags && data.tags.length > 0) {
            data.tags.forEach(tag => {
                const chip = document.createElement('span');
                chip.className = 'ai-tag-chip';
                chip.textContent = `#${tag}`;
                aiTagsContainer.appendChild(chip);
            });
        }

        aiReadingTime.textContent = data.reading_time || '1 min read';
        aiWordCount.textContent = `${data.word_count || 0} Words`;
    }

    saveAiSummaryAsNoteBtn.addEventListener('click', async () => {
        const pastedText = geminiImportInput.value.trim();
        const currentTitle = editorTitleInput.value.trim() || 'Note';
        const newTitle = `AI Summary: ${currentTitle}`;

        let formattedContent = '';
        if (pastedText) {
            formattedContent = `## Gemini Pro Web Summary\n${pastedText}\n`;
        } else if (currentAiInsight) {
            formattedContent = `## Executive Summary\n${currentAiInsight.summary}\n\n## Key Action Points\n`;
            if (currentAiInsight.key_points) {
                currentAiInsight.key_points.forEach(pt => {
                    formattedContent += `- ${pt}\n`;
                });
            }
        }

        if (!formattedContent) {
            showToast('No summary text available to save!', 'info');
            return;
        }

        const tagsStr = (currentAiInsight && currentAiInsight.tags) ? currentAiInsight.tags.join(', ') : 'GeminiPro, Summary';

        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: currentUser ? currentUser.id : 1,
                    title: newTitle,
                    content: formattedContent,
                    category: 'Ideas',
                    tags: tagsStr,
                    color: 'indigo'
                })
            });

            const newNote = await res.json();
            aiModal.style.display = 'none';
            geminiImportInput.value = '';
            showToast('Gemini Pro Summary saved as new note!', 'success');
            await loadNotes();
            selectNote(newNote.id, true, true);
        } catch (err) {
            showToast('Could not save AI summary note', 'error');
        }
    });

    // =========================================================================
    // SYSTEM STATS & INTERACTIVE LINE GRAPH
    // =========================================================================
    async function openStatsModal() {
        statsModal.style.display = 'flex';
        try {
            const [resStats, resActivity] = await Promise.all([
                fetch('/api/stats').then(r => r.json()),
                fetch('/api/stats/activity').then(r => r.json())
            ]);

            document.getElementById('statTotalNotes').textContent = resStats.total_notes;
            document.getElementById('statPinnedNotes').textContent = resStats.pinned_notes;
            document.getElementById('statFavNotes').textContent = resStats.favorite_notes;
            document.getElementById('statTotalWordsCount').textContent = resStats.total_words;

            renderActivityLineGraph(resActivity.labels, resActivity.words);
        } catch (err) {
            console.error(err);
        }
    }

    function renderActivityLineGraph(labels, dataPoints) {
        const ctx = document.getElementById('activityChart').getContext('2d');
        if (activityChartInstance) {
            activityChartInstance.destroy();
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
        gradient.addColorStop(1, 'rgba(14, 165, 233, 0.0)');

        activityChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Words Written',
                    data: dataPoints,
                    borderColor: '#0ea5e9',
                    borderWidth: 3,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0ea5e9',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
                    },
                    y: {
                        grid: { color: 'rgba(226, 232, 240, 0.5)' },
                        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
                    }
                }
            }
        });
    }

    // =========================================================================
    // FORMATTING TOOLBAR HELPERS FOR VISUAL CANVAS
    // =========================================================================
    function insertFormatting(type) {
        editorVisualCanvas.focus();

        switch (type) {
            case 'bold': document.execCommand('bold', false, null); break;
            case 'italic': document.execCommand('italic', false, null); break;
            case 'underline': document.execCommand('underline', false, null); break;
            case 'strikethrough': document.execCommand('strikeThrough', false, null); break;
            case 'justifyLeft': document.execCommand('justifyLeft', false, null); break;
            case 'justifyCenter': document.execCommand('justifyCenter', false, null); break;
            case 'justifyRight': document.execCommand('justifyRight', false, null); break;
            case 'justifyFull': document.execCommand('justifyFull', false, null); break;
            case 'h1': document.execCommand('formatBlock', false, '<h1>'); break;
            case 'h2': document.execCommand('formatBlock', false, '<h2>'); break;
            case 'h3': document.execCommand('formatBlock', false, '<h3>'); break;
            case 'ul': document.execCommand('insertUnorderedList', false, null); break;
            case 'ol': document.execCommand('insertOrderedList', false, null); break;
            case 'cl': document.execCommand('insertHTML', false, '<div><input type="checkbox"> Task</div>'); break;
            case 'code':
                const codeId = 'code_' + Math.random().toString(36).substr(2, 6);
                const codeBlockHtml = `<div class="code-runner-block" contenteditable="false"><div class="code-runner-header"><span>PYTHON CODE BLOCK</span><div class="code-runner-actions"><button class="code-btn code-btn-run" onclick="window.runCodeSnippetBlock('${codeId}', 'python')"><i class="fa-solid fa-play"></i> Run Code</button><button class="code-btn code-btn-copy" onclick="window.copyCodeSnippetBlock('${codeId}')"><i class="fa-solid fa-copy"></i> Copy</button></div></div><pre id="${codeId}" contenteditable="true" style="padding:14px; color:#f8fafc; outline:none;"># Write Python code here\nprint("Hello from Smart Notes AI!")</pre><div class="code-output-box" id="out_${codeId}"></div></div><br>`;
                document.execCommand('insertHTML', false, codeBlockHtml);
                break;
            case 'quote': document.execCommand('formatBlock', false, '<blockquote>'); break;
        }

        triggerDebouncedSave();
        updateWordCounts();
    }

    // =========================================================================
    // EVENT BINDINGS
    // =========================================================================
    function bindEvents() {
        newNoteBtn.addEventListener('click', createNewNote);
        emptyNewNoteBtn.addEventListener('click', createNewNote);

        const sidebarHeaderQuickAddBtn = document.getElementById('sidebarHeaderQuickAddBtn');
        if (sidebarHeaderQuickAddBtn) {
            sidebarHeaderQuickAddBtn.addEventListener('click', createNewNote);
        }

        insertImgBtn.addEventListener('click', openImageModal);
        voiceTypingBtn.addEventListener('click', openVoiceModal);

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (item.id === 'navMindMap' || item.id === 'navKanban') return;
                e.preventDefault();
                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');

                activeFilter = item.dataset.filter || 'active';
                loadNotes();
            });
        });

        searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value.trim();
            searchClearBtn.style.display = searchQuery ? 'block' : 'none';
            loadNotes();
        });

        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            searchClearBtn.style.display = 'none';
            loadNotes();
        });

        [editorTitleInput, editorVisualCanvas, editorTextarea, editorTagsInput].forEach(elem => {
            elem.addEventListener('input', () => {
                updateWordCounts();
                triggerDebouncedSave();
            });
        });

        editorCategorySelect.addEventListener('change', saveActiveNote);

        colorDots.forEach(dot => {
            dot.addEventListener('click', () => {
                colorDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                const selectedColor = dot.dataset.color || 'sky';
                const noteEditorPane = document.getElementById('noteEditorPane');
                if (noteEditorPane) noteEditorPane.dataset.theme = selectedColor;

                const activeCard = document.querySelector(`.note-card[data-id="${activeNoteId}"]`);
                if (activeCard) activeCard.dataset.color = selectedColor;

                saveActiveNote();
                showToast(`Note color changed to ${selectedColor.toUpperCase()}!`, 'success');
            });
        });

        editorPinBtn.addEventListener('click', () => {
            if (activeNoteId) togglePin(activeNoteId);
        });

        editorFavBtn.addEventListener('click', () => {
            if (activeNoteId) toggleFavorite(activeNoteId);
        });

        editorDeleteBtn.addEventListener('click', deleteActiveNote);

        tabEditBtn.addEventListener('click', () => {
            tabEditBtn.classList.add('active');
            tabRawBtn.classList.remove('active');
            editorVisualCanvas.style.display = 'block';
            editorTextarea.style.display = 'none';
        });

        tabRawBtn.addEventListener('click', () => {
            tabRawBtn.classList.add('active');
            tabEditBtn.classList.remove('active');
            editorTextarea.value = getCleanContentToSave();
            editorVisualCanvas.style.display = 'none';
            editorTextarea.style.display = 'block';
        });

        document.querySelectorAll('.fmt-btn').forEach(btn => {
            if (btn.dataset.fmt) {
                btn.addEventListener('click', () => insertFormatting(btn.dataset.fmt));
            }
        });

        // 📝 MS WORD RICH TEXT TOOLBAR ENGINE (FONT FAMILY, FONT SIZE, TEXT COLOR, HIGHLIGHT, ALIGNMENTS, EXPORT DOCX)
        const fontFamilySelect = document.getElementById('fontFamilySelect');
        const fontSizeSelect = document.getElementById('fontSizeSelect');
        const textColorPicker = document.getElementById('textColorPicker');
        const textHighlightPicker = document.getElementById('textHighlightPicker');
        const exportDocxBtn = document.getElementById('exportDocxBtn');

        if (fontFamilySelect) {
            fontFamilySelect.addEventListener('change', () => {
                const font = fontFamilySelect.value;
                editorVisualCanvas.focus();
                document.execCommand('fontName', false, font);
                triggerDebouncedSave();
                showToast(`Font set to ${font}!`, 'info');
            });
        }

        if (fontSizeSelect) {
            fontSizeSelect.addEventListener('change', () => {
                const size = fontSizeSelect.value;
                editorVisualCanvas.focus();
                document.execCommand('fontSize', false, size);
                triggerDebouncedSave();
            });
        }

        if (textColorPicker) {
            textColorPicker.addEventListener('input', () => {
                const color = textColorPicker.value;
                editorVisualCanvas.focus();
                document.execCommand('foreColor', false, color);
                triggerDebouncedSave();
            });
        }

        if (textHighlightPicker) {
            textHighlightPicker.addEventListener('input', () => {
                const color = textHighlightPicker.value;
                editorVisualCanvas.focus();
                document.execCommand('hiliteColor', false, color);
                triggerDebouncedSave();
            });
        }

        // 📥 UNIVERSAL DESKTOP FILE DOWNLOAD ENGINE (DOCX, PDF, MD, TXT)
        async function triggerNoteExportDownload(exportType, fallbackExt) {
            if (!activeNoteId) {
                showToast('Please select a note to export!', 'info');
                return;
            }

            const activeNote = notes.find(n => n.id === activeNoteId);
            const rawTitle = activeNote ? (activeNote.title || 'Untitled_Note') : 'Note';
            const safeTitle = rawTitle.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().replace(/\s+/g, '_');
            const defaultFilename = `${safeTitle}.${fallbackExt}`;

            showToast(`Generating & Downloading ${exportType.toUpperCase()} file...`, 'info');

            try {
                const exportUrl = `/api/notes/${activeNoteId}/export/${exportType}`;
                const res = await fetch(exportUrl);

                if (!res.ok) {
                    showToast(`Export failed (Status ${res.status})`, 'error');
                    return;
                }

                const blob = await res.blob();

                let filename = defaultFilename;
                const disposition = res.headers.get('Content-Disposition');
                if (disposition && disposition.includes('filename=')) {
                    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
                    if (matches && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }

                const blobUrl = URL.createObjectURL(blob);
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = filename;
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
                showToast(`Successfully downloaded ${filename}!`, 'success');
            } catch (err) {
                console.error(err);
                showToast('Export download error: ' + err.message, 'error');
            }
        }

        if (exportDocxBtn) {
            exportDocxBtn.addEventListener('click', (e) => {
                e.preventDefault();
                triggerNoteExportDownload('docx', 'doc');
            });
        }

        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', (e) => {
                e.preventDefault();
                triggerNoteExportDownload('pdf', 'pdf');
            });
        }

        if (exportMdBtn) {
            exportMdBtn.addEventListener('click', (e) => {
                e.preventDefault();
                triggerNoteExportDownload('md', 'md');
            });
        }

        if (exportTxtBtn) {
            exportTxtBtn.addEventListener('click', (e) => {
                e.preventDefault();
                triggerNoteExportDownload('txt', 'txt');
            });
        }

        if (exportTxtBtn) {
            exportTxtBtn.addEventListener('click', (e) => {
                e.preventDefault();
                triggerNoteExportDownload('txt', 'txt');
            });
        }

        triggerAiBtn.addEventListener('click', triggerAiSummarizer);
        topAiBtn.addEventListener('click', triggerAiSummarizer);
        closeAiModalBtn.addEventListener('click', () => aiModal.style.display = 'none');

        copyAiSummaryBtn.addEventListener('click', () => {
            if (currentAiInsight && currentAiInsight.summary) {
                navigator.clipboard.writeText(currentAiInsight.summary);
                showToast('Summary copied to clipboard!', 'success');
            }
        });

        applyAiTagsBtn.addEventListener('click', () => {
            if (currentAiInsight && currentAiInsight.tags) {
                const existing = editorTagsInput.value ? editorTagsInput.value.split(',').map(t=>t.trim()) : [];
                const merged = Array.from(new Set([...existing, ...currentAiInsight.tags])).join(', ');
                editorTagsInput.value = merged;
                saveActiveNote();
                aiModal.style.display = 'none';
                showToast('AI Tags applied!', 'success');
            }
        });

        openStatsBtn.addEventListener('click', openStatsModal);
        closeStatsModalBtn.addEventListener('click', () => statsModal.style.display = 'none');

        // 🚀 ABOUT TEAM NOCTRAX & NOTEZ V2.0 MODAL HANDLERS
        const aboutTeamModal = document.getElementById('aboutTeamModal');
        const openAboutTeamBtn = document.getElementById('openAboutTeamBtn');
        const logoTitleContainer = document.getElementById('logoTitleContainer');
        const closeAboutTeamModalBtn = document.getElementById('closeAboutTeamModalBtn');
        const closeAboutTeamModalFooterBtn = document.getElementById('closeAboutTeamModalFooterBtn');

        function showAboutTeamModal() {
            if (aboutTeamModal) aboutTeamModal.style.display = 'flex';
        }

        if (openAboutTeamBtn) openAboutTeamBtn.addEventListener('click', showAboutTeamModal);
        if (logoTitleContainer) logoTitleContainer.addEventListener('click', showAboutTeamModal);
        if (closeAboutTeamModalBtn) closeAboutTeamModalBtn.addEventListener('click', () => aboutTeamModal.style.display = 'none');
        if (closeAboutTeamModalFooterBtn) closeAboutTeamModalFooterBtn.addEventListener('click', () => aboutTeamModal.style.display = 'none');

        // 🔥 7-DAY WRITING STREAK TRACKER & ACHIEVEMENTS MODAL HANDLERS
        const streakModal = document.getElementById('streakModal');
        const dayStreakBadge = document.getElementById('dayStreakBadge');
        const closeStreakModalBtn = document.getElementById('closeStreakModalBtn');
        const closeStreakModalFooterBtn = document.getElementById('closeStreakModalFooterBtn');
        const streakModalCountNum = document.getElementById('streakModalCountNum');
        const streak7DaysGrid = document.getElementById('streak7DaysGrid');
        const streakWeeklyGoalText = document.getElementById('streakWeeklyGoalText');
        const streakProgressBar = document.getElementById('streakProgressBar');
        const badge3Days = document.getElementById('badge3Days');
        const badge5Days = document.getElementById('badge5Days');
        const badge7Days = document.getElementById('badge7Days');

        function openStreakModal() {
            if (!streakModal) return;

            const today = new Date();
            const formatLocalDate = (dt) => {
                const y = dt.getFullYear();
                const m = String(dt.getMonth() + 1).padStart(2, '0');
                const d = String(dt.getDate()).padStart(2, '0');
                return `${y}-${m}-${d}`;
            };

            const todayIso = formatLocalDate(today);
            const activeDates = new Set();
            activeDates.add(todayIso); // Always mark today active!

            notes.forEach(note => {
                if (note.created_at) {
                    activeDates.add(note.created_at.split(' ')[0].split('T')[0]);
                }
                if (note.updated_at) {
                    activeDates.add(note.updated_at.split(' ')[0].split('T')[0]);
                }
            });

            // Get user's active streak count
            const userDbStreak = (currentUser && currentUser.streak_count) ? currentUser.streak_count : 2;

            // Mark recent streak days in activeDates Set
            for (let s = 0; s < userDbStreak; s++) {
                const sDate = new Date();
                sDate.setDate(today.getDate() - s);
                activeDates.add(formatLocalDate(sDate));
            }

            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let activeDaysCount = 0;
            streak7DaysGrid.innerHTML = '';

            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(today.getDate() - i);
                const localDateStr = formatLocalDate(d);
                const dayLabel = dayNames[d.getDay()];
                const isActive = activeDates.has(localDateStr);

                if (isActive) activeDaysCount++;

                const dayCard = document.createElement('div');
                if (isActive) {
                    dayCard.style.cssText = `
                        padding: 10px 4px;
                        border-radius: 12px;
                        border: 1px solid #f59e0b;
                        background: linear-gradient(135deg, #f59e0b, #d97706);
                        color: #ffffff;
                        text-align: center;
                        font-size: 11px;
                        font-weight: 700;
                        box-shadow: 0 4px 14px rgba(245, 158, 11, 0.45);
                        transform: scale(1.04);
                        transition: all 0.2s ease;
                    `;
                    dayCard.innerHTML = `
                        <div style="font-size: 10px; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.95;">${dayLabel}</div>
                        <div style="font-size: 18px; margin-bottom: 2px;">🔥</div>
                        <span style="font-size: 9.5px; background: rgba(0,0,0,0.3); padding: 1px 6px; border-radius: 6px; font-weight: 800;">Done</span>
                    `;
                } else {
                    dayCard.style.cssText = `
                        padding: 10px 4px;
                        border-radius: 12px;
                        border: 1px solid var(--border-color);
                        background: var(--bg-main);
                        color: var(--text-muted);
                        text-align: center;
                        font-size: 11px;
                        font-weight: 600;
                    `;
                    dayCard.innerHTML = `
                        <div style="font-size: 10px; margin-bottom: 4px; opacity: 0.7;">${dayLabel}</div>
                        <div style="font-size: 16px; opacity: 0.4;">⚪</div>
                        <span style="font-size: 9.5px; opacity: 0.6;">-</span>
                    `;
                }
                streak7DaysGrid.appendChild(dayCard);
            }

            const currentStreak = Math.max(userDbStreak, activeDaysCount);
            if (streakModalCountNum) streakModalCountNum.textContent = currentStreak;
            if (streakCountText) streakCountText.textContent = `${currentStreak} Day Streak`;
            if (streakWeeklyGoalText) streakWeeklyGoalText.textContent = `${activeDaysCount} / 7 Days Active`;
            
            const percent = Math.round((activeDaysCount / 7) * 100);
            if (streakProgressBar) streakProgressBar.style.width = `${percent}%`;

            // GAMIFIED BADGE UNLOCK LOGIC
            updateBadgeState(badge3Days, currentStreak >= 3, '🥉', '3-Day Streak', 'Novice Writer');
            updateBadgeState(badge5Days, currentStreak >= 5, '🥈', '5-Day Streak', 'Pro Note Master');
            updateBadgeState(badge7Days, currentStreak >= 7, '🥇', '7-Day Master', 'Legendary Scholar');

            streakModal.style.display = 'flex';
        }

        function updateBadgeState(badgeElem, isUnlocked, emoji, title, roleText) {
            if (!badgeElem) return;
            if (isUnlocked) {
                badgeElem.style.border = '1px solid #f59e0b';
                badgeElem.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(217, 119, 6, 0.22))';
                badgeElem.style.boxShadow = '0 4px 14px rgba(245, 158, 11, 0.3)';
                badgeElem.innerHTML = `
                    <div style="font-size: 26px; margin-bottom: 2px;">${emoji}</div>
                    <strong style="font-size: 11.5px; display: block; color: var(--text-primary);">${title}</strong>
                    <span style="font-size: 9.5px; padding: 2px 6px; border-radius: 8px; background: rgba(16, 185, 129, 0.2); color: var(--accent-emerald); font-weight: 700; display: inline-block; margin-top: 4px;">✅ UNLOCKED</span>
                `;
            } else {
                badgeElem.style.border = '1px solid var(--border-color)';
                badgeElem.style.background = 'var(--bg-main)';
                badgeElem.style.boxShadow = 'none';
                badgeElem.innerHTML = `
                    <div style="font-size: 24px; margin-bottom: 2px; filter: grayscale(100%); opacity: 0.5;">${emoji}</div>
                    <strong style="font-size: 11.5px; display: block; color: var(--text-muted);">${title}</strong>
                    <span style="font-size: 9.5px; padding: 2px 6px; border-radius: 8px; background: var(--bg-sidebar); color: var(--text-muted); font-weight: 600; display: inline-block; margin-top: 4px;">🔒 Locked</span>
                `;
            }
        }

        if (dayStreakBadge) dayStreakBadge.addEventListener('click', openStreakModal);
        if (closeStreakModalBtn) closeStreakModalBtn.addEventListener('click', () => streakModal.style.display = 'none');
        if (closeStreakModalFooterBtn) closeStreakModalFooterBtn.addEventListener('click', () => streakModal.style.display = 'none');

        // 🔑 AUTH SHOWCASE MODAL TABS ENGINE (LOGIN, REGISTER, SYSTEM INFO, TEAM INFO)
        const authTabLogin = document.getElementById('authTabLogin');
        const authTabRegister = document.getElementById('authTabRegister');
        const authTabSystemInfo = document.getElementById('authTabSystemInfo');
        const authTabTeamInfo = document.getElementById('authTabTeamInfo');
        const authSectionForm = document.getElementById('authSectionForm');
        const authSectionSystemInfo = document.getElementById('authSectionSystemInfo');
        const authSectionTeamInfo = document.getElementById('authSectionTeamInfo');
        const toggleRegisterLink = document.getElementById('toggleRegisterLink');
        const loginFormSection = document.getElementById('loginFormSection');
        const registerFormSection = document.getElementById('registerFormSection');
        const authFormTitle = document.getElementById('authFormTitle');
        const fillDemoLoginBtn = document.getElementById('fillDemoLoginBtn');

        function switchAuthTab(activeTab, activeSection, forceRegister = false) {
            [authTabLogin, authTabRegister, authTabSystemInfo, authTabTeamInfo].forEach(t => {
                if (t) t.classList.remove('active');
            });
            [authSectionForm, authSectionSystemInfo, authSectionTeamInfo].forEach(s => {
                if (s) s.style.display = 'none';
            });
            if (activeTab) activeTab.classList.add('active');
            if (activeSection) activeSection.style.display = 'block';

            if (activeSection === authSectionForm) {
                if (forceRegister) {
                    loginFormSection.style.display = 'none';
                    registerFormSection.style.display = 'block';
                    if (authFormTitle) authFormTitle.textContent = 'Create New Account';
                    if (toggleRegisterLink) toggleRegisterLink.textContent = 'Already have an account? Sign In';
                } else {
                    loginFormSection.style.display = 'block';
                    registerFormSection.style.display = 'none';
                    if (authFormTitle) authFormTitle.textContent = 'Welcome Back';
                    if (toggleRegisterLink) toggleRegisterLink.textContent = 'Create New Account';
                }
            }
        }

        if (authTabLogin) authTabLogin.addEventListener('click', () => switchAuthTab(authTabLogin, authSectionForm, false));
        if (authTabRegister) authTabRegister.addEventListener('click', () => switchAuthTab(authTabRegister, authSectionForm, true));
        if (authTabSystemInfo) authTabSystemInfo.addEventListener('click', () => switchAuthTab(authTabSystemInfo, authSectionSystemInfo));
        if (authTabTeamInfo) authTabTeamInfo.addEventListener('click', () => switchAuthTab(authTabTeamInfo, authSectionTeamInfo));

        if (toggleRegisterLink) {
            toggleRegisterLink.addEventListener('click', () => {
                const isRegistering = registerFormSection.style.display === 'none';
                loginFormSection.style.display = isRegistering ? 'none' : 'block';
                registerFormSection.style.display = isRegistering ? 'block' : 'none';
                if (authFormTitle) authFormTitle.textContent = isRegistering ? 'Create New Account' : 'Welcome Back';
                toggleRegisterLink.textContent = isRegistering ? 'Already have an account? Sign In' : 'Create New Account';
                if (isRegistering && authTabRegister) {
                    [authTabLogin, authTabRegister, authTabSystemInfo, authTabTeamInfo].forEach(t => t && t.classList.remove('active'));
                    authTabRegister.classList.add('active');
                } else if (!isRegistering && authTabLogin) {
                    [authTabLogin, authTabRegister, authTabSystemInfo, authTabTeamInfo].forEach(t => t && t.classList.remove('active'));
                    authTabLogin.classList.add('active');
                }
            });
        }

        if (fillDemoLoginBtn) {
            fillDemoLoginBtn.addEventListener('click', () => {
                if (loginEmail) loginEmail.value = 'user@example.com';
                if (loginPassword) loginPassword.value = '123456';
                showToast('Filled Demo Credentials: user@example.com / 123456', 'info');
            });
        }

        const openForgotPassLink = document.getElementById('openForgotPassLink');
        const resetPasswordSection = document.getElementById('resetPasswordSection');
        const resetEmail = document.getElementById('resetEmail');
        const resetNewPassword = document.getElementById('resetNewPassword');
        const submitResetPassBtn = document.getElementById('submitResetPassBtn');
        const cancelResetPassBtn = document.getElementById('cancelResetPassBtn');

        if (openForgotPassLink) {
            openForgotPassLink.addEventListener('click', () => {
                if (loginFormSection) loginFormSection.style.display = 'none';
                if (registerFormSection) registerFormSection.style.display = 'none';
                if (resetPasswordSection) resetPasswordSection.style.display = 'block';
                if (authFormTitle) authFormTitle.textContent = 'Reset Password';
            });
        }

        if (cancelResetPassBtn) {
            cancelResetPassBtn.addEventListener('click', () => {
                if (resetPasswordSection) resetPasswordSection.style.display = 'none';
                if (loginFormSection) loginFormSection.style.display = 'block';
                if (authFormTitle) authFormTitle.textContent = 'Welcome Back';
            });
        }

        if (submitResetPassBtn) {
            submitResetPassBtn.addEventListener('click', async () => {
                const email = resetEmail.value.trim();
                const newPass = resetNewPassword.value.trim();
                if (!email || !newPass) {
                    showToast('Please enter your email and new password!', 'info');
                    return;
                }

                try {
                    const res = await fetch('/api/auth/reset-password', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email, new_password: newPass })
                    });
                    const data = await res.json();
                    if (res.ok && data.success) {
                        currentUser = data.user;
                        localStorage.setItem('smartnotes_user', JSON.stringify(currentUser));
                        updateUserProfileUI();
                        authModal.style.display = 'none';
                        showToast(`Password updated! Welcome back, ${currentUser.display_name}!`, 'success');
                    } else {
                        showToast(data.error || 'Password reset failed', 'error');
                    }
                } catch (err) {
                    showToast('Error resetting password', 'error');
                }
            });
        }

        // Support Enter Key on Login & Register inputs
        [loginEmail, loginPassword].forEach(inp => {
            if (inp) {
                inp.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter' && submitLoginBtn) submitLoginBtn.click();
                });
            }
        });

        [regName, regEmail, regPassword].forEach(inp => {
            if (inp) {
                inp.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter' && submitRegisterBtn) submitRegisterBtn.click();
                });
            }
        });

        // 🛡️ AES-256 SECURITY & PRIVACY ENCRYPTION MODAL HANDLERS
        const securityModal = document.getElementById('securityModal');
        const securityShieldBtn = document.getElementById('securityShieldBtn');
        const closeSecurityModalBtn = document.getElementById('closeSecurityModalBtn');
        const closeSecurityModalFooterBtn = document.getElementById('closeSecurityModalFooterBtn');

        if (securityShieldBtn) securityShieldBtn.addEventListener('click', () => securityModal.style.display = 'flex');
        if (closeSecurityModalBtn) closeSecurityModalBtn.addEventListener('click', () => securityModal.style.display = 'none');
        if (closeSecurityModalFooterBtn) closeSecurityModalFooterBtn.addEventListener('click', () => securityModal.style.display = 'none');

        // 🔔 NOTIFICATION CENTER HANDLERS
        const openNotificationsBtn = document.getElementById('openNotificationsBtn');
        const notificationDropdown = document.getElementById('notificationDropdown');
        const clearNotificationsBtn = document.getElementById('clearNotificationsBtn');
        const notificationBadgeDot = document.getElementById('notificationBadgeDot');
        const notificationItemsList = document.getElementById('notificationItemsList');

        if (openNotificationsBtn) {
            openNotificationsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (notificationDropdown) {
                    notificationDropdown.style.display = notificationDropdown.style.display === 'none' ? 'block' : 'none';
                }
            });
        }

        if (clearNotificationsBtn) {
            clearNotificationsBtn.addEventListener('click', () => {
                if (notificationItemsList) {
                    notificationItemsList.innerHTML = `<div style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 12px;">No new notifications</div>`;
                }
                if (notificationBadgeDot) notificationBadgeDot.style.display = 'none';
                showToast('Cleared all notifications', 'info');
            });
        }

        // 🤖 AI CHATBOT ASSISTANT DRAWER HANDLERS
        const aiChatDrawer = document.getElementById('aiChatDrawer');
        const openAiChatDrawerBtn = document.getElementById('openAiChatDrawerBtn');
        const closeAiChatDrawerBtn = document.getElementById('closeAiChatDrawerBtn');
        const topbarAiChatBtn = document.getElementById('topbarAiChatBtn');

        function toggleAiChatDrawer() {
            if (!aiChatDrawer) return;
            const currentDisplay = window.getComputedStyle(aiChatDrawer).display;
            const isHidden = currentDisplay === 'none';
            aiChatDrawer.style.display = isHidden ? 'flex' : 'none';
        }

        if (topbarAiChatBtn) topbarAiChatBtn.addEventListener('click', toggleAiChatDrawer);
        if (openAiChatDrawerBtn) openAiChatDrawerBtn.addEventListener('click', toggleAiChatDrawer);
        if (closeAiChatDrawerBtn) closeAiChatDrawerBtn.addEventListener('click', () => {
            if (aiChatDrawer) aiChatDrawer.style.display = 'none';
        });

        // 🪶 QUILLBOT AI PREMIUM INTEGRATION MODAL HANDLERS
        const topbarQuillbotBtn = document.getElementById('topbarQuillbotBtn');
        const quillbotModal = document.getElementById('quillbotModal');
        const closeQuillbotModalBtn = document.getElementById('closeQuillbotModalBtn');
        const closeQuillbotModalFooterBtn = document.getElementById('closeQuillbotModalFooterBtn');
        const quillbotTextPreview = document.getElementById('quillbotTextPreview');
        const copyQuillbotTextBtn = document.getElementById('copyQuillbotTextBtn');
        const openQuillbotWebBtn = document.getElementById('openQuillbotWebBtn');
        const openQuillbotDirectBtn = document.getElementById('openQuillbotDirectBtn');

        function openQuillbotModal() {
            if (!quillbotModal) return;
            const text = editorVisualCanvas ? (editorVisualCanvas.innerText || editorTextarea.value || '') : '';
            if (quillbotTextPreview) quillbotTextPreview.value = text;
            quillbotModal.style.display = 'flex';
        }

        function launchQuillbotWeb() {
            window.open('https://quillbot.com', '_blank');
        }

        if (topbarQuillbotBtn) topbarQuillbotBtn.addEventListener('click', openQuillbotModal);
        if (closeQuillbotModalBtn) closeQuillbotModalBtn.addEventListener('click', () => quillbotModal.style.display = 'none');
        if (closeQuillbotModalFooterBtn) closeQuillbotModalFooterBtn.addEventListener('click', () => quillbotModal.style.display = 'none');

        if (copyQuillbotTextBtn) {
            copyQuillbotTextBtn.addEventListener('click', () => {
                const text = quillbotTextPreview ? quillbotTextPreview.value : '';
                if (text) {
                    navigator.clipboard.writeText(text);
                    showToast('Active Note text copied! Now paste into QuillBot.', 'success');
                } else {
                    showToast('No note text to copy!', 'info');
                }
            });
        }

        if (openQuillbotWebBtn) openQuillbotWebBtn.addEventListener('click', launchQuillbotWeb);
        if (openQuillbotDirectBtn) openQuillbotDirectBtn.addEventListener('click', launchQuillbotWeb);

        exportDropdownBtn.addEventListener('click', () => {
            exportMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!exportDropdownBtn.contains(e.target) && !exportMenu.contains(e.target)) {
                exportMenu.classList.remove('show');
            }
            if (themePaletteBtn && !themePaletteBtn.contains(e.target) && themePaletteDropdown && !themePaletteDropdown.contains(e.target)) {
                themePaletteDropdown.classList.remove('show');
            }
            if (openNotificationsBtn && !openNotificationsBtn.contains(e.target) && notificationDropdown && !notificationDropdown.contains(e.target)) {
                notificationDropdown.style.display = 'none';
            }
        });

        // PDF Export Modal Customization
        const pdfColorModal = document.getElementById('pdfColorModal');
        const closePdfColorModalBtn = document.getElementById('closePdfColorModalBtn');
        const cancelPdfColorBtn = document.getElementById('cancelPdfColorBtn');
        const confirmPdfExportBtn = document.getElementById('confirmPdfExportBtn');
        const pdfColorCards = document.querySelectorAll('.pdf-color-card');
        let selectedPdfThemeColor = 'sky';

        if (pdfColorCards) {
            pdfColorCards.forEach(card => {
                card.addEventListener('click', () => {
                    pdfColorCards.forEach(c => {
                        c.classList.remove('active');
                        c.style.border = '1px solid var(--border-color)';
                    });
                    card.classList.add('active');
                    card.style.border = '2px solid var(--accent-sky)';
                    selectedPdfThemeColor = card.dataset.color || 'sky';
                });
            });
        }

        exportPdfBtn.addEventListener('click', (e) => {
            e.preventDefault();
            exportMenu.classList.remove('show');
            if (!activeNoteId) {
                showToast('Please select a note to export!', 'info');
                return;
            }
            if (pdfColorModal) pdfColorModal.style.display = 'flex';
        });

        if (closePdfColorModalBtn) closePdfColorModalBtn.addEventListener('click', () => pdfColorModal.style.display = 'none');
        if (cancelPdfColorBtn) cancelPdfColorBtn.addEventListener('click', () => pdfColorModal.style.display = 'none');

        if (confirmPdfExportBtn) {
            confirmPdfExportBtn.addEventListener('click', () => {
                if (activeNoteId) {
                    window.open(`/api/export/${activeNoteId}?format=pdf&color=${selectedPdfThemeColor}`, '_blank');
                    pdfColorModal.style.display = 'none';
                    showToast(`Exporting PDF in ${selectedPdfThemeColor.toUpperCase()} theme!`, 'success');
                }
            });
        }

        exportMdBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (activeNoteId) window.location.href = `/api/export/${activeNoteId}?format=md`;
        });

        exportTxtBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (activeNoteId) window.location.href = `/api/export/${activeNoteId}?format=txt`;
        });

        const manualSaveNoteBtn = document.getElementById('manualSaveNoteBtn');
        if (manualSaveNoteBtn) {
            manualSaveNoteBtn.addEventListener('click', () => {
                if (activeNoteId) {
                    saveActiveNote();
                    showToast('Note saved successfully!', 'success');
                } else {
                    showToast('No active note selected to save!', 'info');
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                e.preventDefault();
                if (activeNoteId) {
                    saveActiveNote();
                    showToast('Note saved! (Ctrl + S)', 'success');
                }
            }
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                toggleSidebarState();
            }
        });

        // 🍔 COLLAPSIBLE SIDEBAR TOGGLE & STATE PERSISTENCE ENGINE
        const sidebarCollapseHeaderBtn = document.getElementById('sidebarCollapseHeaderBtn');
        const sidebarToggleTopbarBtn = document.getElementById('sidebarToggleTopbarBtn');

        function toggleSidebarState() {
            document.body.classList.toggle('sidebar-collapsed');
            const isCollapsed = document.body.classList.contains('sidebar-collapsed');
            localStorage.setItem('notez_sidebar_collapsed', isCollapsed ? 'true' : 'false');
            showToast(isCollapsed ? 'Sidebar Hidden (Full Workspace View)' : 'Sidebar Visible', 'info');
        }

        // Restore saved preference on launch
        if (localStorage.getItem('notez_sidebar_collapsed') === 'true') {
            document.body.classList.add('sidebar-collapsed');
        }

        if (sidebarCollapseHeaderBtn) sidebarCollapseHeaderBtn.addEventListener('click', toggleSidebarState);
        if (sidebarToggleTopbarBtn) sidebarToggleTopbarBtn.addEventListener('click', toggleSidebarState);

        if (openSidebarBtn) {
            openSidebarBtn.addEventListener('click', () => sidebar.classList.add('mobile-open'));
        }
        if (closeSidebarBtn) {
            closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('mobile-open'));
        }
    }

    async function togglePin(noteId) {
        try {
            const res = await fetch(`/api/notes/${noteId}/pin`, { method: 'POST' });
            const data = await res.json();
            if (activeNoteId === noteId) {
                editorPinBtn.classList.toggle('active', data.is_pinned === 1);
            }
            loadNotes();
            updateCounts();
        } catch (err) {
            console.error(err);
        }
    }

    async function toggleFavorite(noteId) {
        try {
            const res = await fetch(`/api/notes/${noteId}/favorite`, { method: 'POST' });
            const data = await res.json();
            if (activeNoteId === noteId) {
                editorFavBtn.classList.toggle('active', data.is_favorite === 1);
            }
            loadNotes();
            updateCounts();
        } catch (err) {
            console.error(err);
        }
    }

    // =========================================================================
    // ⚠️ MODERN CUSTOM CONFIRMATION MODAL HELPER
    // =========================================================================
    function showConfirmModal(title, message, confirmText = 'Confirm', isDanger = true) {
        return new Promise((resolve) => {
            const confirmModal = document.getElementById('customConfirmModal');
            const confirmModalTitle = document.getElementById('confirmModalTitle');
            const confirmModalMessage = document.getElementById('confirmModalMessage');
            const confirmModalSubmitBtn = document.getElementById('confirmModalSubmitBtn');
            const confirmModalCancelBtn = document.getElementById('confirmModalCancelBtn');
            const confirmModalIcon = document.getElementById('confirmModalIcon');

            if (!confirmModal) {
                resolve(confirm(message));
                return;
            }

            confirmModalTitle.textContent = title || 'Are you sure?';
            confirmModalMessage.textContent = message || '';
            confirmModalSubmitBtn.textContent = confirmText;

            if (isDanger) {
                confirmModalSubmitBtn.style.background = 'linear-gradient(135deg, #f43f5e, #e11d48)';
                confirmModalIcon.className = 'fa-solid fa-trash-can';
                confirmModalIcon.style.color = 'var(--accent-rose)';
            } else {
                confirmModalSubmitBtn.style.background = 'linear-gradient(135deg, var(--accent-sky), var(--accent-indigo))';
                confirmModalIcon.className = 'fa-solid fa-circle-question';
                confirmModalIcon.style.color = 'var(--accent-sky)';
            }

            confirmModal.style.display = 'flex';

            const cleanup = () => {
                confirmModal.style.display = 'none';
                confirmModalSubmitBtn.removeEventListener('click', onConfirm);
                confirmModalCancelBtn.removeEventListener('click', onCancel);
            };

            const onConfirm = () => {
                cleanup();
                resolve(true);
            };

            const onCancel = () => {
                cleanup();
                resolve(false);
            };

            confirmModalSubmitBtn.addEventListener('click', onConfirm);
            confirmModalCancelBtn.addEventListener('click', onCancel);
        });
    }

    async function deleteActiveNote() {
        if (!activeNoteId) return;
        const isTrashed = activeFilter === 'trashed';
        const title = isTrashed ? 'Permanently Delete Note?' : 'Move Note to Trash?';
        const msg = isTrashed ? 'This note will be permanently removed from your system database.' : 'You can restore this note anytime from the Trash section.';
        const confirmBtnText = isTrashed ? 'Yes, Delete' : 'Move to Trash';

        const confirmed = await showConfirmModal(title, msg, confirmBtnText, true);
        if (!confirmed) return;

        try {
            await fetch(`/api/notes/${activeNoteId}`, { method: 'DELETE' });
            showToast(isTrashed ? 'Permanently deleted note' : 'Moved note to trash', 'info');
            activeNoteId = null;
            await loadNotes();
            await loadCategories();
            await updateCounts();
        } catch (err) {
            showToast('Delete failed', 'error');
        }
    }

    // =========================================================================
    // ✨ CALM AMBIENT STAR PARTICLES & SHOOTING METEORS BACKGROUND ENGINE
    // =========================================================================
    const ambientCanvas = document.getElementById('ambientBackgroundCanvas');
    if (ambientCanvas) {
        const ctx = ambientCanvas.getContext('2d');
        let width = ambientCanvas.width = window.innerWidth;
        let height = ambientCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = ambientCanvas.width = window.innerWidth;
            height = ambientCanvas.height = window.innerHeight;
        });

        const particles = [];
        const numParticles = 85;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2.5 + 1;
                this.speedX = (Math.random() - 0.5) * 0.28;
                this.speedY = (Math.random() - 0.5) * 0.28;
                this.alpha = Math.random() * 0.6 + 0.35;
                this.alphaSpeed = Math.random() * 0.012 + 0.004;
                this.alphaDir = Math.random() > 0.5 ? 1 : -1;
                this.isSparkle = Math.random() > 0.65;
                this.colorPalette = Math.random();
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < -10) this.x = width + 10;
                if (this.x > width + 10) this.x = -10;
                if (this.y < -10) this.y = height + 10;
                if (this.y > height + 10) this.y = -10;

                this.alpha += this.alphaSpeed * this.alphaDir;
                if (this.alpha >= 0.95) {
                    this.alpha = 0.95;
                    this.alphaDir = -1;
                } else if (this.alpha <= 0.25) {
                    this.alpha = 0.25;
                    this.alphaDir = 1;
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;

                const isDark = document.body.classList.contains('theme-dark');

                let colorStr = '#38bdf8';
                if (this.colorPalette > 0.85) colorStr = '#fde047'; // Gold
                else if (this.colorPalette > 0.65) colorStr = '#34d399'; // Emerald
                else if (this.colorPalette > 0.35) colorStr = '#818cf8'; // Indigo
                else colorStr = isDark ? '#38bdf8' : '#0ea5e9'; // Sky Blue

                if (this.isSparkle) {
                    // Draw 4-Point Twinkling Star
                    ctx.fillStyle = colorStr;
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = colorStr;

                    const r = this.size * 2.2;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y - r);
                    ctx.quadraticCurveTo(this.x, this.y, this.x + r, this.y);
                    ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + r);
                    ctx.quadraticCurveTo(this.x, this.y, this.x - r, this.y);
                    ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - r);
                    ctx.fill();
                } else {
                    // Draw Glowing Round Dust Orb
                    ctx.fillStyle = colorStr;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = colorStr;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        // Shooting Star Meteor Class
        class Meteor {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width * 1.5 - width * 0.25;
                this.y = -20;
                this.length = Math.random() * 90 + 50;
                this.speed = Math.random() * 4 + 3.5;
                this.alpha = 1;
                this.active = false;
            }

            spawn() {
                this.reset();
                this.active = true;
            }

            update() {
                if (!this.active) return;
                this.x += this.speed * 1.3;
                this.y += this.speed;
                this.alpha -= 0.014;
                if (this.alpha <= 0 || this.y > height) {
                    this.active = false;
                }
            }

            draw() {
                if (!this.active) return;
                ctx.save();
                ctx.globalAlpha = this.alpha;

                const grad = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y - this.length * 0.8);
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.3, '#38bdf8');
                grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

                ctx.strokeStyle = grad;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.length, this.y - this.length * 0.8);
                ctx.stroke();
                ctx.restore();
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        const meteor = new Meteor();
        setInterval(() => {
            if (!meteor.active && Math.random() > 0.3) {
                meteor.spawn();
            }
        }, 4000);

        function animateAmbientBackground() {
            if (isAmbientEnabled) {
                ctx.clearRect(0, 0, width, height);

                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                }

                meteor.update();
                meteor.draw();
            }

            requestAnimationFrame(animateAmbientBackground);
        }

        const toggleAmbientStarsBtn = document.getElementById('toggleAmbientStarsBtn');
        const ambientStarsStatusPill = document.getElementById('ambientStarsStatusPill');

        let isAmbientEnabled = localStorage.getItem('notez_ambient_stars') !== 'false';

        function updateAmbientStarsUI() {
            ambientCanvas.style.display = isAmbientEnabled ? 'block' : 'none';
            if (ambientStarsStatusPill) {
                ambientStarsStatusPill.textContent = isAmbientEnabled ? 'ON' : 'OFF';
                ambientStarsStatusPill.style.background = isAmbientEnabled ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)';
                ambientStarsStatusPill.style.color = isAmbientEnabled ? 'var(--accent-emerald)' : 'var(--text-muted)';
            }
        }

        updateAmbientStarsUI();

        if (toggleAmbientStarsBtn) {
            toggleAmbientStarsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                isAmbientEnabled = !isAmbientEnabled;
                localStorage.setItem('notez_ambient_stars', isAmbientEnabled ? 'true' : 'false');
                updateAmbientStarsUI();
                showToast(`✨ Ambient Stars ${isAmbientEnabled ? 'Enabled' : 'Disabled'}!`, 'info');
            });
        }

        // 👁️ EYE PASSWORD SHOW/HIDE PRIVACY TOGGLE HANDLER
        document.querySelectorAll('.toggle-password-eye-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-target');
                const targetInput = document.getElementById(targetId);
                const icon = btn.querySelector('i');
                if (targetInput) {
                    const isPass = targetInput.type === 'password';
                    targetInput.type = isPass ? 'text' : 'password';
                    if (icon) {
                        icon.className = isPass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
                        btn.style.color = isPass ? 'var(--accent-sky)' : 'var(--text-muted)';
                    }
                }
            });
        });

        // 🗑️ EMPTY TRASH ENGINE
        const emptyTrashSidebarBtn = document.getElementById('emptyTrashSidebarBtn');
        const emptyTrashHeaderBtn = document.getElementById('emptyTrashHeaderBtn');

        async function triggerEmptyTrash() {
            const trashedNotes = notes.filter(n => n.is_trashed === 1);
            if (trashedNotes.length === 0) {
                showToast('Trash is already empty!', 'info');
                return;
            }

            const confirmed = await showConfirmModal(
                'Empty Trash Permanently?',
                `Are you sure you want to permanently delete all ${trashedNotes.length} notes in Trash? This action cannot be undone.`,
                'Yes, Empty Trash',
                true
            );
            if (!confirmed) return;

            try {
                const res = await fetch('/api/notes/empty-trash', { method: 'DELETE' });
                const data = await res.json();
                if (res.ok && data.success) {
                    showToast(`Permanently deleted ${data.count} trashed notes!`, 'success');
                    activeNoteId = null;
                    if (emptyStateView) emptyStateView.style.display = 'flex';
                    if (activeEditorView) activeEditorView.style.display = 'none';
                    fetchNotes();
                } else {
                    showToast('Failed to empty trash', 'error');
                }
            } catch (err) {
                showToast('Error emptying trash', 'error');
            }
        }

        if (emptyTrashSidebarBtn) emptyTrashSidebarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerEmptyTrash();
        });

        if (emptyTrashHeaderBtn) emptyTrashHeaderBtn.addEventListener('click', triggerEmptyTrash);

        // Reset zoom properties completely & clear localStorage zoom settings
        document.body.style.zoom = '';
        const edCanvas = document.getElementById('editorVisualCanvas');
        const edArea = document.getElementById('editorTextarea');
        if (edCanvas) edCanvas.style.zoom = '';
        if (edArea) edArea.style.zoom = '';
        localStorage.removeItem('smartnotes_zoom_scale');
        localStorage.removeItem('smartnotes_editor_zoom');

        // =========================================================================
        // 🖼️ SMART PHOTO VAULT & MEDIA GALLERY HUB ENGINE
        // =========================================================================
        const mediaGalleryModal = document.getElementById('mediaGalleryModal');
        const navPhotoVault = document.getElementById('navPhotoVault');
        const openPhotoVaultToolbarBtn = document.getElementById('openPhotoVaultToolbarBtn');
        const closeMediaGalleryModalBtn = document.getElementById('closeMediaGalleryModalBtn');
        const galleryUploadNewBtn = document.getElementById('galleryUploadNewBtn');
        const galleryFileInput = document.getElementById('galleryFileInput');
        const gallerySearchInput = document.getElementById('gallerySearchInput');
        const galleryGridContainer = document.getElementById('galleryGridContainer');
        const galleryCountBadge = document.getElementById('galleryCountBadge');
        const sidebarPhotoCountBadge = document.getElementById('sidebarPhotoCountBadge');

        let galleryImagesData = [];

        async function openPhotoVaultModal() {
            if (!mediaGalleryModal) return;
            mediaGalleryModal.style.display = 'flex';
            await loadGalleryImages();
        }

        async function loadGalleryImages() {
            try {
                const res = await fetch('/api/gallery/images');
                if (res.ok) {
                    galleryImagesData = await res.json();
                    if (sidebarPhotoCountBadge) sidebarPhotoCountBadge.textContent = galleryImagesData.length;
                    if (galleryCountBadge) galleryCountBadge.textContent = `${galleryImagesData.length} Photos`;
                    renderGalleryGrid(galleryImagesData);
                }
            } catch (err) {
                console.error('Error loading gallery images:', err);
            }
        }

        function renderGalleryGrid(images) {
            if (!galleryGridContainer) return;
            galleryGridContainer.innerHTML = '';

            if (images.length === 0) {
                galleryGridContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
                        <i class="fa-solid fa-images" style="font-size: 42px; color: #f43f5e; opacity: 0.5; margin-bottom: 12px; display: block;"></i>
                        <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Photo Vault is Empty</h4>
                        <p style="font-size: 12.5px; margin-bottom: 16px;">Upload photos or insert screenshots into notes to see them here.</p>
                        <button class="btn btn-primary" onclick="document.getElementById('galleryFileInput').click()" style="font-size: 12px; background: linear-gradient(135deg, #f43f5e, #e11d48); border: none;">
                            <i class="fa-solid fa-cloud-arrow-up"></i> Upload First Photo
                        </button>
                    </div>
                `;
                return;
            }

            images.forEach(img => {
                const card = document.createElement('div');
                card.style.cssText = `
                    background: var(--bg-main);
                    border: 1px solid var(--border-color);
                    border-radius: 14px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                `;
                card.className = 'gallery-photo-card';

                card.innerHTML = `
                    <div style="position: relative; height: 130px; background: #000; overflow: hidden; cursor: pointer;" onclick="window.openImageModalWithUrl('${img.url}')">
                        <img src="${img.url}" alt="${img.filename}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                        <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.75); color: #ffffff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 6px;">${img.size_kb} KB</span>
                    </div>
                    <div style="padding: 10px 12px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <strong style="font-size: 11.5px; display: block; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${img.filename}">${img.filename}</strong>
                            <span style="font-size: 10.5px; color: var(--accent-sky); font-weight: 600; display: block; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">📌 ${img.note_title}</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 8px;">
                            <button class="btn btn-secondary" style="font-size: 10px; padding: 3px 8px; flex: 1; border-color: rgba(14, 165, 233, 0.4); color: var(--accent-sky);" onclick="window.insertPhotoFromVaultToNote('${img.url}')" title="Insert Into Active Note">
                                <i class="fa-solid fa-plus"></i> Insert
                            </button>
                            <button class="btn btn-secondary" style="font-size: 10px; padding: 3px 8px;" onclick="window.downloadFileFromUrl('${img.url}', '${img.filename}')" title="Download to Laptop">
                                <i class="fa-solid fa-download"></i>
                            </button>
                            <button class="btn btn-danger-soft" style="font-size: 10px; padding: 3px 8px;" onclick="window.deletePhotoFromVault('${img.filename}')" title="Delete Photo">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                `;

                galleryGridContainer.appendChild(card);
            });
        }

        if (navPhotoVault) navPhotoVault.addEventListener('click', openPhotoVaultModal);
        if (openPhotoVaultToolbarBtn) openPhotoVaultToolbarBtn.addEventListener('click', openPhotoVaultModal);
        if (closeMediaGalleryModalBtn) closeMediaGalleryModalBtn.addEventListener('click', () => mediaGalleryModal.style.display = 'none');

        if (galleryUploadNewBtn) galleryUploadNewBtn.addEventListener('click', () => galleryFileInput.click());

        if (galleryFileInput) {
            galleryFileInput.addEventListener('change', async (e) => {
                if (e.target.files.length > 0) {
                    showToast('Uploading photo to vault...', 'info');
                    const formData = new FormData();
                    formData.append('image', e.target.files[0]);

                    try {
                        const res = await fetch('/api/attachments/upload', {
                            method: 'POST',
                            body: formData
                        });
                        const data = await res.json();
                        showToast('Photo saved to vault cleanly!', 'success');
                        await loadGalleryImages();
                    } catch (err) {
                        showToast('Failed to upload photo', 'error');
                    }
                }
            });
        }

        if (gallerySearchInput) {
            gallerySearchInput.addEventListener('input', () => {
                const query = gallerySearchInput.value.toLowerCase().trim();
                if (!query) {
                    renderGalleryGrid(galleryImagesData);
                } else {
                    const filtered = galleryImagesData.filter(img => 
                        img.filename.toLowerCase().includes(query) || 
                        img.note_title.toLowerCase().includes(query)
                    );
                    renderGalleryGrid(filtered);
                }
            });
        }

        window.insertPhotoFromVaultToNote = (url) => {
            if (!activeNoteId) {
                showToast('Please open or select a note first!', 'info');
                return;
            }
            editorVisualCanvas.focus();
            const photoHtml = `<br><div class="embedded-media-wrapper" contenteditable="false"><button class="media-remove-btn" title="Remove Photo"><i class="fa-solid fa-trash-can"></i> Remove Photo</button><img src="${url}" class="note-embedded-image" alt="Image"></div><br>`;
            document.execCommand('insertHTML', false, photoHtml);
            bindMediaRemoveListeners();
            saveActiveNote();
            mediaGalleryModal.style.display = 'none';
            showToast('Photo inserted into note!', 'success');
        };

        window.deletePhotoFromVault = async (filename) => {
            const confirmed = await showConfirmModal(
                'Delete Photo from Vault?',
                `Are you sure you want to permanently delete "${filename}" from Photo Vault?`,
                'Yes, Delete Photo',
                true
            );
            if (!confirmed) return;

            try {
                const res = await fetch('/api/gallery/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: filename })
                });

                if (res.ok) {
                    showToast(`Deleted ${filename} from vault!`, 'success');
                    await loadGalleryImages();
                } else {
                    showToast('Failed to delete photo', 'error');
                }
            } catch (err) {
                showToast('Error deleting photo', 'error');
            }
        };

        loadGalleryImages();

        // =========================================================================
        // 🎓 ACADEMIC SUBJECT MODULES & SEMESTER WORKSPACE HUB ENGINE
        // =========================================================================
        const academicSubjectsModal = document.getElementById('academicSubjectsModal');
        const navAcademicSubjects = document.getElementById('navAcademicSubjects');
        const closeAcademicSubjectsModalBtn = document.getElementById('closeAcademicSubjectsModalBtn');
        const openAddSubjectBtn = document.getElementById('openAddSubjectBtn');
        const addSubjectFormContainer = document.getElementById('addSubjectFormContainer');
        const saveSubjectModuleBtn = document.getElementById('saveSubjectModuleBtn');
        const cancelSubjectModuleBtn = document.getElementById('cancelSubjectModuleBtn');
        const subjectsGridContainer = document.getElementById('subjectsGridContainer');
        const sidebarSubjectCountBadge = document.getElementById('sidebarSubjectCountBadge');
        const editorSubjectSelect = document.getElementById('editorSubjectSelect');

        const newSubjectCode = document.getElementById('newSubjectCode');
        const newSubjectName = document.getElementById('newSubjectName');
        const newSubjectSemester = document.getElementById('newSubjectSemester');
        const newSubjectColor = document.getElementById('newSubjectColor');
        const newSubjectDesc = document.getElementById('newSubjectDesc');

        let subjectsData = [];

        async function openAcademicSubjectsModal() {
            if (!academicSubjectsModal) return;
            academicSubjectsModal.style.display = 'flex';
            await loadSubjects();
        }

        async function loadSubjects() {
            try {
                const res = await fetch('/api/subjects');
                if (res.ok) {
                    subjectsData = await res.json();
                    if (sidebarSubjectCountBadge) sidebarSubjectCountBadge.textContent = subjectsData.length;
                    populateEditorSubjectSelect(subjectsData);
                    renderSubjectsGrid(subjectsData);
                }
            } catch (err) {
                console.error('Error loading academic subjects:', err);
            }
        }

        function populateEditorSubjectSelect(subjects) {
            if (!editorSubjectSelect) return;
            const currentVal = editorSubjectSelect.value;
            editorSubjectSelect.innerHTML = '<option value="">📌 Select Subject / Module...</option>';
            subjects.forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.code;
                opt.textContent = `${s.code} - ${s.name}`;
                editorSubjectSelect.appendChild(opt);
            });
            if (currentVal) editorSubjectSelect.value = currentVal;
        }

        function renderSubjectsGrid(subjects) {
            if (!subjectsGridContainer) return;
            subjectsGridContainer.innerHTML = '';

            if (subjects.length === 0) {
                subjectsGridContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
                        <i class="fa-solid fa-graduation-cap" style="font-size: 42px; color: var(--accent-indigo); opacity: 0.5; margin-bottom: 12px; display: block;"></i>
                        <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No Subject Modules Found</h4>
                        <p style="font-size: 12.5px; margin-bottom: 16px;">Add your campus semester modules to organize notes & exam revision packs.</p>
                        <button class="btn btn-primary" onclick="document.getElementById('addSubjectFormContainer').style.display='block'" style="font-size: 12px; background: linear-gradient(135deg, #6366f1, #4f46e5); border: none;">
                            <i class="fa-solid fa-plus"></i> Create First Module
                        </button>
                    </div>
                `;
                return;
            }

            const themeColors = {
                sky: { border: 'rgba(14, 165, 233, 0.4)', bg: 'rgba(14, 165, 233, 0.1)', text: 'var(--accent-sky)' },
                emerald: { border: 'rgba(16, 185, 129, 0.4)', bg: 'rgba(16, 185, 129, 0.1)', text: 'var(--accent-emerald)' },
                indigo: { border: 'rgba(99, 102, 241, 0.4)', bg: 'rgba(99, 102, 241, 0.1)', text: 'var(--accent-indigo)' },
                rose: { border: 'rgba(244, 63, 94, 0.4)', bg: 'rgba(244, 63, 94, 0.1)', text: '#f43f5e' },
                amber: { border: 'rgba(245, 158, 11, 0.4)', bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' }
            };

            subjects.forEach(sub => {
                const colorObj = themeColors[sub.color] || themeColors.sky;
                const card = document.createElement('div');
                card.style.cssText = `
                    background: var(--bg-main);
                    border: 1px solid var(--border-color);
                    border-left: 4px solid ${colorObj.text};
                    border-radius: 14px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                `;
                card.className = 'subject-module-card';

                card.innerHTML = `
                    <div>
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                            <span style="font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px; background: ${colorObj.bg}; color: ${colorObj.text}; border: 1px solid ${colorObj.border}; text-transform: uppercase;">${escapeHtml(sub.code)}</span>
                            <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;"><i class="fa-solid fa-calendar-days"></i> ${escapeHtml(sub.semester || 'Semester 1')}</span>
                        </div>
                        <h4 style="font-size: 14.5px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; line-height: 1.3;" title="${escapeHtml(sub.name)}">${escapeHtml(sub.name)}</h4>
                        <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${escapeHtml(sub.description || 'Campus academic course module notes & photos.')}</p>
                    </div>

                    <div>
                        <div style="display: flex; align-items: center; gap: 12px; padding: 8px 10px; background: var(--bg-sidebar); border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 12px;">
                            <div style="flex: 1; text-align: center; border-right: 1px solid var(--border-color);">
                                <strong style="font-size: 15px; color: var(--text-primary); display: block;">${sub.note_count || 0}</strong>
                                <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Notes</span>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <strong style="font-size: 15px; color: ${colorObj.text}; display: block;">${sub.photo_count || 0}</strong>
                                <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Photos</span>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <button class="btn btn-primary" style="font-size: 11px; padding: 6px 10px; width: 100%; background: linear-gradient(135deg, ${colorObj.text}, #4f46e5); border: none;" onclick="window.downloadSubjectRevisionPack('${escapeHtml(sub.code)}')">
                                <i class="fa-solid fa-bolt"></i> ⚡ 1-Click Exam Revision Pack
                            </button>
                            <div style="display: flex; gap: 6px;">
                                <button class="btn btn-secondary" style="font-size: 10.5px; padding: 4px 8px; flex: 1;" onclick="window.filterNotesBySubject('${escapeHtml(sub.code)}')">
                                    <i class="fa-solid fa-filter"></i> View Notes
                                </button>
                                <button class="btn btn-danger-soft" style="font-size: 10.5px; padding: 4px 8px;" onclick="window.deleteSubjectModule(${sub.id}, '${escapeHtml(sub.code)}')" title="Delete Module">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                subjectsGridContainer.appendChild(card);
            });
        }

        if (navAcademicSubjects) navAcademicSubjects.addEventListener('click', openAcademicSubjectsModal);
        if (closeAcademicSubjectsModalBtn) closeAcademicSubjectsModalBtn.addEventListener('click', () => academicSubjectsModal.style.display = 'none');

        if (openAddSubjectBtn) {
            openAddSubjectBtn.addEventListener('click', () => {
                if (addSubjectFormContainer) addSubjectFormContainer.style.display = addSubjectFormContainer.style.display === 'none' ? 'block' : 'none';
            });
        }

        if (cancelSubjectModuleBtn) {
            cancelSubjectModuleBtn.addEventListener('click', () => {
                if (addSubjectFormContainer) addSubjectFormContainer.style.display = 'none';
            });
        }

        if (saveSubjectModuleBtn) {
            saveSubjectModuleBtn.addEventListener('click', async () => {
                const code = newSubjectCode.value.trim();
                const name = newSubjectName.value.trim();
                const semester = newSubjectSemester.value;
                const color = newSubjectColor.value;
                const desc = newSubjectDesc.value.trim();

                if (!code || !name) {
                    showToast('Please enter Module Code and Name!', 'info');
                    return;
                }

                try {
                    const res = await fetch('/api/subjects/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ code: code, name: name, semester: semester, color: color, description: desc })
                    });
                    const data = await res.json();
                    if (res.ok && data.success) {
                        showToast(`Subject ${code} created successfully!`, 'success');
                        newSubjectCode.value = '';
                        newSubjectName.value = '';
                        newSubjectDesc.value = '';
                        addSubjectFormContainer.style.display = 'none';
                        await loadSubjects();
                    } else {
                        showToast(data.error || 'Failed to create module', 'error');
                    }
                } catch (err) {
                    showToast('Error creating subject module', 'error');
                }
            });
        }

        window.downloadSubjectRevisionPack = async (code) => {
            showToast(`Generating 1-Click Exam Revision Pack for ${code}...`, 'info');
            try {
                window.location.href = `/api/subjects/${code}/revision`;
                showToast(`Downloaded Exam Revision Pack for ${code}!`, 'success');
            } catch (err) {
                showToast('Failed to download revision pack', 'error');
            }
        };

        window.filterNotesBySubject = (code) => {
            academicSubjectsModal.style.display = 'none';
            searchInput.value = code;
            searchQuery = code.toLowerCase().trim();
            searchClearBtn.style.display = 'block';
            loadNotes();
            showToast(`Filtered notes for Subject Module: ${code}`, 'info');
        };

        window.deleteSubjectModule = async (id, code) => {
            const confirmed = await showConfirmModal(
                'Delete Subject Module?',
                `Are you sure you want to delete Subject Module "${code}"? Notes associated with this module will NOT be deleted.`,
                'Yes, Delete Module',
                true
            );
            if (!confirmed) return;

            try {
                const res = await fetch(`/api/subjects/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    showToast(`Deleted Module ${code}`, 'success');
                    await loadSubjects();
                } else {
                    showToast('Failed to delete module', 'error');
                }
            } catch (err) {
                showToast('Error deleting subject module', 'error');
            }
        };

        loadSubjects();

        animateAmbientBackground();
    }

    function triggerDebouncedSave() {
        showSaveStatus('<i class="fa-solid fa-ellipsis"></i> Typing...');
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(saveActiveNote, 800);
    }

    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function escapeHtml(str) {
        return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});
