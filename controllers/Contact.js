import EmailSender from "../Utils/ContactEmail.js";

export const ContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    EmailSender({ name, email, message });
    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
};
