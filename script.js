let currentEditRow = null;

// Добавление или сохранение товара в каталоге
function saveItem() {
    const name = document.getElementById('itemName').value.trim();
    const sizes = document.getElementById('itemSizes').value.trim();
    const qty = document.getElementById('itemQty').value.trim();

    if (!name || !sizes || !qty) {
        alert('Пожалуйста, заполните все поля каталога!');
        return;
    }

    const table = document.getElementById('catalogList');

    if (currentEditRow) {
        // Редактирование существующей строки
        currentEditRow.cells[1].innerText = name;
        currentEditRow.cells[2].innerText = sizes;
        currentEditRow.cells[3].innerText = qty;

        currentEditRow = null;
        document.getElementById('formTitle').innerText = 'Добавить товар';
        document.getElementById('saveBtn').innerText = 'Добавить в каталог';
    } else {
        // Добавление нового товара
        const art = Math.floor(1000 + Math.random() * 9000);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${art}</td>
            <td>${name}</td>
            <td>${sizes}</td>
            <td>${qty}</td>
            <td>
                <button class="btn-sm" onclick="editRow(this)">Изм</button>
                <button class="btn-danger btn-sm" onclick="deleteRow(this)">Уд</button>
            </td>
        `;
        table.appendChild(row);

        // Также автоматически добавим в чек-лист водителя для наглядности
        addDriverChecklist(art, name, qty);
    }

    document.getElementById('itemName').value = '';
    document.getElementById('itemSizes').value = '';
    document.getElementById('itemQty').value = '';
}

// Удаление строки из каталога
function deleteRow(btn) {
    btn.closest('tr').remove();
}

// Подготовка строки к редактированию
function editRow(btn) {
    const row = btn.closest('tr');
    currentEditRow = row;

    document.getElementById('itemName').value = row.cells[1].innerText;
    document.getElementById('itemSizes').value = row.cells[2].innerText;
    document.getElementById('itemQty').value = row.cells[3].innerText;

    document.getElementById('formTitle').innerText = 'Редактировать товар';
    document.getElementById('saveBtn').innerText = 'Сохранить изменения';
}

// Добавление нового рейса / маршрута
function addTrip() {
    const title = document.getElementById('vanTitle').value.trim();
    const route = document.getElementById('routeText').value.trim();
    const fill = document.getElementById('fillPercent').value.trim();

    if (!title || !route || !fill) {
        alert('Заполните все поля для рейса!');
        return;
    }

    const container = document.getElementById('tripsContainer');
    const box = document.createElement('div');
    box.className = 'van-box';
    box.innerHTML = `
        <div class="van-header">
            <span>${title}</span>
            <span>${fill}% загрузка</span>
        </div>
        <div class="van-route">Маршрут: ${route}</div>
        <div class="progress-container">
            <div class="progress-bar" style="width: ${fill}%;"></div>
        </div>
        <button class="btn-danger btn-sm" onclick="this.closest('.van-box').remove()">Удалить рейс</button>
    `;

    container.appendChild(box);

    document.getElementById('vanTitle').value = '';
    document.getElementById('routeText').value = '';
    document.getElementById('fillPercent').value = '';
}

// Вспомогательная функция для добавления пункта в чек-лист водителя
function addDriverChecklist(art, name, qty) {
    const checklist = document.getElementById('driverChecklist');
    const label = document.createElement('label');
    label.className = 'check-item';
    label.innerHTML = `<input type="checkbox"> ${name} (Арт. ${art}) — ${qty} шт.`;
    checklist.appendChild(label);
}
