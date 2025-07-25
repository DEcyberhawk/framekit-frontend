const STORAGE_KEYS = {
  campaigns: "framekit_campaigns",
  tickets: "framekit_tickets",
  employees: "framekit_employees",
  users: "framekit_users",
};

// Utility to simulate network delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Generic get/set helpers
const getData = (key, defaultValue = []) => {
  const json = localStorage.getItem(key);
  return json ? JSON.parse(json) : defaultValue;
};

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Campaigns API
export const fetchCampaigns = async () => {
  await delay(300);
  return getData(STORAGE_KEYS.campaigns, []);
};

export const createCampaign = async (campaign) => {
  await delay(300);
  const campaigns = getData(STORAGE_KEYS.campaigns, []);
  const newCampaign = { id: Date.now(), ...campaign };
  campaigns.push(newCampaign);
  setData(STORAGE_KEYS.campaigns, campaigns);
  return newCampaign;
};

export const updateCampaign = async (id, updated) => {
  await delay(300);
  let campaigns = getData(STORAGE_KEYS.campaigns, []);
  campaigns = campaigns.map((c) => (c.id === id ? { ...c, ...updated } : c));
  setData(STORAGE_KEYS.campaigns, campaigns);
  return campaigns.find((c) => c.id === id);
};

export const deleteCampaign = async (id) => {
  await delay(300);
  let campaigns = getData(STORAGE_KEYS.campaigns, []);
  campaigns = campaigns.filter((c) => c.id !== id);
  setData(STORAGE_KEYS.campaigns, campaigns);
  return true;
};

// Tickets API
export const fetchTickets = async () => {
  await delay(300);
  return getData(STORAGE_KEYS.tickets, []);
};

export const createTicket = async (ticket) => {
  await delay(300);
  const tickets = getData(STORAGE_KEYS.tickets, []);
  const newTicket = { id: Date.now(), ...ticket };
  tickets.push(newTicket);
  setData(STORAGE_KEYS.tickets, tickets);
  return newTicket;
};

export const updateTicket = async (id, updated) => {
  await delay(300);
  let tickets = getData(STORAGE_KEYS.tickets, []);
  tickets = tickets.map((t) => (t.id === id ? { ...t, ...updated } : t));
  setData(STORAGE_KEYS.tickets, tickets);
  return tickets.find((t) => t.id === id);
};

export const deleteTicket = async (id) => {
  await delay(300);
  let tickets = getData(STORAGE_KEYS.tickets, []);
  tickets = tickets.filter((t) => t.id !== id);
  setData(STORAGE_KEYS.tickets, tickets);
  return true;
};

// Employees API
export const fetchEmployees = async () => {
  await delay(300);
  return getData(STORAGE_KEYS.employees, []);
};

export const createEmployee = async (employee) => {
  await delay(300);
  const employees = getData(STORAGE_KEYS.employees, []);
  const newEmp = { id: Date.now(), ...employee };
  employees.push(newEmp);
  setData(STORAGE_KEYS.employees, employees);
  return newEmp;
};

export const updateEmployee = async (id, updated) => {
  await delay(300);
  let employees = getData(STORAGE_KEYS.employees, []);
  employees = employees.map((e) => (e.id === id ? { ...e, ...updated } : e));
  setData(STORAGE_KEYS.employees, employees);
  return employees.find((e) => e.id === id);
};

export const deleteEmployee = async (id) => {
  await delay(300);
  let employees = getData(STORAGE_KEYS.employees, []);
  employees = employees.filter((e) => e.id !== id);
  setData(STORAGE_KEYS.employees, employees);
  return true;
};

// Users API
export const fetchUsers = async () => {
  await delay(300);
  return getData(STORAGE_KEYS.users, []);
};

export const createUser = async (user) => {
  await delay(300);
  const users = getData(STORAGE_KEYS.users, []);
  const newUser = { id: Date.now(), ...user };
  users.push(newUser);
  setData(STORAGE_KEYS.users, users);
  return newUser;
};

export const updateUser = async (id, updated) => {
  await delay(300);
  let users = getData(STORAGE_KEYS.users, []);
  users = users.map((u) => (u.id === id ? { ...u, ...updated } : u));
  setData(STORAGE_KEYS.users, users);
  return users.find((u) => u.id === id);
};

export const deleteUser = async (id) => {
  await delay(300);
  let users = getData(STORAGE_KEYS.users, []);
  users = users.filter((u) => u.id !== id);
  setData(STORAGE_KEYS.users, users);
  return true;
};
