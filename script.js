let currentEditRow = null;

function switchVillage(villageId, event) {
    document.querySelectorAll('.village-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const target = document.getElementById(villageId);
    if (target) target.classList.add('active');
    event.currentTarget.classList.add('active');
}

function saveItem() {
    const name = document.getElementById('itemName').value.trim();
    const sizes = document.getElementById('itemSizes').value.trim();
    const qty = document.getElementById('itemQty').value.trim();

    if (!name || !sizes || !qty) {
        alert('Заполните все поля!');
        return;
    }

    const table = document.getElementById('centralStockList');

    if (currentEditRow) {
        currentEditRow.cells[1].innerText = name;
        currentEditRow.cells[2].innerText = sizes;
        currentEditRow.cells[3].innerText = qty + ' шт.';
        currentEditRow = null;
        document.getElementById('formTitle').innerText = 'Добавить товар на склад';
        document.getElementById('saveBtn').innerText = 'Добавить в каталог';
    } else {
        const art = Math.floor(1000 + Math.random() * 9000);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${art}</td>
            <td>${name}</td>
            <td>${sizes}</td>
            <td>${qty} шт.</td>
            <td>
                <button class="btn-action" onclick="editRow(this)">Изм</button>
                <button class="btn-action btn-del" onclick="deleteRow(this)">Уд</button>
            </td>
        `;
        table.appendChild(row);
    }

    document.getElementById('itemName').value = '';
    document.getElementById('itemSizes').value = '';
    document.getElementById('itemQty').value = '';
}

function deleteRow(btn) {
    btn.closest('tr').remove();
}

function editRow(btn) {
    const row = btn.closest('tr');
    currentEditRow = row;

    document.getElementById('itemName').value = row.cells[1].innerText;
    document.getElementById('itemSizes').value = row.cells[2].innerText;
    document.getElementById('itemQty').value = parseInt(row.cells[3].innerText);

    document.getElementById('formTitle').innerText = 'Редактировать товар';
    document.getElementById('saveBtn').innerText = 'Сохранить изменения';
}

function addItemToVillage(tableId, nameId, sizeId, qtyId) {
    const name = document.getElementById(nameId).value.trim();
    const size = document.getElementById(sizeId).value.trim();
    const qty = document.getElementById(qtyId).value.trim();

    if (!name || !size || !qty) {
        alert('Заполните поля для товара!');
        return;
    }

    const table = document.getElementById(tableId);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${size}</td>
        <td>${qty} шт.</td>
        <td><button class="btn-action btn-del" onclick="this.closest('tr').remove()">Убрать</button></td>
    `;
    table.appendChild(row);

    document.getElementById(nameId).value = '';
    document.getElementById(sizeId).value = '';
    document.getElementById(qtyId).value = '';
}

function addNewVillage() {
    const vName = document.getElementById('newVillageName').value.trim();
    const opName = document.getElementById('newOperatorName').value.trim();

    if (!vName || !opName) {
        alert('Введите название поселка и имя оператора!');
        return;
    }

    const villageId = 'village_' + Date.now();
    const tableId = villageId + 'Table';
    const nId = villageId + 'Name';
    const sId = villageId + 'Size';
    const qId = villageId + 'Qty';

    // Таб
    const tabsContainer = document.getElementById('villageTabs');
    const newTab = document.createElement('button');
    newTab.className = 'tab-btn';
    newTab.innerText = vName;
    newTab.onclick = function(e) { switchVillage(villageId, e); };
    tabsContainer.appendChild(newTab);

    // Панель
    const panelsContainer = document.getElementById('dynamicPanelsContainer');
    const newPanel = document.createElement('div');
    newPanel.id = villageId;
    newPanel.className = 'village-panel';
    newPanel.innerHTML = `
        <div class="operator-box">
            <span>Оператор: <strong>${opName}</strong></span>
            <span class="badge">Активен</span>
        </div>
        <div class="table-wrap">
            <table id="${tableId}">
                <tr>
                    <th>Товар</th>
                    <th>Размер</th>
                    <th>Наличие</th>
                    <th>Действие</th>
                </tr>
            </table>
        </div>
        <div class="inline-form">
            <input type="text" id="${nId}" placeholder="Товар">
            <input type="text" id="${sId}" placeholder="Размер">
            <input type="number" id="${qId}" placeholder="Шт">
            <button class="btn-primary" onclick="addItemToVillage('${tableId}', '${nId}', '${sId}', '${qId}')">+</button>
        </div>
    `;
    panelsContainer.appendChild(newPanel);

    document.getElementById('newVillageName').value = '';
    document.getElementById('newOperatorName').value = '';
}

function handleChatPress(e) {
    if (e.key === 'Enter') sendToAI();
}

function sendToAI() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    const chatContainer = document.getElementById('chatContainer');

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerText = text;
    chatContainer.appendChild(userMsg);

    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-msg ai';
        
        const lower = text.toLowerCase();
        if (lower.includes('сосновк') || lower.includes('довезти')) {
            aiMsg.innerText = 'Анализ остатков: в Сосновке заканчиваются ходовые размеры. Рекомендуется догрузка со склада.';
        } else if (lower.includes('калиновк')) {
            aiMsg.innerText = 'Поселок Калиновка: остатки в норме, дефицита нет.';
        } else {
            aiMsg.innerText = 'Система функционирует стабильно, все данные от операторов точек актуальны.';
        }

        chatContainer.appendChild(aiMsg);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 500);
}
