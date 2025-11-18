import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaCog } from "react-icons/fa";
import Button from "../../ui/buttons/Button";
import InputField from "../../ui/InputFields/InputField";
import PhoneInputField from "../../ui/InputFields/PhoneInputField";
import Modal from "../../ui/modals/Modal";
import ReusableTable from "../../ui/tables/ReusableTable";

function getInitial() {
  return (
    JSON.parse(localStorage.getItem("admin_users") || "[]")
  );
}
function saveUsers(users) {
  localStorage.setItem("admin_users", JSON.stringify(users));
}
function genID() {
  return Math.random().toString(36).substr(2, 8);
}

const userColumns = [
  { Header: "S No.", accessor: "serial" },
  { Header: "Username", accessor: "username" },
  { Header: "Email", accessor: "email" },
  { Header: "Status", accessor: "status" },
  { Header: "Phone", accessor: "phone" },
  { Header: "Created", accessor: "created" }
];

export default function AdminPanel() {
  const [users, setUsers] = useState(getInitial());
  const [openModal, setOpenModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [openSettings, setOpenSettings] = useState(null);

  useEffect(() => { saveUsers(users); }, [users]);

  function handleSave(user) {
    if (user.id) {
      setUsers(u => u.map(usr => usr.id === user.id ? user : usr));
    } else {
      setUsers(u => [
        ...u,
        { ...user, id: genID(), created: new Date().toLocaleDateString(), serial: u.length + 1 }
      ]);
    }
    setOpenModal(false);
    setEditUser(null);
  }

  function handleDelete(u) {
    setUsers(current => current.filter(x => x.id !== u.id).map((x, i) => ({ ...x, serial: i + 1 })));
  }

  function openEdit(u) {
    setEditUser(u);
    setOpenModal(true);
  }

  function openSetting(u) {
    setOpenSettings(u);
  }

  function saveSettings(id, settings) {
    setUsers(u => u.map(usr => usr.id === id ? { ...usr, ...settings } : usr));
    setOpenSettings(null);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="text-2xl font-bold">Employee Management</div>
        <Button onClick={() => { setOpenModal(true); setEditUser(null); }} className="flex gap-2 items-center">
          <FaPlus /> Add Employee
        </Button>
      </div>
      <ReusableTable
  columnsDef={userColumns}
  data={users ?? []}
  actions={[
    { label: "Edit", icon: FaEdit, color: "primary600", onClick: openEdit },
    { label: "Setting", icon: FaCog, color: "blue-500", onClick: openSetting },
    { label: "Delete", icon: FaTrash, color: "red-600", onClick: handleDelete }
  ]}
/>

      <UserModal
        open={openModal}
        onClose={() => { setOpenModal(false); setEditUser(null); }}
        onSave={handleSave}
        user={editUser}
      />
      <SettingsModal
        open={!!openSettings}
        onClose={() => setOpenSettings(null)}
        onSave={saveSettings}
        user={openSettings}
      />
    </div>
  );
}

function UserModal({ open, onClose, onSave, user }) {
  const [form, setForm] = useState({
    fullName: "", username: "", email: "", phone: "", status: "Active", password: "", confirmPassword: ""
  });
  const [error, setError] = useState("");
  useEffect(() => {
    if (user) setForm({ ...user, password: "", confirmPassword: "" });
    else setForm({ fullName: "", username: "", email: "", phone: "", status: "Active", password: "", confirmPassword: "" });
  }, [open, user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }
  function handlePhone(v) {
    setForm(f => ({ ...f, phone: v }));
  }
  function validatePassword(p) {
    return /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p) && p.length >= 8;
  }
  function onSubmit(e) {
    e.preventDefault();
    if (!form.fullName || !form.username || !form.email || !form.phone || !form.status) { setError("All fields required"); return; }
    if (!validatePassword(form.password)) { setError("Password does not meet requirements"); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    onSave({ ...form, password: undefined, confirmPassword: undefined });
  }
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-xl font-semibold mb-4">{user ? "Edit Employee" : "Add Employee"}</div>
      <form onSubmit={onSubmit} className="space-y-2">
        <InputField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
        <InputField label="User Name" name="username" value={form.username} onChange={handleChange} />
        <InputField label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        <PhoneInputField label="Phone Number" value={form.phone} onChange={handlePhone} />
        <InputField label="Set Password" name="password" value={form.password} onChange={handleChange} type="password" />
        <InputField label="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" />
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary500">
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <div className="flex gap-3 justify-end mt-2">
          <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit">{user ? "Save" : "Add"}</Button>
        </div>
        {error && <div className="mt-2 text-red-600 font-semibold">{error}</div>}
        <div className="text-xs mt-1 text-gray-500">
          Password must be 8+ chars, use upper, lower, number & symbol.
        </div>
      </form>
    </Modal>
  );
}

function SettingsModal({ open, onClose, onSave, user }) {
  const [form, setForm] = useState({ locationLat: "", locationLng: "", ip: "", profilePic: "" });
  useEffect(() => {
    if (user) setForm({
      locationLat: user.locationLat || "", locationLng: user.locationLng || "", ip: user.ip || "", profilePic: user.profilePic || ""
    });
    else setForm({ locationLat: "", locationLng: "", ip: "", profilePic: "" });
  }, [user, open]);
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }
  function handlePic(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setForm(f => ({ ...f, profilePic: ev.target.result })); };
    reader.readAsDataURL(file);
  }
  function onSubmit(e) {
    e.preventDefault();
    onSave(user.id, form);
  }
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-xl font-semibold mb-4">Set User Properties</div>
      <form onSubmit={onSubmit} className="space-y-2">
        <InputField label="Latitude" name="locationLat" value={form.locationLat} onChange={handleChange} />
        <InputField label="Longitude" name="locationLng" value={form.locationLng} onChange={handleChange} />
        <InputField label="IP Address" name="ip" value={form.ip} onChange={handleChange} />
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handlePic} className="block" />
          {form.profilePic && <img src={form.profilePic} alt="profile" className="w-16 h-16 mt-2 rounded-full object-cover" />}
        </div>
        <div className="flex gap-3 justify-end mt-2">
          <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}
