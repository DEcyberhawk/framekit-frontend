export const fetchAdminProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Max Collins Botchway",
        role: "Founder",
        email: "maxcollinsbotchway88@gmail.com",
        joined: "July 1, 2025",
      });
    }, 500);
  });
};
