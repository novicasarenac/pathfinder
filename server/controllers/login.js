export default function loginExport(req, res) {
  const user = req.body;
  console.log(user);
  res.sendStatus(200);
}
