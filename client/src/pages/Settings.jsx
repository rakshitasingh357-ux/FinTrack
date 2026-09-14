import {
  useState,
} from "react";

import {
  User,
  Mail,
  Edit3,
} from "lucide-react";

function Profile() {
  const savedUser =
    localStorage.getItem("user");

  const user = savedUser
    ? JSON.parse(savedUser)
    : {};

  const [name, setName] =
    useState(user.name || "");

  const [editing, setEditing] =
    useState(false);

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      name,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setEditing(false);

    window.location.reload();
  };

  return (
    <div className="page profile-page">
      <div className="glass-card profile-card">
        <div className="large-avatar">
          {(user.name || "U")
            .charAt(0)
            .toUpperCase()}
        </div>

        {!editing ? (
          <>
            <h1>
              {user.name || "User"}
            </h1>

            <p>
              <Mail size={16} />
              {user.email ||
                "No email available"}
            </p>

            <div className="profile-stats">
              <div>
                <strong>
                  <User size={20} />
                </strong>

                <span>
                  FinTrack User
                </span>
              </div>

              <div>
                <strong>
                  Active
                </strong>

                <span>
                  Account Status
                </span>
              </div>

              <div>
                <strong>
                  ✓
                </strong>

                <span>
                  Secure Account
                </span>
              </div>
            </div>

            <button
              className="primary-button"
              onClick={() =>
                setEditing(true)
              }
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          </>
        ) : (
          <div className="profile-edit">
            <div className="input-group">
              <label>
                Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <button
              className="primary-button"
              onClick={saveProfile}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;