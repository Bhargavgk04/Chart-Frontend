import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const StudentCards = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const navigate = useNavigate();

  // Default images
  const defaultMaleImage = "/assets/default-male.jpg";
  const defaultFemaleImage = "/assets/default-female.jpg";

  const handleChat = (student) => {
    setSelectedUser(student);
    navigate(`/chatbox/${student._id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {users.map((student) => (
        <div
          key={student._id}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-bold text-purple-600">{student.name}</h3>
          <img
            src={
              student.profilePhoto ||
              (student.gender === "male"
                ? defaultMaleImage
                : defaultFemaleImage)
            }
            alt="Profile"
            className="w-20 h-20 object-cover rounded-full mx-auto my-2"
          />
          <p className="text-gray-600">Name: {student.fullname}</p>
          <p className="text-gray-600">Roll No: {student.rollno}</p>
          <p className="text-gray-600">Class: {student.year}</p>
          <p className="text-gray-600">Branch: {student.branch}</p>
          <button
            onClick={() => handleChat(student)}
            className="mt-4 inline-block bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600"
          >
            Chat
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentCards;
