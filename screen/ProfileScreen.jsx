import { useState } from "react";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useUpdateUserMutation,
} from "../slices/userApiSlice";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { setCredentials } from "../slices/authSlice";

function ProfileScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const [login] = useLoginMutation();

  const { name, email } = userInfo || {};
  const [updateProfile] = useUpdateUserMutation();
  const dispatch = useDispatch();
  // const [correctDate, setCorrectData] = useState();
  const [loginError, setLoginError] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const [fieldType, setFieldType] = useState(""); // "name" or "email"
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleVerifyOldPassword = async () => {
    try {
      await login({ email, password: oldPassword }).unwrap();
      setLoginError(null);
      setPasswordModalOpen(true);
    } catch (err) {
      setLoginError("Incorrect password");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setLoginError("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({ password: newPassword }).unwrap();
      dispatch(setCredentials(res));
      setPasswordModalOpen(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setLoginError("Password update failed");
      console.log(err);
    }
  };

  const openDialog = (type, currentValue) => {
    setFieldType(type);
    setValue(currentValue);
    setOpen(true);
  };

  const handleSubmit = async () => {
    const updatedData =
      fieldType === "name" ? { name: value } : { email: value };

    try {
      const res = await updateProfile(updatedData).unwrap();
      dispatch(setCredentials(res));
      setOpen(false);
    } catch (err) {
      console.log("Update failed", err);
      setLoginError(err.data || err.message);
    }
  };

  // const handleSubmitPassword = async () => {
  //   try {
  //     await login({ email: password });
  //   } catch (error) {
  //     console.log("wrong email or password" + error);
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Profile
        </h2>

        <div
          onClick={() => openDialog("name", name)}
          className="mb-6 bg-gray-200 rounded-2xl w-full flex items-center justify-between px-6 py-4 hover:text-blue-600 cursor-pointer transition-colors duration-300"
        >
          <div>
            <h3 className="font-semibold text-gray-700">Name</h3>
            <p className="text-lg text-gray-900">{name}</p>
          </div>
          <Pencil className="w-6 h-6 text-gray-600" />
        </div>

        <div
          onClick={() => openDialog("email", email)}
          className="mb-6 bg-gray-200 rounded-2xl w-full flex items-center justify-between px-6 py-4 hover:text-blue-600 cursor-pointer transition-colors duration-300"
        >
          <div>
            <h3 className="font-semibold text-gray-700">Email</h3>
            <p className="text-lg text-gray-900">{email}</p>
          </div>
          <Pencil className="w-6 h-6 text-gray-600" />
        </div>

        <h3 className="font-semibold text-gray-800 mb-3">
          To change password, verify your current password
        </h3>
        {loginError && <h3 className="text-red-600 mb-2">{loginError}</h3>}
        <input
          type="password"
          placeholder="Current Password"
          className="mb-6 w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Button
          onClick={handleVerifyOldPassword}
          className="w-full mt-5 hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl shadow-md transition duration-200"
        >
          Verify Password
        </Button>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full mt-5 hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl shadow-md transition duration-200"
        >
          Update Profile
        </button>
      </div>

      {/* Shadcn Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update {fieldType}</DialogTitle>
          </DialogHeader>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Enter new ${fieldType}`}
            className="border-blue-500 ring-blue-600 "
          />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-blue-400 hover:bg-blue-600 text-white hover:cursor-pointer hover:text-white"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              className="bg-blue-400 hover:bg-blue-600 hover:cursor-pointer text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>

          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleChangePassword}>Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProfileScreen;
