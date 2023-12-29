-- Assignment: 13.2
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title text NOT NULL,
    likes INT NOT NULL
);

-- Assignment: 13.2
INSERT INTO blogs (author, url, title, likes)
values (
    'Ben',
    'https://bendevs.com',
    'Bendevs',
    85
);

-- Assignment: 13.2
INSERT INTO blogs (author, url, title, likes)
values (
    'Jake',
    'https://github.com',
    'Github',
    10
);

-- Populate the database

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title text NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    user_id INT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users (id, username, name)
VALUES
    (1, 'benjaminfakeemail@gmail.com', 'Ben'),
    (2, 'jakewasthesecondtestaccount@outlook.com', 'Jake')
;

INSERT INTO blogs (author, url, title, likes, user_id)
VALUES
    ('Karel', 'https://bendevs.com', 'Bendevs is great website!', 89, 1),
    ('Unknow dev', 'https://github.com', 'Git is useful', 34, 2),
    ('Fiona Gisbye', 'http://github.io/odio/curabitur/convallis/duis/consequat.js', 'Suspendisse accumsan tortor quis turpis.', 53, 2),
    ('Adela MacCombe', 'http://admin.ch/imperdiet/sapien/urna.js', 'Vivamus vel nulla eget eros elementum pellentesque.', 153, 1),
    ('Skell Nasey', 'https://theglobeandmail.com/at/ipsum.html', 'Nulla tempus.', 109, 1),
    ('Bourke Branthwaite', 'https://shareasale.com/lectus/pellentesque.png', 'Morbi a ipsum.', 86, 1),
    ('Raffarty Harkes', 'https://icq.com/at/nulla/suspendisse/potenti/cras.xml', 'Nam tristique tortor eu pede.', 51, 2)
;