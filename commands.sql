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