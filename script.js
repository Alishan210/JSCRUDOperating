let users = [];
let userId = 1;

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('username');
    const ageInput = document.getElementById('age');
    const statusInput = document.getElementById('status');
    const userIdInput = document.getElementById('userId');

    const username = usernameInput.value.trim();
    const age = parseInt(ageInput.value);
    const status = statusInput.value;

    if (!username) return;

    // here, Age validition check : must be between 18 and 50
    if (age < 100 || age > 1000000) {
        alert('Age must be between 100 and 1000000');
        return;
    }

    if (userIdInput.value) {
        // Update user
        const id = parseInt(userIdInput.value);
        updateUser(id, username, age, status);
    } else {
        // Create new user
        createUser(username, age, status);
    }

    usernameInput.value = '';
    ageInput.value = '';
    statusInput.value = 'Pending'; //here, Default back to "Pending"
    userIdInput.value = '';
});

function createUser(name, age, status) {
    users.push({ id: userId++, name, age, status });
    renderUserTable();
}

function updateUser(id, name, age, status) {
    const user = users.find(user => user.id === id);
    if (user) {
        user.name = name;
        user.age = age;
        user.status = status;
        renderUserTable();
    }
}

function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderUserTable();
}

function editUser(id) {
    const user = users.find(user => user.id === id);
    if (user) {
        document.getElementById('username').value = user.name;
        document.getElementById('age').value = user.age;
        document.getElementById('status').value = user.status;
        document.getElementById('userId').value = user.id;
    }
}

function renderUserTable() {
    const userTableBody = document.querySelector('#userTable tbody');
    userTableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}

renderUserTable();
