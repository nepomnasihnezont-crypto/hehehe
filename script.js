function addNewItem() {
    const name = document.getElementById('itemName').value;
    const sizes = document.getElementById('itemSizes').value;
    const qtyInput = document.getElementById('itemQty').value;

    if (!name || !sizes || !qtyInput) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const table = document.getElementById('catalogList');
    const art = Math.floor(1000 + Math.random() * 9000);

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${art}</td>
        <td>${name}</td>
        <td>${sizes}</td>
        <td>${qtyInput} шт.</td>
    `;
    table.appendChild(row);

    document.getElementById('itemName').value = '';
    document.getElementById('itemSizes').value = '';
    document.getElementById('itemQty').value = '';
}
