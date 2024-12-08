export default async function handler(req, res) {
    try {
      const response = await fetch(
        "https://app.dynamicauth.com/api/v0/environments/7caf9447-7cbd-48b1-adb2-bf7910ca4bc9/users",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer dyn_w5HF7TanpFeSJ7opg6zMQiSQSxtJcIcbzU2YFqyY4CSPobLXmS4wZHyd",
          },
        }
      );
  
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch users" });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  