import Group from "../models/Group.js";

// Admin: group create
export const createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: "Guruh yaratishda xato" });
  }
};

// Admin: delete group
export const deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.json({ message: "Guruh o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Guruh o‘chirishda xato" });
  }
};

// Admin: update group name
export const updateGroupName = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Guruh topilmadi" });

    group.name = req.body.name;
    await group.save();

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: "Guruh nomini o‘zgartirishda xato" });
  }
};
