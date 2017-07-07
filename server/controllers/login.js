export default function login(req, res) {
  const user = req.body;
  console.log(user);
  res.sendStatus(200);
}
