const router = require("express").Router();
const c = require("../controllers/jobController");
const auth = require("../middleware/auth");
const rbac = require("../middleware/rbac");

router.use(auth);

router.get("/", c.getJobs);
router.get("/:id", c.getJob);

router.post("/",
  rbac(["Admin"]),
  c.createJob);

router.post("/:id/accept",
  rbac(["Technician"]),
  c.acceptJob);

router.post("/:id/complete",
  rbac(["Technician"]),
  c.completeJob);

module.exports = router;
