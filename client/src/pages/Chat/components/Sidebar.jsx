import './Sidebar.css';
import format from 'date-fns/format';

export function Sidebar({visible, users}) {
    const statuses = ["Offline", "Online"]
    // const usersList = users?.map((user) => (
    //     <li>{user.username} - {statuses[user.status] }</li>
    // ))

    const usersList = users?.map((user) => (
        <li>
            {user.username} - {statuses[user.status]}
            {(user.status === 0 && user.statusSince )&& ` since ${format(user.statusSince, "p")}`}
        </li>
    ))

    return (
        <div class={visible ? "sidebar active" : "sidebar" }>
            <div class="sidebar-header">
                <h4>Users</h4>
            </div>
            <ul class="user-list">
                {usersList}
            </ul>
            <div class="sidebar-buttons">
                <button>Button 1</button>
                <button>Button 2</button>
            </div>
        </div>
    );
}

