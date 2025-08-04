import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [run, setRun] = useState(0);

    const token = localStorage.getItem("token");

    // جلب المستخدمين مع الترتيب حسب level
    useEffect(() => {
        axios
            .get("http://localhost:8080/super_admin/unblock_users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 && Array.isArray(res.data)) {
                    // ترتيب المستخدمين حسب level تنازليًا
                    const sortedUsers = res.data.sort(
                        (a, b) => b.level - a.level
                    );
                    setUsers(sortedUsers);
                } else {
                    setUsers([]);
                }
            })
            .catch((err) => {
                console.error("Error fetching users:", err.message);
                setUsers([]);
            });
    }, [run]);

    // حذف مستخدم
    async function delet(id) {
        try {
            const res = await axios.delete(
                `http://localhost:8000/api/user/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.status === 200) {
                setRun((prev) => prev + 1); // إعادة الجلب بعد الحذف
            }
        } catch (err) {
            console.error("Error deleting user:", err.message);
        }
    }

    const showUsers = users.map((e, index) => (
        <tr key={e.id}>
            <td>{index + 1}</td>
            <td>{e.fullName}</td>
            <td>{e.email}</td>
            <td>{e.level}</td>
            <td>
                <FontAwesomeIcon
                    icon={faTrash}
                    className="icontoggle-password"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => delet(e.id)}
                />
            </td>
        </tr>
    ));

    return (
        <table>
            <caption>Users</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Level</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>{showUsers}</tbody>
        </table>
    );
}
