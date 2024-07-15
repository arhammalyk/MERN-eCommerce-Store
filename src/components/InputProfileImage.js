import React from "react";

const InputProfileImage = ({ userCredentials, setUserCredentials }) => {
  const handleFileChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      profileImage: e.target.files[0],
    });
  };

  return (
    <div>
      <label className="block text-lg mt-2">Profile Image</label>
      <input
        type="file"
        name="profileImage"
        onChange={handleFileChange}
        className=" w-full h-9 mt-2"
      />
    </div>
  );
};

export default InputProfileImage;
