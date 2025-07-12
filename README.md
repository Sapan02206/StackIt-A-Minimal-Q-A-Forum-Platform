# StackIt – A Minimal Q&A Forum Platform

StackIt is a clean, minimal, and collaborative question-and-answer platform built as a custom Odoo module. Designed to support structured knowledge sharing, StackIt allows users to ask questions, post rich-format answers, tag topics, and engage in community-driven discussion.

---

## 🚀 Problem Statement

Educational institutions often lack a dedicated space for structured peer-to-peer discussion. Generic chat apps aren't ideal for threaded, searchable knowledge sharing.

**StackIt** solves this by providing:
- A lightweight, forum-style Q&A system
- Clean tagging and content moderation
- Notifications and answer-acceptance features

---

## 👥 Team Name: Dev Scripters

| Member Name      | Email                        |
|------------------|------------------------------|
| Sapan Desai      | sapan022006@gmail.com        |
| Milind Soni| milindsoni7500@gmail.com                 |

Mentor GitHub ID (invited): `kcv-odoo`

---

## 🔑 Core Features

- ✅ Ask Questions with Title, Description & Tags
- ✅ Rich Text Editor (HTML formatting, lists, links)
- ✅ Answer submission & voting
- ✅ Accept best answer (like Stack Overflow)
- ✅ Tagging system for topics (React, Odoo, JWT etc.)
- ✅ Notification icon when:
  - Someone answers your question
  - Someone comments on your answer
  - You're mentioned using @username

---

## 🛠️ Technologies

- **Odoo** (Custom Module)
- Python
- XML (Views, Menus, Actions)
- HTML Editor (Rich Text Field)
- Git for version control

---

## 📁 Module Structure

```text
stackit/
├── __manifest__.py
├── models/
│   ├── question.py
│   ├── answer.py
│   └── tag.py
├── views/
│   ├── question_views.xml
│   ├── answer_views.xml
│   └── menu.xml
├── security/
│   └── ir.model.access.csv

