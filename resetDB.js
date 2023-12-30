require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const users = [
  {
    username: 'benjaminfakeemail@gmail.com',
    name: 'Ben',
    created_at: '2021-05-05T19:00:00.000Z',
    updated_at: '2022-03-01T19:00:00.000Z'
  },
  {
    username: 'jakewasthesecondtestaccount@outlook.com',
    name: 'Jake',
    created_at: '2023-07-12T19:00:00.000Z',
    updated_at: '2023-07-13T15:00:00.000Z'
  }
]
const blogs = [
  {
    author: 'Karel',
    url: 'https://bendevs.com',
    title: 'Bendevs is a great website! I',
    likes: 89,
    year: 2022,
    user_id: 1
    //created_at: '2022-05-05T19:00:00.000Z',
    //updated_at: '2022-08-01T19:00:00.000Z'
  },
  {
    author: 'Karel',
    url: 'https://bendevs.com',
    title: 'Bendevs is a great website! II',
    likes: 89,
    year: 2022,
    user_id: 1
    //created_at: '2022-05-05T19:00:00.000Z',
    //updated_at: '2022-08-01T19:00:00.000Z'
  },
  {
    author: 'Karel',
    url: 'https://bendevs.com',
    title: 'Bendevs is a great website! III',
    likes: 89,
    year: 2022,
    user_id: 1
    //created_at: '2022-05-05T19:00:00.000Z',
    //updated_at: '2022-08-01T19:00:00.000Z'
  },
  {
    author: 'Unknow dev',
    url: 'https://github.com',
    title: 'Git is useful',
    likes: 34,
    year: 2022,
    user_id: 2
    //created_at: '2021-08-05T19:00:00.000Z',
    //updated_at: '2021-08-05T19:00:00.000Z'
  },
  {
    author: 'Fiona Gisbye',
    url: 'http://github.io/odio/curabitur/convallis/duis/consequat.js',
    title: 'Suspendisse accumsan tortor quis turpis.',
    likes: 53,
    year: 2022,
    user_id: 2
    //created_at: '2021-05-05T19:00:00.000Z',
    //updated_at: '2021-08-05T19:00:00.000Z'
  },
  {
    author: 'Adela MacCombe',
    url: 'http://admin.ch/imperdiet/sapien/urna.js',
    title: 'Vivamus vel nulla eget eros elementum pellentesque.',
    likes: 153,
    year: 2022,
    user_id: 1
    //created_at: '2020-05-05T19:00:00.000Z',
    //updated_at: '2020-05-05T19:00:00.000Z'
  },
  {
    author: 'Skell Nasey',
    url: 'https://theglobeandmail.com/at/ipsum.html',
    title: 'Nulla tempus.',
    likes: 109,
    year: 2022,
    user_id: 1
    //created_at: '2020-05-05T19:00:00.000Z',
    //updated_at: '2021-03-01T19:00:00.000Z'
  },
  {
    author: 'Bourke Branthwaite',
    url: 'https://shareasale.com/lectus/pellentesque.png',
    title: 'Morbi a ipsum.',
    likes: 86,
    year: 2022,
    user_id: 1
    //created_at: '2023-04-05T19:00:00.000Z',
    //updated_at: '2023-09-01T19:00:00.000Z'
  },
  {
    author: 'Raffarty Harkes',
    url: 'https://icq.com/at/nulla/suspendisse/potenti/cras.xml',
    title: 'Nam tristique tortor eu pede.',
    likes: 51,
    year: 2022,
    user_id: 2
    //created_at: '2021-05-05T19:00:00.000Z',
    //updated_at: '2022-03-01T19:00:00.000Z'
  }
]

const main = async () => {
  const sequelize = new Sequelize(process.env.DB_URL, {
    logging: false
  })

  try {
    await sequelize.authenticate()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return
  }

  await sequelize.query('DROP TABLE IF EXISTS blogs')
  await sequelize.query('DROP TABLE IF EXISTS users')
  await sequelize.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE,
      name TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)
  await sequelize.query(`
    CREATE TABLE blogs (
      id SERIAL PRIMARY KEY,
      author TEXT,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      likes INTEGER DEFAULT 0 NOT NULL,
      year INTEGER NOT NULL,
      user_id INTEGER REFERENCES users (id)
    )
  `)

  await sequelize.getQueryInterface().bulkInsert('users', users)
  await sequelize.getQueryInterface().bulkInsert('blogs', blogs)

  await sequelize.close()
}

main()
