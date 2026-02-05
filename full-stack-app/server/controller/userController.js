import User from "../model/userModel.js";


export const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: savedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const usersData = await User.find();

    if (!usersData || usersData.length == 0) {
      return res.status(404), json({ message: "User data not found!" });
    }
    return res.status(200).json({
      status: true,
      message: "Users data get successfully",
      data: usersData,
    });
  } catch (err) {
    return res.status(500).json({ message: err.massage });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: `User with ${id} not found!` });
    }
    return res.status(200).json({
      status: true,
      message: `Users with id ${id} is found`,
      data: userExist,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User data not found!" });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(400).json({ message: "Error updating user" });
    }
    return res.status(200).json({
      status: true,
      message: `Users Updated Successfully`,
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User data not found!" });
    }

    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(400).json({ message: "Error deleting user" });
    }

    return res.status(200).json({
      status: true,
      message: `User deleted Successfully!`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
