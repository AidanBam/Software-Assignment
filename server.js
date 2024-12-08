const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 23081;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/db/content/:id', (req, res) => {
    const id = req.params.id; // Get the topic parameter from the URL

    const db = new sqlite3.Database('./tracker.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Database error');
        }
    });

    // Query to fetch all rows that match the given id
    db.all('SELECT * FROM content WHERE id = ?', [id], (err, rows) => {
        if (err) {
            console.error(err.message);
            db.close(); // Close the database if there's an error
            return res.status(500).send('Database error');
        }

        db.close((err) => {
            if (err) {
                console.error('Error closing the database:', err.message);
            }
        });

        res.json(rows); // Return all rows as a JSON response
    });
});





// Send the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
