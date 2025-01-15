const data = {
    "data": [
     {
        "id": 1372,
        "productID": "10001",
        "productName": "Test 1",
        "amount": "1000",
        "customerName" : "abc",
        "status": 0,
        "transactionDate": "2022-07-10 11:14:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 11:14:52"
     },
     {
        "id": 1373,
        "productID": "10002",
        "productName": "Test 2",
        "amount": "2000",
        "customerName" : "abc",
        "status": 0,
        "transactionDate": "2022-07-11 13:14:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 13:14:52"
     },
     {
        "id": 1374,
        "productID": "10001",
        "productName": "Test 1",
        "amount": "1000",
        "customerName" : "abc",
        "status": 0,
        "transactionDate": "2022-08-10 12:14:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 12:14:52"
     },
     {
        "id": 1375,
        "productID": "10002",
        "productName": "Test 2",
        "amount": "1000",
        "customerName" : "abc",
        "status": 1,
        "transactionDate": "2022-08-10 13:10:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 13:10:52"
     },
     {
        "id": 1376,
        "productID": "10001",
        "productName": "Test 1",
        "amount": "1000",
        "customerName" : "abc",
        "status": 0,
        "transactionDate": "2022-08-10 13:11:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 13:11:52"
     },
     {
        "id": 1377,
        "productID": "10002",
        "productName": "Test 2",
        "amount": "2000",
        "customerName" : "abc",
        "status": 0,
        "transactionDate": "2022-08-12 13:14:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 13:14:52"
     },
     {
        "id": 1378,
        "productID": "10001",
        "productName": "Test 1",
        "amount": "1000",
        "customerName" : "abc",
        "status": 0,
        "transactionDate": "2022-08-12 14:11:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 14:11:52"
     },
     {
        "id": 1379,
        "productID": "10002",
        "productName": "Test 2",
        "amount": "1000",
        "customerName" : "abc",
        "status": 1,
        "transactionDate": "2022-09-13 11:14:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 11:14:52"
     },
     {
        "id": 1380,
        "productID": "10001",
        "productName": "Test 1",
        "amount": "1000",
        "customerName" : "abc",
        "status": 0,
        "transactionDate": "2022-09-13 13:14:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 13:14:52"
     },
     {
        "id": 1381,
        "productID": "10002",
        "productName": "Test 2",
        "amount": "2000",
        "customerName" : "abc",
        "status": 0,
        "transactionDate": "2022-09-14 09:11:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 09:11:52"
     },
     {
        "id": 1382,
        "productID": "10001",
        "productName": "Test 1",
        "amount": "1000",
        "customerName" : "abc",
        "status": 0,
        "transactionDate": "2022-09-14 10:14:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 10:14:52"
     },
     {
        "id": 1383,
        "productID": "10002",
        "productName": "Test 2",
        "amount": "1000",
        "customerName" : "abc",
        "status": 1,
        "transactionDate": "2022-08-15 13:14:52",
        "createBy" : "abc",
        "createOn" : "2022-07-10 13:14:52"
     },
    ],
    "status": [
      { "id": 0, "name": "SUCCESS" },
      { "id": 1, "name": "FAILED" }
    ]
  };
  
  const groupByYearMonth = (data) => {
    return data.reduce((acc, item) => {
      const [year, month] = item.transactionDate.split("-").slice(0, 2);
      const key = `${year}-${month}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  };
  
  const showPage = (page, id = null) => {
    const content = document.getElementById('content');
    content.innerHTML = '';
  
    if (page === 'grid') {
      const groupedData = groupByYearMonth(data.data);
      content.innerHTML = '<h2>Grid Table</h2>';
      for (const [key, items] of Object.entries(groupedData)) {
        const table = document.createElement('table');
        table.innerHTML = `<thead><tr><th>ID</th><th>Product Name</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>`;
        const tbody = document.createElement('tbody');
        items.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.productName}</td>
            <td>${item.amount}</td>
            <td>${data.status.find(s => s.id === item.status).name}</td>
            <td>
              <button onclick="showPage('view', ${item.id})">View</button>
              <button onclick="showPage('edit', ${item.id})">Edit</button>
            </td>
          `;
          tbody.appendChild(row);
        });
        table.appendChild(tbody);
        content.appendChild(document.createElement('h3')).innerText = `Group: ${key}`;
        content.appendChild(table);
      }
    } else if (page === 'add') {
      content.innerHTML = `
        <h2>Add Data</h2>
        <form onsubmit="addData(event)">
          <label>Product Name: <input type="text" id="productName"></label><br>
          <label>Amount: <input type="number" id="amount"></label><br>
          <button type="submit">Submit</button>
        </form>
      `;
    } else if (page === 'edit') {
      const item = data.data.find(d => d.id === id);
      content.innerHTML = `
        <h2>Edit Data</h2>
        <form onsubmit="editData(event, ${id})">
          <label>Product Name: <input type="text" id="productName" value="${item.productName}"></label><br>
          <label>Amount: <input type="number" id="amount" value="${item.amount}"></label><br>
          <button type="submit">Submit</button>
        </form>
      `;
    } else if (page === 'view') {
      const item = data.data.find(d => d.id === id);
      content.innerHTML = `
        <h2>Detail Data</h2>
        <p>ID: ${item.id}</p>
        <p>Product Name: ${item.productName}</p>
        <p>Amount: ${item.amount}</p>
        <p>Status: ${data.status.find(s => s.id === item.status).name}</p>
        <p>Transaction Date: ${item.transactionDate}</p>
      `;
    }
  };
  
  const addData = (event) => {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const amount = document.getElementById('amount').value;
    data.data.push({
      id: Date.now(),
      productName,
      amount,
      status: 0,
      transactionDate: new Date().toISOString(),
      createBy: 'user',
      createOn: new Date().toISOString()
    });
    showPage('grid');
  };
  
  const editData = (event, id) => {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const amount = document.getElementById('amount').value;
    const item = data.data.find(d => d.id === id);
    item.productName = productName;
    item.amount = amount;
    showPage('grid');
  };
  
  // Initialize the page
  showPage('grid');
  