CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0  
  );

INSERT INTO blogs (author, url, title) VALUES ('Karol Karnas', 'Learn PostgreSQL before learning Next.js', 'https://www.ilustrografia.com/illustrations/shopping-baba' ), ('Kamil Ulman', 'Learn SQL before learning PostgreSQL', 'https://www.ilustrografia.com/illustrations/wetlinka-goddess' );

INSERT INTO blogs (author, url, title) VALUES ('Karol Karnas', 'Welcome to my GitHub page!', 'https://github.com/KarolKarnas' );


INSERT INTO users (username, name) VALUES ('karolkarnas', 'karol');