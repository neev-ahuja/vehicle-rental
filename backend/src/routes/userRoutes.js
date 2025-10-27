const router = require('express').Router();
const pool = require('../database/db');
const verifyToken = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/' , verifyToken , (req , res) => {
    pool.query('SELECT * FROM users ORDER BY id' , (err , result) => {
        if(err) {
            return res.status(500).json({ error: 'Database query error : ' + err.message });
        }
        res.status(200).json(result.rows[0]);
    });
});


router.post('/register' , (req , res) => {
    const { name , email , password } = req.body;   
    pool.query(`INSERT INTO users (name , email , password , vehicles) VALUES ($1 , $2 , $3 , '{}') RETURNING *` , [name , email , password] , (err , result) => {
        if(err) {
            return res.status(500).json({ error: 'Database insertion error : ' + err.message });
        } 
        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.status(201).json(user);
    });
});

router.post('/login' , (req , res) => {
    const { email , password } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2' , [email , password] , (err , result) => {
        if(err) {
            return res.status(500).json({ error: 'Database query error : ' + err.message });
        }
        if(result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            });

        res.status(200).json(user);
    });
});

router.post('/logout', (req, res) => {
    console.log('   Logging out user');
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;