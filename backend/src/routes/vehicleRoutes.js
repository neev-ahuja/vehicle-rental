const router = require('express').Router();
const pool = require('../database/db');
const verifyToken = require('../middlewares/authMiddleware');



router.get('/', (req, res) => {
  pool.query('SELECT * FROM vehicles WHERE userid = -1 ORDER BY id', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error : ' + err.message });
    }
    res.status(200).json(result.rows);
  });
});

router.post('/', verifyToken, (req, res) => {
  const { name, type, city, year, distance, description } = req.body;
  pool.query(`INSERT INTO vehicles (name , type , city , year , distance , description) VALUES ($1 , $2 , $3 , $4 , $5 , $6) RETURNING *`, [name, type, city, year, distance, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database insertion error : ' + err.message });
    }
    res.status(201).json(result.rows[0]);
  });
});

router.get('/getvehicle/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM vehicles WHERE id = $1', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error : ' + err.message });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json(result.rows[0]);
  });
});


router.get('/myvehicles', verifyToken, async (req, res) => {
  const user = req.user;
  const response = await pool.query("SELECT vehicles FROM users WHERE id = $1", [user.id]);

  const vehicleIds = response.rows[0].vehicles;

  if (!vehicleIds || vehicleIds.length === 0) {
    return res.status(200).json([]);
  }

  const { rows: vehicles } = await pool.query(
    'SELECT * FROM vehicles WHERE id = ANY($1)',
    [vehicleIds]
  );

  return res.status(200).json(vehicles);
});

router.post('/rent', verifyToken, async (req, res) => {
  const { id, userId } = req.body;

  try {
    await pool.query(
      'UPDATE users SET vehicles = array_append(vehicles, $1) WHERE id = $2',
      [id, userId]
    );

    await pool.query(
      'UPDATE vehicles SET userid = $1 WHERE id = $2',
      [userId, id]
    );

    return res.status(200).json({ message: 'Vehicle rented successfully ✅' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database update error: ' + err.message });
  }
});

router.post('/unrent', verifyToken, async (req, res) => {
  const { id, userId } = req.body;

  try {
    await pool.query(
      'UPDATE users SET vehicles = array_remove(vehicles, $1) WHERE id = $2',
      [id, userId]
    );

    await pool.query(
      'UPDATE vehicles SET userid = -1 WHERE id = $1',
      [id]
    );

    return res.status(200).json({ message: 'Vehicle unrented successfully ✅' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database update error: ' + err.message });
  }
});
module.exports = router;