import React from "react";
import { Terminal, Mail, Phone, ExternalLink } from "lucide-react";

const ContactMessage = ({ msg, copyEmailToClipboard }) => {
  return (
    <div className="rounded-3xl bg-secondary/30 border border-border p-6 backdrop-blur-sm hover:bg-secondary/50 transition-colors">
      <h3 className="text-foreground font-bold mb-4 flex items-center gap-2 text-base">
        <Terminal size={18} className="text-indigo-400" />
        <span>Contact</span>
      </h3>
      <ul className="space-y-3">
        <li className="flex items-center gap-3 text-sm">
          <Mail size={16} className="text-muted-foreground" />
          <button
            onClick={() => copyEmailToClipboard(msg.content.email)}
            className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer text-left"
          >
            {msg.content.email}
          </button>
        </li>
        <li className="flex items-center gap-3 text-sm">
          <Phone size={16} className="text-muted-foreground" />
          <a
            href={`https://wa.me/${msg.content.whatsapp.replace(
              /[^0-9]/g,
              ""
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            {msg.content.whatsapp}
          </a>
        </li>
        <li className="flex items-center gap-3 text-sm">
          <ExternalLink size={16} className="text-muted-foreground" />
          <a
            href={`https://${msg.content.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            LinkedIn Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactMessage;
