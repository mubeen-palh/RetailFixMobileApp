const db = require("../config/db");
const { v4: uuid } = require("uuid");

// TECHNICIAN → only assigned jobs
// VENDOR → all vendor jobs (simplified = all jobs)
// ADMIN → everything

exports.getJobs = async (req, res) => {
  const role = req.user.role;
  const userId = req.user.id;

  let rows;

  if (role === "Technician") {
    [rows] = await db.query(`
      SELECT j.* 
      FROM Jobs j
      JOIN JobAssignments ja ON ja.jobId=j.id
      WHERE ja.userId=? AND ja.isActive=TRUE
    `, [userId]);

  } else {
    [rows] = await db.query("SELECT * FROM Jobs");
  }

  res.json(rows);
};

// job detail
exports.getJob = async (req, res) => {
  const id = req.params.id;

  const [[job]] =
    await db.query("SELECT * FROM Jobs WHERE id=?", [id]);

  if (!job)
    return res.status(404).json({ error: "Not found" });

  const [attachments] =
    await db.query("SELECT * FROM Attachments WHERE jobId=?", [id]);

  const [notes] =
    await db.query("SELECT * FROM Notes WHERE jobId=?", [id]);

  res.json({ ...job, attachments, notes });
};

// ADMIN creates job
exports.createJob = async (req, res) => {
  const id = uuid();

  await db.query(
    `INSERT INTO Jobs (id,title,description,customerName,lastModifiedBy)
     VALUES (?,?,?,?,?)`,
    [id, req.body.title, req.body.description,
     req.body.customerName, req.user.id]
  );

  res.json({ id });
};

// TECHNICIAN accepts
exports.acceptJob = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  await db.query(
    "UPDATE Jobs SET status='Accepted',lastModifiedBy=? WHERE id=?",
    [userId, id]
  );

  await db.query(
    "UPDATE JobAssignments SET acceptedAt=NOW() WHERE jobId=? AND userId=?",
    [id, userId]
  );

  res.json({ ok: true });
};

// TECHNICIAN completes
exports.completeJob = async (req, res) => {
  const id = req.params.id;

  await db.query(
    "UPDATE Jobs SET status='Completed',lastModifiedBy=? WHERE id=?",
    [req.user.id, id]
  );

  res.json({ ok: true });
};
