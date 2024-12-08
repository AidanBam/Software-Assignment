const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tracker.db');

db.serialize(() => {
    // Create lessons table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS content (
            id TEXT,
            title TEXT,
            description TEXT,
            summarised_content TEXT
        )
    `);

    const stmt = db.prepare('INSERT INTO content (id, title, description, summarised_content) VALUES (?, ?, ?, ?)');

    // Sample lessons data for different topics
    stmt.run('home', 'welcome to my study buddy', 'Click Subtopics like this to view their related pages.', 'None');
    stmt.run('home', 'how to use', 'C', 'None');
    stmt.run('data-transmission', 'Interactive Websites', 'Interactive websites are websites which allow users to interact/engage with the content instead of just reading the information. This is archived using features like forms, animations, quizzes, chat functinalities, games, ext, this creates a memorable experience for the user, so they remember the information the website is feeding them. A website that is interactive gennerally includes all aspects of web design, looks (CSS), ordering (HTML) and functinality (JS). An example would be this website', 'Interactive websites are webistes which users engage with they include forms, animations, quizzes, ext.');
    stmt.run('data-transmission', 'E-Commerce', 'E-Commerce websites let businesses sell products or services online', '');
    stmt.run('data-transmission', '', '', '');
    
    stmt.run('web-design', 'Web Design Basics', 'Learn the fundamentals of web design and layout principles.', 'None');


    stmt.finalize();
});

db.close();