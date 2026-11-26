/**
 * CD 2097 - PAINEL OPERACIONAL DE STRETCHADEIRAS
 * Lógica SPA, comunicação REST e gestão de interface
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Estado da Aplicação e Elementos DOM
    // -------------------------------------------------------------------------
    const state = {
        currentSection: 'dashboard',
        usuarioId: sessionStorage.getItem('usuarioId'),
        filiaisCache: [],
        boxesCache: [],
        stretchadeirasCache: []
    };

    const dom = {
        appMain: document.getElementById('appMain'),
        appSidebar: document.getElementById('appSidebar'),
        btnToggleSidebar: document.getElementById('btnToggleSidebar'),
        btnLogout: document.getElementById('btnLogout'),
        navButtons: document.querySelectorAll('.nav-btn'),
        headerUserName: document.getElementById('headerUserName'),
        headerUserRole: document.getElementById('headerUserRole'),
        modalOverlay: document.getElementById('modalOverlay'),
        modalTitle: document.getElementById('modalTitle'),
        modalBody: document.getElementById('modalBody'),
        modalBtnClose: document.getElementById('modalBtnClose'),
        toastContainer: document.getElementById('toastContainer')
    };

    // -------------------------------------------------------------------------
    // 2. Inicialização e Autenticação
    // -------------------------------------------------------------------------
    init();

    async function init() {
        setupNavigation();
        setupModal();
        setupLogout();
        await loadUserData();
        loadSection(state.currentSection);
    }

    async function loadUserData() {
        if (!state.usuarioId) {
            dom.headerUserName.textContent = 'Operador CD 2097';
            return;
        }

        try {
            const res = await fetch(`https://sendly-production-b679.up.railway.app/cadastro?id=${state.usuarioId}`);
            if (res.ok) {
                const data = await res.json();
                if (data && data.name) {
                    dom.headerUserName.textContent = data.name;
                    if (data.destino) {
                        dom.headerUserRole.textContent = data.destino;
                    }
                }
            } else {
                dom.headerUserName.textContent = 'Operador CD 2097';
            }
        } catch (e) {
            dom.headerUserName.textContent = 'Operador CD 2097';
        }
    }

    function setupLogout() {
        dom.btnLogout.addEventListener('click', () => {
            sessionStorage.clear();
            showToast('Sessão encerrada.', 'info');
            setTimeout(() => {
                window.location.href = './index.html';
            }, 600);
        });
    }

    function setupNavigation() {
        dom.navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                dom.navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const target = btn.getAttribute('data-section');
                state.currentSection = target;
                loadSection(target);

                // Fechar sidebar no mobile após clique
                if (window.innerWidth < 768) {
                    dom.appSidebar.classList.remove('open');
                }
            });
        });

        if (dom.btnToggleSidebar) {
            dom.btnToggleSidebar.addEventListener('click', () => {
                dom.appSidebar.classList.toggle('open');
            });
        }
    }

    function loadSection(section) {
        switch (section) {
            case 'dashboard':
                renderDashboard();
                break;
            case 'stretchadeiras':
                renderStretchadeiras();
                break;
            case 'filiais':
                renderFiliais();
                break;
            case 'boxes':
                renderBoxes();
                break;
            case 'usuarios':
                renderUsuarios();
                break;
            default:
                renderDashboard();
        }
    }

    // -------------------------------------------------------------------------
    // 3. Toasts e Modais
    // -------------------------------------------------------------------------
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        dom.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    function setupModal() {
        dom.modalBtnClose.addEventListener('click', closeModal);
        dom.modalOverlay.addEventListener('click', (e) => {
            if (e.target === dom.modalOverlay) closeModal();
        });
    }

    function openModal(title, contentHtml) {
        dom.modalTitle.textContent = title;
        dom.modalBody.innerHTML = contentHtml;
        dom.modalOverlay.classList.remove('hidden');
    }

    function closeModal() {
        dom.modalOverlay.classList.add('hidden');
        dom.modalBody.innerHTML = '';
    }

    // -------------------------------------------------------------------------
    // 4. SEÇÃO: DASHBOARD OPERACIONAL
    // -------------------------------------------------------------------------
    async function renderDashboard() {
        dom.appMain.innerHTML = `
            <div class="view-header">
                <div>
                    <h2>Painel Operacional das Stretchadeiras</h2>
                    <p>Acompanhamento em tempo real do processamento de paletes e direcionamento aos BOX</p>
                </div>
                <button id="btnRefreshDashboard" class="btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19"></path>
                    </svg>
                    <span>Atualizar</span>
                </button>
            </div>

            <!-- KPIs -->
            <div class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-meta">
                        <h4>Total Stretchadeiras</h4>
                        <div class="kpi-value" id="kpiTotal">0</div>
                    </div>
                    <div class="kpi-indicator blue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                        </svg>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-meta">
                        <h4>Livres (Disponíveis)</h4>
                        <div class="kpi-value" id="kpiLivre">0</div>
                    </div>
                    <div class="kpi-indicator green">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-meta">
                        <h4>Ocupadas (Processando)</h4>
                        <div class="kpi-value" id="kpiOcupada">0</div>
                    </div>
                    <div class="kpi-indicator orange">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-meta">
                        <h4>Inativas (Desabilitadas)</h4>
                        <div class="kpi-value" id="kpiInativa">0</div>
                    </div>
                    <div class="kpi-indicator gray">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Grid de Stretchadeiras -->
            <div class="machine-grid" id="dashboardMachineGrid">
                <div class="info-empty">Carregando stretchadeiras...</div>
            </div>
        `;

        document.getElementById('btnRefreshDashboard').addEventListener('click', updateDashboardData);
        await updateDashboardData();
    }

    async function updateDashboardData() {
        try {
            const [resStretch, resFiliais, resBoxes] = await Promise.all([
                fetch('https://sendly-production-b679.up.railway.app/api/stretchadeiras'),
                fetch('https://sendly-production-b679.up.railway.app/api/filiais'),
                fetch('https://sendly-production-b679.up.railway.app/api/boxes')
            ]);

            state.stretchadeirasCache = resStretch.ok ? await resStretch.json() : [];
            state.filiaisCache = resFiliais.ok ? await resFiliais.json() : [];
            state.boxesCache = resBoxes.ok ? await resBoxes.json() : [];

            // Calcular KPIs
            const total = state.stretchadeirasCache.length;
            const inativas = state.stretchadeirasCache.filter(s => s.ativo === false).length;
            const ativas = state.stretchadeirasCache.filter(s => s.ativo === true);
            const livres = ativas.filter(s => s.status_operacional === 'LIVRE').length;
            const ocupadas = ativas.filter(s => s.status_operacional === 'OCUPADA').length;

            const elTotal = document.getElementById('kpiTotal');
            const elLivre = document.getElementById('kpiLivre');
            const elOcupada = document.getElementById('kpiOcupada');
            const elInativa = document.getElementById('kpiInativa');

            if (elTotal) elTotal.textContent = total;
            if (elLivre) elLivre.textContent = livres;
            if (elOcupada) elOcupada.textContent = ocupadas;
            if (elInativa) elInativa.textContent = inativas;

            renderMachineCards(state.stretchadeirasCache);
        } catch (e) {
            showToast('Erro ao carregar dados do Dashboard: ' + e.message, 'error');
        }
    }

    function renderMachineCards(stretchadeiras) {
        const grid = document.getElementById('dashboardMachineGrid');
        if (!grid) return;

        if (stretchadeiras.length === 0) {
            grid.innerHTML = `
                <div class="info-empty" style="grid-column: 1/-1; padding: 3rem;">
                    Nenhuma stretchadeira cadastrada no momento. Vá até o menu <strong>Stretchadeiras</strong> para adicionar.
                </div>
            `;
            return;
        }

        grid.innerHTML = stretchadeiras.map(s => {
            const isAtiva = s.ativo === true;
            const isOcupada = isAtiva && s.status_operacional === 'OCUPADA';
            
            let statusBadgeClass = 'inativa';
            let statusLabel = 'INATIVA';

            if (isAtiva) {
                if (s.status_operacional === 'OCUPADA') {
                    statusBadgeClass = 'ocupada';
                    statusLabel = 'OCUPADA';
                } else {
                    statusBadgeClass = 'livre';
                    statusLabel = 'LIVRE';
                }
            }

            return `
                <div class="machine-card" id="card-stretch-${s.id}">
                    <div class="machine-card-header">
                        <div>
                            <h3 class="machine-title">${escapeHtml(s.nome)}</h3>
                            <p class="machine-desc">${escapeHtml(s.descricao || 'Sem descrição')}</p>
                        </div>
                        <span class="status-badge ${statusBadgeClass}">${statusLabel}</span>
                    </div>

                    <div class="machine-content">
                        <div class="machine-info-box">
                            ${isOcupada ? `
                                <div class="info-row">
                                    <span class="info-label">Filial / Loja:</span>
                                    <span class="info-value">${escapeHtml(s.filial_codigo ? `[${s.filial_codigo}] ${s.filial_nome}` : 'N/D')}</span>
                                </div>
                                <div class="info-row">
                                    <span class="info-label">BOX de Destino:</span>
                                    <span class="info-value highlight-box">${escapeHtml(s.box_nome || 'N/D')}</span>
                                </div>
                            ` : isAtiva ? `
                                <div class="info-empty">Pronta para receber novo palete</div>
                            ` : `
                                <div class="info-empty">Máquina desabilitada para operação</div>
                            `}
                        </div>
                    </div>

                    <div class="machine-actions">
                        ${isAtiva ? (
                            isOcupada ? `
                                <button class="btn-card btn-free" onclick="window.concluirProcesso(${s.id})">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    <span>Concluir Palete</span>
                                </button>
                            ` : `
                                <button class="btn-card btn-busy" onclick="window.abrirModalProcessar(${s.id}, '${escapeHtml(s.nome)}')">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                    <span>Processar Palete</span>
                                </button>
                            `
                        ) : `
                            <button class="btn-card btn-secondary" onclick="window.alternarAtivacao(${s.id})">
                                <span>Reativar Stretchadeira</span>
                            </button>
                        `}
                        ${isAtiva ? `
                            <button class="btn-card btn-toggle-active" title="Desativar Stretchadeira" onclick="window.alternarAtivacao(${s.id})">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Modal para Processar Palete
    window.abrirModalProcessar = (stretchadeiraId, stretchadeiraNome) => {
        const filialOptions = state.filiaisCache.map(f => 
            `<option value="${f.id}">[${escapeHtml(f.codigo)}] ${escapeHtml(f.nome)}</option>`
        ).join('');

        const boxOptions = state.boxesCache.map(b => 
            `<option value="${b.id}">${escapeHtml(b.nome)}</option>`
        ).join('');

        if (state.filiaisCache.length === 0 || state.boxesCache.length === 0) {
            showToast('Cadastre ao menos uma filial e um BOX antes de processar paletes.', 'error');
            return;
        }

        const html = `
            <form id="formProcessarPalete">
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
                    Iniciando processamento na <strong>${stretchadeiraNome}</strong>.
                </p>
                <div class="form-group">
                    <label for="procFilial">Filial / Loja de Destino do Palete:</label>
                    <select id="procFilial" class="form-control" required>
                        <option value="">Selecione a Filial...</option>
                        ${filialOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="procBox">BOX de Destino após o Stretch:</label>
                    <select id="procBox" class="form-control" required>
                        <option value="">Selecione o BOX...</option>
                        ${boxOptions}
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="document.getElementById('modalOverlay').classList.add('hidden')">Cancelar</button>
                    <button type="submit" class="btn-primary">Confirmar Direcionamento</button>
                </div>
            </form>
        `;

        openModal(`Processar Palete - ${stretchadeiraNome}`, html);

        document.getElementById('formProcessarPalete').addEventListener('submit', async (e) => {
            e.preventDefault();
            const filialId = document.getElementById('procFilial').value;
            const boxId = document.getElementById('procBox').value;

            try {
                const res = await fetch(`https://sendly-production-b679.up.railway.app/api/stretchadeiras/${stretchadeiraId}/status`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        status: 'OCUPADA',
                        filialId: parseInt(filialId),
                        boxId: parseInt(boxId)
                    })
                });

                if (res.ok) {
                    showToast('Palete em processamento com sucesso!', 'success');
                    closeModal();
                    await updateDashboardData();
                } else {
                    const err = await res.json();
                    showToast(err.erro || 'Falha ao processar palete.', 'error');
                }
            } catch (err) {
                showToast('Erro de conexão ao processar palete: ' + err.message, 'error');
            }
        });
    };

    // Concluir Processo de Palete
    window.concluirProcesso = async (stretchadeiraId) => {
        try {
            const res = await fetch(`https://sendly-production-b679.up.railway.app/api/stretchadeiras/${stretchadeiraId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'LIVRE' })
            });

            if (res.ok) {
                showToast('Processamento concluído. Stretchadeira LIVRE.', 'success');
                await updateDashboardData();
            } else {
                const err = await res.json();
                showToast(err.erro || 'Falha ao liberar máquina.', 'error');
            }
        } catch (e) {
            showToast('Erro de comunicação: ' + e.message, 'error');
        }
    };

    // Alternar Ativação
    window.alternarAtivacao = async (stretchadeiraId) => {
        try {
            const res = await fetch(`https://sendly-production-b679.up.railway.app/api/stretchadeiras/${stretchadeiraId}/ativar`, {
                method: 'PUT'
            });

            if (res.ok) {
                const data = await res.json();
                showToast(data.mensagem, 'info');
                await updateDashboardData();
            } else {
                showToast('Erro ao alternar ativação da máquina.', 'error');
            }
        } catch (e) {
            showToast('Erro: ' + e.message, 'error');
        }
    };

    // -------------------------------------------------------------------------
    // 5. SEÇÃO: CRUD STRETCHADEIRAS
    // -------------------------------------------------------------------------
    async function renderStretchadeiras() {
        dom.appMain.innerHTML = `
            <div class="view-header">
                <div>
                    <h2>Cadastro de Stretchadeiras</h2>
                    <p>Gerencie as máquinas de stretch do CD 2097</p>
                </div>
                <button id="btnNovaStretchadeira" class="btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Nova Stretchadeira</span>
                </button>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Status Sistema</th>
                            <th>Status Operação</th>
                            <th style="text-align: right;">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyStretchadeiras">
                        <tr><td colspan="6" style="text-align: center;">Carregando dados...</td></tr>
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('btnNovaStretchadeira').addEventListener('click', () => abrirModalStretchadeira());
        await carregarTabelaStretchadeiras();
    }

    async function carregarTabelaStretchadeiras() {
        try {
            const res = await fetch('https://sendly-production-b679.up.railway.app/api/stretchadeiras');
            const data = res.ok ? await res.json() : [];
            const tbody = document.getElementById('tbodyStretchadeiras');
            if (!tbody) return;

            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhuma stretchadeira cadastrada.</td></tr>`;
                return;
            }

            tbody.innerHTML = data.map(s => `
                <tr>
                    <td><strong>#${s.id}</strong></td>
                    <td>${escapeHtml(s.nome)}</td>
                    <td>${escapeHtml(s.descricao || '-')}</td>
                    <td>
                        <span class="status-badge ${s.ativo === true ? 'livre' : 'inativa'}">
                            ${s.ativo === true ? 'ATIVA' : 'INATIVA'}
                        </span>
                    </td>
                    <td>
                        <span class="status-badge ${s.status_operacional === 'OCUPADA' ? 'ocupada' : 'livre'}">
                            ${s.status_operacional}
                        </span>
                    </td>
                    <td style="text-align: right;">
                        <div class="table-actions" style="justify-content: flex-end;">
                            <button class="btn-table-action" onclick="window.editarStretchadeira(${s.id}, '${escapeHtml(s.nome)}', '${escapeHtml(s.descricao || '')}', ${s.ativo})">Editar</button>
                            <button class="btn-table-action delete" onclick="window.excluirStretchadeira(${s.id})">Excluir</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } catch (e) {
            showToast('Erro ao listar stretchadeiras: ' + e.message, 'error');
        }
    }

    window.abrirModalStretchadeira = (id = null, nome = '', descricao = '', ativo = 1) => {
        const isEdit = id !== null;
        const html = `
            <form id="formStretchadeira">
                <div class="form-group">
                    <label for="stretchNome">Nome / Identificação *</label>
                    <input type="text" id="stretchNome" class="form-control" value="${escapeHtml(nome)}" required placeholder="Ex: Stretchadeira 01">
                </div>
                <div class="form-group">
                    <label for="stretchDesc">Descrição</label>
                    <input type="text" id="stretchDesc" class="form-control" value="${escapeHtml(descricao)}" placeholder="Ex: Entrada Linha Sul">
                </div>
                <div class="form-group">
                    <label for="stretchAtivo">Status no Sistema</label>
                    <select id="stretchAtivo" class="form-control">
                        <option value="1" ${ativo === 1 ? 'selected' : ''}>Habilitada (ATIVA)</option>
                        <option value="0" ${ativo === 0 ? 'selected' : ''}>Desabilitada (INATIVA)</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="document.getElementById('modalOverlay').classList.add('hidden')">Cancelar</button>
                    <button type="submit" class="btn-primary">${isEdit ? 'Salvar Alterações' : 'Cadastrar'}</button>
                </div>
            </form>
        `;

        openModal(isEdit ? 'Editar Stretchadeira' : 'Nova Stretchadeira', html);

        document.getElementById('formStretchadeira').addEventListener('submit', async (e) => {
            e.preventDefault();
            const body = {
                nome: document.getElementById('stretchNome').value,
                descricao: document.getElementById('stretchDesc').value,
                ativo: parseInt(document.getElementById('stretchAtivo').value)
            };

            const url = isEdit ? `https://sendly-production-b679.up.railway.app/api/stretchadeiras/${id}` : 'https://sendly-production-b679.up.railway.app/api/stretchadeiras';
            const method = isEdit ? 'PUT' : 'POST';

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                if (res.ok) {
                    showToast(isEdit ? 'Stretchadeira atualizada!' : 'Stretchadeira criada!', 'success');
                    closeModal();
                    await carregarTabelaStretchadeiras();
                } else {
                    const err = await res.json();
                    showToast(err.erro || 'Falha ao salvar stretchadeira.', 'error');
                }
            } catch (err) {
                showToast('Erro de comunicação: ' + err.message, 'error');
            }
        });
    };

    window.editarStretchadeira = (id, nome, desc, ativo) => {
        window.abrirModalStretchadeira(id, nome, desc, ativo);
    };

    window.excluirStretchadeira = async (id) => {
        if (!confirm('Deseja realmente excluir esta stretchadeira?')) return;
        try {
            const res = await fetch(`https://sendly-production-b679.up.railway.app/api/stretchadeiras/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Stretchadeira excluída com sucesso.', 'info');
                await carregarTabelaStretchadeiras();
            } else {
                const err = await res.json();
                showToast(err.erro || 'Falha ao excluir.', 'error');
            }
        } catch (e) {
            showToast('Erro: ' + e.message, 'error');
        }
    };

    // -------------------------------------------------------------------------
    // 6. SEÇÃO: CRUD FILIAIS
    // -------------------------------------------------------------------------
    async function renderFiliais() {
        dom.appMain.innerHTML = `
            <div class="view-header">
                <div>
                    <h2>Cadastro de Filiais</h2>
                    <p>Mantenha as lojas e filiais vinculadas aos paletes</p>
                </div>
                <button id="btnNovaFilial" class="btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Nova Filial</span>
                </button>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nome da Filial</th>
                            <th>Cidade</th>
                            <th style="text-align: right;">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyFiliais">
                        <tr><td colspan="5" style="text-align: center;">Carregando filiais...</td></tr>
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('btnNovaFilial').addEventListener('click', () => abrirModalFilial());
        await carregarTabelaFiliais();
    }

    async function carregarTabelaFiliais() {
        try {
            const res = await fetch('https://sendly-production-b679.up.railway.app/api/filiais');
            const data = res.ok ? await res.json() : [];
            const tbody = document.getElementById('tbodyFiliais');
            if (!tbody) return;

            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Nenhuma filial cadastrada.</td></tr>`;
                return;
            }

            tbody.innerHTML = data.map(f => `
                <tr>
                    <td><strong>#${f.id}</strong></td>
                    <td><span class="status-badge adjust" style="background: rgba(0,112,243,0.15); border:1px solid rgba(0,112,243,0.3); color: var(--brand-accent);">${escapeHtml(f.codigo)}</span></td>
                    <td><strong>${escapeHtml(f.nome)}</strong></td>
                    <td>${escapeHtml(f.cidade || '-')}</td>
                    <td style="text-align: right;">
                        <div class="table-actions" style="justify-content: flex-end;">
                            <button class="btn-table-action" onclick="window.editarFilial(${f.id}, '${escapeHtml(f.codigo)}', '${escapeHtml(f.nome)}', '${escapeHtml(f.cidade || '')}')">Editar</button>
                            <button class="btn-table-action delete" onclick="window.excluirFilial(${f.id})">Excluir</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } catch (e) {
            showToast('Erro ao carregar filiais: ' + e.message, 'error');
        }
    }

    window.abrirModalFilial = (id = null, codigo = '', nome = '', cidade = '') => {
        const isEdit = id !== null;
        const html = `
            <form id="formFilial">
                <div class="form-group">
                    <label for="filialCodigo">Código da Filial *</label>
                    <input type="text" id="filialCodigo" class="form-control" value="${escapeHtml(codigo)}" required placeholder="Ex: F101 ou 2097">
                </div>
                <div class="form-group">
                    <label for="filialNome">Nome da Filial / Loja *</label>
                    <input type="text" id="filialNome" class="form-control" value="${escapeHtml(nome)}" required placeholder="Ex: Cobasi Morumbi">
                </div>
                <div class="form-group">
                    <label for="filialCidade">Cidade</label>
                    <input type="text" id="filialCidade" class="form-control" value="${escapeHtml(cidade)}" placeholder="Ex: São Paulo">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="document.getElementById('modalOverlay').classList.add('hidden')">Cancelar</button>
                    <button type="submit" class="btn-primary">${isEdit ? 'Salvar Alterações' : 'Cadastrar'}</button>
                </div>
            </form>
        `;

        openModal(isEdit ? 'Editar Filial' : 'Nova Filial', html);

        document.getElementById('formFilial').addEventListener('submit', async (e) => {
            e.preventDefault();
            const body = {
                codigo: document.getElementById('filialCodigo').value,
                nome: document.getElementById('filialNome').value,
                cidade: document.getElementById('filialCidade').value
            };

            const url = isEdit ? `https://sendly-production-b679.up.railway.app/api/filiais/${id}` : 'https://sendly-production-b679.up.railway.app/api/filiais';
            const method = isEdit ? 'PUT' : 'POST';

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                if (res.ok) {
                    showToast(isEdit ? 'Filial atualizada!' : 'Filial cadastrada!', 'success');
                    closeModal();
                    await carregarTabelaFiliais();
                } else {
                    const err = await res.json();
                    showToast(err.erro || 'Falha ao salvar filial.', 'error');
                }
            } catch (err) {
                showToast('Erro de comunicação: ' + err.message, 'error');
            }
        });
    };

    window.editarFilial = (id, codigo, nome, cidade) => {
        window.abrirModalFilial(id, codigo, nome, cidade);
    };

    window.excluirFilial = async (id) => {
        if (!confirm('Deseja realmente excluir esta filial?')) return;
        try {
            const res = await fetch(`https://sendly-production-b679.up.railway.app/api/filiais/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Filial excluída com sucesso.', 'info');
                await carregarTabelaFiliais();
            } else {
                const err = await res.json();
                showToast(err.erro || 'Falha ao excluir filial.', 'error');
            }
        } catch (e) {
            showToast('Erro: ' + e.message, 'error');
        }
    };

    // -------------------------------------------------------------------------
    // 7. SEÇÃO: CRUD BOXES
    // -------------------------------------------------------------------------
    async function renderBoxes() {
        dom.appMain.innerHTML = `
            <div class="view-header">
                <div>
                    <h2>Cadastro de BOX</h2>
                    <p>Boxes de expedição para direcionamento dos paletes processados</p>
                </div>
                <button id="btnNovoBox" class="btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Novo BOX</span>
                </button>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Identificação / Nome</th>
                            <th>Descrição</th>
                            <th style="text-align: right;">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyBoxes">
                        <tr><td colspan="4" style="text-align: center;">Carregando BOX...</td></tr>
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('btnNovoBox').addEventListener('click', () => abrirModalBox());
        await carregarTabelaBoxes();
    }

    async function carregarTabelaBoxes() {
        try {
            const res = await fetch('https://sendly-production-b679.up.railway.app/api/boxes');
            const data = res.ok ? await res.json() : [];
            const tbody = document.getElementById('tbodyBoxes');
            if (!tbody) return;

            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">Nenhum BOX cadastrado.</td></tr>`;
                return;
            }

            tbody.innerHTML = data.map(b => `
                <tr>
                    <td><strong>#${b.id}</strong></td>
                    <td><span style="font-weight:700; color: var(--brand-accent);">${escapeHtml(b.nome)}</span></td>
                    <td>${escapeHtml(b.descricao || '-')}</td>
                    <td style="text-align: right;">
                        <div class="table-actions" style="justify-content: flex-end;">
                            <button class="btn-table-action" onclick="window.editarBox(${b.id}, '${escapeHtml(b.nome)}', '${escapeHtml(b.descricao || '')}')">Editar</button>
                            <button class="btn-table-action delete" onclick="window.excluirBox(${b.id})">Excluir</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } catch (e) {
            showToast('Erro ao carregar boxes: ' + e.message, 'error');
        }
    }

    window.abrirModalBox = (id = null, nome = '', descricao = '') => {
        const isEdit = id !== null;
        const html = `
            <form id="formBox">
                <div class="form-group">
                    <label for="boxNome">Identificação / Nome do BOX *</label>
                    <input type="text" id="boxNome" class="form-control" value="${escapeHtml(nome)}" required placeholder="Ex: BOX 01 ou BOX Expedição Sul">
                </div>
                <div class="form-group">
                    <label for="boxDesc">Descrição / Setor</label>
                    <input type="text" id="boxDesc" class="form-control" value="${escapeHtml(descricao)}" placeholder="Ex: Linha de Cargas Pesadas">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="document.getElementById('modalOverlay').classList.add('hidden')">Cancelar</button>
                    <button type="submit" class="btn-primary">${isEdit ? 'Salvar Alterações' : 'Cadastrar'}</button>
                </div>
            </form>
        `;

        openModal(isEdit ? 'Editar BOX' : 'Novo BOX', html);

        document.getElementById('formBox').addEventListener('submit', async (e) => {
            e.preventDefault();
            const body = {
                nome: document.getElementById('boxNome').value,
                descricao: document.getElementById('boxDesc').value
            };

            const url = isEdit ? `https://sendly-production-b679.up.railway.app/api/boxes/${id}` : 'https://sendly-production-b679.up.railway.app/api/boxes';
            const method = isEdit ? 'PUT' : 'POST';

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                if (res.ok) {
                    showToast(isEdit ? 'BOX atualizado!' : 'BOX cadastrado!', 'success');
                    closeModal();
                    await carregarTabelaBoxes();
                } else {
                    const err = await res.json();
                    showToast(err.erro || 'Falha ao salvar BOX.', 'error');
                }
            } catch (err) {
                showToast('Erro de comunicação: ' + err.message, 'error');
            }
        });
    };

    window.editarBox = (id, nome, desc) => {
        window.abrirModalBox(id, nome, desc);
    };

    window.excluirBox = async (id) => {
        if (!confirm('Deseja realmente excluir este BOX?')) return;
        try {
            const res = await fetch(`https://sendly-production-b679.up.railway.app/api/boxes/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('BOX excluído com sucesso.', 'info');
                await carregarTabelaBoxes();
            } else {
                const err = await res.json();
                showToast(err.erro || 'Falha ao excluir BOX.', 'error');
            }
        } catch (e) {
            showToast('Erro: ' + e.message, 'error');
        }
    };

    // -------------------------------------------------------------------------
    // 8. SEÇÃO: CRUD USUÁRIOS
    // -------------------------------------------------------------------------
    async function renderUsuarios() {
        dom.appMain.innerHTML = `
            <div class="view-header">
                <div>
                    <h2>Cadastro de Usuários</h2>
                    <p>Controle de operadores e administradores do CD 2097</p>
                </div>
                <button id="btnNovoUsuario" class="btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Novo Usuário</span>
                </button>
            </div>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th style="text-align: right;">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyUsuarios">
                        <tr><td colspan="6" style="text-align: center;">Carregando usuários...</td></tr>
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('btnNovoUsuario').addEventListener('click', () => abrirModalUsuario());
        await carregarTabelaUsuarios();
    }

    async function carregarTabelaUsuarios() {
        try {
            const res = await fetch('https://sendly-production-b679.up.railway.app/api/usuarios');
            const data = res.ok ? await res.json() : [];
            const tbody = document.getElementById('tbodyUsuarios');
            if (!tbody) return;

            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhum usuário cadastrado.</td></tr>`;
                return;
            }

            tbody.innerHTML = data.map(u => `
                <tr>
                    <td><strong>#${u.id}</strong></td>
                    <td><strong>${escapeHtml(u.name || '-')}</strong></td>
                    <td>${escapeHtml(u.email || '-')}</td>
                    <td>${escapeHtml(u.telefone || '-')}</td>
                    <td>${escapeHtml(u.endereco || '-')}</td>
                    <td style="text-align: right;">
                        <div class="table-actions" style="justify-content: flex-end;">
                            <button class="btn-table-action" onclick="window.editarUsuario(${u.id}, '${escapeHtml(u.name || '')}', '${escapeHtml(u.email || '')}', '${escapeHtml(u.telefone || '')}', '${escapeHtml(u.endereco || '')}')">Editar</button>
                            <button class="btn-table-action delete" onclick="window.excluirUsuario(${u.id})">Excluir</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        } catch (e) {
            showToast('Erro ao carregar usuários: ' + e.message, 'error');
        }
    }

    window.abrirModalUsuario = (id = null, name = '', email = '', telefone = '', endereco = '') => {
        const isEdit = id !== null;
        const html = `
            <form id="formUsuario">
                <div class="form-group">
                    <label for="userName">Nome Completo *</label>
                    <input type="text" id="userName" class="form-control" value="${escapeHtml(name)}" required placeholder="Ex: Carlos Silva">
                </div>
                <div class="form-group">
                    <label for="userEmail">E-mail de Acesso *</label>
                    <input type="email" id="userEmail" class="form-control" value="${escapeHtml(email)}" required placeholder="Ex: operador@cobasi.com.br">
                </div>
                <div class="form-group">
                    <label for="userPassword">${isEdit ? 'Nova Senha (deixe em branco para manter atual)' : 'Senha de Acesso *'}</label>
                    <input type="password" id="userPassword" class="form-control" ${isEdit ? '' : 'required'} placeholder="${isEdit ? '••••••••' : 'Mínimo 6 caracteres'}">
                </div>
                <div class="form-group">
                    <label for="userTelefone">Telefone</label>
                    <input type="text" id="userTelefone" class="form-control" value="${escapeHtml(telefone)}" placeholder="Ex: 11988887777">
                </div>
                <div class="form-group">
                    <label for="userEndereco">Endereço</label>
                    <input type="text" id="userEndereco" class="form-control" value="${escapeHtml(endereco)}" placeholder="Ex: CD 2097 - Extrema">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="document.getElementById('modalOverlay').classList.add('hidden')">Cancelar</button>
                    <button type="submit" class="btn-primary">${isEdit ? 'Salvar Alterações' : 'Cadastrar'}</button>
                </div>
            </form>
        `;

        openModal(isEdit ? 'Editar Usuário' : 'Novo Usuário', html);

        document.getElementById('formUsuario').addEventListener('submit', async (e) => {
            e.preventDefault();
            const body = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                telefone: document.getElementById('userTelefone').value,
                endereco: document.getElementById('userEndereco').value
            };

            const passVal = document.getElementById('userPassword').value;
            if (passVal && passVal.trim().length > 0) {
                body.password = passVal.trim();
            }

            const url = isEdit ? `https://sendly-production-b679.up.railway.app/api/usuarios/${id}` : 'https://sendly-production-b679.up.railway.app/api/usuarios';
            const method = isEdit ? 'PUT' : 'POST';

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                if (res.ok) {
                    showToast(isEdit ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado!', 'success');
                    closeModal();
                    await carregarTabelaUsuarios();
                } else {
                    const err = await res.json();
                    showToast(err.erro || 'Falha ao salvar usuário.', 'error');
                }
            } catch (err) {
                showToast('Erro de comunicação: ' + err.message, 'error');
            }
        });
    };

    window.editarUsuario = (id, name, email, telefone, endereco) => {
        window.abrirModalUsuario(id, name, email, telefone, endereco);
    };

    window.excluirUsuario = async (id) => {
        if (id == state.usuarioId) {
            showToast('Você não pode excluir o usuário que está atualmente logado.', 'error');
            return;
        }

        if (!confirm('Deseja realmente excluir este usuário?')) return;
        try {
            const res = await fetch(`https://sendly-production-b679.up.railway.app/api/usuarios/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Usuário excluído com sucesso.', 'info');
                await carregarTabelaUsuarios();
            } else {
                const err = await res.json();
                showToast(err.erro || 'Falha ao excluir usuário.', 'error');
            }
        } catch (e) {
            showToast('Erro: ' + e.message, 'error');
        }
    };

    // -------------------------------------------------------------------------
    // 9. Helpers
    // -------------------------------------------------------------------------
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
